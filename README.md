# 🌺 Recuerdos de los XV de Skarlet

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub_Pages-222222?style=for-the-badge&logo=github&logoColor=white)](https://pages.github.com/)

**Recuerdos de los XV de Skarlet** es una experiencia web conmemorativa creada para conservar y compartir los momentos de los XV años de **Skarlet Guadalupe**, celebrados el **23 de mayo de 2026**.

El proyecto combina fotografías, música, animaciones, historia familiar y recuerdos de la celebración en una interfaz inspirada en elementos visuales mexicanos, especialmente el traje de charra, el papel picado y el bordado tradicional.

Actualmente la aplicación se encuentra en modo **`memories`**, por lo que funciona como un sitio posterior al evento y no como un sistema de confirmación de asistencia.

---

## ✨ Experiencia

El sitio está diseñado como un recorrido vertical por distintos momentos de la celebración:

- Pantalla de bienvenida animada.
- Portada principal responsive.
- Cuenta regresiva adaptada al estado del evento.
- Selección de recuerdos destacados.
- Galería fotográfica interactiva.
- Mensaje especial de Skarlet.
- Línea del tiempo personal.
- Sección dedicada a la familia.
- Recuerdo de ceremonia y recepción.
- Sección del vals.
- Hashtag oficial e integración con Instagram.
- Muro de mensajes conmemorativos.
- Reproductor de música opcional.
- Elementos decorativos de papel picado.
- Animaciones y efectos visuales con soporte de accesibilidad.

---

## 🎨 Diseño

La identidad visual utiliza una estética mexicana elegante y celebratoria, con especial atención a:

- Ornamentación inspirada en bordado tradicional.
- Papel picado y motivos festivos.
- Tipografía y composición pensadas para fotografía.
- Transiciones suaves y microinteracciones.
- Diseño mobile-first y adaptable a pantallas grandes.
- Respeto por la preferencia de movimiento reducido del usuario.

---

## 🖼️ Galería

La galería fue desarrollada como una experiencia interactiva y permite recorrer los recuerdos mediante:

- Controles visuales.
- Navegación por teclado.
- Interacciones táctiles.
- Diseño responsive.
- Presentación optimizada para fotografías verticales y horizontales.

Los originales de alta calidad pueden mantenerse fuera del despliegue público mediante las carpetas de archivo incluidas en el repositorio.

---

## 🎵 Música

El sitio incluye un reproductor de música integrado.

La reproducción es opcional y se inicia únicamente mediante interacción del visitante, evitando reproducción automática invasiva y respetando las políticas modernas de los navegadores.

---

## ♿ Accesibilidad

La experiencia contempla distintos aspectos de accesibilidad:

- Soporte para `prefers-reduced-motion` mediante Framer Motion.
- Navegación por teclado en componentes interactivos.
- Estructura semántica.
- Controles visibles para acciones principales.
- Interfaz adaptable a móvil, tablet y escritorio.
- Posibilidad de entrar a la experiencia sin depender de animaciones complejas.

---

## 🔐 Privacidad

Este proyecto funciona como un sitio conmemorativo estático.

No implementa formularios de RSVP ni solicita datos como:

- Nombre de invitados.
- Teléfono.
- Correo electrónico.
- Restricciones alimentarias.
- Confirmaciones de asistencia.

Los mensajes visibles dentro de la experiencia son contenido previamente definido dentro del proyecto.

> Al tratarse de un repositorio público con material conmemorativo, cualquier fotografía o dato personal incorporado a `public/` debe considerarse públicamente accesible una vez desplegado.

---

## 🛠️ Stack tecnológico

| Tecnología | Uso |
|---|---|
| React 19 | Interfaz y composición de componentes |
| TypeScript | Tipado estático |
| Vite 6 | Desarrollo y build |
| Tailwind CSS 4 | Sistema visual y estilos |
| Framer Motion | Animaciones y transiciones |
| Lucide React | Iconografía |
| Canvas Confetti | Efectos de celebración |
| GitHub Actions | Validación y despliegue |
| GitHub Pages | Hosting estático |

---

## 🧩 Arquitectura

```text
.
├── App.tsx
├── components/
│   ├── WelcomeScreen.tsx
│   ├── Hero.tsx
│   ├── Countdown.tsx
│   ├── MemoryHighlights.tsx
│   ├── Gallery.tsx
│   ├── MensajeSkarlet.tsx
│   ├── Timeline.tsx
│   ├── Parents.tsx
│   ├── Events.tsx
│   ├── Vals.tsx
│   ├── Hashtag.tsx
│   ├── LoveWall.tsx
│   ├── MusicPlayer.tsx
│   └── PapelPicado.tsx
├── lib/
│   └── invitation.ts
├── public/
│   ├── images/
│   └── music/
├── archive/
├── styles.css
├── vite.config.ts
└── .github/workflows/
    └── build-and-deploy.yml
```

### Configuración central

`lib/invitation.ts` concentra la información principal utilizada por la experiencia, entre ella:

- Nombre de la festejada.
- Estado del sitio.
- Fecha del evento.
- Hashtag.
- Instagram.
- Mensaje conmemorativo.
- Información de ceremonia y recepción.

Esto permite modificar datos importantes sin tener que distribuirlos entre múltiples componentes.

---

## 🚀 Desarrollo local

### Requisitos

- Node.js 20 o superior.
- npm.

### Instalación

```bash
git clone https://github.com/Joseluiscruz-hub/https-github.com-Joseluiscruz-hub-Skarleth-Mis-15-A-os.git
cd https-github.com-Joseluiscruz-hub-Skarleth-Mis-15-A-os
npm ci
```

### Ejecutar en desarrollo

```bash
npm run dev
```

Vite inicia el servidor local, configurado en el proyecto para utilizar el puerto `3000`.

---

## ✅ Validación

Antes de publicar cambios puede ejecutarse:

```bash
npm run check
```

Este comando ejecuta:

```bash
npm run typecheck
npm run build
```

De esta manera se valida TypeScript y posteriormente se genera el build de producción.

---

## 📦 Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia Vite en modo desarrollo |
| `npm run build` | Genera el build de producción |
| `npm run preview` | Previsualiza el build |
| `npm run typecheck` | Valida tipos con TypeScript |
| `npm run check` | Ejecuta typecheck + build |

---

## 🌐 Despliegue

El repositorio contiene un workflow de GitHub Actions en:

```text
.github/workflows/build-and-deploy.yml
```

Cada actualización enviada a `main` ejecuta automáticamente:

1. Checkout del repositorio.
2. Configuración de Node.js 20.
3. `npm ci`.
4. `npm run check`.
5. Publicación de `dist/` en GitHub Pages.

La ruta base de Vite está configurada específicamente para este repositorio:

```text
/https-github.com-Joseluiscruz-hub-Skarleth-Mis-15-A-os/
```

---

## 📌 Estado del proyecto

**Estado:** Conmemorativo / post-evento

La celebración ocurrió el **sábado 23 de mayo de 2026** y el sitio se conserva como una experiencia digital de recuerdos.

---

## 💡 Posibles mejoras futuras

- Optimización adicional de imágenes con formatos AVIF/WebP.
- Generación automática de thumbnails.
- Precarga inteligente de fotografías visibles.
- Modo PWA para conservar una copia offline.
- Álbum privado protegido por acceso si se desea restringir fotografías familiares.
- Metadatos Open Graph personalizados para compartir el sitio.
- Auditorías automáticas Lighthouse en CI.

---

## 👨‍💻 Desarrollo

Proyecto creado y mantenido por **José Luis Cruz Prieto**.

Construido como una experiencia digital para conservar un momento familiar especial más allá del día de la celebración.
