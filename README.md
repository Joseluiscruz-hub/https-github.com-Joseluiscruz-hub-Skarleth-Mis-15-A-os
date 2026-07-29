# Recuerdos de los XV de Skarlet

Sitio conmemorativo de los XV años de Skarlet Guadalupe, celebrados el 23 de
mayo de 2026. La experiencia reúne fotografías, música, historia familiar y
momentos de la celebración con una estética mexicana inspirada en el traje de
charra y el bordado tradicional.

## Contenido

- Apertura animada con opción para entrar sin animación.
- Portada responsive y accesible.
- Mensaje de agradecimiento posterior al evento.
- Galería con navegación por teclado, botones y gestos táctiles.
- Línea del tiempo de Skarlet.
- Recuerdo de la ceremonia, recepción y vals.
- Música opcional, sin descarga ni reproducción automática.
- Hashtag e Instagram para reunir fotografías.
- Mensajes conmemorativos curados, sin recopilar datos personales.

## Desarrollo local

Requisitos: Node.js 20 o superior y npm.

```bash
npm ci
npm run dev
```

Vite mostrará la dirección local del proyecto. Para validar tipos y generar la
versión de producción:

```bash
npm run check
```

## Estructura principal

- `lib/invitation.ts`: información central de la celebración.
- `components/`: secciones e interacciones del sitio.
- `public/images/`: fotografías y portada.
- `public/music/`: canciones utilizadas por el reproductor.
- `archive/source-images/`: originales de alta calidad fuera del despliegue.
- `archive/unused-images/`: fotografías conservadas que no carga el sitio.
- `styles.css`: tema, accesibilidad y comportamiento responsive.

## Privacidad

El sitio no solicita confirmaciones, nombres, restricciones alimentarias ni
otros datos personales. Los mensajes visibles son textos conmemorativos
curados dentro del proyecto.

## Publicación

Cada actualización enviada a la rama `main` se valida y publica mediante el
flujo de GitHub Pages incluido en `.github/workflows/build-and-deploy.yml`.
