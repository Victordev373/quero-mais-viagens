// Aguarda o carregamento completo da página
document.addEventListener("DOMContentLoaded", function () {
  // Elementos dos botões (agora são links)
  const atendimentoBtn = document.getElementById("atendimento-btn");
  const promocoesBtn = document.getElementById("promocoes-btn");
  const linktreeBtn = document.getElementById("linktree-btn");

  // Função para adicionar efeito de clique nos links
  function adicionarEfeitoClique(link) {
    link.addEventListener("click", function (e) {
      // Efeito visual de clique
      this.style.transform = "scale(0.98)";
      this.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";

      // Restaurar estilo após 150ms
      setTimeout(() => {
        this.style.transform = "";
        this.style.boxShadow = "";
      }, 150);

      // Log no console (opcional)
      console.log(`Redirecionando para: ${this.href}`);
    });
  }

  // Aplicar efeito de clique a todos os botões-links
  if (atendimentoBtn) adicionarEfeitoClique(atendimentoBtn);
  if (promocoesBtn) adicionarEfeitoClique(promocoesBtn);
  if (linktreeBtn) adicionarEfeitoClique(linktreeBtn);

  // Efeito simples de fade-in nos elementos
  const elementosParaAnimacao = document.querySelectorAll(
    ".header, .button-card, .linktree-button",
  );

  elementosParaAnimacao.forEach((elemento, index) => {
    elemento.style.opacity = "0";
    elemento.style.transform = "translateY(20px)";

    setTimeout(() => {
      elemento.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      elemento.style.opacity = "1";
      elemento.style.transform = "translateY(0)";
    }, 100 * index);
  });
});
