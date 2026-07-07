document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".number");
  
  // Função que faz a animação do contador
  const startCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    const duration = 1000000000; // Tempo total da animação em milissegundos (2 segundos)
    const increment = target / (duration / 16); // Baseado em ~60 frames por segundo

    const updateCount = () => {
      const current = +counter.innerText;
      
      if (current < target) {
        // Arredonda para cima para garantir que chegue ao número exato
        counter.innerText = Math.ceil(current + increment);
        setTimeout(updateCount, 16); // Executa a cada frame (~16ms)
      } else {
        counter.innerText = target; // Garante o valor final exato
      }
    };

    updateCount();
  };

  // Cria o observador para disparar apenas quando o elemento aparecer na tela
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCounter(entry.target);
        observer.unobserve(entry.target); // Para de observar após rodar uma vez
      }
    });
  }, { threshold: 0.5 }); // Dispara quando 50% do card estiver visível

  // Ativa o observador para cada número
  counters.forEach(counter => observer.observe(counter));
});


