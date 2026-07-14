/* =========================================================
   AS Yachts — yacht detail page
   Reveals, nav mobile toggle, scroll beam, brochure + form
   (No scroll-scrubbed hero here, so this is standalone.)
   ========================================================= */
(function () {
  "use strict";
  var docEl = document.documentElement;
  docEl.classList.add("js");

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasGSAP = typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";
  if (hasGSAP) gsap.registerPlugin(ScrollTrigger);

  /* mobile nav */
  var nav = document.getElementById("nav");
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");
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

  /* reveals */
  if (hasGSAP && !prefersReducedMotion) {
    var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
    var groups = new Map();
    revealEls.forEach(function (el) {
      var section = el.closest("section") || el.closest("header") || document.body;
      if (!groups.has(section)) groups.set(section, []);
      groups.get(section).push(el);
    });
    groups.forEach(function (els) {
      gsap.fromTo(els,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.09,
          scrollTrigger: { trigger: els[0], start: "top 85%" } });
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.style.opacity = "1"; el.style.transform = "none";
    });
  }

  /* scroll beam */
  (function () {
    var beam = document.getElementById("scrollbeam");
    if (!beam) return;
    var ticking = false;
    function update() {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      beam.style.transform = "scaleX(" + (max > 0 ? (h.scrollTop / max).toFixed(4) : 0) + ")";
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  })();

  /* brochure button — no real PDF, so hand off to the broker */
  var brochureBtn = document.getElementById("brochureBtn");
  if (brochureBtn) {
    brochureBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href =
        "mailto:brokers@asyachts.com?subject=" +
        encodeURIComponent("Aurelia — Brochure Request") +
        "&body=" + encodeURIComponent("Please send me the full brochure for Aurelia (62.5m Benetti).");
    });
  }

  /* viewing form */
  (function () {
    var form = document.getElementById("viewingForm");
    if (!form) return;
    var status = document.getElementById("viewingStatus");
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
      var firstInvalid = null;
      form.querySelectorAll("input[required], textarea[required]").forEach(function (input) {
        if (!validateField(input) && !firstInvalid) firstInvalid = input;
      });
      if (firstInvalid) { firstInvalid.focus(); return; }
      var lines = [];
      form.querySelectorAll("input, textarea").forEach(function (el) {
        if (el.name && el.value) lines.push(el.name + ": " + el.value.trim());
      });
      window.location.href =
        "mailto:brokers@asyachts.com?subject=" +
        encodeURIComponent("Aurelia — Private Viewing Request") +
        "&body=" + encodeURIComponent(lines.join("\n"));
      status.textContent = "Opening your email client… if nothing happens, write to brokers@asyachts.com directly.";
      status.classList.add("is-success");
    });
  })();

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
