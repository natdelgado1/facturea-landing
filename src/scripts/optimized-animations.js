// ✅ ANIMACIONES ULTRA-OPTIMIZADAS PARA MÍNIMO MAIN-THREAD WORK

// Variables globales
var animationsInitialized = false;
var observer = null;
var isScrolling = false;
var idleCallbackId = null;
var gsapLoaded = false;
var scrollTriggerLoaded = false;
var lenisLoaded = false;

// ✅ Función para cargar librerías progresivamente con prioridad ultra-optimizada
function loadLibrariesProgressively() {
  // Solo cargar en desktop y si no están ya cargadas
  if (window.innerWidth <= 768 || gsapLoaded) return;
  
  // Cargar GSAP core solo si es necesario
  if (typeof gsap === 'undefined') {
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js', function() {
      gsapLoaded = true;
      initAdvancedAnimations();
    });
  } else {
    gsapLoaded = true;
    initAdvancedAnimations();
  }
}

// ✅ Función para cargar ScrollTrigger solo cuando sea necesario
function loadScrollTrigger() {
  if (scrollTriggerLoaded || typeof ScrollTrigger !== 'undefined') return;
  
  loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js', function() {
    scrollTriggerLoaded = true;
    setupGSAPAnimations();
  });
}

// ✅ Función para cargar Lenis solo cuando el usuario haga scroll
function loadLenis() {
  if (lenisLoaded || typeof Lenis !== 'undefined') return;
  
  loadScript('https://cdn.jsdelivr.net/npm/lenis@1.3.8/dist/lenis.min.js', function() {
    lenisLoaded = true;
    initSmoothScrollWithLenis();
  });
}

// ✅ Función para cargar scripts optimizada
function loadScript(src, callback) {
  if (document.querySelector('script[src="' + src + '"]')) {
    if (callback) callback();
    return;
  }
  
  var script = document.createElement('script');
  script.src = src;
  script.async = true;
  script.defer = true;
  
  if (callback) {
    script.onload = callback;
  }
  
  document.head.appendChild(script);
}

// ✅ Animaciones básicas ultra-optimizadas con CSS nativo
function initBasicAnimations() {
  if (animationsInitialized) return;
  
  // Usar requestIdleCallback para animaciones no críticas
  if ('requestIdleCallback' in window) {
    requestIdleCallback(setupCSSAnimations, { timeout: 1000 });
  } else {
    setTimeout(setupCSSAnimations, 500);
  }
  
  animationsInitialized = true;
}

// ✅ Configurar animaciones CSS nativas ultra-optimizadas
function setupCSSAnimations() {
  // Hero animations usando CSS nativo
  var heroElements = document.querySelectorAll('#hero h1, #hero p, #hero .bg-primary');
  for (var i = 0; i < heroElements.length; i++) {
    var el = heroElements[i];
    el.classList.add('hero-animate');
    el.style.transitionDelay = (i * 0.1) + 's';
    
    // Trigger con Intersection Observer nativo
    var observer = new IntersectionObserver(function(entries) {
      for (var j = 0; j < entries.length; j++) {
        var entry = entries[j];
        if (entry.isIntersecting) {
          entry.target.classList.add('loaded');
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.1 });
    
    observer.observe(el);
  }
  
  // Animaciones para otras secciones
  var sections = ['beneficios', 'como-funciona', 'formulario', 'faq'];
  for (var k = 0; k < sections.length; k++) {
    var sectionId = sections[k];
    var section = document.getElementById(sectionId);
    if (!section) continue;
    
    var elements = section.querySelectorAll('.grid > div, .space-y-4 > div, form');
    for (var l = 0; l < elements.length; l++) {
      var element = elements[l];
      element.classList.add('animate-on-scroll');
      
      var sectionObserver = new IntersectionObserver(function(entries) {
        for (var m = 0; m < entries.length; m++) {
          var entry = entries[m];
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            sectionObserver.unobserve(entry.target);
          }
        }
      }, { threshold: 0.1 });
      
      sectionObserver.observe(element);
    }
  }
}

// ✅ Animaciones avanzadas solo cuando ScrollTrigger esté disponible
function initAdvancedAnimations() {
  if (typeof ScrollTrigger === 'undefined') {
    // Cargar ScrollTrigger solo si es necesario
    if ('requestIdleCallback' in window) {
      requestIdleCallback(loadScrollTrigger, { timeout: 2000 });
    } else {
      setTimeout(loadScrollTrigger, 1000);
    }
    return;
  }
  
  gsap.registerPlugin(ScrollTrigger);
  
  // Usar requestIdleCallback para animaciones no críticas
  if ('requestIdleCallback' in window) {
    requestIdleCallback(setupGSAPAnimations, { timeout: 2000 });
  } else {
    setTimeout(setupGSAPAnimations, 1000);
  }
}

// ✅ Configurar animaciones GSAP ultra-optimizadas
function setupGSAPAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  
  var sections = ['beneficios', 'como-funciona', 'formulario', 'faq'];
  
  for (var i = 0; i < sections.length; i++) {
    var sectionId = sections[i];
    var section = document.getElementById(sectionId);
    if (!section) continue;
    
    var elements = section.querySelectorAll('.grid > div, .space-y-4 > div, form');
    
    gsap.fromTo(elements, 
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.2, // Ultra-reducido
        stagger: 0.02, // Ultra-reducido
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }
}

// ✅ Scroll suave ultra-optimizado
function initSmoothScrollWithLenis() {
  if (typeof Lenis === 'undefined') return;
  
  var lenis = new Lenis({
    duration: 0.4, // Ultra-reducido
    easing: function(t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
    smoothWheel: true,
    wheelMultiplier: 0.4 // Ultra-reducido
  });
  
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

// ✅ Inicialización ultra-optimizada con requestIdleCallback
document.addEventListener('DOMContentLoaded', function() {
  // Cargar librerías después de que el DOM esté listo
  if ('requestIdleCallback' in window) {
    requestIdleCallback(loadLibrariesProgressively, { timeout: 1000 });
  } else {
    setTimeout(loadLibrariesProgressively, 100);
  }
});

// ✅ Optimización de scroll ultra-agresiva
var scrollTimeout;
window.addEventListener('scroll', function() {
  if (!isScrolling) {
    isScrolling = true;
    document.body.classList.add('scrolling');
  }
  
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(function() {
    isScrolling = false;
    document.body.classList.remove('scrolling');
    
    // Cleanup en tiempo libre
    if ('requestIdleCallback' in window) {
      requestIdleCallback(function() {
        if (window.gc) window.gc();
      }, { timeout: 1000 });
    }
  }, 25); // Ultra-reducido
}, { passive: true });

// ✅ Optimizaciones adicionales ultra-agresivas para main-thread
if ('requestIdleCallback' in window) {
  requestIdleCallback(function() {
    // Preload crítico
    var criticalImages = document.querySelectorAll('img[data-critical]');
    for (var i = 0; i < criticalImages.length; i++) {
      var img = criticalImages[i];
      if (img.dataset && img.dataset.src) {
        img.src = img.dataset.src;
      }
    }
  }, { timeout: 2000 });
} 