/**
 * Velity — Landing interactions
 * Sections: loader, nav, smooth scroll, scroll spy, reveals, form validation
 */

(function () {
  "use strict";

  /* ========== Page loader ========== */
  const pageLoader = document.getElementById("pageLoader");

  function hideLoader() {
    if (!pageLoader) return;
    pageLoader.classList.add("is-hidden");
    setTimeout(function () {
      pageLoader.setAttribute("aria-hidden", "true");
    }, 650);
  }

  if (document.readyState === "complete") {
    hideLoader();
  } else {
    window.addEventListener("load", function () {
      setTimeout(hideLoader, 400);
    });
  }

  /* ========== Year in footer ========== */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ========== Navbar scroll state ========== */
  const siteHeader = document.getElementById("siteHeader");
  const scrollThreshold = 24;

  function updateHeaderScroll() {
    if (!siteHeader) return;
    siteHeader.classList.toggle("is-scrolled", window.scrollY > scrollThreshold);
  }

  updateHeaderScroll();
  window.addEventListener("scroll", updateHeaderScroll, { passive: true });

  /* ========== Mobile menu ========== */
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = navMenu ? navMenu.querySelectorAll(".nav__link") : [];

  function setMenuOpen(open) {
    if (!navToggle || !navMenu) return;
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    navMenu.classList.toggle("is-open", open);
    navToggle.classList.toggle("is-open", open);
    document.body.style.overflow = open ? "hidden" : "";
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      const open = !navMenu.classList.contains("is-open");
      setMenuOpen(open);
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        setMenuOpen(false);
      });
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 900) setMenuOpen(false);
    });
  }

  /* ========== Smooth scroll for anchor links ========== */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const id = this.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  /* ========== Scroll spy — active nav links ========== */
  const sections = document.querySelectorAll("main section[id]");
  const allNavAnchors = document.querySelectorAll('.nav__link[href^="#"]');

  function setActiveNav() {
    const scrollPos = window.scrollY + (siteHeader ? siteHeader.offsetHeight : 80) + 40;
    let current = "";
    sections.forEach(function (sec) {
      if (sec.offsetTop <= scrollPos) current = sec.getAttribute("id") || "";
    });
    allNavAnchors.forEach(function (link) {
      const href = link.getAttribute("href");
      link.classList.toggle("is-active", href === "#" + current);
    });
  }

  window.addEventListener("scroll", setActiveNav, { passive: true });
  setActiveNav();

  /* ========== Reveal on scroll ========== */
  const revealEls = document.querySelectorAll(".reveal");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!reduceMotion && revealEls.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ========== Subtle hero parallax ========== */
  const heroSection = document.querySelector(".hero");
  const heroVisual = document.querySelector(".hero__visual");
  if (!reduceMotion && heroSection && heroVisual) {
    var heroTick = false;
    window.addEventListener(
      "scroll",
      function () {
        if (heroTick) return;
        heroTick = true;
        window.requestAnimationFrame(function () {
          var rect = heroSection.getBoundingClientRect();
          var vh = window.innerHeight || 1;
          if (rect.bottom < 0 || rect.top > vh) {
            heroTick = false;
            return;
          }
          var progress = 1 - (rect.top + rect.height * 0.35) / vh;
          progress = Math.max(0, Math.min(1, progress));
          heroVisual.style.transform = "translateY(" + (progress * 14 - 7).toFixed(2) + "px)";
          heroTick = false;
        });
      },
      { passive: true }
    );
  }

  /* ========== Contact form validation & success ========== */
  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("contactName");
  const emailInput = document.getElementById("contactEmail");
  const typeSelect = document.getElementById("contactType");
  const messageInput = document.getElementById("contactMessage");
  const submitBtn = document.getElementById("contactSubmit");
  const successBox = document.getElementById("formSuccess");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const typeError = document.getElementById("typeError");
  const messageError = document.getElementById("messageError");

  function clearErrors() {
    [nameInput, emailInput, typeSelect, messageInput].forEach(function (el) {
      if (el) el.classList.remove("is-invalid");
    });
    [nameError, emailError, typeError, messageError].forEach(function (el) {
      if (el) el.textContent = "";
    });
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  function validate() {
    clearErrors();
    var ok = true;

    if (nameInput) {
      if (nameInput.value.trim().length < 2) {
        ok = false;
        nameInput.classList.add("is-invalid");
        if (nameError) nameError.textContent = "Please enter your name (at least 2 characters).";
      }
    }

    if (emailInput) {
      if (!isValidEmail(emailInput.value)) {
        ok = false;
        emailInput.classList.add("is-invalid");
        if (emailError) emailError.textContent = "Please enter a valid email address.";
      }
    }

    if (typeSelect) {
      if (!typeSelect.value) {
        ok = false;
        typeSelect.classList.add("is-invalid");
        if (typeError) typeError.textContent = "Please select your user type.";
      }
    }

    if (messageInput) {
      if (messageInput.value.trim().length < 10) {
        ok = false;
        messageInput.classList.add("is-invalid");
        if (messageError) messageError.textContent = "Message should be at least 10 characters.";
      }
    }

    return ok;
  }

  if (form && submitBtn) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validate()) return;

      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";

      window.setTimeout(function () {
        form.classList.add("is-success");
        if (successBox) {
          successBox.removeAttribute("hidden");
        }
        submitBtn.disabled = false;
        submitBtn.textContent = "Send message";
        form.reset();
      }, 650);
    });

    [nameInput, emailInput, typeSelect, messageInput].forEach(function (el) {
      if (!el) return;
      el.addEventListener("input", function () {
        el.classList.remove("is-invalid");
      });
    });
  }
})();
