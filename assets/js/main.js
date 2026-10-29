// Interactions communes à toutes les pages.
(function () {
  "use strict";

  // Menu mobile
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      links.classList.toggle("open", !open);
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        toggle.setAttribute("aria-expanded", "false");
        links.classList.remove("open");
      }
    });
  }

  // Lien actif (repli si aria-current n'est pas déjà dans le HTML)
  var page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(function (a) {
    if (a.getAttribute("href") === page) a.setAttribute("aria-current", "page");
  });

  // Apparition douce au défilement
  var revealed = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealed.forEach(function (el) { io.observe(el); });
  } else {
    revealed.forEach(function (el) { el.classList.add("in"); });
  }

  // Petite notification
  var toast = document.createElement("div");
  toast.className = "toast";
  toast.setAttribute("role", "status");
  toast.setAttribute("aria-live", "polite");
  document.body.appendChild(toast);
  var toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("show"); }, 2200);
  }

  // Copier l'adresse mail
  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var value = btn.getAttribute("data-copy");
      var label = { en: "Address copied: ", es: "Dirección copiada: " }[document.documentElement.lang] || "Adresse copiée : ";
      var done = function () { showToast(label + value); };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(value).then(done, function () { fallbackCopy(value); done(); });
      } else {
        fallbackCopy(value);
        done();
      }
    });
  });
  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "absolute";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch (e) { /* rien */ }
    document.body.removeChild(ta);
  }

  // Filtres de publications (accepte aussi #memoires, #articles, #autres dans l'URL)
  var filters = document.querySelectorAll(".filter");
  var pubs = document.querySelectorAll(".pub");
  function applyFilter(type) {
    filters.forEach(function (f) {
      f.setAttribute("aria-pressed", String(f.dataset.filter === type));
    });
    pubs.forEach(function (p) {
      p.hidden = !(type === "tous" || p.dataset.type === type);
    });
    document.querySelectorAll("[data-group]").forEach(function (g) {
      g.hidden = !(type === "tous" || g.dataset.group === type);
    });
  }
  if (filters.length) {
    filters.forEach(function (f) {
      f.addEventListener("click", function () {
        applyFilter(f.dataset.filter);
        history.replaceState(null, "", f.dataset.filter === "tous" ? location.pathname : "#" + f.dataset.filter);
      });
    });
    var hash = location.hash.replace("#", "");
    if (["memoires", "articles", "autres"].indexOf(hash) !== -1) applyFilter(hash);
  }

  // Bouton retour en haut
  var toTop = document.querySelector(".to-top");
  if (toTop) {
    window.addEventListener("scroll", function () {
      toTop.classList.toggle("visible", window.scrollY > 500);
    }, { passive: true });
    toTop.addEventListener("click", function () { window.scrollTo({ top: 0 }); });
  }

})();
