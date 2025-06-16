// === CARGA DINÁMICA DE HAMBURGUESAS ===
const hamburguesas = [
  {
    nombre: "Jada Especial",
    descripcion: "Hamburguesa 100gr carne preparada con jamón, queso, tocino, cebolla caramelizada, aguacate, salchicha para asar.",
    precio: "$65",
    imagen: "img/especial.jpg",
    destacado: true
  },
  {
    nombre: "Champiñones",
    descripcion: "Exquisita carne 100 gr. preparada con jamón, queso, tocino, cebolla, generosos champiñones rebanados.",
    precio: "$55",
    imagen: "img/champinones.jpg"
  },
  {
    nombre: "Chicken Burguer",
    descripcion: "Pechuga de pollo empanizada, queso, cebolla, tomate, lechuga y aderezo de la casa.",
    precio: "$50",
    imagen: "img/chicken.jpg"
  },
  {
    nombre: "Clásica",
    descripcion: "Carne 100 gr. preparada con jamón, queso, tocino, acompañada con papas a la francesa.",
    precio: "$50",
    imagen: "img/clasica.jpg"
  },
  {
    nombre: "Hawaiana",
    descripcion: "Deliciosa hamburguesa preparada con jamón, queso, tocino, salchicha y piña natural.",
    precio: "$50",
    imagen: "img/hawaiana.jpg",
    destacado: true
  },
{
    nombre: "Mexicana",
    descripcion: "Deliciosa hamburguesa con 100g de carne preparada con jamón, queso, tocino, cebolla frita, aguacate, totopos en julianas. Acompañada con papas a la francesa.",
    precio: "$50",
    imagen: "img/mexicana.jpg",
    destacado: true
  }

];

// Promociones por día (agregar esto en tu script.js)
const promociones = [
  {
    dia: "Lunes",
    titulo: "2x1 en Hamburguesas Clásicas",
    descripcion: "Compra una hamburguesa clásica y lleva otra gratis. No aplica con otras promociones.",
    precio: "",
    destacado: false
  },
  {
    dia: "Martes",
    titulo: "Alitas Ilimitadas",
    descripcion: "Todo lo que puedas comer de nuestras deliciosas alitas por 2 horas.",
    precio: "$199",
    destacado: true
  },
  {
    dia: "Miércoles",
    titulo: "Combo Familiar",
    descripcion: "2 hamburguesas + 2 papas + 2 refrescos + 10 alitas.",
    precio: "$299",
    destacado: false
  },
  {
    dia: "Jueves",
    titulo: "Boneless + Refresco",
    descripcion: "15 piezas de boneless + refresco de 600ml.",
    precio: "$150",
    destacado: false
  },
  {
    dia: "Viernes",
    titulo: "Happy Hour",
    descripcion: "20% de descuento en todas las bebidas alcohólicas de 6pm a 8pm.",
    precio: "",
    destacado: true
  },
  {
    dia: "Sábado",
    titulo: "Combo Burger + Alitas",
    descripcion: "1 hamburguesa especial + 10 alitas + papas + refresco.",
    precio: "$249",
    destacado: false
  },
  {
    dia: "Domingo",
    titulo: "Día Familiar",
    descripcion: "15% de descuento en pedidos mayores a $400. Válido todo el día.",
    precio: "",
    destacado: false
  }
];

function cargarPromociones() {
  const promoContainer = document.querySelector('.promo-grid');
  
  // Obtener el día actual (0=Domingo, 1=Lunes, etc.)
  const hoy = new Date().getDay();
  
  // Mapear números de día a nombres en español
  const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const diaActualNombre = diasSemana[hoy];
  
  // Ordenar promociones para que empiece por el día actual
  const promocionesOrdenadas = [...promociones].sort((a, b) => {
    // Encontrar índices de los días en el array diasSemana
    const indexA = diasSemana.indexOf(a.dia);
    const indexB = diasSemana.indexOf(b.dia);
    
    // Calcular diferencia relativa al día actual
    const diffA = (indexA - hoy + 7) % 7;
    const diffB = (indexB - hoy + 7) % 7;
    
    return diffA - diffB;
  });
  
  // Generar las tarjetas de promoción
  promocionesOrdenadas.forEach(promo => {
    const promoCard = document.createElement('div');
    promoCard.className = 'promo-card';
    
    // Resaltar si es el día actual
    const esHoy = promo.dia === diaActualNombre;
    
    promoCard.innerHTML = `
      ${promo.destacado ? '<span class="promo-badge">¡Destacado!</span>' : ''}
      ${esHoy ? '<span class="promo-badge" style="background-color: var(--accent); color: var(--darker);">¡HOY!</span>' : ''}
      <div class="promo-header">
        <span class="promo-day">${promo.dia}</span>
      </div>
      <h3 class="promo-title">${promo.titulo}</h3>
      <p class="promo-desc">${promo.descripcion}</p>
      ${promo.precio ? `<div class="promo-price">${promo.precio}</div>` : ''}
    `;
    
    // Estilos adicionales para el día actual
    if (esHoy) {
      promoCard.style.border = '2px solid var(--accent)';
      promoCard.style.boxShadow = '0 0 15px rgba(255, 215, 0, 0.5)';
    }
    
    promoContainer.appendChild(promoCard);
  });
}
// Llamar a la función cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', cargarPromociones);

