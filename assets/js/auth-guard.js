import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const loginUrl = new URL("../../login.html", import.meta.url);

function showPage() {
  document.documentElement.classList.add("auth-ready");
}

function addSessionControls(user) {
  if (document.querySelector("[data-auth-session]")) return;

  const nav = document.querySelector(".site-header .nav") || document.querySelector(".site-header");
  if (!nav) return;

  const wrapper = document.createElement("div");
  wrapper.className = "auth-session";
  wrapper.dataset.authSession = "";

  const email = document.createElement("span");
  email.className = "auth-session-email";
  email.textContent = user.email || "Usuario autorizado";
  email.title = user.email || "Usuario autorizado";

  const button = document.createElement("button");
  button.type = "button";
  button.className = "auth-logout-button";
  button.textContent = "Cerrar sesión";
  button.addEventListener("click", async () => {
    button.disabled = true;
    try {
      await signOut(auth);
    } finally {
      window.location.replace(loginUrl.href);
    }
  });

  wrapper.append(email, button);
  nav.appendChild(wrapper);
}

onAuthStateChanged(auth, (user) => {
  if (!user) {
    const destination = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    loginUrl.searchParams.set("next", destination);
    window.location.replace(loginUrl.href);
    return;
  }

  addSessionControls(user);
  showPage();
}, () => {
  loginUrl.searchParams.set("error", "auth");
  window.location.replace(loginUrl.href);
});
