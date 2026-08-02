import { auth } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

const isFile = window.location.protocol === "file:";
const path = window.location.pathname;
const inLevels = path.includes("/niveles/");
const loginUrl = inLevels ? "../login.html" : "login.html";

function removeLoader() {
  document.getElementById("auth-loader")?.remove();
  document.documentElement.classList.add("auth-ready");
}

function showLocalNotice() {
  removeLoader();
  const box = document.createElement("div");
  box.className = "local-preview-notice";
  box.innerHTML = `<strong>Vista local:</strong> para probar el acceso usa <code>python3 -m http.server 8000</code> y abre <code>http://localhost:8000</code>.`;
  document.body.prepend(box);
}

function addSessionControls(user) {
  const nav = document.querySelector(".nav");
  if (!nav || document.querySelector(".session-controls")) return;
  const controls = document.createElement("div");
  controls.className = "session-controls";
  controls.innerHTML = `
    <span class="session-email" title="Cuenta activa">${user.email ?? "Usuario"}</span>
    <button type="button" class="session-logout">Cerrar sesión</button>`;
  controls.querySelector(".session-logout").addEventListener("click", async () => {
    await signOut(auth);
    window.location.replace(loginUrl);
  });
  nav.appendChild(controls);
}

if (isFile) {
  window.addEventListener("DOMContentLoaded", showLocalNotice);
} else {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      const next = encodeURIComponent(path + window.location.search + window.location.hash);
      window.location.replace(`${loginUrl}?next=${next}`);
      return;
    }
    removeLoader();
    window.addEventListener("DOMContentLoaded", () => addSessionControls(user), { once: true });
    if (document.readyState !== "loading") addSessionControls(user);
  }, (error) => {
    console.error("Error de autenticación:", error);
    removeLoader();
    alert("No fue posible comprobar la sesión. Recarga la página.");
  });
}
