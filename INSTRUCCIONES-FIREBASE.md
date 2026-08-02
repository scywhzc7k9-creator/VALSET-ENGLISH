# Instalación y uso

1. En Firebase Authentication activa **Correo electrónico/contraseña**.
2. En Authentication > Settings > Authorized domains agrega `valset.host` y `scywhzc7k9-creator.github.io`.
3. Crea las cuentas en Authentication > Users > Add user. No hay registro público.
4. Sube el contenido de este proyecto a la raíz del repositorio `VALSET-ENGLISH`, conservando `CNAME` con `valset.host`.
5. Espera el despliegue de GitHub Pages y prueba en una ventana privada.

## Prueba local
No abras los HTML con doble clic. Desde la carpeta ejecuta:

```bash
python3 -m http.server 8000
```

Luego abre `http://localhost:8000/login.html`.

## Seguridad
Firebase Authentication controla la sesión, pero GitHub Pages sigue publicando archivos estáticos. No almacenes contraseñas, datos sensibles, respuestas privadas ni claves administrativas en el repositorio.
