/**
 * Velity — Interacciones del landing (es-AR)
 * Loader, navegación, scroll suave, scroll spy, revelado al scroll,
 * formulario de contacto con envío real vía EmailJS
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
    navToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
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

  /* ========== EmailJS: configuración del formulario de contacto ==========
   * "The template ID not found" → el TEXT de EMAILJS_TEMPLATE_ID no existe en esta cuenta.
   *   Email Templates → abrí "Contact Us" → pestaña Settings → copiá "Template ID" COMPLETO
   *   (suele ser template_ + letras/números). Pegá acá. Guardá la plantilla (Save) por las dudas.
   * "The service ID not found" → Email Services → Edit Service → copiá Service ID.
   * Public Key: Account → API keys. Todo tiene que ser de la MISMA cuenta.
   * Forzá recarga del JS: Ctrl+Shift+R (a veces el navegador usa script.js viejo en caché).
   */
  const EMAILJS_PUBLIC_KEY = "a_NzqNOyJ3K3PwIeu";
  const EMAILJS_SERVICE_ID = "service_h68ah6l";
  const EMAILJS_TEMPLATE_ID = "template_ejf1qfa";

  /* Inicialización + clave pública también en cada send (evita 400 si init no aplica en algunos entornos) */
  if (typeof emailjs !== "undefined") {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }

  const EMAILJS_SEND_OPTIONS = { publicKey: EMAILJS_PUBLIC_KEY };

  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("contactName");
  const emailInput = document.getElementById("contactEmail");
  const typeSelect = document.getElementById("contactType");
  const messageInput = document.getElementById("contactMessage");
  const submitBtn = document.getElementById("contactSubmit");
  const successBox = document.getElementById("formSuccess");
  const sendErrorBox = document.getElementById("formSendError");
  const sendErrorText = document.getElementById("formSendErrorText");
  const retryBtn = document.getElementById("formRetryButton");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const typeError = document.getElementById("typeError");
  const messageError = document.getElementById("messageError");

  let formIsSending = false;

  function resetSendErrorState() {
    if (!form) return;
    form.classList.remove("is-send-error");
    if (sendErrorBox) sendErrorBox.setAttribute("hidden", "");
  }

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
      if (!nameInput.value.trim()) {
        ok = false;
        nameInput.classList.add("is-invalid");
        if (nameError) nameError.textContent = "El nombre es obligatorio.";
      } else if (nameInput.value.trim().length < 2) {
        ok = false;
        nameInput.classList.add("is-invalid");
        if (nameError) nameError.textContent = "Ingresá tu nombre (al menos 2 letras).";
      }
    }

    if (emailInput) {
      if (!emailInput.value.trim()) {
        ok = false;
        emailInput.classList.add("is-invalid");
        if (emailError) emailError.textContent = "El correo es obligatorio.";
      } else if (!isValidEmail(emailInput.value)) {
        ok = false;
        emailInput.classList.add("is-invalid");
        if (emailError) emailError.textContent = "Ingresá un correo electrónico válido.";
      }
    }

    if (typeSelect) {
      if (!typeSelect.value) {
        ok = false;
        typeSelect.classList.add("is-invalid");
        if (typeError) typeError.textContent = "Elegí tu tipo de usuario.";
      }
    }

    if (messageInput) {
      if (!messageInput.value.trim()) {
        ok = false;
        messageInput.classList.add("is-invalid");
        if (messageError) messageError.textContent = "El mensaje es obligatorio.";
      } else if (messageInput.value.trim().length < 10) {
        ok = false;
        messageInput.classList.add("is-invalid");
        if (messageError) messageError.textContent = "El mensaje tiene que tener al menos 10 caracteres.";
      }
    }

    return ok;
  }

  function getUserTypeLabel() {
    if (!typeSelect) return "";
    var opt = typeSelect.options[typeSelect.selectedIndex];
    return opt ? opt.text.trim() : typeSelect.value;
  }

  if (form && submitBtn) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (formIsSending) return;
      if (!validate()) return;

      resetSendErrorState();

      if (typeof emailjs === "undefined") {
        form.classList.add("is-send-error");
        if (sendErrorBox) sendErrorBox.removeAttribute("hidden");
        if (sendErrorText) {
          sendErrorText.innerHTML =
            "<strong>No se pudo cargar el servicio de envío.</strong> Recargá la página o escribinos a <a href=\"mailto:velity.org@gmail.com\">velity.org@gmail.com</a>.";
        }
        return;
      }

      var nombre = nameInput ? nameInput.value.trim() : "";
      var email = emailInput ? emailInput.value.trim() : "";
      var tipoUsuario = getUserTypeLabel();
      var mensaje = messageInput ? messageInput.value.trim() : "";

      /* Cuerpo del mail: from_name, from_email, user_type, message (+ time).
       * Tu plantilla también usa en asunto/cabeceras: {{title}}, {{name}}, {{email}} */
      const templateParams = {
        from_name: nombre,
        from_email: email,
        user_type: tipoUsuario,
        message: mensaje,
        time: new Date().toLocaleString(),
        title: "Velity — contacto desde la landing",
        name: nombre,
        email: email,
      };

      formIsSending = true;
      submitBtn.disabled = true;
      submitBtn.textContent = "Enviando…";

      emailjs
        .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_SEND_OPTIONS)
        .then(function () {
          form.classList.remove("is-send-error");
          if (sendErrorBox) sendErrorBox.setAttribute("hidden", "");
          form.classList.add("is-success");
          if (successBox) successBox.removeAttribute("hidden");
          form.reset();
        })
        .catch(function (err) {
          /* El mensaje exacto del 400 aparece en consola (EmailJS: err.text o message) */
          var detail = "";
          if (err && typeof err.text === "string") detail = err.text;
          else if (err && err.message) detail = String(err.message);
          console.error("EmailJS:", detail || err);
          form.classList.add("is-send-error");
          if (sendErrorBox) sendErrorBox.removeAttribute("hidden");
          if (sendErrorText) {
            sendErrorText.innerHTML =
              "<strong>No se pudo enviar el mensaje.</strong> Probá de nuevo o escribinos a <a href=\"mailto:velity.org@gmail.com\">velity.org@gmail.com</a>.";
          }
        })
        .finally(function () {
          formIsSending = false;
          submitBtn.disabled = false;
          submitBtn.textContent = "Enviar mensaje";
        });
    });

    if (retryBtn) {
      retryBtn.addEventListener("click", function () {
        resetSendErrorState();
        submitBtn.disabled = false;
        submitBtn.textContent = "Enviar mensaje";
      });
    }

    [nameInput, emailInput, typeSelect, messageInput].forEach(function (el) {
      if (!el) return;
      el.addEventListener("input", function () {
        el.classList.remove("is-invalid");
      });
    });
    if (typeSelect) {
      typeSelect.addEventListener("change", function () {
        typeSelect.classList.remove("is-invalid");
      });
    }
  }
})();
