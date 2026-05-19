# LUX ESENCIAS

Tienda online (frontend) de lociones y perfumes de alta gama. Diseño premium, elegante y 100% responsive — pensada para publicar como **sitio estático** (ideal para GitHub Pages, Netlify, Vercel o cualquier hosting).

![LUX ESENCIAs](https://placehold.co/1200x600/0B0B0B/C9A24B?text=URUM+PERFUMES)

---

## Características

- **Single Page App** con scroll suave y secciones bien definidas.
- **Navbar** con logo, búsqueda en vivo, menú de categorías (Hombre, Mujer, Unisex) y carrito con contador.
- **Hero Section** con imagen de fondo, título persuasivo y CTA.
- **Ofertas Destacadas** generadas automáticamente desde productos en rebaja.
- **Catálogo dinámico** renderizado por JavaScript desde un array — añade o edita productos sin tocar HTML.
- **Tarjeta de producto** con:
  - Imagen, nombre, marca, notas olfativas.
  - Precio original tachado + precio rebajado en color de oferta.
  - Etiqueta flotante `-XX% OFERTA` o `NUEVO`.
  - Botón "Agregar al carrito" + quick-add al hacer hover.
- **Filtros** por categoría y por productos en rebaja.
- **Búsqueda en vivo** por nombre, marca o notas.
- **Carrito lateral** (drawer) con cantidades, eliminación, subtotal y simulación de pago.
- **Toast notifications** elegantes.
- **Newsletter**, footer completo con redes sociales y métodos de pago.
- **100% Responsive** (Mobile-First): 1 col móvil, 2 col tablet, 3-4 col desktop.

---

## Stack tecnológico

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura |
| Tailwind CSS (CDN) | Estilos |
| JavaScript (Vanilla) | Lógica dinámica, render, carrito |
| Google Fonts | `Playfair Display` (titulares) + `Manrope` (cuerpo) |
| Font Awesome | Iconografía |

**No requiere build ni dependencias.** Solo abre `index.html` en el navegador.

---

## Estructura del proyecto

```
urum-perfumes/
├── index.html        # Estructura HTML + Tailwind config inline
├── app.js            # Productos (array) + lógica de render y carrito
├── README.md
├── LICENSE
└── .gitignore
```

---

## Cómo usarlo localmente

1. Clona o descarga este repositorio:
   ```bash
   git clone https://github.com/TU-USUARIO/urum-perfumes.git
   cd urum-perfumes
   ```
2. Abre `index.html` directamente en tu navegador
   **o** sirve con un servidor local:
   ```bash
   # Python 3
   python -m http.server 8080
   # Node (si tienes instalado)
   npx serve .
   ```
3. Visita `http://localhost:8080`.

---

## Cómo añadir o editar productos

Abre `app.js` y modifica el array `productos`. Cada producto tiene esta forma:

```js
{
  id: 13,                                   // único
  nombre: "Mi Nuevo Perfume",
  marca: "Maison Urum",
  categoria: "hombre",                      // 'hombre' | 'mujer' | 'unisex'
  precioOriginal: 300000,
  precioRebaja: 240000,                     // o null si no está en oferta
  urlImagen: "https://tu-imagen.jpg",       // 400x500 px ideal
  notas: "Notas olfativas..."
}
```

- Si `precioRebaja` tiene valor, el producto aparece automáticamente en la sección de **Ofertas Destacadas**.
- La etiqueta `-XX% OFERTA` se calcula sola.

---

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub y sube estos archivos:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - LUX ESENCIAs"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/urum-perfumes.git
   git push -u origin main
   ```
2. En el repositorio: **Settings → Pages → Source → Deploy from branch → `main` / `(root)`**.
3. Tu tienda estará disponible en `https://TU-USUARIO.github.io/urum-perfumes/`.

---

## Personalización rápida

| Qué cambiar | Dónde |
|---|---|
| Colores (oro, sale, fondo) | `index.html` → `tailwind.config` (sección `<script>`) |
| Imagen del Hero | `index.html` → clase `.hero-bg` (CSS, propiedad `background-image`) |
| Productos | `app.js` → array `productos` |
| Nombre de la marca | `index.html` → busca "URUM" |
| Redes sociales | `index.html` → sección footer |

---

## Licencia

MIT — ver archivo [LICENSE](./LICENSE).

---

Hecho con ♥ para amantes del buen aroma.
