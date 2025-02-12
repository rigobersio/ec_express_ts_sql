errores en la configuración tailwind
1. index.css (archivo principal css)

acá las configuraciones base pueden afectar a tailwind, además de lo anterior, se necesitan algunas importaciones, en este caso: `@import "tailwindcss/base", @import "tailwindcss/components", @import "tailwindcss/utilities", @plugin "@tailwindcss/typography`

configuración base:

```css
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}
```

Configuración del proyecto:
instalación de fuentes: roboto mono, tangerine, poppins, merriweather, raleway

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Raleway:ital,wght@0,100..900;1,100..900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&family=Tangerine:wght@400;700&display=swap" rel="stylesheet">
```

El css que principal que se ocupará es:
```css
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
@plugin "@tailwindcss/typography";

body,
html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}

body {
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  color: #061609;
  background: linear-gradient(to right, #f9f9f9 0%, #cac79f 100%);
  line-height: 1.6;
}

/*clases especiales para contenedores principales */
.contenedor-padding {
  padding-left: 10%;
  /* Espacio a la izquierda */
  padding-right: 10%;
  /* Espacio a la derecha */
  padding-top: 100px;
  /* Espacio arriba */
  padding-bottom: 100px;
  /* Espacio abajo */
}

@media (max-width: 600px) {

  /* Para pantallas pequeñas */
  .contenedor-padding {
    padding-left: 5%;
    /* Espacio a la izquierda reducido */
    padding-right: 5%;
    /* Espacio a la derecha reducido */
  }
}

/*clase ideal para números en listas*/
.monospace {
  font-family: "Roboto Mono", monospace;
}

h1 {
  font-family: "Tangerine", system-ui;
  font-weight: 700;
  font-style: normal;
  color: #1b3c3e;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 120px;

  margin-top: 0;
  margin-bottom: 10px;
}

h2 {
  font-family: "Tangerine", system-ui;
  font-weight: 800;
  font-size: 82px;
  color: #b8847a;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

h3 {
  font-family: "Merriweather";
  font-size: 20px;
  font-weight: 600;
  color: #b8847a;
}

h4 {
  font-family: "Tangerine", system-ui;
  font-weight: 700;
  font-style: normal;
  font-size: 40px;
  margin: 20px 0;
  color: #1b3c3e;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

h5 {
  font-weight: 700;
  line-height: 20px;
}

p {
  font-size: 15px;
}

.text-indent {
  text-indent: 1rem;
}

a {
  color: #1b3c3e;
  transition: all 0.3s;
  font-size: 15px;
}

a:hover,
a:focus {
  text-decoration: none;
  color: #061609;
}

ul,
ol {
  list-style: none;
  font-family: "Poppins", serif;
  font-weight: 300;
  font-style: italic;
  list-style: none;
}

li {
  padding: 5px;
}

hr {
  height: 2px;
  width: 70px;
  text-align: center;
  position: relative;
  background: #1b3c3e;
  margin-bottom: 20px;
  border: 0;
}

/* Estilo para los elementos de navegación */
#navbar .nav-items {
  display: flex;
  gap: 2rem;
  margin-right: 4rem;
}

#navbar .nav-item {
  position: relative;
  cursor: pointer;
  font-family: "Merriweather", sans-serif;
  color: #b8847a;
  font-size: 15px;
  font-weight: 500;
  padding: 0 2px;
  margin: 0 20px;
  text-align: center;
  transition: color 0.3s, border-color 0.3s;
}

#navbar .nav-item::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 0;
  height: 2px;
  background: linear-gradient(to right, #b8847a 0%, #1b3c3e 100%);
  transition: width 0.2s ease-in-out;
}

#navbar .nav-item:hover {
  color: #b8847a;
}

#navbar .nav-item:hover::after {
  width: 100%;
}

/* Estilo del título de la barra */
#navbar a .nav-title {
  font-family: "Raleway", sans-serif;
  font-weight: 700;
  font-size: 1.4rem;
  color: #b8847a;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  margin: 6px;
  white-space: nowrap;
  transition: color 200ms ease;
}

#navbar a:hover .nav-title {
  color: #1b3c3e;
}

/* titulo */

.section-title {
  margin-bottom: 85px;
}

.section-title h2 {
  position: relative;
}

.section-title h2::after {
  position: absolute;
  content: "";
  background: linear-gradient(to right, #b8847a 0%, #1b3c3e 100%);
  height: 4px;
  width: 60px;
  bottom: 0;
  margin-left: -30px;
  left: 50%;
}

.section-title p {
  font-size: 18px;
  margin-top: 20px;
}
```
## Paleta de Colores

### Paleta Principal

- Verde Oscuro: `#061609`
- Verde Medio: `#1b3c3e`
- Marrón Claro: `#b8847a`
- Beige: `#cac79f`
- Blanco: `#f9f9f9`

### Paleta Secundaria

- Gris Oscuro: `#333`
- Gris Claro: `#e0f7fa`
- Negro: `#000000`
- Azul Oscuro: `#1e3a8a`


2. vite.config

vite requiere `import tailwindcss from '@tailwindcss/vite'` y el plugin `tailwindcss(),`.
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
    ],
})

```

3. tailwind.config.js

acá la propiedad content tiene que ser: `['./src/**/*.{js,ts,jsx,tsx}']`

en este caso tambien se están ocupando 2 plugins: `require('@tailwindcss/typography'), require('tailwindcss-animated')`

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animated')
  ],
}
```
main.ts

Acá es importante importar el archivo principal css
```typescript
import './index.css'
```
