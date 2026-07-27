/* ==========================================================================
   VALSET ENGLISH — vocab.js
   Genera, para cada página de nivel: encabezado, organizadores visuales
   (mapas mentales en SVG) y tarjetas de vocabulario interactivas.
   ========================================================================== */
(function () {
  "use strict";

  const COLORS = { a1: "#C08A34", a2: "#1F2B3D", b1: "#B8202B" };

  /* ---------- Generador de mapa mental SVG ---------- */
  function buildOrganizerSVG(organizer, accent) {
    const W = 560, H = 380, cx = W / 2, cy = H / 2 + 6;
    const n = organizer.branches.length;
    const Rb = 128; // radio de los nodos de rama
    let svg = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Organizador visual: ${organizer.center.replace(/\n/g, ' ')}">`;

    const branchPositions = [];
    for (let i = 0; i < n; i++) {
      const angle = (-90 + i * (360 / n)) * (Math.PI / 180);
      const bx = cx + Rb * Math.cos(angle);
      const by = cy + Rb * Math.sin(angle) * 0.82;
      branchPositions.push({ angle, bx, by });
    }

    // líneas del centro a cada rama
    branchPositions.forEach(p => {
      svg += `<line x1="${cx}" y1="${cy}" x2="${p.bx}" y2="${p.by}" stroke="${accent}" stroke-width="1.6" stroke-dasharray="2 4" opacity=".7"/>`;
    });

    // nodo central
    const centerLines = organizer.center.split("\n");
    svg += `<circle cx="${cx}" cy="${cy}" r="46" fill="#1C1A17"/>`;
    svg += `<circle cx="${cx}" cy="${cy}" r="46" fill="none" stroke="${accent}" stroke-width="2"/>`;
    centerLines.forEach((line, i) => {
      const dy = (i - (centerLines.length - 1) / 2) * 13;
      svg += `<text x="${cx}" y="${cy + dy + 4}" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="10.5" font-weight="600" fill="#F6F0E4">${escapeXML(line)}</text>`;
    });

    // ramas + items
    branchPositions.forEach((p, i) => {
      const branch = organizer.branches[i];
      const dir = Math.cos(p.angle) >= 0 ? 1 : -1;
      const boxW = 132;
      const boxX = dir === 1 ? p.bx - 6 : p.bx - boxW + 6;
      const itemsH = branch.items.length * 16 + 26;
      const boxY = Math.max(6, Math.min(H - itemsH - 6, p.by - itemsH / 2));

      svg += `<rect x="${boxX}" y="${boxY}" width="${boxW}" height="${itemsH}" rx="7" fill="#FCFAF4" stroke="${accent}" stroke-width="1.4"/>`;
      svg += `<text x="${boxX + boxW / 2}" y="${boxY + 16}" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="8.5" letter-spacing="1" fill="${accent}" font-weight="600">${escapeXML(branch.label.toUpperCase())}</text>`;
      branch.items.forEach((item, j) => {
        svg += `<text x="${boxX + boxW / 2}" y="${boxY + 30 + j * 15.5}" text-anchor="middle" font-family="Work Sans, sans-serif" font-size="11" fill="#1C1A17">${escapeXML(item)}</text>`;
      });
    });

    svg += `</svg>`;
    return svg;
  }

  function escapeXML(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  /* ---------- Tarjeta de vocabulario (flashcard) ---------- */
  function buildFlashcard(item) {
    const wrap = document.createElement("div");
    wrap.className = "flashcard";
    wrap.setAttribute("role", "button");
    wrap.setAttribute("tabindex", "0");
    wrap.setAttribute("aria-label", `Tarjeta: ${item.en}. Toca para ver la traducción.`);
    wrap.innerHTML = `
      <div class="flashcard-inner">
        <div class="flashcard-face front">
          <span class="word">${item.en}</span>
          <span class="pos">${item.pos}</span>
          <button type="button" class="speak-btn" aria-label="Escuchar pronunciación">🔊</button>
        </div>
        <div class="flashcard-face back">
          <span class="word">${item.es}</span>
          <span class="ex">${item.ex}</span>
        </div>
      </div>`;
    wrap.addEventListener("click", (e) => {
      if (e.target.closest(".speak-btn")) return;
      wrap.classList.toggle("flipped");
    });
    wrap.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); wrap.classList.toggle("flipped"); }
    });
    wrap.querySelector(".speak-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      window.speakEnglish && window.speakEnglish(item.en);
    });
    return wrap;
  }

  /* ---------- Render principal de una página de nivel ---------- */
  window.renderLevelPage = function (levelId) {
    const level = VALSET_DATA.levels[levelId];
    if (!level) return;
    const accent = COLORS[levelId];

    // Encabezado
    document.querySelectorAll("[data-level-code]").forEach(el => el.textContent = level.code);
    document.querySelectorAll("[data-level-name]").forEach(el => el.textContent = level.name);
    document.querySelectorAll("[data-level-tagline]").forEach(el => el.textContent = level.tagline);

    const skillsWrap = document.querySelector("[data-level-skills]");
    if (skillsWrap) {
      skillsWrap.innerHTML = "";
      level.skills.forEach(s => {
        const span = document.createElement("span");
        span.className = "tag"; span.textContent = s;
        skillsWrap.appendChild(span);
      });
    }

    updateProgressBar(levelId, level.topics.length);

    // Temas
    const container = document.querySelector("[data-topics]");
    if (!container) return;
    container.innerHTML = "";

    level.topics.forEach((topic, idx) => {
      const section = document.createElement("section");
      section.className = "topic reveal";
      section.id = topic.id;

      const done = window.ValsetProgress.isTopicDone(levelId, topic.id);

      section.innerHTML = `
        <div class="topic-head">
          <div class="topic-icon">${ICONS[topic.icon] || ICONS.seal}</div>
          <div>
            <div class="topic-head-row">
              <div>
                <span class="topic-num">Tema ${String(idx + 1).padStart(2, "0")} / ${String(level.topics.length).padStart(2, "0")}</span>
                <h3>${topic.title}</h3>
              </div>
              <button type="button" class="btn btn-sm ${done ? "btn-primary" : "btn-ghost"} topic-done-btn" data-mark="${topic.id}">
                ${done ? "✓ Completado" : "Marcar como visto"}
              </button>
            </div>
            <p class="lede" style="margin-top:6px">${topic.intro}</p>
          </div>
        </div>

        <div class="topic-columns">
          <div>
            <div class="flash-toolbar">
              <span class="eyebrow">Vocabulario interactivo</span>
              <span class="progress-label">Toca cada tarjeta para traducir · 🔊 para escuchar</span>
            </div>
            <div class="flash-grid" data-flashgrid></div>
          </div>
          <div>
            <div class="organizer">
              <div class="organizer-title">Organizador visual · ${topic.title}</div>
              <div data-organizer></div>
            </div>
          </div>
        </div>
      `;

      const grid = section.querySelector("[data-flashgrid]");
      topic.vocab.forEach(v => grid.appendChild(buildFlashcard(v)));

      section.querySelector("[data-organizer]").innerHTML = buildOrganizerSVG(topic.organizer, accent);

      section.querySelector("[data-mark]").addEventListener("click", (btn) => {
        window.ValsetProgress.markTopicDone(levelId, topic.id);
        const b = section.querySelector("[data-mark]");
        b.textContent = "✓ Completado";
        b.classList.remove("btn-ghost"); b.classList.add("btn-primary");
        updateProgressBar(levelId, level.topics.length);
      });

      container.appendChild(section);
    });
  };

  function updateProgressBar(levelId, total) {
    const pct = window.ValsetProgress.levelCompletion(levelId, total);
    const bar = document.querySelector("[data-progress-bar]");
    const label = document.querySelector("[data-progress-label]");
    if (bar) bar.style.width = pct + "%";
    if (label) label.textContent = `${pct}% completado · ${total} temas en este nivel`;
  }
})();
