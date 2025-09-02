export function initHeroAnimations() {
    const typewriterTexts = document.querySelectorAll(".typewriter-text");
    let currentIndex = 0;

    function typeNextText() {
      if (currentIndex >= typewriterTexts.length) {
        // Terminamos todas las animaciones - eliminar cursor del último elemento
        if (typewriterTexts.length > 0) {
          const lastElement = typewriterTexts[typewriterTexts.length - 1];
          lastElement.classList.add('complete');
          lastElement.classList.remove('typing');
        }
        return;
      }

      const textElement = typewriterTexts[currentIndex];
      const originalText = textElement.getAttribute("data-text") || "";

      // Asegurar que el texto esté vacío y agregar clase typing para mostrar cursor
      textElement.textContent = "";
      textElement.classList.add('typing');
      textElement.classList.remove('complete');

      // Efecto de escritura letra por letra
      let charIndex = 0;
      const typeInterval = setInterval(() => {
        if (charIndex < originalText.length) {
          textElement.textContent += originalText[charIndex];
          charIndex++;
        } else {
          clearInterval(typeInterval);
          
          // Si no es el último elemento, quitar el cursor de este elemento
          if (currentIndex < typewriterTexts.length - 1) {
            textElement.classList.add('complete');
            textElement.classList.remove('typing');
          }
          
          // Pasar al siguiente texto después de una pausa
          setTimeout(() => {
            currentIndex++;
            typeNextText();
          }, 150); // Pausa entre palabras (más rápida)
        }
      }, 50); // Velocidad de escritura (ms por letra) - más rápido
    }

    // Inicializar todos los elementos como vacíos
    typewriterTexts.forEach(element => {
      element.textContent = "";
      element.classList.remove('typing', 'complete');
    });

    // Iniciar la secuencia
    setTimeout(typeNextText, 500); // Delay inicial
}