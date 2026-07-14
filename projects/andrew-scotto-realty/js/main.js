/* =========================================================
   Andrew Scotto | Douglas Elliman — interactions
   - Apple-style scroll-scrubbed hero video (GSAP ScrollTrigger)
   - Transparent → solid navigation
   - Scroll reveals, stat counters, testimonial carousel
   - Leaflet service-area map
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
     HERO VIDEO — remote fallback when local asset is absent
     ------------------------------------------------------ */
  var REMOTE_HERO_URL =
    "https://d8j0ntlcm91z4.cloudfront.net/user_3GIGRwFkw7yyzrAmJxMkkQFlLZP/hf_20260714_135642_55558543-6c58-47e0-b1d1-e032b1111a69.mp4";

  var hero = document.getElementById("hero");
  var video = document.getElementById("heroVideo");
  var triedRemote = false;

  function useRemoteSource() {
    if (triedRemote) return;
    triedRemote = true;
    video.innerHTML = "";
    video.src = REMOTE_HERO_URL;
    video.load();
    // Last resort: no video at all — collapse to a static hero so the
    // headline and CTA still render over the navy backdrop.
    setTimeout(function () {
      if (video.readyState === 0) staticHero();
    }, 2500);
  }
  video.addEventListener("error", useRemoteSource);
  var localSource = document.getElementById("heroSourceLocal");
  if (localSource) localSource.addEventListener("error", useRemoteSource);
  // Safety net: if metadata never arrives, swap to remote.
  setTimeout(function () {
    if (video.readyState === 0) useRemoteSource();
  }, 1500);

  /* ------------------------------------------------------
     HERO SCRUB — video.currentTime follows scroll progress,
     smoothed with a lerp so seeks feel fluid.
     ------------------------------------------------------ */
  var captions = [
    document.querySelector(".hero__caption--1"),
    document.querySelector(".hero__caption--2"),
    document.querySelector(".hero__caption--3")
  ];

  function staticHero() {
    hero.classList.add("hero--static");
    video.loop = true;
    video.autoplay = true;
    var p = video.play();
    if (p && p.catch) p.catch(function () {});
    captions.forEach(function (c, i) {
      if (!c) return;
      c.style.opacity = i === 2 ? "1" : "0";
      c.style.transform = "none";
    });
    if (hasGSAP) ScrollTrigger.refresh();
  }

  function initScrubHero() {
    var duration = video.duration;
    if (!duration || !isFinite(duration)) { staticHero(); return; }

    var targetTime = 0;
    var currentTime = 0;
    var rafId = null;

    function tick() {
      var delta = targetTime - currentTime;
      if (Math.abs(delta) > 0.004) {
        // Never issue a new seek while the previous one is still resolving —
        // stacked seeks are the main source of visible scrub jank.
        if (!video.seeking) {
          currentTime += delta * 0.18;
          try { video.currentTime = currentTime; } catch (e) {}
        }
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = null;
      }
    }
    function requestTick() {
      if (rafId === null) rafId = requestAnimationFrame(tick);
    }

    ScrollTrigger.create({
      trigger: hero,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: function (self) {
        targetTime = self.progress * (duration - 0.06);
        requestTick();

        // Caption choreography by progress band
        setCaption(self.progress);
      }
    });

    var activeCaption = -1;
    function setCaption(progress) {
      var idx = progress < 0.3 ? 0 : progress < 0.68 ? 1 : 2;
      if (idx === activeCaption) return;
      activeCaption = idx;
      captions.forEach(function (c, i) {
        if (!c) return;
        gsap.to(c, {
          opacity: i === idx ? 1 : 0,
          y: i === idx ? 0 : 24,
          duration: 0.55,
          ease: "power2.out",
          overwrite: true
        });
      });
    }
    setCaption(0);

    // Hide scroll cue once the story begins
    gsap.to(".hero__scrollcue", {
      opacity: 0,
      scrollTrigger: { trigger: hero, start: "5% top", end: "12% top", scrub: true }
    });

    // Ensure first frame is painted
    try { video.currentTime = 0.001; } catch (e) {}
  }

  if (prefersReducedMotion || !hasGSAP) {
    if (video.readyState >= 1) staticHero();
    else video.addEventListener("loadedmetadata", staticHero, { once: true });
  } else if (video.readyState >= 1) {
    initScrubHero();
  } else {
    video.addEventListener("loadedmetadata", initScrubHero, { once: true });
  }

  /* ------------------------------------------------------
     NAVIGATION — transparent over hero, solid after
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

  /* ------------------------------------------------------
     SCROLL REVEALS — staggered fade-up per section
     ------------------------------------------------------ */
  if (hasGSAP && !prefersReducedMotion) {
    var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
    // Group by section so siblings stagger together
    var groups = new Map();
    revealEls.forEach(function (el) {
      var section = el.closest("section") || document.body;
      if (!groups.has(section)) groups.set(section, []);
      groups.get(section).push(el);
    });
    groups.forEach(function (els) {
      gsap.fromTo(
        els,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.09,
          scrollTrigger: { trigger: els[0], start: "top 82%" }
        }
      );
    });
  } else {
    // No GSAP / reduced motion: show everything
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.style.opacity = "1";
      el.style.transform = "none";
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
        var end = parseInt(el.getAttribute("data-count"), 10) || 0;
        if (prefersReducedMotion) { el.textContent = end; return; }
        var startTs = null;
        var durationMs = 1400;
        function step(ts) {
          if (!startTs) startTs = ts;
          var t = Math.min((ts - startTs) / durationMs, 1);
          var eased = 1 - Math.pow(1 - t, 3);
          el.textContent = Math.round(end * eased);
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
    var index = 0;
    var timer = null;

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
      // Keep track height in sync with active slide
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
     SERVICE AREA MAP (Leaflet + CARTO light tiles)
     ------------------------------------------------------ */
  (function initMap() {
    var mapEl = document.getElementById("map");
    var fallback = document.getElementById("mapFallback");
    if (!mapEl) return;
    if (typeof window.L === "undefined") {
      mapEl.hidden = true;
      fallback.hidden = false;
      return;
    }
    try {
      var map = L.map(mapEl, {
        center: [25.83, -80.19],
        zoom: 11,
        scrollWheelZoom: false,
        zoomControl: true
      });
      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 19
      }).addTo(map);

      var chips = Array.prototype.slice.call(
        document.querySelectorAll("#areaChips li")
      );
      var markers = {};
      chips.forEach(function (chip) {
        var lat = parseFloat(chip.getAttribute("data-lat"));
        var lng = parseFloat(chip.getAttribute("data-lng"));
        var name = chip.textContent.trim();
        var marker = L.marker([lat, lng], {
          icon: L.divIcon({ className: "area-marker", iconSize: [14, 14] }),
          title: name,
          alt: name
        }).addTo(map);
        marker.bindPopup("<strong>" + name + "</strong>");
        markers[name] = marker;

        chip.setAttribute("tabindex", "0");
        function focusArea() {
          chips.forEach(function (c) { c.classList.remove("is-active"); });
          chip.classList.add("is-active");
          map.flyTo([lat, lng], 13, { duration: 0.9 });
          marker.openPopup();
        }
        chip.addEventListener("click", focusArea);
        chip.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); focusArea(); }
        });
      });
    } catch (e) {
      mapEl.hidden = true;
      fallback.hidden = false;
    }
  })();

  /* ------------------------------------------------------
     CONTACT FORM — inline validation + mailto handoff
     ------------------------------------------------------ */
  (function initForm() {
    var form = document.getElementById("contactForm");
    if (!form) return;
    var status = document.getElementById("formStatus");

    function validateField(input) {
      var field = input.closest(".field");
      var error = field.querySelector(".field__error");
      var valid = input.checkValidity();
      field.classList.toggle("has-error", !valid);
      if (error) error.hidden = valid;
      return valid;
    }

    form.querySelectorAll("input[required], textarea[required]").forEach(function (input) {
      input.addEventListener("blur", function () { validateField(input); });
      input.addEventListener("input", function () {
        if (input.closest(".field").classList.contains("has-error")) validateField(input);
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

      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var phone = form.phone.value.trim();
      var interest = form.interest.value;
      var message = form.message.value.trim();

      var body =
        "Name: " + name + "\n" +
        "Email: " + email + "\n" +
        (phone ? "Phone: " + phone + "\n" : "") +
        "Interest: " + interest + "\n\n" + message;

      window.location.href =
        "mailto:andrew.scotto@elliman.com" +
        "?subject=" + encodeURIComponent("Website Inquiry — " + name) +
        "&body=" + encodeURIComponent(body);

      status.textContent = "Opening your email client… If nothing happens, email andrew.scotto@elliman.com directly.";
      status.classList.add("is-success");
    });
  })();

  /* ------------------------------------------------------
     Footer year
     ------------------------------------------------------ */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
