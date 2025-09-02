// ✅ SISTEMA GLOBAL DE ANIMACIONES GSAP REUTILIZABLES
// Este archivo contiene todas las animaciones optimizadas que se pueden reutilizar

// Declaraciones de tipos para GSAP
declare global {
    // eslint-disable-next-line no-unused-vars
    interface Window {
        gsap: any;
        ScrollTrigger: any;
    }
}

// Variables globales
let animationsReady = false;
let animationsInitialized = false;

// ✅ OPTIMIZACIÓN: Lazy loading de GSAP con prefetch
export function loadGSAP(): Promise<void> {
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
        gsapScript.async = true; // Carga asíncrona
        gsapScript.onload = () => {
            const scrollTriggerScript = document.createElement('script');
            scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
            scrollTriggerScript.async = true;
            scrollTriggerScript.onload = () => resolve();
            document.head.appendChild(scrollTriggerScript);
        };
        document.head.appendChild(gsapScript);
    });
}

// ✅ ANIMACIONES BÁSICAS REUTILIZABLES
export const GSAPAnimations = {
    // Badge entrada
    badge: (selector: string, trigger: string = 'section') => {
        return window.gsap.fromTo(selector, 
            { opacity: 0, y: -30, scale: 0.8 },
            { 
                opacity: 1, 
                y: 0, 
                scale: 1, 
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: trigger,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    },

    // Título con efecto
    title: (selector: string) => {
        return window.gsap.fromTo(selector, 
            { opacity: 0, y: 50 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: selector,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    },

    // Subtítulo
    subtitle: (selector: string, delay: number = 0.2) => {
        return window.gsap.fromTo(selector, 
            { opacity: 0, y: 30 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.8,
                ease: 'power2.out',
                delay: delay,
                scrollTrigger: {
                    trigger: selector,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    },

    // Tabs
    tabs: (selector: string) => {
        return window.gsap.fromTo(selector, 
            { opacity: 0, y: 40 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: selector,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    },

    // Cards con stagger
    cards: (selector: string, stagger: number = 0.15) => {
        return window.gsap.fromTo(selector, 
            { opacity: 0, y: 60, scale: 0.95 },
            { 
                opacity: 1, 
                y: 0, 
                scale: 1,
                duration: 0.8,
                ease: 'power2.out',
                stagger: stagger,
                scrollTrigger: {
                    trigger: selector,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    },

    // Iconos de cards
    cardIcons: (selector: string) => {
        return window.gsap.fromTo(selector, 
            { opacity: 0, scale: 0.5, rotation: -180 },
            { 
                opacity: 1, 
                scale: 1, 
                rotation: 0,
                duration: 0.8,
                ease: 'back.out(1.7)',
                stagger: 0.1,
                scrollTrigger: {
                    trigger: selector,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    },

    // Contadores animados
    counters: (selector: string) => {
        const counters = document.querySelectorAll(selector);
        counters.forEach(function(counter, index) {
            const target = parseInt(counter.getAttribute('data-target') || '0');
            const valueElement = counter.querySelector('.counter-value');
            
            if (valueElement) {
                window.gsap.to(valueElement, {
                    innerHTML: target,
                    duration: 3,
                    ease: 'power2.out',
                    snap: { innerHTML: 1 },
                    scrollTrigger: {
                        trigger: counter,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                });
            }
        });
    },

    // Elementos flotantes
    floatingElements: (selector: string, sectionId: string) => {
        document.querySelectorAll(selector).forEach(function(element, index) {
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
                    trigger: sectionId,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });
        });
    },

    // Hover effects con throttling
    hoverEffects: (selector: string) => {
        document.querySelectorAll(selector).forEach(function(card) {
            let hoverTimeout: any;
            
            card.addEventListener('mouseenter', function() {
                clearTimeout(hoverTimeout);
                hoverTimeout = setTimeout(() => {
                    window.gsap.to(card, {
                        y: -8, scale: 1.02, duration: 0.3, ease: 'power2.out'
                    });
                }, 50); // Throttle de 50ms
            });

            card.addEventListener('mouseleave', function() {
                clearTimeout(hoverTimeout);
                window.gsap.to(card, {
                    y: 0, scale: 1, duration: 0.3, ease: 'power2.out'
                });
            });
        });
    }
};

// ✅ SISTEMA DE INICIALIZACIÓN GLOBAL
export async function initGSAPAnimations(config: {
    sectionId?: string;
    animations?: string[];
    customAnimations?: any[];
}) {
    try {
        // ✅ Cargar GSAP si no está disponible
        if (typeof window.gsap === 'undefined' || typeof window.ScrollTrigger === 'undefined') {
            console.log('⏳ Cargando GSAP...');
            await loadGSAP();
        }

        // ✅ Evitar inicialización duplicada
        if (animationsInitialized) {
            console.log('⚠️ Animaciones ya inicializadas');
            return;
        }

        // ✅ Registrar ScrollTrigger
        window.gsap.registerPlugin(window.ScrollTrigger);
        
        console.log('🚀 Iniciando animaciones GSAP...');
        
        // Limpiar animaciones previas
        window.ScrollTrigger.getAll().forEach(function(trigger: any) {
            trigger.kill();
        });

        // ✅ Ejecutar animaciones configuradas
        if (config.animations) {
            config.animations.forEach(animation => {
                switch (animation) {
                    case 'badge':
                        GSAPAnimations.badge('.gsap-badge', config.sectionId);
                        break;
                    case 'title':
                        GSAPAnimations.title('.gsap-title');
                        break;
                    case 'subtitle':
                        GSAPAnimations.subtitle('.gsap-subtitle');
                        break;
                    case 'tabs':
                        GSAPAnimations.tabs('.gsap-tabs');
                        break;
                    case 'cards':
                        GSAPAnimations.cards('.gsap-card');
                        break;
                    case 'cardIcons':
                        GSAPAnimations.cardIcons('.gsap-card .icon-container');
                        break;
                    case 'counters':
                        GSAPAnimations.counters('.gsap-counter');
                        break;
                    case 'floatingElements':
                        if (config.sectionId) {
                            GSAPAnimations.floatingElements('.floating-element', config.sectionId);
                        }
                        break;
                    case 'hoverEffects':
                        GSAPAnimations.hoverEffects('.gsap-card');
                        break;
                }
            });
        }

        // ✅ Ejecutar animaciones personalizadas
        if (config.customAnimations) {
            config.customAnimations.forEach(animation => {
                animation();
            });
        }

        animationsInitialized = true;
        animationsReady = true;
        
        console.log('✅ Todas las animaciones GSAP inicializadas correctamente!');

    } catch (error) {
        console.error('❌ Error en GSAP:', error);
    }
}

// ✅ SISTEMA DE INICIALIZACIÓN ROBUSTO
export function tryInitAnimations(config: any) {
    if (!animationsReady) {
        initGSAPAnimations(config);
    }
}

// ✅ UTILIDADES PARA NAVEGACIÓN SPA
export function setupSPANavigation(config: any) {
    // Para navegación SPA de Astro
    document.addEventListener('astro:page-load', function() {
        animationsInitialized = false;
        animationsReady = false;
        setTimeout(() => tryInitAnimations(config), 200);
    });

    // Cleanup para navegación SPA
    document.addEventListener('astro:before-preparation', function() {
        if (typeof window.ScrollTrigger !== 'undefined') {
            window.ScrollTrigger.getAll().forEach(function(trigger: any) {
                trigger.kill();
            });
        }
        animationsInitialized = false;
        animationsReady = false;
    });
}

// ✅ UTILIDADES PARA BADGES MORPHING
export function initBadgeMorphing() {
    const badges = document.querySelectorAll('.badge-morphing');
    console.log(`Encontrados ${badges.length} badges con morphing`);
    
    badges.forEach((badge, index) => {
        const badgeElement = badge as HTMLElement;
        
        // Animación escalonada de entrada
        setTimeout(() => {
            badgeElement.style.animation = 'badgeEntrance 0.6s ease-out';
        }, index * 200);
        
        // Configurar morphing específico para cada badge
        setupBadgeMorphing(badgeElement, index);
    });
}

function setupBadgeMorphing(badge: HTMLElement, index: number) {
    const badgeText = badge.textContent?.trim() || '';
    let morphFunction: (currentState: number) => void;
    let morphInterval: number;
    
    // Configurar morphing según el tipo de badge
    if (badgeText.includes('2 minutos')) {
        morphInterval = 4000;
        morphFunction = (currentState: number) => {
            const clockNormal = badge.querySelector('.morph-path-clock-normal') as HTMLElement;
            const clockActive = badge.querySelector('.morph-path-clock-active') as HTMLElement;
            
            if (clockNormal && clockActive) {
                clockNormal.style.opacity = currentState === 0 ? '1' : '0';
                clockActive.style.opacity = currentState === 0 ? '0' : '1';
            }
        };
    } else if (badgeText.includes('100% digital')) {
        morphInterval = 3500;
        morphFunction = (currentState: number) => {
            const computerPath = badge.querySelector('.morph-path-computer') as HTMLElement;
            const cloudPath = badge.querySelector('.morph-path-cloud') as HTMLElement;
            
            if (computerPath && cloudPath) {
                computerPath.style.opacity = currentState === 0 ? '1' : '0';
                cloudPath.style.opacity = currentState === 0 ? '0' : '1';
            }
        };
    } else if (badgeText.includes('24 horas')) {
        morphInterval = 3000;
        morphFunction = (currentState: number) => {
            const calendarPath = badge.querySelector('.morph-path-calendar') as HTMLElement;
            const moneyPath = badge.querySelector('.morph-path-money') as HTMLElement;
            
            if (calendarPath && moneyPath) {
                calendarPath.style.opacity = currentState === 0 ? '1' : '0';
                moneyPath.style.opacity = currentState === 0 ? '0' : '1';
            }
        };
    } else if (badgeText.includes('Rápido y fácil')) {
        morphInterval = 3500;
        morphFunction = (currentState: number) => {
            const checkPath = badge.querySelector('.morph-path-check') as HTMLElement;
            const arrowPath = badge.querySelector('.morph-path-arrow') as HTMLElement;
            
            if (checkPath && arrowPath) {
                checkPath.style.opacity = currentState === 0 ? '1' : '0';
                arrowPath.style.opacity = currentState === 0 ? '0' : '1';
            }
        };
    } else if (badgeText.includes('Verificadas')) {
        morphInterval = 4000;
        morphFunction = (currentState: number) => {
            const shieldPath = badge.querySelector('.morph-path-shield') as HTMLElement;
            const shieldCheckPath = badge.querySelector('.morph-path-shield-check') as HTMLElement;
            
            if (shieldPath && shieldCheckPath) {
                shieldPath.style.opacity = currentState === 0 ? '1' : '0';
                shieldCheckPath.style.opacity = currentState === 0 ? '0' : '1';
            }
        };
    } else if (badgeText.includes('12%+ ROI')) {
        morphInterval = 3000;
        morphFunction = (currentState: number) => {
            const chartPath = badge.querySelector('.morph-path-chart') as HTMLElement;
            const roiMoneyPath = badge.querySelector('.morph-path-roi-money') as HTMLElement;
            
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
    badge.addEventListener('mouseenter', function() {
        morphBadge();
    });
}

console.log('📋 Sistema global de animaciones GSAP cargado'); 