// Progressive Reveal - Script optimizado y simple

(function() {
    'use strict';
    
    let observer = null;
    let elements = [];
    
    // Función para inicializar progressive reveal
    function initProgressiveReveal() {
        elements = document.querySelectorAll('.progressive-reveal-element');
        
        if (elements.length === 0) {
            return;
        }
        
        // Limpiar observer anterior si existe
        if (observer) {
            observer.disconnect();
        }
        
        // Crear nuevo Intersection Observer
        observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    if (!element.classList.contains('revealed')) {
                        // Agregar delay basado en data-delay
                        const delay = parseInt(element.getAttribute('data-delay')) || 0;
                        
                        setTimeout(() => {
                            element.classList.add('revealed');
                        }, delay);
                    }
                }
            });
        }, {
            root: null,
            rootMargin: '0px 0px -10% 0px', // Trigger cuando el elemento está 10% visible
            threshold: 0.1
        });
        
        // Observar todos los elementos
        elements.forEach(element => {
            observer.observe(element);
        });
        
        // Revelar elementos iniciales que ya están en viewport
        revealInitialElements();
    }
    
    // Función para revelar elementos iniciales
    function revealInitialElements() {
        elements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('revealed')) {
                const delay = parseInt(element.getAttribute('data-delay')) || 0;
                
                setTimeout(() => {
                    element.classList.add('revealed');
                }, delay);
            }
        });
    }
    
    // Función auxiliar para verificar si un elemento está en viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        return (
            rect.top <= windowHeight * 0.8 &&
            rect.bottom >= windowHeight * 0.2
        );
    }
    
    // Función para reinicializar (útil para cambios dinámicos)
    function reinitProgressiveReveal() {
        // Remover clases revealed de todos los elementos
        elements.forEach(element => {
            element.classList.remove('revealed');
        });
        
        initProgressiveReveal();
    }
    
    // Función para forzar revelación de todos los elementos
    function forceRevealAll() {
        elements.forEach(element => {
            element.classList.add('revealed');
        });
    }
    
    // Función para verificar estado
    function checkStatus() {
        const revealedElements = document.querySelectorAll('.progressive-reveal-element.revealed');
        const totalElements = document.querySelectorAll('.progressive-reveal-element');
        
        return {
            total: totalElements.length,
            revealed: revealedElements.length,
            percentage: (revealedElements.length / totalElements.length) * 100
        };
    }
    
    // Verificar que estamos en el navegador antes de ejecutar
    if (typeof document !== 'undefined' && typeof window !== 'undefined') {
        // Inicializar cuando el DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initProgressiveReveal);
        } else {
            initProgressiveReveal();
        }
        
        // También inicializar cuando la ventana esté completamente cargada
        window.addEventListener('load', () => {
            setTimeout(initProgressiveReveal, 100);
        });
        
        // Reinicializar en cambios de tamaño de ventana
        window.addEventListener('resize', () => {
            setTimeout(reinitProgressiveReveal, 100);
        });
        
        // Exponer funciones para uso manual
        window.reinitProgressiveReveal = reinitProgressiveReveal;
        window.forceRevealAll = forceRevealAll;
        window.checkProgressiveRevealStatus = checkStatus;
    }
    
})(); 