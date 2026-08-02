import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
  browserLocalPersistence,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const homeUrl = new URL("../../index.html", import.meta.url);

const form = document.querySelector("#login-form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const submitButton = document.querySelector("#login-submit");
const message = document.querySelector("#login-message");
const resetButton = document.querySelector("#reset-password");
const toggleButton = document.querySelector("#toggle-password");

function safeDestination() {
  const value = new URLSearchParams(window.location.search).get("next");
  if (!value || !value.startsWith("/") || value.startsWith("//")) return homeUrl.href;
  return new URL(value, window.location.origin).href;
}

function setMessage(text, type = "info") {
  message.textContent = text;
  message.dataset.type = type;
}

function friendlyError(code) {
  const messages = {
    "auth/invalid-credential": "Correo o contraseña incorrectos.",
    "auth/invalid-email": "Escribe un correo electrónico válido.",
    "auth/missing-password": "Escribe tu contraseña.",
    "auth/too-many-requests": "Se bloquearon temporalmente los intentos. Espera unos minutos.",
    "auth/user-disabled": "Esta cuenta ha sido deshabilitada. Comunícate con tu docente.",
    "auth/network-request-failed": "No fue posible conectar con Firebase. Revisa tu conexión.",
    "auth/unauthorized-domain": "Este dominio todavía no está autorizado en Firebase."
  };
  return messages[code] || "No fue posible iniciar sesión. Verifica tus datos e inténtalo de nuevo.";
}

onAuthStateChanged(auth, (user) => {
  document.documentElement.classList.add("login-ready");
  if (user) window.location.replace(safeDestination());
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  setMessage("");
  submitButton.disabled = true;
  submitButton.textContent = "Verificando…";

  try {
    await setPersistence(auth, browserLocalPersistence);
    await signInWithEmailAndPassword(auth, emailInput.value.trim(), passwordInput.value);
    window.location.replace(safeDestination());
  } catch (error) {
    setMessage(friendlyError(error.code), "error");
    submitButton.disabled = false;
    submitButton.textContent = "Iniciar sesión";
  }
});

resetButton.addEventListener("click", async () => {
  const email = emailInput.value.trim();
  if (!email) {
    setMessage("Escribe primero tu correo para recibir el enlace de recuperación.", "error");
    emailInput.focus();
    return;
  }

  resetButton.disabled = true;
  try {
    await sendPasswordResetEmail(auth, email);
    setMessage("Se envió un enlace de recuperación. Revisa también la carpeta de correo no deseado.", "success");
  } catch (error) {
    setMessage(friendlyError(error.code), "error");
  } finally {
    resetButton.disabled = false;
  }
});

toggleButton.addEventListener("click", () => {
  const visible = passwordInput.type === "text";
  passwordInput.type = visible ? "password" : "text";
  toggleButton.textContent = visible ? "Mostrar" : "Ocultar";
  toggleButton.setAttribute("aria-pressed", String(!visible));
});
