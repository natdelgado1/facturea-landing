export function initHeroAnimations() {
    const typewriterTexts = document.querySelectorAll(".typewriter-text");
      let currentIndex = 0;

      function typeNextText() {
        if (currentIndex >= typewriterTexts.length) {
          return; // Terminamos todas las animaciones
        }

        const textElement = typewriterTexts[currentIndex];
        const originalText = textElement.getAttribute("data-text") || "";

        // Asegurar que el texto esté vacío
        textElement.textContent = "";

        // Efecto de escritura letra por letra
        let charIndex = 0;
        const typeInterval = setInterval(() => {
          if (charIndex < originalText.length) {
            textElement.textContent += originalText[charIndex];
            charIndex++;
          } else {
            clearInterval(typeInterval);
            // Pasar al siguiente texto después de una pausa
            setTimeout(() => {
              currentIndex++;
              typeNextText();
            }, 150); // Pausa entre palabras (más rápida)
          }
        }, 50); // Velocidad de escritura (ms por letra) - más rápido
      }

      // Iniciar la secuencia
      setTimeout(typeNextText, 500); // Delay inicial
    
  }