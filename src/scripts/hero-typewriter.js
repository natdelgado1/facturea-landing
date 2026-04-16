export function initHeroAnimations() {
    const typewriterTexts = document.querySelectorAll(".typewriter-text");
    if (typewriterTexts.length === 0) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        typewriterTexts.forEach((element) => {
            const full = element.getAttribute("data-text") || "";
            element.textContent = full;
            element.classList.add("complete");
            element.classList.remove("typing");
        });
        return;
    }

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
          }, 100);
        }
      }, 38);
    }

    // Inicializar todos los elementos como vacíos
    typewriterTexts.forEach(element => {
      element.textContent = "";
      element.classList.remove('typing', 'complete');
    });

    setTimeout(typeNextText, 280);
}