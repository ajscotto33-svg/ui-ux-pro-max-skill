/* =========================================================
   AS Yachts — interactions
   - Apple-style scroll-scrubbed hero (canvas frame sequence,
     with video-seek and static fallbacks)
   - 4 headline transitions across the journey
   - Transparent → glassmorphism navigation
   - Scroll reveals, stat counters, testimonial carousel
   - Charter destination filter, valuation + contact forms
   ========================================================= */
(function () {
  "use strict";

  var docEl = document.documentElement;
  docEl.classList.add("js");

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) docEl.classList.add("reduced-motion");

  var hasGSAP = typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";
  if (hasGSAP) gsap.registerPlugin(ScrollTrigger);

  /* ------------------------------------------------------
     HERO — three rendering modes, best available wins:
     1. Canvas frame sequence (assets/frames/) — zero-latency scrub
     2. Video currentTime scrub (assets/hero.mp4 or remote)
     3. Static hero (reduced motion, no GSAP, or nothing loads)
     ------------------------------------------------------ */
  var REMOTE_HERO_URL =
    "https://d8j0ntlcm91z4.cloudfront.net/user_3GIGRwFkw7yyzrAmJxMkkQFlLZP/hf_20260715_171524_b3b646c5-bb25-4e5a-94c0-dbca6152a3bc.mp4";
  var FRAMES_BASE = "assets/frames/";

  var hero = document.getElementById("hero");
  var video = document.getElementById("heroVideo");
  var canvas = document.getElementById("heroCanvas");
  var canvasMode = false;
  var triedRemote = false;

  function useRemoteSource() {
    if (triedRemote || canvasMode) return;
    triedRemote = true;
    video.innerHTML = "";
    video.src = REMOTE_HERO_URL;
    video.load();
    setTimeout(function () {
      if (video.readyState === 0 && !canvasMode) staticHero();
    }, 2500);
  }
  video.addEventListener("error", function () { useRemoteSource(); });
  var localSource = document.getElementById("heroSourceLocal");
  if (localSource) localSource.addEventListener("error", function () { useRemoteSource(); });
  setTimeout(function () {
    if (video.readyState === 0 && !canvasMode) useRemoteSource();
  }, 1500);

  var captions = [
    document.querySelector(".hero__caption--1"),
    document.querySelector(".hero__caption--2"),
    document.querySelector(".hero__caption--3"),
    document.querySelector(".hero__caption--4")
  ];

  var activeCaption = -1;
  function setCaption(progress) {
    // Four headline beats across the scroll journey.
    var idx = progress < 0.24 ? 0 : progress < 0.5 ? 1 : progress < 0.76 ? 2 : 3;
    if (idx === activeCaption) return;
    activeCaption = idx;
    captions.forEach(function (c, i) {
      if (!c) return;
      if (hasGSAP) {
        gsap.to(c, {
          opacity: i === idx ? 1 : 0,
          y: i === idx ? 0 : 24,
          duration: 0.55,
          ease: "power2.out",
          overwrite: true
        });
      } else {
        c.style.opacity = i === idx ? "1" : "0";
        c.style.transform = i === idx ? "none" : "translateY(24px)";
      }
    });
  }

  function staticHero() {
    hero.classList.add("hero--static");
    video.loop = true;
    video.autoplay = true;
    var p = video.play();
    if (p && p.catch) p.catch(function () {});
    captions.forEach(function (c, i) {
      if (!c) return;
      c.style.opacity = i === 3 ? "1" : "0";
      c.style.transform = "none";
    });
    // Sustainability: pause the looping fallback video when it scrolls
    // out of view, resume when it returns (never runs the canvas modes).
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { var q = video.play(); if (q && q.catch) q.catch(function () {}); }
          else video.pause();
        });
      }, { threshold: 0.05 }).observe(hero);
    }
    if (hasGSAP) ScrollTrigger.refresh();
  }

  function createHeroTrigger(onProgress) {
    ScrollTrigger.create({
      trigger: hero,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: function (self) {
        onProgress(self.progress);
        setCaption(self.progress);
      }
    });
    gsap.to(".hero__scrollcue", {
      opacity: 0,
      scrollTrigger: { trigger: hero, start: "4% top", end: "10% top", scrub: true }
    });
    setCaption(0);
  }

  /* --- Mode 1: canvas frame sequence ------------------- */
  function initCanvasScrub(frameCount) {
    canvasMode = true;
    hero.classList.add("hero--canvas");
    try {
      video.preload = "none";
      video.removeAttribute("src");
      video.innerHTML = "";
      video.load();
    } catch (e) {}

    var ctx = canvas.getContext("2d");
    var images = new Array(frameCount);
    var loaded = new Array(frameCount);
    var currentDrawn = -1;

    function frameSrc(i) {
      var n = String(i + 1);
      while (n.length < 4) n = "0" + n;
      return FRAMES_BASE + "frame_" + n + ".jpg";
    }
    function drawFrame(i) {
      var img = images[i];
      if (!img || !loaded[i]) return;
      var cw = canvas.width, ch = canvas.height;
      var iw = img.naturalWidth, ih = img.naturalHeight;
      if (!cw || !ch || !iw || !ih) return;
      var scale = Math.max(cw / iw, ch / ih);
      var dw = iw * scale, dh = ih * scale;
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
      currentDrawn = i;
    }
    function nearestLoaded(i) {
      if (loaded[i]) return i;
      for (var d = 1; d < frameCount; d++) {
        if (i - d >= 0 && loaded[i - d]) return i - d;
        if (i + d < frameCount && loaded[i + d]) return i + d;
      }
      return -1;
    }
    function resize() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      if (currentDrawn >= 0) drawFrame(currentDrawn);
      else { var n = nearestLoaded(0); if (n >= 0) drawFrame(n); }
    }
    window.addEventListener("resize", resize);
    resize();

    for (var i = 0; i < frameCount; i++) {
      (function (i) {
        var img = new Image();
        img.decoding = "async";
        img.onload = function () {
          loaded[i] = true;
          if (i === 0 && currentDrawn < 0) drawFrame(0);
        };
        img.src = frameSrc(i);
        images[i] = img;
      })(i);
    }

    var target = 0, current = 0, rafId = null;
    function tick() {
      var delta = target - current;
      current += delta * 0.28;
      var idx = Math.round(current);
      var drawIdx = nearestLoaded(Math.max(0, Math.min(frameCount - 1, idx)));
      if (drawIdx >= 0 && drawIdx !== currentDrawn) drawFrame(drawIdx);
      if (Math.abs(delta) > 0.25) rafId = requestAnimationFrame(tick);
      else rafId = null;
    }
    function requestTick() { if (rafId === null) rafId = requestAnimationFrame(tick); }

    createHeroTrigger(function (progress) {
      target = progress * (frameCount - 1);
      requestTick();
    });
  }

  /* --- Mode 2: video currentTime scrub ------------------ */
  function initScrubHero() {
    var duration = video.duration;
    if (!duration || !isFinite(duration)) { staticHero(); return; }
    var targetTime = 0, currentTime = 0, rafId = null;
    function tick() {
      var delta = targetTime - currentTime;
      if (Math.abs(delta) > 0.004) {
        if (!video.seeking) {
          currentTime += delta * 0.18;
          try { video.currentTime = currentTime; } catch (e) {}
        }
        rafId = requestAnimationFrame(tick);
      } else rafId = null;
    }
    function requestTick() { if (rafId === null) rafId = requestAnimationFrame(tick); }
    createHeroTrigger(function (progress) {
      targetTime = progress * (duration - 0.06);
      requestTick();
    });
    try { video.currentTime = 0.001; } catch (e) {}
  }

  /* --- Mode selection ----------------------------------- */
  if (prefersReducedMotion || !hasGSAP) {
    if (video.readyState >= 1) staticHero();
    else video.addEventListener("loadedmetadata", staticHero, { once: true });
  } else {
    fetch(FRAMES_BASE + "manifest.json")
      .then(function (r) { if (!r.ok) throw new Error("no manifest"); return r.json(); })
      .then(function (m) {
        if (m && m.count > 1) initCanvasScrub(m.count);
        else throw new Error("bad manifest");
      })
      .catch(function () {
        if (video.readyState >= 1) initScrubHero();
        else video.addEventListener("loadedmetadata", initScrubHero, { once: true });
      });
  }

  /* ------------------------------------------------------
     NAVIGATION — transparent over hero, glass after
     ------------------------------------------------------ */
  var nav = document.getElementById("nav");
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");

  function onScrollNav() {
    var threshold = hero.classList.contains("hero--static")
      ? window.innerHeight * 0.7
      : hero.offsetHeight - window.innerHeight * 0.5;
    nav.classList.toggle("nav--solid", window.scrollY > threshold);
  }
  window.addEventListener("scroll", onScrollNav, { passive: true });
  onScrollNav();

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("nav--open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    navLinks.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("nav--open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ------------------------------------------------------
     SCROLL REVEALS — staggered fade-up per section
     ------------------------------------------------------ */
  if (hasGSAP && !prefersReducedMotion) {
    var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
    var groups = new Map();
    revealEls.forEach(function (el) {
      var section = el.closest("section") || document.body;
      if (!groups.has(section)) groups.set(section, []);
      groups.get(section).push(el);
    });
    groups.forEach(function (els) {
      gsap.fromTo(els,
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.09,
          scrollTrigger: { trigger: els[0], start: "top 84%" }
        }
      );
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.style.opacity = "1"; el.style.transform = "none";
    });
  }

  /* ------------------------------------------------------
     SUBTLE PARALLAX — decorative card imagery only.
     Drifts the background-position of the photo (never text)
     within its frame as the card passes through the viewport.
     ------------------------------------------------------ */
  if (hasGSAP && !prefersReducedMotion) {
    gsap.utils.toArray(".yacht__media, .ccard__media").forEach(function (el) {
      gsap.fromTo(el,
        { backgroundPositionY: "42%" },
        {
          backgroundPositionY: "58%",
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.5 }
        }
      );
    });
  }

  /* ------------------------------------------------------
     STAT COUNTERS
     ------------------------------------------------------ */
  var counters = document.querySelectorAll(".stat__num");
  if ("IntersectionObserver" in window && counters.length) {
    var counted = new WeakSet();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting || counted.has(entry.target)) return;
        counted.add(entry.target);
        var el = entry.target;
        var decimals = parseInt(el.getAttribute("data-decimals"), 10) || 0;
        var end = parseFloat(el.getAttribute("data-count")) || 0;
        function fmt(v) { return decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString(); }
        if (prefersReducedMotion) { el.textContent = fmt(end); return; }
        var startTs = null, durationMs = 1500;
        function step(ts) {
          if (!startTs) startTs = ts;
          var t = Math.min((ts - startTs) / durationMs, 1);
          var eased = 1 - Math.pow(1 - t, 3);
          el.textContent = fmt(end * eased);
          if (t < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { io.observe(el); });
  }

  /* ------------------------------------------------------
     TESTIMONIALS CAROUSEL
     ------------------------------------------------------ */
  (function initCarousel() {
    var track = document.getElementById("carouselTrack");
    if (!track) return;
    var slides = Array.prototype.slice.call(track.children);
    var dotsWrap = document.getElementById("carouselDots");
    var prev = document.getElementById("prevSlide");
    var next = document.getElementById("nextSlide");
    var index = 0, timer = null;

    slides.forEach(function (_, i) {
      var dot = document.createElement("button");
      dot.className = "carousel__dot";
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", "Testimonial " + (i + 1));
      dot.addEventListener("click", function () { go(i, true); });
      dotsWrap.appendChild(dot);
    });
    var dots = Array.prototype.slice.call(dotsWrap.children);

    function go(i, user) {
      index = (i + slides.length) % slides.length;
      slides.forEach(function (s, j) {
        s.classList.toggle("is-active", j === index);
        s.setAttribute("aria-hidden", j === index ? "false" : "true");
      });
      dots.forEach(function (d, j) {
        d.classList.toggle("is-active", j === index);
        d.setAttribute("aria-selected", j === index ? "true" : "false");
      });
      if (user) restart();
      track.style.minHeight = slides[index].offsetHeight + "px";
    }
    function restart() {
      if (timer) clearInterval(timer);
      if (!prefersReducedMotion) timer = setInterval(function () { go(index + 1); }, 6500);
    }
    prev.addEventListener("click", function () { go(index - 1, true); });
    next.addEventListener("click", function () { go(index + 1, true); });
    window.addEventListener("resize", function () { go(index); });
    go(0);
    restart();
  })();

  /* ------------------------------------------------------
     CHARTER — destination filter
     ------------------------------------------------------ */
  (function initCharterFilter() {
    var filters = document.getElementById("charterFilters");
    var grid = document.getElementById("charterGrid");
    if (!filters || !grid) return;
    var chips = Array.prototype.slice.call(filters.querySelectorAll(".chip"));
    var cards = Array.prototype.slice.call(grid.querySelectorAll(".ccard"));

    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        var region = chip.getAttribute("data-region");
        chips.forEach(function (c) {
          var active = c === chip;
          c.classList.toggle("is-active", active);
          c.setAttribute("aria-selected", active ? "true" : "false");
        });
        cards.forEach(function (card) {
          var show = region === "all" || card.getAttribute("data-region") === region;
          card.classList.toggle("is-hidden", !show);
        });
      });
    });
  })();

  /* ------------------------------------------------------
     FORMS — inline validation + mailto handoff
     ------------------------------------------------------ */
  function wireForm(formId, statusId, subject) {
    var form = document.getElementById(formId);
    if (!form) return;
    var status = document.getElementById(statusId);

    function validateField(input) {
      var field = input.closest(".field");
      if (!field) return input.checkValidity();
      var error = field.querySelector(".field__error");
      var valid = input.checkValidity();
      field.classList.toggle("has-error", !valid);
      if (error) error.hidden = valid;
      return valid;
    }
    form.querySelectorAll("input[required], textarea[required]").forEach(function (input) {
      input.addEventListener("blur", function () { validateField(input); });
      input.addEventListener("input", function () {
        var f = input.closest(".field");
        if (f && f.classList.contains("has-error")) validateField(input);
      });
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var inputs = form.querySelectorAll("input[required], textarea[required]");
      var firstInvalid = null;
      inputs.forEach(function (input) {
        if (!validateField(input) && !firstInvalid) firstInvalid = input;
      });
      if (firstInvalid) { firstInvalid.focus(); return; }

      var lines = [];
      form.querySelectorAll("input, select, textarea").forEach(function (el) {
        if (!el.name || !el.value) return;
        var label = el.closest(".field") && el.closest(".field").querySelector("label");
        var key = label ? label.textContent.trim() : el.name;
        lines.push(key + ": " + el.value.trim());
      });
      var name = (form.querySelector("[name=name]") || {}).value || "";
      window.location.href =
        "mailto:brokers@asyachts.com" +
        "?subject=" + encodeURIComponent(subject + (name ? " — " + name : "")) +
        "&body=" + encodeURIComponent(lines.join("\n"));
      status.textContent = "Opening your email client… if nothing happens, write to brokers@asyachts.com directly.";
      status.classList.add("is-success");
    });
  }
  wireForm("contactForm", "formStatus", "Private Consultation Request");
  wireForm("valuationForm", "valuationStatus", "Valuation Request");

  /* ------------------------------------------------------
     SCROLL PROGRESS BEAM
     ------------------------------------------------------ */
  (function initBeam() {
    var beam = document.getElementById("scrollbeam");
    if (!beam) return;
    var ticking = false;
    function update() {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      var p = max > 0 ? h.scrollTop / max : 0;
      beam.style.transform = "scaleX(" + p.toFixed(4) + ")";
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  })();

  /* ------------------------------------------------------
     Footer year
     ------------------------------------------------------ */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
