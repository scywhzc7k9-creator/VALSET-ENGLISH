/* ==========================================================================
   VALSET ENGLISH — exercises.js
   Renderiza y evalúa los ejercicios interactivos por nivel MCER.
   ========================================================================== */
(function () {
  "use strict";

  const LEVEL_ORDER = ["a1", "a2", "b1"];
  let current = "a1";
  let score = { correct: 0, answered: 0 };

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function updateScoreboard() {
    const total = score.answered;
    document.querySelector("[data-score-correct]").textContent = score.correct;
    document.querySelector("[data-score-total]").textContent = total;
    const pct = total ? Math.round((score.correct / total) * 100) : 0;
    document.querySelector("[data-score-pct]").textContent = pct + "%";
    window.ValsetProgress.saveScore(current, score.correct, total);
  }

  function buildMC(ex, index) {
    const card = document.createElement("div");
    card.className = "exercise-card";
    const options = shuffle(ex.options);
    card.innerHTML = `
      <span class="exercise-kind">Opción múltiple · Ejercicio ${index}</span>
      <p><strong>${ex.q}</strong></p>
      <div class="opt-list"></div>
      <div class="feedback" aria-live="polite"></div>
    `;
    const list = card.querySelector(".opt-list");
    const feedback = card.querySelector(".feedback");
    let answered = false;
    options.forEach(opt => {
      const b = document.createElement("button");
      b.type = "button"; b.className = "opt"; b.textContent = opt;
      b.addEventListener("click", () => {
        if (answered) return;
        answered = true;
        score.answered++;
        const ok = opt === ex.answer;
        b.classList.add(ok ? "correct" : "incorrect");
        if (ok) score.correct++;
        else { list.querySelectorAll(".opt").forEach(o => { if (o.textContent === ex.answer) o.classList.add("correct"); }); }
        list.querySelectorAll(".opt").forEach(o => o.disabled = true);
        feedback.textContent = ok ? "¡Correcto!" : `Incorrecto. Respuesta correcta: ${ex.answer}`;
        feedback.className = "feedback " + (ok ? "ok" : "bad");
        updateScoreboard();
      });
      list.appendChild(b);
    });
    return card;
  }

  function buildFill(ex, index) {
    const card = document.createElement("div");
    card.className = "exercise-card";
    card.innerHTML = `
      <span class="exercise-kind">Completa la oración · Ejercicio ${index}</span>
      <p><strong>${ex.sentence.replace("___", "____")}</strong></p>
      <p class="progress-label">Pista: ${ex.hint}</p>
      <div class="fill-row">
        <input type="text" autocomplete="off" spellcheck="false" aria-label="Tu respuesta" placeholder="Escribe tu respuesta">
        <button type="button" class="btn btn-sm btn-primary">Comprobar</button>
      </div>
      <div class="feedback" aria-live="polite"></div>
    `;
    const input = card.querySelector("input");
    const btn = card.querySelector("button");
    const feedback = card.querySelector(".feedback");
    let answered = false;
    function check() {
      if (answered || !input.value.trim()) return;
      answered = true;
      score.answered++;
      const ok = input.value.trim().toLowerCase() === ex.answer.toLowerCase();
      if (ok) score.correct++;
      input.classList.add(ok ? "correct" : "incorrect");
      input.disabled = true; btn.disabled = true;
      feedback.textContent = ok ? "¡Correcto!" : `Incorrecto. Respuesta correcta: "${ex.answer}"`;
      feedback.className = "feedback " + (ok ? "ok" : "bad");
      updateScoreboard();
    }
    btn.addEventListener("click", check);
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") check(); });
    return card;
  }

  function buildMatch(ex, index) {
    const card = document.createElement("div");
    card.className = "exercise-card";
    card.innerHTML = `
      <span class="exercise-kind">Relacionar · Ejercicio ${index}</span>
      <p><strong>${ex.title}</strong></p>
      <div class="match-grid">
        <div data-col="en"></div>
        <div data-col="es"></div>
      </div>
      <div class="feedback" aria-live="polite"></div>
    `;
    const colEn = card.querySelector('[data-col="en"]');
    const colEs = card.querySelector('[data-col="es"]');
    const feedback = card.querySelector(".feedback");
    const enItems = shuffle(ex.pairs.map(p => p[0]));
    const esItems = shuffle(ex.pairs.map(p => p[1]));
    const map = Object.fromEntries(ex.pairs);
    let selectedEn = null;
    let pairedCount = 0;

    enItems.forEach(word => {
      const b = document.createElement("button");
      b.type = "button"; b.className = "match-item"; b.textContent = word; b.dataset.word = word;
      b.addEventListener("click", () => {
        if (b.classList.contains("paired")) return;
        card.querySelectorAll('[data-col="en"] .match-item').forEach(x => x.classList.remove("selected"));
        selectedEn = b; b.classList.add("selected");
      });
      colEn.appendChild(b);
    });
    esItems.forEach(word => {
      const b = document.createElement("button");
      b.type = "button"; b.className = "match-item"; b.textContent = word; b.dataset.word = word;
      b.addEventListener("click", () => {
        if (b.classList.contains("paired") || !selectedEn) return;
        const correct = map[selectedEn.dataset.word] === word;
        if (correct) {
          selectedEn.classList.remove("selected"); selectedEn.classList.add("paired");
          b.classList.add("paired");
          pairedCount++;
          score.correct++; score.answered++;
          selectedEn = null;
          if (pairedCount === ex.pairs.length) {
            feedback.textContent = "¡Excelente! Relacionaste todas las palabras.";
            feedback.className = "feedback ok";
          }
          updateScoreboard();
        } else {
          b.classList.add("wrong");
          setTimeout(() => b.classList.remove("wrong"), 300);
          score.answered++;
          updateScoreboard();
        }
      });
      colEs.appendChild(b);
    });
    return card;
  }

  function render(levelId) {
    current = levelId;
    score = { correct: 0, answered: 0 };
    document.querySelectorAll("[data-level-pill]").forEach(p => {
      p.classList.toggle("active", p.dataset.levelPill === levelId);
    });
    const wrap = document.querySelector("[data-exercise-list]");
    wrap.innerHTML = "";
    const items = VALSET_DATA.exercises[levelId] || [];
    let mc = 0, fill = 0, match = 0;
    items.forEach(ex => {
      let card;
      if (ex.type === "mc") card = buildMC(ex, ++mc + (fill + match));
      else if (ex.type === "fill") card = buildFill(ex, ++fill + (mc + match));
      else if (ex.type === "match") card = buildMatch(ex, ++match + (mc + fill));
      if (card) { card.classList.add("reveal"); wrap.appendChild(card); requestAnimationFrame(() => card.classList.add("in")); }
    });
    updateScoreboard();
  }

  window.initExercisesPage = function () {
    document.querySelectorAll("[data-level-pill]").forEach(p => {
      p.addEventListener("click", () => render(p.dataset.levelPill));
    });
    const initial = new URLSearchParams(location.search).get("nivel");
    render(LEVEL_ORDER.includes(initial) ? initial : "a1");
  };
})();
