/* ============================================================
   LUX ESENCIAS — app.js
   Catálogo dinámico + carrito (solo simulación visual)
   ============================================================ */

/* ---------- 1. ARRAY DE PRODUCTOS ----------
   Para añadir, eliminar o modificar productos solo edita este array.
   Campos por producto:
     id            (number)  — único
     nombre        (string)  — nombre del perfume
     marca         (string)  — casa o marca
     categoria     ('hombre' | 'mujer' | 'unisex')
     precioOriginal(number)  — precio en pesos (sin descuento)
     precioRebaja  (number|null) — precio rebajado, o null si no aplica
     urlImagen     (string)  — URL de la foto (formato 400x500)
     notas         (string)  — notas olfativas (opcional, descriptivo)
   ---------------------------------------------- */
const productos = [
  {
    id: 1,
    nombre: "Noir Oud Intense",
    marca: "Maison Urum",
    categoria: "hombre",
    precioOriginal: 320000,
    precioRebaja: 256000,
    urlImagen: "https://placehold.co/400x500/0B0B0B/C9A24B?text=NOIR+OUD",
    notas: "Oud, cuero, vainilla"
  },
  {
    id: 2,
    nombre: "Rose Éclat",
    marca: "Urum Couture",
    categoria: "mujer",
    precioOriginal: 280000,
    precioRebaja: null,
    urlImagen: "https://placehold.co/400x500/F9F9F9/C9A24B?text=ROSE+%C3%89CLAT",
    notas: "Rosa búlgara, peonía, almizcle"
  },
  {
    id: 3,
    nombre: "Ámbar Solar",
    marca: "Urum Heritage",
    categoria: "unisex",
    precioOriginal: 240000,
    precioRebaja: 192000,
    urlImagen: "https://placehold.co/400x500/C9A24B/0B0B0B?text=%C3%81MBAR+SOLAR",
    notas: "Ámbar, bergamota, sándalo"
  },
  {
    id: 4,
    nombre: "Velvet Musk",
    marca: "Maison Urum",
    categoria: "mujer",
    precioOriginal: 310000,
    precioRebaja: null,
    urlImagen: "https://placehold.co/400x500/1A1A1A/C9A24B?text=VELVET+MUSK",
    notas: "Almizcle, iris, pera"
  },
  {
    id: 5,
    nombre: "Cedro Salvaje",
    marca: "Urum Atelier",
    categoria: "hombre",
    precioOriginal: 290000,
    precioRebaja: 217500,
    urlImagen: "https://placehold.co/400x500/2C2C2C/C9A24B?text=CEDRO+SALVAJE",
    notas: "Cedro, vetiver, cardamomo"
  },
  {
    id: 6,
    nombre: "Jardín Blanc",
    marca: "Urum Couture",
    categoria: "mujer",
    precioOriginal: 260000,
    precioRebaja: null,
    urlImagen: "https://placehold.co/400x500/EFEAE0/C9A24B?text=JARD%C3%8DN+BLANC",
    notas: "Jazmín, lirio, lluvia blanca"
  },
  {
    id: 7,
    nombre: "Citrus Tonic",
    marca: "Urum Edition",
    categoria: "unisex",
    precioOriginal: 180000,
    precioRebaja: 135000,
    urlImagen: "https://placehold.co/400x500/F4E9C1/0B0B0B?text=CITRUS+TONIC",
    notas: "Bergamota, limón, menta"
  },
  {
    id: 8,
    nombre: "Bourbon Vainilla",
    marca: "Maison Urum",
    categoria: "unisex",
    precioOriginal: 295000,
    precioRebaja: null,
    urlImagen: "https://placehold.co/400x500/3B2A1A/C9A24B?text=BOURBON+VAINILLA",
    notas: "Vainilla, bourbon, tonka"
  },
  {
    id: 9,
    nombre: "Tabaco Royale",
    marca: "Urum Heritage",
    categoria: "hombre",
    precioOriginal: 340000,
    precioRebaja: 272000,
    urlImagen: "https://placehold.co/400x500/4A2E1A/C9A24B?text=TABACO+ROYALE",
    notas: "Tabaco, miel, ron añejo"
  },
  {
    id: 10,
    nombre: "Lirio de Plata",
    marca: "Urum Atelier",
    categoria: "mujer",
    precioOriginal: 250000,
    precioRebaja: null,
    urlImagen: "https://placehold.co/400x500/D8D5C8/0B0B0B?text=LIRIO+DE+PLATA",
    notas: "Lirio, iris, almizcle blanco"
  },
  {
    id: 11,
    nombre: "Bergamota Negra",
    marca: "Urum Edition",
    categoria: "hombre",
    precioOriginal: 220000,
    precioRebaja: 176000,
    urlImagen: "https://placehold.co/400x500/151515/C9A24B?text=BERGAMOTA+NEGRA",
    notas: "Bergamota, pimienta, pachulí"
  },
  {
    id: 12,
    nombre: "Brisa Marina",
    marca: "Urum Edition",
    categoria: "unisex",
    precioOriginal: 195000,
    precioRebaja: null,
    urlImagen: "https://placehold.co/400x500/A8C5D6/0B0B0B?text=BRISA+MARINA",
    notas: "Sal marina, cítricos, ámbar gris"
  }
];

