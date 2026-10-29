// Choix de la langue : chargé dans <head>, juste après les <link rel="alternate" hreflang>.
// 1. Si le visiteur a déjà cliqué sur un drapeau, on respecte ce choix.
// 2. Sinon, à la première page vue de la session, on suit la langue du navigateur
//    (français, anglais ou espagnol ; anglais par défaut pour les autres langues).
(function () {
  "use strict";

  var SUPPORTED = ["fr", "en", "es"];
  var FALLBACK = "en";

  function get(store, key) {
    try { return window[store].getItem(key); } catch (e) { return null; }
  }
  function set(store, key, value) {
    try { window[store].setItem(key, value); } catch (e) { /* stockage indisponible */ }
  }

  var current = (document.documentElement.lang || "fr").slice(0, 2);
  var alternates = {};
  document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(function (link) {
    alternates[link.hreflang] = link.href;
  });

  function browserLang() {
    var prefs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ""];
    for (var i = 0; i < prefs.length; i++) {
      var code = String(prefs[i]).slice(0, 2).toLowerCase();
      if (SUPPORTED.indexOf(code) !== -1) return code;
    }
    return FALLBACK;
  }

  var chosen = get("localStorage", "lang");
  var target = null;
  if (SUPPORTED.indexOf(chosen) !== -1) {
    target = chosen;
  } else if (!get("sessionStorage", "langAuto")) {
    set("sessionStorage", "langAuto", "1");
    target = browserLang();
  }

  if (target && target !== current && alternates[target]) {
    location.replace(alternates[target] + location.hash);
    return;
  }

  // Un clic sur un drapeau mémorise la langue choisie
  document.addEventListener("click", function (e) {
    var link = e.target.closest && e.target.closest(".lang-switch a[data-lang]");
    if (link) set("localStorage", "lang", link.getAttribute("data-lang"));
  });
})();
