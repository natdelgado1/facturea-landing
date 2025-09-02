// Test Progressive Reveal - Script para verificar funcionamiento

(function() {
    'use strict';
    
    // Verificar que estamos en el navegador
    if (typeof document === 'undefined' || typeof window === 'undefined') {
        console.log('=== TEST PROGRESSIVE REVEAL: Ejecutándose en servidor, saltando tests ===');
        return;
    }
    
    console.log('=== TEST PROGRESSIVE REVEAL ===');
    
    // Función para verificar elementos
    function testElements() {
        const elements = document.querySelectorAll('.progressive-reveal-element');
        console.log(`Elementos encontrados: ${elements.length}`);
        
        elements.forEach((element, index) => {
            const isRevealed = element.classList.contains('revealed');
            const opacity = window.getComputedStyle(element).opacity;
            const transform = window.getComputedStyle(element).transform;
            
            console.log(`Elemento ${index + 1}:`);
            console.log(`  - Tag: ${element.tagName}`);
            console.log(`  - Classes: ${element.className}`);
            console.log(`  - Revealed: ${isRevealed}`);
            console.log(`  - Opacity: ${opacity}`);
            console.log(`  - Transform: ${transform}`);
            console.log(`  - Data-delay: ${element.getAttribute('data-delay')}`);
            console.log('  ---');
        });
    }
    
    // Función para simular scroll
    function testScroll() {
        console.log('=== TESTING SCROLL ===');
        
        const elements = document.querySelectorAll('.progressive-reveal-element');
        elements.forEach((element, index) => {
            // Remover clase revealed para simular estado inicial
            element.classList.remove('revealed');
            console.log(`Elemento ${index + 1} reset a estado inicial`);
        });
        
        // Esperar un momento y luego forzar revelación
        setTimeout(() => {
            console.log('Forzando revelación de elementos...');
            if (window.reinitProgressiveReveal) {
                window.reinitProgressiveReveal();
            }
        }, 500);
    }
    
    // Función para verificar Intersection Observer
    function testIntersectionObserver() {
        console.log('=== TESTING INTERSECTION OBSERVER ===');
        
        if ('IntersectionObserver' in window) {
            console.log('✅ Intersection Observer está disponible');
            
            const testElement = document.querySelector('.progressive-reveal-element');
            if (testElement) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        console.log(`Elemento ${entry.target.tagName} intersectando: ${entry.isIntersecting}`);
                    });
                }, {
                    root: null,
                    rootMargin: '0px 0px -5% 0px',
                    threshold: 0.1
                });
                
                observer.observe(testElement);
                console.log('✅ Observer creado y observando elemento de prueba');
                
                // Limpiar después de 2 segundos
                setTimeout(() => {
                    observer.disconnect();
                    console.log('✅ Observer desconectado');
                }, 2000);
            } else {
                console.log('❌ No se encontró elemento para probar');
            }
        } else {
            console.log('❌ Intersection Observer NO está disponible');
        }
    }
    
    // Ejecutar tests
    setTimeout(testElements, 1000);
    setTimeout(testIntersectionObserver, 1500);
    
    // Exponer función de test
    window.testProgressiveReveal = testElements;
    window.testProgressiveScroll = testScroll;
    
    console.log('=== TEST PROGRESSIVE REVEAL CARGADO ===');
    console.log('Usa window.testProgressiveReveal() para verificar elementos');
    console.log('Usa window.testProgressiveScroll() para probar scroll');
    
})(); 