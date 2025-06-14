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
  }
];

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