/* ---------- 2. ESTADO GLOBAL ---------- */
const state = {
  carrito: [],         // [{id, cantidad}]
  filtroCategoria: "todos",
  busqueda: ""
};

/* ---------- 3. UTILIDADES ---------- */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const formatearPrecio = (valor) =>
  "$" + valor.toLocaleString("es-CO", { maximumFractionDigits: 0 });

const calcularDescuento = (original, rebaja) =>
  Math.round(((original - rebaja) / original) * 100);

/* ---------- 4. RENDER DE TARJETAS ---------- */
function crearTarjetaProducto(p, opciones = {}) {
  const enRebaja = p.precioRebaja !== null && p.precioRebaja !== undefined;
  const descuento = enRebaja ? calcularDescuento(p.precioOriginal, p.precioRebaja) : 0;
  const precioFinal = enRebaja ? p.precioRebaja : p.precioOriginal;

  const badge = enRebaja
    ? `<span class="absolute top-4 left-4 badge-sale text-[10px] font-bold px-3 py-1.5 tracking-widest" data-testid="badge-sale-${p.id}">-${descuento}% OFERTA</span>`
    : `<span class="absolute top-4 left-4 bg-cream text-ink text-[10px] font-bold px-3 py-1.5 tracking-widest border border-ink/10" data-testid="badge-new-${p.id}">NUEVO</span>`;

  const precioHTML = enRebaja
    ? `
      <div class="flex items-baseline gap-2">
        <span class="text-base sm:text-lg font-semibold text-sale" data-testid="precio-rebaja-${p.id}">${formatearPrecio(p.precioRebaja)}</span>
        <span class="text-sm text-ink/40 line-through" data-testid="precio-original-${p.id}">${formatearPrecio(p.precioOriginal)}</span>
      </div>`
    : `<div class="text-base sm:text-lg font-semibold text-ink" data-testid="precio-${p.id}">${formatearPrecio(p.precioOriginal)}</div>`;

  const categoriaLabel = p.categoria.charAt(0).toUpperCase() + p.categoria.slice(1);

  return `
    <article class="product-card group bg-white border border-black/5 flex flex-col" data-testid="product-card-${p.id}">
      <div class="img-wrap relative overflow-hidden aspect-[4/5] bg-cream">
        ${badge}
        <img src="${p.urlImagen}" alt="${p.nombre}" loading="lazy" class="w-full h-full object-cover" />
        <button class="quick-add absolute bottom-4 right-4 w-11 h-11 bg-ink text-cream hover:bg-gold transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100" data-id="${p.id}" data-testid="quick-add-${p.id}" aria-label="Agregar rápido">
          <i class="fa-solid fa-plus"></i>
        </button>
      </div>
      <div class="p-5 flex flex-col flex-1">
        <div class="flex items-center justify-between mb-2">
          <span class="text-[10px] tracking-[0.3em] text-gold uppercase">${p.marca}</span>
          <span class="text-[10px] tracking-[0.2em] text-ink/40 uppercase">${categoriaLabel}</span>
        </div>
        <h3 class="font-serif text-lg sm:text-xl text-ink leading-tight" data-testid="nombre-${p.id}">${p.nombre}</h3>
        <p class="text-xs text-ink/50 mt-1 mb-4">${p.notas}</p>
        <div class="mt-auto">
          ${precioHTML}
          <button class="add-to-cart btn-gold mt-4 w-full py-3 text-xs tracking-[0.25em] uppercase flex items-center justify-center gap-2" data-id="${p.id}" data-testid="add-to-cart-${p.id}">
            <span><i class="fa-solid fa-bag-shopping mr-2"></i>Agregar al carrito</span>
          </button>
        </div>
      </div>
    </article>
  `;
}

