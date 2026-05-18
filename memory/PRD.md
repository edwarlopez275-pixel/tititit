# URUM PERFUMES — PRD

## Problem Statement
E-commerce frontend estático (HTML + Tailwind CDN + JS vanilla) para venta de lociones y perfumes. Catálogo dinámico desde array JSON, carrito simulado, listo para publicar en GitHub Pages.

## User Choices
- Stack: HTML + Tailwind CDN + JS vanilla
- Marca: URUM PERFUMES
- Imágenes: placeholder genéricas
- Carrito: solo simulación visual
- Extras: README.md + .gitignore + LICENSE (MIT)

## Architecture
- Sitio estático (sin backend). Carpeta `/app/urum-perfumes/`.
- `index.html`: estructura + Tailwind CDN + fuentes (Playfair Display + Manrope) + Font Awesome.
- `app.js`: array `productos`, renderizado dinámico, lógica del carrito (drawer lateral).
- Diseño: premium, blanco/gris claro, negro carbón, acentos dorados (#C9A24B), oferta en rojo (#C0392B).

## Implemented (Dec 2025)
- Navbar sticky con logo, búsqueda, categorías (Hombre/Mujer/Unisex/Ofertas), carrito + contador
- Hero con imagen de fondo + CTAs
- Sección Ofertas Destacadas (auto-filtrada)
- Catálogo completo con filtros (Todos/Hombre/Mujer/Unisex/En rebaja) y búsqueda en vivo
- Tarjeta de producto: imagen, marca, nombre, notas, precio (original tachado + rebaja en color), badge -XX% / NUEVO, botón Agregar
- Carrito drawer: items, cantidades +/-, eliminar, subtotal/total, simulación de checkout
- Toast notifications, newsletter, footer con redes y métodos de pago
- Marquee promocional, animaciones, micro-interacciones
- Responsive Mobile-First (1/2/3/4 columnas)
- README.md detallado + .gitignore + LICENSE MIT

## Backlog (P1/P2)
- P1: Persistencia con localStorage para el carrito
- P1: Página de detalle del producto
- P2: Integración con pasarela de pagos real (Stripe/PayPal)
- P2: Sección de testimonios / reseñas
- P2: Variantes (tamaños: 50ml, 100ml)
- P2: Filtros por familia olfativa
- P2: Backend real (Node/FastAPI) para órdenes y stock

## Next Actions
- Subir a GitHub y activar Pages (instrucciones en README)
- Cambiar imágenes placeholder por fotos reales de producto
- Personalizar enlaces de redes sociales y políticas
