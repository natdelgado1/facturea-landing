// Progressive Reveal - Pruebas Unitarias y Verificación

(function() {
    'use strict';
    
    // Verificar que estamos en el navegador
    if (typeof document === 'undefined' || typeof window === 'undefined') {
        console.log('🧪 PROGRESSIVE REVEAL TESTS: Ejecutándose en servidor, saltando tests');
        return;
    }
    
    console.log('🧪 PROGRESSIVE REVEAL TESTS INICIANDO...');
    
    // Configuración de pruebas
    const TEST_CONFIG = {
        sections: [
            'hero',
            'about', 
            'how-it-works',
            'testimonials',
            'contact',
            'faq',
            'footer'
        ],
        expectedElements: {
            hero: 3,        // badge, title, description
            about: 6,       // badge, title, subtitle, 3 cards
            'how-it-works': 12, // badge, title, subtitle, tabs, 6 step cards
            testimonials: 8,     // title, subtitle, 6 testimonial cards
            contact: 4,          // badge, title, subtitle, form
            faq: 15,             // badge, title, subtitle, 10 faq items, cta
            footer: 3            // title, links, copyright
        }
    };
    
    // Función para verificar elementos en una sección
    function testSection(sectionName) {
        console.log(`\n📋 TESTEANDO SECCIÓN: ${sectionName.toUpperCase()}`);
        
        const section = document.querySelector(`#${sectionName}, [id*="${sectionName}"]`);
        if (!section) {
            console.log(`❌ Sección ${sectionName} no encontrada`);
            return false;
        }
        
        const elements = section.querySelectorAll('.progressive-reveal-element');
        const expected = TEST_CONFIG.expectedElements[sectionName] || 0;
        
        console.log(`   Elementos encontrados: ${elements.length}`);
        console.log(`   Elementos esperados: ${expected}`);
        
        if (elements.length === 0) {
            console.log(`   ⚠️  No hay elementos progressive-reveal en ${sectionName}`);
            return false;
        }
        
        // Verificar cada elemento
        elements.forEach((element, index) => {
            const isRevealed = element.classList.contains('revealed');
            const opacity = window.getComputedStyle(element).opacity;
            const transform = window.getComputedStyle(element).transform;
            const delay = element.getAttribute('data-delay') || '0';
            
            console.log(`   Elemento ${index + 1}:`);
            console.log(`     - Tag: ${element.tagName}`);
            console.log(`     - Revealed: ${isRevealed}`);
            console.log(`     - Opacity: ${opacity}`);
            console.log(`     - Transform: ${transform}`);
            console.log(`     - Delay: ${delay}ms`);
        });
        
        return elements.length > 0;
    }
    
    // Función para verificar Intersection Observer
    function testIntersectionObserver() {
        console.log('\n🔍 TESTEANDO INTERSECTION OBSERVER');
        
        if (!('IntersectionObserver' in window)) {
            console.log('❌ Intersection Observer NO está disponible');
            return false;
        }
        
        console.log('✅ Intersection Observer está disponible');
        
        const testElement = document.querySelector('.progressive-reveal-element');
        if (!testElement) {
            console.log('❌ No hay elementos para probar');
            return false;
        }
        
        return new Promise((resolve) => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    console.log(`   Elemento ${entry.target.tagName} intersectando: ${entry.isIntersecting}`);
                });
                observer.disconnect();
                resolve(true);
            }, {
                root: null,
                rootMargin: '0px 0px -5% 0px',
                threshold: 0.1
            });
            
            observer.observe(testElement);
            
            // Timeout de seguridad
            setTimeout(() => {
                observer.disconnect();
                resolve(false);
            }, 2000);
        });
    }
    
    // Función para verificar performance
    function testPerformance() {
        console.log('\n⚡ TESTEANDO PERFORMANCE');
        
        const elements = document.querySelectorAll('.progressive-reveal-element');
        const startTime = performance.now();
        
        // Simular scroll para activar animaciones
        elements.forEach(element => {
            element.classList.add('revealed');
        });
        
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        console.log(`   Tiempo de animación: ${duration.toFixed(2)}ms`);
        console.log(`   Elementos animados: ${elements.length}`);
        console.log(`   Tiempo promedio por elemento: ${(duration / elements.length).toFixed(2)}ms`);
        
        // Verificar que no hay reflow/repaint excesivo
        const willChangeElements = document.querySelectorAll('[style*="will-change"]');
        console.log(`   Elementos con will-change: ${willChangeElements.length}`);
        
        return duration < 100; // Debe ser menor a 100ms para ser considerado óptimo
    }
    
    // Función para verificar CSS
    function testCSS() {
        console.log('\n🎨 TESTEANDO CSS');
        
        const testElement = document.querySelector('.progressive-reveal-element');
        if (!testElement) {
            console.log('❌ No hay elementos para probar CSS');
            return false;
        }
        
        const styles = window.getComputedStyle(testElement);
        const opacity = styles.opacity;
        const transform = styles.transform;
        const transition = styles.transition;
        const willChange = styles.willChange;
        
        console.log(`   Opacity inicial: ${opacity}`);
        console.log(`   Transform inicial: ${transform}`);
        console.log(`   Transition: ${transition}`);
        console.log(`   Will-change: ${willChange}`);
        
        const isValid = opacity === '0' && 
                       transform.includes('translateX') && 
                       transition.includes('opacity') && 
                       willChange.includes('transform');
        
        console.log(`   CSS válido: ${isValid ? '✅' : '❌'}`);
        
        return isValid;
    }
    
    // Función para ejecutar todas las pruebas
    async function runAllTests() {
        console.log('🚀 INICIANDO PRUEBAS UNITARIAS COMPLETAS');
        
        let passedTests = 0;
        let totalTests = 0;
        
        // Test 1: Verificar secciones
        TEST_CONFIG.sections.forEach(section => {
            totalTests++;
            if (testSection(section)) {
                passedTests++;
            }
        });
        
        // Test 2: Verificar Intersection Observer
        totalTests++;
        const observerWorks = await testIntersectionObserver();
        if (observerWorks) {
            passedTests++;
        }
        
        // Test 3: Verificar performance
        totalTests++;
        if (testPerformance()) {
            passedTests++;
        }
        
        // Test 4: Verificar CSS
        totalTests++;
        if (testCSS()) {
            passedTests++;
        }
        
        // Resultados finales
        console.log('\n📊 RESULTADOS FINALES');
        console.log(`   Pruebas pasadas: ${passedTests}/${totalTests}`);
        console.log(`   Porcentaje de éxito: ${((passedTests / totalTests) * 100).toFixed(1)}%`);
        
        if (passedTests === totalTests) {
            console.log('🎉 TODAS LAS PRUEBAS PASARON - PROGRESSIVE REVEAL FUNCIONANDO CORRECTAMENTE');
        } else {
            console.log('⚠️  ALGUNAS PRUEBAS FALLARON - REVISAR IMPLEMENTACIÓN');
        }
        
        return passedTests === totalTests;
    }
    
    // Función para limpiar y reinicializar
    function resetAndReinit() {
        console.log('\n🔄 REINICIALIZANDO PROGRESSIVE REVEAL');
        
        const elements = document.querySelectorAll('.progressive-reveal-element');
        elements.forEach(element => {
            element.classList.remove('revealed');
        });
        
        if (window.reinitProgressiveReveal) {
            window.reinitProgressiveReveal();
            console.log('✅ Progressive reveal reinicializado');
        } else {
            console.log('❌ Función reinitProgressiveReveal no encontrada');
        }
    }
    
    // Exponer funciones para uso manual
    window.progressiveRevealTests = {
        runAll: runAllTests,
        testSection: testSection,
        testPerformance: testPerformance,
        testCSS: testCSS,
        resetAndReinit: resetAndReinit
    };
    
    // Ejecutar pruebas automáticamente después de 2 segundos
    setTimeout(() => {
        runAllTests();
    }, 2000);
    
    console.log('🧪 PROGRESSIVE REVEAL TESTS CARGADO');
    console.log('Usa window.progressiveRevealTests.runAll() para ejecutar pruebas');
    
})(); 