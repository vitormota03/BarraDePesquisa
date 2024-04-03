// Aguarda até que o DOM esteja completamente carregado antes de executar o código
document.addEventListener('DOMContentLoaded', function () {
  // Seleciona o campo de entrada de texto da barra de pesquisa
  const searchInput = document.getElementById('searchInput');

  // Função para filtrar produtos com base no texto digitado na barra de pesquisa
  function filterProducts(searchText) {
    // Converte o texto digitado para minúsculas
    searchText = searchText.toLowerCase();

    // Seleciona todos os elementos com a classe 'card', que representam os produtos
    const products = document.querySelectorAll('.card');

    // Itera sobre cada produto
    products.forEach(function(product) {
      // Obtém o nome do produto do atributo 'data-name' e converte para minúsculas
      const productName = product.dataset.name.toLowerCase();

      // Verifica se o nome do produto contém o texto digitado na barra de pesquisa
      if (productName.includes(searchText)) {
        // Se o nome do produto incluir o texto da pesquisa, exibe o produto
        product.style.display = 'block';
      } else {
        // Caso contrário, oculta o produto
        product.style.display = 'none';
      }
    });
  }

  // Adiciona um ouvinte de eventos para o evento de input no campo de entrada de texto
  searchInput.addEventListener('input', function () {
    // Chama a função de filtro de produtos com o texto digitado na barra de pesquisa
    filterProducts(this.value);
  });

  // Captura o botão de busca por voz pelo ID
  const voiceButton = document.getElementById('voiceButton');
  let recognition; // Declaração de uma variável para armazenar o objeto de reconhecimento de voz

  // Adiciona um evento de clique ao botão de busca por voz
  voiceButton.addEventListener('click', () => {
    // Solicita permissão ao usuário para acessar o microfone
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(() => {
        // Cria um novo objeto de reconhecimento de voz
        recognition = new webkitSpeechRecognition() || new SpeechRecognition();

        // Define o idioma do reconhecimento de voz para o mesmo do navegador
        recognition.lang = navigator.language;

        // Define o que acontece quando há um resultado de reconhecimento de fala
        recognition.onresult = (event) => {
          // Obtém o texto reconhecido
          const voiceResult = event.results[0][0].transcript;

          // Define o valor do campo de entrada de texto com o texto reconhecido
          searchInput.value = voiceResult;

          // Despacha um evento de input no campo de entrada de texto para acionar o filtro de produtos
          searchInput.dispatchEvent(new Event('input'));
        };

        // Inicia o reconhecimento de fala
        recognition.start();

        // Adiciona foco ao campo de entrada de texto após clicar no botão de voz
        searchInput.focus();
      })
      .catch((err) => {
        // Em caso de erro, exibe uma mensagem no console
        console.error('Erro ao acessar o microfone:', err);
      });
  });

  // Captura o botão de busca pelo ID
  const searchButton = document.getElementById('searchButton');

  // Adiciona um evento de clique ao botão de busca
  searchButton.addEventListener('click', () => {
    // Verifica se o reconhecimento de fala está em andamento e o para, caso esteja
    if (recognition) {
      recognition.stop();
    }
    
    // Executa a função de filtro de produtos com o texto atual na barra de pesquisa
    filterProducts(searchInput.value);
  });
});
