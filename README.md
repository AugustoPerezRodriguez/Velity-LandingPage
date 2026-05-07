# Velity — Landing page

Landing estática y responsive para **Velity**, un ecosistema digital de salud que centraliza historial clínico, recetas, estudios, turnos médicos e interacción paciente–médico.

**Idioma:** interfaz y textos en **español rioplatense (Argentina)** (`lang="es-AR"`), con voseo en imperativos y microcopy (por ejemplo: «Conocé más», «Probalo ahora», «Escribinos»).

## Requisitos

- Navegador moderno (Chrome, Firefox, Safari, Edge).
- Conexión a internet la **primera vez** que cargues la página (solo para cargar la fuente **Inter** desde Google Fonts).

No se necesita Node.js, npm ni servidor para ver el sitio en local.

## Estructura del proyecto

| Archivo       | Descripción |
|---------------|-------------|
| `index.html`  | Marcado semántico, secciones, meta SEO, formulario de contacto. |
| `styles.css`  | Variables de diseño, layout responsive, animaciones, glassmorphism. |
| `script.js`   | Menú móvil, scroll suave, scroll spy, revelado al scroll, loader, validación del formulario. |

## Cómo ver el proyecto

1. Abrí `index.html` en el navegador (doble clic o arrastrá el archivo a una ventana del navegador).
2. Opcional: serví la carpeta con un servidor estático si querés evitar advertencias CORS en entornos estrictos, por ejemplo:
   - VS Code: extensión “Live Server”.
   - Terminal: `npx serve .` (requiere Node.js solo para este comando).

## Stack técnico

- HTML5 semántico.
- CSS3 (variables, Grid, Flexbox, `backdrop-filter`, animaciones).
- JavaScript vanilla (sin frameworks).

## Identidad y copy del producto

- **Nombre:** Velity.
- **Propuesta:** Ecosistema de salud digital que reduce la fragmentación de la información médica.
- **Público:** Pacientes, médicos, clínicas y profesionales de la salud; preparado para integraciones futuras.
- **Pilares:** Accesibilidad, organización, seguridad y facilidad de uso.

### Datos que la landing comunica

Velity permite, entre otras cosas:

- Historial médico y clínico unificado.
- Recetas y medicación.
- Estudios y diagnósticos.
- Alergias y vacunas.
- Citas y recordatorios.
- Datos de monitoreo de salud.
- Interacción paciente–médico de forma estructurada.

## Secciones de la página (orden)

1. **Navbar** — Enlaces: Home, Features, Doctors, Patients, Pricing, Contact + CTA “Get Started”.
2. **Hero** — Titular principal, texto de apoyo, CTAs “Start Now” / “Learn More”, placeholder de app, blobs de fondo.
3. **About** — Qué es Velity, por qué existe, visión (tarjetas).
4. **Features** — Rejilla de capacidades con iconos SVG inline.
5. **Patients** — Experiencia paciente + placeholder móvil.
6. **Doctors** — Perfil médico, panel, agenda y gestión de pacientes (placeholders).
7. **How it works** — Línea de tiempo de 4 pasos.
8. **Pricing** — Free, Premium Patient (recomendado), Doctor (precios de ejemplo).
9. **Security** — Cifrado, privacidad, autenticación, control del usuario.
10. **Testimonials** — Testimonios ficticios (paciente y médicos).
11. **Contact** — Formulario: nombre, email, tipo de usuario, mensaje + datos de contacto de ejemplo.
12. **Footer** — Logo placeholder, enlaces, redes placeholder, copyright dinámico (año vía JS).

## Sistema de diseño (referencia rápida)

### Colores sugeridos (también en `:root` en `styles.css`)

| Uso            | Valor |
|----------------|--------|
| Primario       | `#00C9A7` |
| Secundario     | `#5CE1E6` |
| Oscuro / texto | `#0F172A` |
| Fondo claro    | `#F4FFFD` |
| Gradiente CTA  | `linear-gradient(135deg, #00C9A7, #5CE1E6)` |

