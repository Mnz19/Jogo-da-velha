fetch("https://jogo-da-velha-507a5-default-rtdb.firebaseio.com/users.json")
  .then(response => response.json())
  .then(data => {
    const usuariosDados = Object.keys(data).map(key => ({ ...data[key], id: key }));
    usuariosDados.sort((a, b) => b.vitorias - a.vitorias);

    const conteudoTabela = document.getElementById('tabelaRanking').getElementsByTagName('tbody')[0];
    usuariosDados.forEach(usuario => {
      const linha = conteudoTabela.insertRow();
      linha.insertCell(0).textContent = usuario.nome;
      linha.insertCell(1).textContent = usuario.vitorias;
    });
  })
  .catch(error => console.error('Erro ao buscar os dados:', error));