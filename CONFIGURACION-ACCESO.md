# Activación del acceso de Valset English

## 1. Firebase Authentication

1. Abre Firebase Console y selecciona **valset-english**.
2. Ve a **Authentication → Sign-in method**.
3. Activa **Correo electrónico/contraseña**.
4. No habilites registro anónimo ni proveedores que no utilizarás.

## 2. Dominios autorizados

En **Authentication → Settings → Authorized domains**, confirma:

- `valset.host`
- `scywhzc7k9-creator.github.io`
- `localhost` (solo para pruebas locales)

## 3. Crear cuentas

En **Authentication → Users → Add user**, crea una cuenta individual con correo y contraseña.
No existe formulario de registro público en el sitio.

## 4. Publicar en el repositorio existente

Sube el contenido de esta carpeta a la raíz del repositorio **VALSET-ENGLISH**. Conserva `CNAME` con `valset.host`.

Los archivos nuevos principales son:

- `login.html`
- `assets/css/login.css`
- `assets/js/firebase-config.js`
- `assets/js/login.js`
- `assets/js/auth-guard.js`

Las páginas existentes ya incluyen `auth-guard.js`.

## 5. Pruebas

1. Abre una ventana privada y visita `https://valset.host`.
2. Debe redirigir a `login.html`.
3. Inicia sesión con una cuenta creada en Firebase.
4. Abre directamente `/niveles/a1.html`; debe permitir el acceso mientras la sesión exista.
5. Pulsa **Cerrar sesión** y vuelve a probar la URL directa.

## Limitación importante

GitHub Pages sirve archivos estáticos públicos. Firebase controla la sesión y la navegación de la aplicación, pero no convierte los archivos del repositorio en archivos privados. No almacenes contraseñas, datos sensibles, respuestas confidenciales ni claves administrativas dentro del proyecto.
