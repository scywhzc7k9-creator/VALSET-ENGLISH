import { auth } from "./firebase-config.js";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

const form = document.getElementById("login-form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const message = document.getElementById("login-message");
const submit = document.getElementById("login-submit");
const reset = document.getElementById("reset-password");
const toggle = document.getElementById("toggle-password");

const params = new URLSearchParams(window.location.search);
const next = params.get("next");
const safeNext = next && next.startsWith("/") && !next.startsWith("//") ? next : "index.html";

function setMessage(text, type = "error") {
  message.textContent = text;
  message.dataset.type = type;
  message.hidden = !text;
}

function friendlyError(code) {
  const errors = {
    "auth/invalid-credential": "Correo o contraseña incorrectos.",
    "auth/invalid-email": "Escribe un correo electrónico válido.",
    "auth/user-disabled": "Esta cuenta está deshabilitada. Contacta a tu docente.",
    "auth/too-many-requests": "Demasiados intentos. Espera unos minutos e inténtalo nuevamente.",
    "auth/network-request-failed": "No se pudo conectar. Revisa tu conexión a internet."
  };
  return errors[code] || "No fue posible iniciar sesión. Inténtalo nuevamente.";
}

onAuthStateChanged(auth, (user) => {
  if (user) window.location.replace(safeNext);
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  setMessage("");
  submit.disabled = true;
  submit.textContent = "Verificando…";
  try {
    await signInWithEmailAndPassword(auth, email.value.trim(), password.value);
    window.location.replace(safeNext);
  } catch (error) {
    setMessage(friendlyError(error.code));
  } finally {
    submit.disabled = false;
    submit.textContent = "Iniciar sesión";
  }
});

reset.addEventListener("click", async () => {
  const address = email.value.trim();
  if (!address) {
    setMessage("Escribe tu correo para enviarte el enlace de recuperación.");
    email.focus();
    return;
  }
  reset.disabled = true;
  try {
    await sendPasswordResetEmail(auth, address);
    setMessage("Revisa tu correo. Firebase envió un enlace para restablecer tu contraseña.", "success");
  } catch (error) {
    setMessage(friendlyError(error.code));
  } finally {
    reset.disabled = false;
  }
});

toggle.addEventListener("click", () => {
  const visible = password.type === "text";
  password.type = visible ? "password" : "text";
  toggle.textContent = visible ? "Mostrar" : "Ocultar";
  toggle.setAttribute("aria-pressed", String(!visible));
});
