// Test Progressive Reveal - Pruebas simples para desarrollo

(function() {
    'use strict';
    
    // Verificar que estamos en el navegador
    if (typeof document === 'undefined' || typeof window === 'undefined') {
        console.log('🧪 TEST PROGRESSIVE REVEAL: Ejecutándose en servidor, saltando tests');
        return;
    }
    
    console.log('🧪 TEST PROGRESSIVE REVEAL INICIANDO...');
    
    // Función simple para probar que el progressive reveal funciona
    function testBasicFunctionality() {
        console.log('\n📋 PROBANDO FUNCIONALIDAD BÁSICA');
        
        const elements = document.querySelectorAll('.progressive-reveal-element');
        console.log(`   Elementos progressive-reveal encontrados: ${elements.length}`);
        
        if (elements.length === 0) {
            console.log('   ⚠️  No hay elementos progressive-reveal en la página');
            return false;
        }
        
        // Verificar que los elementos tienen las clases correctas
        let validElements = 0;
        elements.forEach((element, index) => {
            const hasClass = element.classList.contains('progressive-reveal-element');
            const isRevealed = element.classList.contains('revealed');
            
            console.log(`   Elemento ${index + 1}: ${element.tagName} - Válido: ${hasClass} - Revelado: ${isRevealed}`);
            
            if (hasClass) {
                validElements++;
            }
        });
        
        console.log(`   Elementos válidos: ${validElements}/${elements.length}`);
        return validElements > 0;
    }
    
    // Función para probar Intersection Observer
    function testIntersectionObserver() {
        console.log('\n🔍 PROBANDO INTERSECTION OBSERVER');
        
        if (!('IntersectionObserver' in window)) {
            console.log('   ❌ Intersection Observer NO disponible');
            return false;
        }
        
        console.log('   ✅ Intersection Observer disponible');
        return true;
    }
    
    // Función para probar CSS
    function testCSS() {
        console.log('\n🎨 PROBANDO CSS');
        
        const testElement = document.querySelector('.progressive-reveal-element');
        if (!testElement) {
            console.log('   ❌ No hay elementos para probar');
            return false;
        }
        
        const styles = window.getComputedStyle(testElement);
        const opacity = styles.opacity;
        const transition = styles.transition;
        
        console.log(`   Opacity inicial: ${opacity}`);
        console.log(`   Transition: ${transition}`);
        
        const hasTransition = transition.includes('opacity') || transition.includes('transform');
        console.log(`   CSS válido: ${hasTransition ? '✅' : '❌'}`);
        
        return hasTransition;
    }
    
    // Función principal de pruebas
    function runTests() {
        console.log('🚀 EJECUTANDO PRUEBAS SIMPLES');
        
        let tests = 0;
        let passed = 0;
        
        // Test 1: Funcionalidad básica
        tests++;
        if (testBasicFunctionality()) {
            passed++;
        }
        
        // Test 2: Intersection Observer
        tests++;
        if (testIntersectionObserver()) {
            passed++;
        }
        
        // Test 3: CSS
        tests++;
        if (testCSS()) {
            passed++;
        }
        
        // Resultados
        console.log(`\n📊 RESULTADOS: ${passed}/${tests} pruebas pasaron`);
        
        if (passed === tests) {
            console.log('🎉 TODAS LAS PRUEBAS BÁSICAS PASARON');
        } else {
            console.log('⚠️  ALGUNAS PRUEBAS FALLARON');
        }
        
        return passed === tests;
    }
    
    // Función para simular scroll y activar animaciones
    function simulateReveal() {
        console.log('\n🎬 SIMULANDO REVEAL');
        
        const elements = document.querySelectorAll('.progressive-reveal-element:not(.revealed)');
        console.log(`   Revelando ${elements.length} elementos...`);
        
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('revealed');
                console.log(`   Elemento ${index + 1} revelado`);
            }, index * 200);
        });
    }
    
    // Exponer funciones globalmente para uso en consola
    window.testProgressiveReveal = {
        run: runTests,
        simulate: simulateReveal,
        basic: testBasicFunctionality,
        observer: testIntersectionObserver,
        css: testCSS
    };
    
    // Ejecutar pruebas después de 1 segundo
    setTimeout(() => {
        runTests();
    }, 1000);
    
    console.log('🧪 TEST PROGRESSIVE REVEAL CARGADO');
    console.log('Usa window.testProgressiveReveal.run() para ejecutar pruebas');
    console.log('Usa window.testProgressiveReveal.simulate() para simular animaciones');
    
})();

