 let inicioX = 0;
    let inicioY = 0;
    const distanciaMinima = 60; // Distância mínima em pixels para considerar um deslize

    document.addEventListener('pointerdown', (evento) => {
      inicioX = evento.clientX;
      inicioY = evento.clientY;
    });

    document.addEventListener('pointerup', (evento) => {
      const fimX = evento.clientX;
      const fimY = evento.clientY;

      const diferencaX = fimX - inicioX;
      const diferencaY = fimY - inicioY;

      // Verifica se o movimento foi mais horizontal do que vertical
      if (Math.abs(diferencaX) > Math.abs(diferencaY)) {
        // Verifica se atingiu a distância mínima
        if (Math.abs(diferencaX) > distanciaMinima) {
          if (diferencaX > 0) {
            // Deslizou para a DIREITA -> Vai para o link anterior
            const linkAnterior = document.getElementById('link-anterior');
            if (linkAnterior) {
              window.location.href = linkAnterior.href;
            }
          } else {
            // Deslizou para a ESQUERDA -> Vai para o próximo link
            const linkProximo = document.getElementById('link-proximo');
            if (linkProximo) {
              window.location.href = linkProximo.href;
            }
          }
        }
      }
    });