### Tipografía

- **Inter** (Google Fonts), pesos 400–800.

### Efectos

- Glassmorphism en tarjetas seleccionadas (`backdrop-filter`).
- Sombras suaves, bordes redondeados, hover en cards y botones.
- Blobs flotantes en fondo fijo.
- Loader inicial de página.
- Revelado al hacer scroll (`.reveal` + `IntersectionObserver`).
- Parallax muy suave en el bloque visual del hero.

## Placeholders (imágenes / capturas)

No se usan imágenes reales. Todos los recintos visuales son **contenedores con texto**, por ejemplo:

- `LOGO PLACEHOLDER`
- `APP SCREEN PLACEHOLDER`
- `MOBILE APP PLACEHOLDER`
- `DOCTOR PANEL PLACEHOLDER`
- `AGENDA PREVIEW PLACEHOLDER`
- `PATIENT MANAGEMENT UI PLACEHOLDER`
- `SECURITY VISUAL PLACEHOLDER`

Estilo común: borde discontinuo, esquinas redondeadas, tipografía pequeña en mayúsculas.

Para producción, sustituye cada bloque por `<img>` o componentes reales manteniendo clases como `.placeholder` o envolviendo en un contenedor con las mismas proporciones.

## Formulario de contacto

- **Validación:** Solo en el cliente (HTML5 + lógica en `script.js`).
- **Campos obligatorios:** nombre (mín. 2 caracteres), email válido, tipo de usuario, mensaje (mín. 10 caracteres).
- **Tras envío válido:** animación/mensaje de éxito (simulación; no hay backend ni envío real de datos).

### Datos de contacto mostrados en la página (ejemplo)

- Email de ejemplo: `hello@velity.health`
- Texto de ubicación: “Remote-first · Global health”

Cámbialos en `index.html` en la sección `#contact` según tu dominio real.

## SEO y meta (en `index.html`)

- `<title>` y `<meta name="description">` configurados para Velity / salud digital.
- `theme-color` para barra de estado en móviles.
- `lang="en"` en `<html>` (el copy actual está en inglés). Si publicas en español, cambia a `lang="es"` y adapta textos.

## JavaScript — comportamiento resumido

| Función | Descripción |
|---------|-------------|
| Loader | Oculta la pantalla de carga tras `load` (+ pequeño retardo). |
| Navbar | Fondo/blur al superar umbral de scroll. |
| Menú móvil | Toggle aria, cierre al pulsar enlaces o al redimensionar a escritorio. |
| Smooth scroll | Enlaces `href="#…"` hacen scroll al ancla. |
| Scroll spy | Resalta el enlace del nav según la sección visible. |
| Reveal | Elementos `.reveal` entran con transición al entrar en viewport. |
| Año en footer | `#year` rellenado con el año actual. |
| Formulario | Validación, estados de error, clase `is-success` y mensaje de confirmación. |

## Accesibilidad y motion

- Atributos ARIA en menú y loader donde aplica.
- `prefers-reduced-motion`: animaciones y scroll suave se degradan en `styles.css` y el parallax del hero no se aplica en `script.js` si el usuario lo solicita.

## Personalización rápida

1. **Colores:** edita las variables en `:root` dentro de `styles.css`.
2. **Textos y secciones:** edita `index.html`.
3. **Precios:** placeholders en la sección `#pricing`; ajusta montos y listas.
4. **Logos e imágenes:** reemplaza spans `.placeholder` por imágenes optimizadas (WebP/AVIF) y ajusta `alt` descriptivos.

## Licencia y créditos

El contenido de marketing y los testimonios son **ficticios** para presentación. Sustituye por textos legales y reales antes de producción.

---

**Velity** — README generado para mantener en un solo sitio la información necesaria para desplegar, personalizar y entender el landing.
