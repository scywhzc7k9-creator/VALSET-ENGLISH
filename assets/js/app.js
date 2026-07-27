/* ==========================================================================
   VALSET ENGLISH — app.js
   Utilidades compartidas: menú móvil, progreso guardado en el navegador,
   pronunciación (Web Speech API) y animaciones de aparición al hacer scroll.
   ========================================================================== */
(function () {
  "use strict";

  /* ---- Menú móvil ---- */
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(a => a.addEventListener("click", () => links.classList.remove("open")));
  }

  /* ---- Progreso del estudiante (localStorage) ---- */
  const STORE_KEY = "valset_progress_v1";

  function loadProgress() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || { topics: {}, exercises: {} }; }
    catch (e) { return { topics: {}, exercises: {} }; }
  }
  function saveProgress(p) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(p)); } catch (e) { /* almacenamiento no disponible */ }
  }
  const Progress = {
    get: loadProgress,
    markTopicDone(levelId, topicId) {
      const p = loadProgress();
      p.topics[levelId] = p.topics[levelId] || {};
      p.topics[levelId][topicId] = true;
      saveProgress(p);
    },
    isTopicDone(levelId, topicId) {
      const p = loadProgress();
      return !!(p.topics[levelId] && p.topics[levelId][topicId]);
    },
    levelCompletion(levelId, totalTopics) {
      const p = loadProgress();
      const done = p.topics[levelId] ? Object.keys(p.topics[levelId]).length : 0;
      return totalTopics ? Math.round((done / totalTopics) * 100) : 0;
    },
    saveScore(levelId, score, total) {
      const p = loadProgress();
      p.exercises[levelId] = { score, total };
      saveProgress(p);
    },
    getScore(levelId) {
      const p = loadProgress();
      return p.exercises[levelId] || null;
    }
  };
  window.ValsetProgress = Progress;

  /* ---- Pronunciación con la API de voz del navegador ---- */
  window.speakEnglish = function (text) {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text.replace(/…/g, ""));
    u.lang = "en-US";
    u.rate = 0.92;
    window.speechSynthesis.speak(u);
  };

  /* ---- Revelar elementos al hacer scroll ---- */
  document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".reveal");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) {
      items.forEach(el => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add("in"); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(el => io.observe(el));
  });

  /* ---- Marca el enlace de navegación activo ---- */
  document.addEventListener("DOMContentLoaded", () => {
    const path = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a[data-nav]").forEach(a => {
      if (a.getAttribute("data-nav") === path) a.classList.add("active");
    });
  });
})();
