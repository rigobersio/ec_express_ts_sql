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

```css

```

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
