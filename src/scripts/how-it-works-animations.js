// ============================================
// ANIMACIONES GSAP - Lazy Loading
// ============================================
// Este archivo se carga solo cuando la sección es visible
// para mejorar el rendimiento inicial

(function() {
  'use strict';
  
  // Variables globales
  var animationsReady = false;
  var animationsInitialized = false;
  
  // ✅ OPTIMIZACIÓN: Lazy loading de GSAP
  function loadGSAP(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      // Cache check
      if (window.gsap && window.ScrollTrigger) {
        resolve();
        return;
      }
      
      // Preload con prefetch
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
      document.head.appendChild(link);
      
      // Carga dinámica optimizada
      const gsapScript = document.createElement('script');
      gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
      gsapScript.async = true;
      gsapScript.onload = () => {
        // Cargar ScrollTrigger después de GSAP
        const scrollTriggerScript = document.createElement('script');
        scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
        scrollTriggerScript.async = true;
        scrollTriggerScript.onload = () => resolve();
        scrollTriggerScript.onerror = () => reject(new Error('Failed to load ScrollTrigger'));
        document.head.appendChild(scrollTriggerScript);
      };
      gsapScript.onerror = () => reject(new Error('Failed to load GSAP'));
      document.head.appendChild(gsapScript);
    });
  }

  // Función principal - Dividida en chunks para evitar tareas largas
  async function initGSAPAnimations() {
    try {
      // ✅ Cargar GSAP si no está disponible
      if (typeof window.gsap === 'undefined' || typeof window.ScrollTrigger === 'undefined') {
        await loadGSAP();
      }

      // ✅ Evitar inicialización duplicada
      if (animationsInitialized) {
        return;
      }

      // ✅ Registrar ScrollTrigger
      window.gsap.registerPlugin(window.ScrollTrigger);
      
      // Limpiar animaciones previas
      if (window.ScrollTrigger && window.ScrollTrigger.getAll) {
        window.ScrollTrigger.getAll().forEach(function(trigger) {
          trigger.kill();
        });
      }

      // ===== ANIMACIONES - Divididas en chunks =====
      
      // Chunk 1: Animaciones básicas (usar requestIdleCallback si está disponible)
      const initBasicAnimations = () => {
        // 1. Badge entrada
        window.gsap.fromTo('.gsap-badge', 
          { opacity: 0, y: -30, scale: 0.8 },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '#como-funciona',
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );

        // 2. Título
        window.gsap.fromTo('.gsap-title', 
          { opacity: 0, y: 50 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '#como-funciona',
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );

        // 3. Subtítulo
        window.gsap.fromTo('.gsap-subtitle', 
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.2,
            scrollTrigger: {
              trigger: '#como-funciona',
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );

        // 4. Tabs
        window.gsap.fromTo('.gsap-tabs', 
          { opacity: 0, y: 40 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '#como-funciona',
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      };

      // Chunk 2: Animaciones de cards (más pesadas)
      const initCardAnimations = () => {
        // 5. Cards con stagger
        window.gsap.fromTo('.gsap-card', 
          { opacity: 0, y: 60, scale: 0.95 },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: '#content-facturador',
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );

        // 6. Iconos de las cards
        window.gsap.fromTo('.gsap-card .icon-container', 
          { opacity: 0, scale: 0.5 },
          { 
            opacity: 1, 
            scale: 1, 
            rotation: 0,
            duration: 0.8,
            ease: 'back.out(1.7)',
            stagger: 0.1,
            scrollTrigger: {
              trigger: '#content-facturador',
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      };

      // Chunk 3: Hover effects (en tiempo libre)
      const initHoverEffects = () => {
        document.querySelectorAll('.gsap-card').forEach(function(card) {
          let hoverTimeout;
          
          card.addEventListener('mouseenter', function() {
            clearTimeout(hoverTimeout);
            hoverTimeout = setTimeout(() => {
              if (window.gsap) {
                window.gsap.to(card, {
                  y: -8, scale: 1.02, duration: 0.3, ease: 'power2.out'
                });
              }
            }, 50);
          });

          card.addEventListener('mouseleave', function() {
            clearTimeout(hoverTimeout);
            if (window.gsap) {
              window.gsap.to(card, {
                y: 0, scale: 1, duration: 0.3, ease: 'power2.out'
              });
            }
          });
        });
      };

      // Chunk 4: Elementos flotantes (opcional, baja prioridad)
      const initFloatingElements = () => {
        document.querySelectorAll('.floating-element').forEach(function(element, index) {
          // Movimiento flotante infinito
          window.gsap.to(element, {
            y: 15 + index * 5,
            rotation: 5 + index * 2,
            duration: 3 + index * 0.5,
            ease: 'power1.inOut',
            yoyo: true,
            repeat: -1
          });

          // Parallax ligero
          window.gsap.to(element, {
            y: -30 - index * 10,
            scrollTrigger: {
              trigger: '#como-funciona',
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          });
        });
      };

      // Ejecutar chunks en secuencia para evitar tareas largas
      initBasicAnimations();
      
      // Usar setTimeout para dividir tareas
      setTimeout(() => {
        initCardAnimations();
        
        // Hover effects en tiempo libre
        if (window.requestIdleCallback) {
          requestIdleCallback(initHoverEffects, { timeout: 500 });
          requestIdleCallback(initFloatingElements, { timeout: 1000 });
        } else {
          setTimeout(initHoverEffects, 100);
          setTimeout(initFloatingElements, 200);
        }
      }, 0);

      animationsInitialized = true;
      animationsReady = true;
      
      // Inicializar morphing de badges
      initBadgeMorphing();

    } catch (error) {
      console.error('❌ Error en GSAP:', error);
    }
  }

  // ===== FUNCIÓN DE MORPHING DE BADGES =====
  
  function initBadgeMorphing() {
    const badges = document.querySelectorAll('.badge-morphing');
    
    badges.forEach((badge, index) => {
      const badgeElement = badge;
      
      // Animación escalonada de entrada
      setTimeout(() => {
        badgeElement.style.animation = 'badgeEntrance 0.6s ease-out';
      }, index * 200);
      
      // Configurar morphing específico para cada badge
      setupBadgeMorphing(badgeElement, index);
    });
  }

  function setupBadgeMorphing(badge, index) {
    const badgeText = badge.textContent?.trim() || '';
    let morphFunction;
    let morphInterval;
    
    if (badgeText.includes('2 minutos')) {
      morphInterval = 4000;
      morphFunction = (currentState) => {
        const clockNormal = badge.querySelector('.morph-path-clock-normal');
        const clockActive = badge.querySelector('.morph-path-clock-active');
        
        if (clockNormal && clockActive) {
          clockNormal.style.opacity = currentState === 0 ? '1' : '0';
          clockActive.style.opacity = currentState === 0 ? '0' : '1';
        }
      };
    } else if (badgeText.includes('100% digital')) {
      morphInterval = 3500;
      morphFunction = (currentState) => {
        const computerPath = badge.querySelector('.morph-path-computer');
        const cloudPath = badge.querySelector('.morph-path-cloud');
        
        if (computerPath && cloudPath) {
          computerPath.style.opacity = currentState === 0 ? '1' : '0';
          cloudPath.style.opacity = currentState === 0 ? '0' : '1';
        }
      };
    } else if (badgeText.includes('24 horas')) {
      morphInterval = 3000;
      morphFunction = (currentState) => {
        const calendarPath = badge.querySelector('.morph-path-calendar');
        const moneyPath = badge.querySelector('.morph-path-money');
        
        if (calendarPath && moneyPath) {
          calendarPath.style.opacity = currentState === 0 ? '1' : '0';
          moneyPath.style.opacity = currentState === 0 ? '0' : '1';
        }
      };
    } else if (badgeText.includes('Rápido y fácil')) {
      morphInterval = 3500;
      morphFunction = (currentState) => {
        const checkPath = badge.querySelector('.morph-path-check');
        const arrowPath = badge.querySelector('.morph-path-arrow');
        
        if (checkPath && arrowPath) {
          checkPath.style.opacity = currentState === 0 ? '1' : '0';
          arrowPath.style.opacity = currentState === 0 ? '0' : '1';
        }
      };
    } else if (badgeText.includes('Verificadas')) {
      morphInterval = 4000;
      morphFunction = (currentState) => {
        const shieldPath = badge.querySelector('.morph-path-shield');
        const shieldCheckPath = badge.querySelector('.morph-path-shield-check');
        
        if (shieldPath && shieldCheckPath) {
          shieldPath.style.opacity = currentState === 0 ? '1' : '0';
          shieldCheckPath.style.opacity = currentState === 0 ? '0' : '1';
        }
      };
    } else if (badgeText.includes('12%+ ROI')) {
      morphInterval = 3000;
      morphFunction = (currentState) => {
        const chartPath = badge.querySelector('.morph-path-chart');
        const roiMoneyPath = badge.querySelector('.morph-path-roi-money');
        
        if (chartPath && roiMoneyPath) {
          chartPath.style.opacity = currentState === 0 ? '1' : '0';
          roiMoneyPath.style.opacity = currentState === 0 ? '0' : '1';
        }
      };
    } else {
      return;
    }
    
    let currentState = 0;
    
    function morphBadge() {
      morphFunction(currentState);
      currentState = (currentState + 1) % 2;
    }
    
    // Iniciar morphing después de un delay
    setTimeout(() => {
      morphBadge();
      setInterval(morphBadge, morphInterval);
    }, 1000 + (index * 500));
    
    // Efecto de hover que acelera la transición
    badge.addEventListener('mouseenter', morphBadge);
  }

  // Exponer función globalmente para que tabs.js pueda usarla
  window.initBadgeMorphing = initBadgeMorphing;

  // ===== SISTEMA DE INICIALIZACIÓN =====
  
  function tryInitAnimations() {
    if (!animationsReady) {
      initGSAPAnimations();
    }
  }

  // Inicializar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryInitAnimations);
  } else {
    tryInitAnimations();
  }

  // Para navegación SPA de Astro
  document.addEventListener('astro:page-load', function() {
    animationsInitialized = false;
    animationsReady = false;
    setTimeout(tryInitAnimations, 200);
  });

  // Cleanup para navegación SPA
  document.addEventListener('astro:before-preparation', function() {
    if (window.ScrollTrigger && window.ScrollTrigger.getAll) {
      window.ScrollTrigger.getAll().forEach(function(trigger) {
        trigger.kill();
      });
    }
    animationsInitialized = false;
    animationsReady = false;
  });
})();