function renderCatalogo() {
  const grid = $("#catalogoGrid");
  const empty = $("#emptyState");
  const term = state.busqueda.trim().toLowerCase();

  let lista = productos;

  if (state.filtroCategoria === "rebaja") {
    lista = lista.filter((p) => p.precioRebaja !== null && p.precioRebaja !== undefined);
  } else if (state.filtroCategoria !== "todos") {
    lista = lista.filter((p) => p.categoria === state.filtroCategoria);
  }

  if (term) {
    lista = lista.filter(
      (p) =>
        p.nombre.toLowerCase().includes(term) ||
        p.marca.toLowerCase().includes(term) ||
        p.notas.toLowerCase().includes(term)
    );
  }

  if (lista.length === 0) {
    grid.innerHTML = "";
    empty.classList.remove("hidden");
  } else {
    empty.classList.add("hidden");
    grid.innerHTML = lista.map((p) => crearTarjetaProducto(p)).join("");
  }
}

function renderOfertas() {
  const grid = $("#ofertasGrid");
  const ofertas = productos.filter(
    (p) => p.precioRebaja !== null && p.precioRebaja !== undefined
  );
  // Mostramos máximo 4 en la sección destacada
  grid.innerHTML = ofertas.slice(0, 4).map((p) => crearTarjetaProducto(p)).join("");
}

/* ---------- 5. CARRITO ---------- */
function agregarAlCarrito(id) {
  const existente = state.carrito.find((item) => item.id === id);
  if (existente) existente.cantidad += 1;
  else state.carrito.push({ id, cantidad: 1 });
  renderCarrito();
  actualizarContador();

  const prod = productos.find((p) => p.id === id);
  mostrarToast(`${prod.nombre} añadido al carrito`);
}

function eliminarDelCarrito(id) {
  state.carrito = state.carrito.filter((item) => item.id !== id);
  renderCarrito();
  actualizarContador();
}

function cambiarCantidad(id, delta) {
  const item = state.carrito.find((i) => i.id === id);
  if (!item) return;
  item.cantidad += delta;
  if (item.cantidad <= 0) eliminarDelCarrito(id);
  else {
    renderCarrito();
    actualizarContador();
  }
}

function vaciarCarrito() {
  state.carrito = [];
  renderCarrito();
  actualizarContador();
  mostrarToast("Carrito vaciado");
}

function totalItems() {
  return state.carrito.reduce((acc, i) => acc + i.cantidad, 0);
}

function subtotalCarrito() {
  return state.carrito.reduce((acc, item) => {
    const p = productos.find((x) => x.id === item.id);
    if (!p) return acc;
    const precio = p.precioRebaja ?? p.precioOriginal;
    return acc + precio * item.cantidad;
  }, 0);
}

function actualizarContador() {
  $("#cartCount").textContent = totalItems();
}