// Carga las hamburguesas en el menú
function cargarHamburguesas() {
  const contenedor = document.querySelector('#hamburguesas .menu-items');
  
  // Limpiar contenedor si ya tiene contenido
  contenedor.innerHTML = '';
  
  hamburguesas.forEach((hamburguesa, index) => {
    const item = document.createElement('div');
    item.classList.add('item');
    item.style.setProperty('--order', index);
    
    // Añade clase 'destacado' si corresponde
    if(hamburguesa.destacado) {
      item.classList.add('destacado');
      item.innerHTML = `<div class="ribbon">¡MÁS VENDIDA!</div>`;
    }
    
    item.innerHTML += `
      <h3>${hamburguesa.nombre} <span class="price">${hamburguesa.precio}</span></h3>
      <div class="img-container">
        <img src="${hamburguesa.imagen}" alt="${hamburguesa.nombre}" loading="lazy">
      </div>
      <p>${hamburguesa.descripcion}</p>
    `;
    
    contenedor.appendChild(item);
  });
}

// === BOTÓN DE "IR ARRIBA" ===
function crearBotonSubir() {
  const botonArriba = document.createElement("button");
  botonArriba.innerHTML = "↑";
  botonArriba.id = "btnArriba";
  botonArriba.ariaLabel = "Volver arriba";
  botonArriba.title = "Ir al inicio";
  document.body.appendChild(botonArriba);

  // Estilos del botón
  botonArriba.style.position = "fixed";
  botonArriba.style.bottom = "30px";
  botonArriba.style.right = "30px";
  botonArriba.style.width = "50px";
  botonArriba.style.height = "50px";
  botonArriba.style.borderRadius = "50%";
  botonArriba.style.backgroundColor = "#FF8C00";
  botonArriba.style.color = "#000";
  botonArriba.style.border = "none";
  botonArriba.style.fontSize = "1.5rem";
  botonArriba.style.cursor = "pointer";
  botonArriba.style.display = "none";
  botonArriba.style.zIndex = "99";
  botonArriba.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.3)";
  botonArriba.style.transition = "all 0.3s ease";

  // Mostrar/ocultar al hacer scroll
  window.addEventListener("scroll", () => {
    botonArriba.style.display = window.scrollY > 300 ? "block" : "none";
  });

  // Scroll suave al hacer clic
  botonArriba.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Efecto hover
  botonArriba.addEventListener("mouseenter", () => {
    botonArriba.style.backgroundColor = "#FFD700";
    botonArriba.style.transform = "translateY(-3px)";
  });

  botonArriba.addEventListener("mouseleave", () => {
    botonArriba.style.backgroundColor = "#FF8C00";
    botonArriba.style.transform = "translateY(0)";
  });
}

// === ANIMACIONES AL SCROLL ===
function configurarAnimacionesScroll() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.item, .section-header').forEach(el => {
    observer.observe(el);
  });
}

// === MEJORA DE INTERACCIÓN PARA BOTONES ===
function mejorarBotones() {
  document.querySelectorAll('.cta-button').forEach(button => {
    // Efecto al tocar (móviles)
    button.addEventListener('touchstart', () => {
      button.style.transform = 'scale(0.95)';
    });
    
    button.addEventListener('touchend', () => {
      button.style.transform = 'scale(1)';
    });
    
    // Efecto al pasar el mouse (desktop)
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-3px)';
      button.style.boxShadow = '0 5px 15px rgba(255, 140, 0, 0.4)';
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translateY(0)';
      button.style.boxShadow = 'none';
    });
  });
}

// === INICIALIZACIÓN ===
document.addEventListener('DOMContentLoaded', () => {
  cargarHamburguesas();
  crearBotonSubir();
  configurarAnimacionesScroll();
  mejorarBotones();
  
  // Precarga de imágenes importantes
  const preloadImages = ['logo.png', 'especial.jpg', 'hawaiana.jpg'];
  preloadImages.forEach(img => {
    const image = new Image();
    image.src = `img/${img}`;
  });
});
