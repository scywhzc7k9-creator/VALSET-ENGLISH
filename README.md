# Valset English 🐉

Espacio de aprendizaje de inglés para **bachillerato técnico**, organizado por niveles del **MCER (A1–B1)**, con vocabulario interactivo, organizadores visuales y ejercicios de práctica.

## 🌐 Publicar en GitHub Pages

1. Crea un repositorio en GitHub (por ejemplo `valset-english`) y sube **todo el contenido de esta carpeta** a la raíz del repositorio (no dentro de una subcarpeta).
2. En GitHub, ve a **Settings → Pages**.
3. En "Source" selecciona la rama `main` (o `master`) y la carpeta `/ (root)`. Guarda.
4. Espera 1–2 minutos; tu sitio quedará publicado en:
   `https://<tu-usuario>.github.io/<nombre-del-repositorio>/`

No necesitas ningún proceso de compilación (build): el sitio es HTML, CSS y JavaScript puros.

## 📁 Estructura del proyecto

```
├── index.html              → Página de inicio (video del docente + ruta de niveles)
├── ejercicios.html         → Sección de ejercicios (opción múltiple, completar, relacionar)
├── niveles/
│   ├── a1.html              → Nivel A1 (Acceso)
│   ├── a2.html              → Nivel A2 (Plataforma)
│   └── b1.html              → Nivel B1 (Umbral)
├── assets/
│   ├── css/styles.css       → Sistema de diseño (colores, tipografía, componentes)
│   ├── js/
│   │   ├── data.js          → ⭐ Todo el contenido: vocabulario, organizadores y ejercicios
│   │   ├── icons.js         → Ilustraciones SVG propias por tema
│   │   ├── vocab.js         → Genera tarjetas de vocabulario y organizadores visuales
│   │   ├── exercises.js     → Lógica de la sección de ejercicios
│   │   └── app.js           → Menú móvil, progreso guardado y pronunciación
│   ├── img/                 → Logo, favicon
│   └── video/                → Video introductorio del docente (comprimido para web)
└── README.md
```

## ✏️ Cómo editar el contenido (sin tocar el diseño)

Casi todo el contenido educativo vive en **`assets/js/data.js`**. Ahí puedes:

- **Agregar o cambiar vocabulario**: edita el arreglo `vocab` de cada tema (`en`, `pos`, `es`, `ex`).
- **Agregar un tema nuevo**: copia un bloque de `topics` dentro de un nivel, cámbiale el `id`, `title`, `intro`, `organizer` y `vocab`. Elige un ícono existente en `icons.js` (`greetings`, `family`, `routine`, `food`, `city`, `tech`, `work`, `tools`, `environment`, `seal`) o crea uno nuevo siguiendo el mismo formato SVG.
- **Editar el organizador visual (mapa mental)**: cambia `organizer.center` (título) y `organizer.branches` (categorías con su lista de palabras). El mapa se dibuja automáticamente.
- **Agregar ejercicios**: en el objeto `exercises`, agrega elementos de tipo `mc` (opción múltiple), `fill` (completar) o `match` (relacionar), siguiendo los ejemplos existentes.

No es necesario tocar el HTML para actualizar el contenido de un nivel ya creado.

## 🖼️ Reemplazar materiales

- **Logo**: reemplaza `assets/img/logo.png` (y `favicon.png` / `apple-touch-icon.png` si quieres actualizar el ícono de pestaña) manteniendo el mismo nombre de archivo.
- **Video introductorio**: reemplaza `assets/video/intro-docente.mp4` manteniendo el nombre. Se recomienda comprimir el video (1280px de ancho, formato MP4/H.264) para que cargue rápido en GitHub Pages.

## ♿ Notas técnicas

- El progreso del estudiante (temas vistos y puntaje de ejercicios) se guarda en el propio navegador (`localStorage`), no requiere servidor ni base de datos.
- El botón 🔊 usa la API de voz del navegador (Web Speech API); funciona mejor en Chrome/Edge.
- El sitio es responsivo (móvil, tablet, escritorio) y respeta la preferencia de "movimiento reducido" del sistema operativo.
