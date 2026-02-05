// ============================================
// FUNCIONALIDAD DE TABS - Carga inmediata
// ============================================
// Esta funcionalidad es crítica y debe cargarse de inmediato
// para que los tabs funcionen sin esperar animaciones

(function() {
  'use strict';
  
  // Variables para evitar inicialización duplicada
  let tabsInitialized = false;
  
  function initTabs() {
    if (tabsInitialized) return;
    
    const facturadorBtn = document.getElementById('tab-facturador-btn');
    const inversorBtn = document.getElementById('tab-inversor-btn');
    const facturadorContent = document.getElementById('content-facturador');
    const inversorContent = document.getElementById('content-inversor');

    if (!facturadorBtn || !inversorBtn || !facturadorContent || !inversorContent) {
      // Reintentar si los elementos no están listos
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTabs);
      } else {
        setTimeout(initTabs, 100);
      }
      return;
    }

    function switchToFacturador() {
      // Botones
      facturadorBtn.classList.remove('inactive-tab');
      facturadorBtn.classList.add('active-tab');
      inversorBtn.classList.remove('active-tab');
      inversorBtn.classList.add('inactive-tab');
      
      // Contenido
      facturadorContent.classList.remove('hidden');
      inversorContent.classList.add('hidden');
      
      // Reiniciar animaciones de badges si están disponibles
      if (typeof window.initBadgeMorphing === 'function') {
        window.initBadgeMorphing();
      }
      
      // Reinicializar animaciones de cards si GSAP está disponible
      if (window.gsap) {
        setTimeout(() => {
          window.gsap.fromTo('#content-facturador .gsap-card', 
            { opacity: 0, y: 60, scale: 0.95 },
            { 
              opacity: 1, 
              y: 0, 
              scale: 1,
              duration: 0.8,
              ease: 'power2.out',
              stagger: 0.15
            }
          );
        }, 100);
      }
    }

    function switchToInversor() {
      // Botones
      inversorBtn.classList.remove('inactive-tab');
      inversorBtn.classList.add('active-tab');
      facturadorBtn.classList.remove('active-tab');
      facturadorBtn.classList.add('inactive-tab');
      
      // Contenido
      inversorContent.classList.remove('hidden');
      facturadorContent.classList.add('hidden');
      
      // Reiniciar animaciones de badges si están disponibles
      if (typeof window.initBadgeMorphing === 'function') {
        window.initBadgeMorphing();
      }
      
      // Reinicializar animaciones de cards si GSAP está disponible
      if (window.gsap) {
        setTimeout(() => {
          window.gsap.fromTo('#content-inversor .gsap-card', 
            { opacity: 0, y: 60, scale: 0.95 },
            { 
              opacity: 1, 
              y: 0, 
              scale: 1,
              duration: 0.8,
              ease: 'power2.out',
              stagger: 0.15
            }
          );
        }, 100);
      }
    }

    facturadorBtn.addEventListener('click', switchToFacturador);
    inversorBtn.addEventListener('click', switchToInversor);
    
    tabsInitialized = true;
  }

  // Inicializar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTabs);
  } else {
    initTabs();
  }

  // Para navegación SPA de Astro
  document.addEventListener('astro:page-load', function() {
    tabsInitialized = false;
    setTimeout(initTabs, 100);
  });
})();