function renderCarrito() {
  const itemsBox = $("#cartItems");
  const empty = $("#cartEmpty");
  const footer = $("#cartFooter");
  const label = $("#cartItemsLabel");

  if (state.carrito.length === 0) {
    itemsBox.innerHTML = "";
    itemsBox.classList.add("hidden");
    empty.classList.remove("hidden");
    footer.classList.add("hidden");
    label.textContent = "0 productos";
    return;
  }

  itemsBox.classList.remove("hidden");
  empty.classList.add("hidden");
  footer.classList.remove("hidden");

  itemsBox.innerHTML = state.carrito
    .map((item) => {
      const p = productos.find((x) => x.id === item.id);
      if (!p) return "";
      const precio = p.precioRebaja ?? p.precioOriginal;
      return `
        <div class="flex gap-4 pb-5 border-b border-black/5" data-testid="cart-item-${p.id}">
          <img src="${p.urlImagen}" alt="${p.nombre}" class="w-20 h-24 object-cover bg-cream" />
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-3">
              <div>
                <p class="text-[10px] tracking-[0.25em] text-gold uppercase">${p.marca}</p>
                <h4 class="font-serif text-base text-ink leading-tight truncate">${p.nombre}</h4>
              </div>
              <button class="remove-item text-ink/40 hover:text-sale transition-colors" data-id="${p.id}" data-testid="remove-item-${p.id}" aria-label="Eliminar">
                <i class="fa-solid fa-trash text-xs"></i>
              </button>
            </div>
            <div class="flex items-center justify-between mt-3">
              <div class="flex items-center border border-black/10">
                <button class="qty-btn w-7 h-7 hover:bg-ink hover:text-cream transition-colors" data-id="${p.id}" data-delta="-1" data-testid="qty-minus-${p.id}">−</button>
                <span class="w-8 text-center text-sm" data-testid="qty-${p.id}">${item.cantidad}</span>
                <button class="qty-btn w-7 h-7 hover:bg-ink hover:text-cream transition-colors" data-id="${p.id}" data-delta="1" data-testid="qty-plus-${p.id}">+</button>
              </div>
              <span class="text-sm font-semibold ${p.precioRebaja ? "text-sale" : "text-ink"}">${formatearPrecio(precio * item.cantidad)}</span>
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  const totalProd = totalItems();
  label.textContent = `${totalProd} ${totalProd === 1 ? "producto" : "productos"}`;

  const sub = subtotalCarrito();
  $("#cartSubtotal").textContent = formatearPrecio(sub);
  $("#cartTotal").textContent = formatearPrecio(sub);
}

/* ---------- 6. UI: DRAWER, MENÚ, TOAST ---------- */
function abrirCarrito() {
  $("#cartDrawer").classList.remove("closed");
  $("#cartDrawer").classList.add("open");
  const ov = $("#cartOverlay");
  ov.classList.remove("opacity-0", "pointer-events-none");
  ov.classList.add("opacity-100");
  document.body.style.overflow = "hidden";
}

function cerrarCarrito() {
  $("#cartDrawer").classList.add("closed");
  $("#cartDrawer").classList.remove("open");
  const ov = $("#cartOverlay");
  ov.classList.add("opacity-0", "pointer-events-none");
  ov.classList.remove("opacity-100");
  document.body.style.overflow = "";
}

let toastTimer;
function mostrarToast(mensaje) {
  const toast = $("#toast");
  $("#toastText").textContent = mensaje;
  toast.classList.remove("translate-y-32", "opacity-0");
  toast.classList.add("translate-y-0", "opacity-100");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.add("translate-y-32", "opacity-0");
    toast.classList.remove("translate-y-0", "opacity-100");
  }, 2200);
}

function setFiltroActivo(filtro) {
  state.filtroCategoria = filtro;
  $$(".filter-btn").forEach((btn) => {
    const active = btn.dataset.filter === filtro;
    btn.classList.toggle("bg-ink", active);
    btn.classList.toggle("text-cream", active);
    btn.classList.toggle("border-ink", active);
    if (!active) {
      btn.classList.remove("bg-ink", "text-cream", "border-ink");
      if (filtro !== "rebaja" && btn.dataset.filter === "rebaja") return;
    }
  });
  // Restaurar estilos no activos
  $$(".filter-btn").forEach((btn) => {
    if (btn.dataset.filter !== filtro) {
      if (btn.dataset.filter === "rebaja") {
        btn.className = "filter-btn px-4 py-2 text-xs tracking-widest uppercase border border-sale/40 text-sale hover:border-sale";
      } else {
        btn.className = "filter-btn px-4 py-2 text-xs tracking-widest uppercase border border-ink/20 text-ink hover:border-ink";
      }
      btn.dataset.testid && btn.setAttribute("data-testid", `filter-${btn.dataset.filter}`);
    }
  });
  // Activo
  const activeBtn = document.querySelector(`.filter-btn[data-filter="${filtro}"]`);
  if (activeBtn) {
    if (filtro === "rebaja") {
      activeBtn.className = "filter-btn px-4 py-2 text-xs tracking-widest uppercase bg-sale text-cream border border-sale";
    } else {
      activeBtn.className = "filter-btn px-4 py-2 text-xs tracking-widest uppercase border border-ink bg-ink text-cream";
    }
    activeBtn.setAttribute("data-testid", `filter-${filtro}`);
  }
  // Nav links highlight
  $$(".nav-link").forEach((a) => {
    a.classList.toggle("active", a.dataset.cat === filtro);
  });
  renderCatalogo();
}

/* ---------- 7. EVENT LISTENERS ---------- */
function inicializarEventos() {
  // Delegación: añadir al carrito
  document.addEventListener("click", (e) => {
    const addBtn = e.target.closest(".add-to-cart, .quick-add");
    if (addBtn) {
      const id = parseInt(addBtn.dataset.id);
      agregarAlCarrito(id);
      return;
    }
    const removeBtn = e.target.closest(".remove-item");
    if (removeBtn) {
      eliminarDelCarrito(parseInt(removeBtn.dataset.id));
      return;
    }
    const qtyBtn = e.target.closest(".qty-btn");
    if (qtyBtn) {
      cambiarCantidad(parseInt(qtyBtn.dataset.id), parseInt(qtyBtn.dataset.delta));
      return;
    }
  });

  // Carrito open/close
  $("#cartBtn").addEventListener("click", abrirCarrito);
  $("#closeCart").addEventListener("click", cerrarCarrito);
  $("#closeCartEmpty").addEventListener("click", cerrarCarrito);
  $("#cartOverlay").addEventListener("click", cerrarCarrito);
  $("#clearCart").addEventListener("click", vaciarCarrito);
  $("#checkoutBtn").addEventListener("click", () => {
    mostrarToast("Compra simulada con éxito ✓");
    setTimeout(() => {
      vaciarCarrito();
      cerrarCarrito();
    }, 800);
  });

  // Filtros
  $$(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => setFiltroActivo(btn.dataset.filter));
  });

  // Nav category links (desktop + mobile)
  $$(".nav-link").forEach((a) => {
    a.addEventListener("click", (e) => {
      const cat = a.dataset.cat;
      if (cat) {
        setFiltroActivo(cat);
        // cerrar mobile menu
        $("#mobileMenu").classList.add("hidden");
      }
    });
  });

  // Búsqueda
  const onSearch = (val) => {
    state.busqueda = val;
    renderCatalogo();
  };
  $("#searchInput").addEventListener("input", (e) => onSearch(e.target.value));
  $("#searchInputMobile").addEventListener("input", (e) => onSearch(e.target.value));

  // Mobile menu
  $("#menuBtn").addEventListener("click", () => {
    $("#mobileMenu").classList.toggle("hidden");
  });
  $("#searchBtnMobile").addEventListener("click", () => {
    $("#mobileSearch").classList.toggle("hidden");
    setTimeout(() => $("#searchInputMobile").focus(), 100);
  });

  // Newsletter
  $("#newsletterForm").addEventListener("submit", (e) => {
    e.preventDefault();
    mostrarToast("¡Gracias por suscribirte!");
    e.target.reset();
  });

  // ESC cierra carrito
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") cerrarCarrito();
  });

  // Año footer
  $("#year").textContent = new Date().getFullYear();
}

/* ---------- 8. INIT ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderOfertas();
  renderCatalogo();
  actualizarContador();
  inicializarEventos();
});
