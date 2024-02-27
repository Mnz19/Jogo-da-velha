const usuario1 = JSON.parse(localStorage.getItem("usuario1"));
const usuario2 = JSON.parse(localStorage.getItem("usuario2"));
let jogador1 = "&#10060;";
let jogador2 = "&#11093;&#65039;";
let vezDoJogador = jogador1;
let fimDeJogo = false;
let tabuleiro = [
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "],
];
const displayJogadorNome = document.querySelector("#display_jogador_nome");
displayJogadorNome.innerHTML = `Vez do jogador: ${usuario1[Object.keys(usuario1)].nome} - ${vezDoJogador}`;

function gerarTabuleiro() {
  let tabuleiro = document.querySelector(".tabuleiro");
  for (let i = 0; i < 3; i++) {
    let linha = document.createElement("div");
    linha.classList.add("linha");
    for (let j = 0; j < 3; j++) {
      let celula = document.createElement("div");
      celula.classList.add("celula");
      celula.setAttribute("data-linha", i);
      celula.setAttribute("data-coluna", j);
      //celula.innerHTML = `linha = ${i} coluna ${j} `
      linha.appendChild(celula);
    }
    tabuleiro.appendChild(linha);
  }
  adicionarEventoCelula();
}

function adicionarEventoCelula() {
  let celulas = document.querySelectorAll(".celula");
  celulas.forEach((celula) => {
    celula.addEventListener("click", jogar);
  });
}

function jogar(event) {
  if (fimDeJogo) return;
  let linha = event.target.getAttribute("data-linha");
  let coluna = event.target.getAttribute("data-coluna");
  if (tabuleiro[linha][coluna] === " ") {
    tabuleiro[linha][coluna] = vezDoJogador;
    event.target.innerHTML = vezDoJogador;
    verificarEmpate();
    verificarVitoria();
    vezDoJogador = vezDoJogador === jogador1 ? jogador2 : jogador1;
  }
  if(vezDoJogador == jogador1){
    displayJogadorNome.innerHTML = `Vez do jogador: ${usuario1[Object.keys(usuario1)].nome} - ${vezDoJogador}`;
  } else {
    displayJogadorNome.innerHTML = `Vez do jogador: ${usuario2[Object.keys(usuario2)].nome} - ${vezDoJogador}`;
  }
}

function verificarVitoria() {
  let vitoria = false;

  for (let i = 0; i < 3; i++) {
    if (
      tabuleiro[i][0] === vezDoJogador &&
      tabuleiro[i][1] === vezDoJogador &&
      tabuleiro[i][2] === vezDoJogador
    ) {
      vitoria = true;
    }
    if (
      tabuleiro[0][i] === vezDoJogador &&
      tabuleiro[1][i] === vezDoJogador &&
      tabuleiro[2][i] === vezDoJogador
    ) {
      vitoria = true;
    }
  }

  if (
    tabuleiro[0][0] === vezDoJogador &&
    tabuleiro[1][1] === vezDoJogador &&
    tabuleiro[2][2] === vezDoJogador
  ) {
    vitoria = true;
  }
  
  if (
    tabuleiro[0][2] === vezDoJogador &&
    tabuleiro[1][1] === vezDoJogador &&
    tabuleiro[2][0] === vezDoJogador
  ) {
    vitoria = true;
  }
  
  if (vitoria && fimDeJogo == false) {
    fimDeJogo = true;

    let campeao = {};
    
    if(vezDoJogador == jogador1){
      usuario1[Object.keys(usuario1)].vitorias++;
      localStorage.setItem("usuario1", JSON.stringify(usuario1));
      campeao = usuario1;
    } else {
      usuario2[Object.keys(usuario2)].vitorias++;
      localStorage.setItem("usuario2", JSON.stringify(usuario2));
      campeao = usuario2;
    }

    const paragrafoVitoria = document.createElement("p");
    paragrafoVitoria.innerHTML = `O jogador ${campeao[Object.keys(campeao)].nome} ${vezDoJogador} venceu!!`;
    
    atualizarVitoriasBanco(campeao);
    Swal.fire({
      title: "Parabéns",
      html: paragrafoVitoria,
      icon: "success",
    }).then(() => {
      resetarJogo();
    });
  }
}

function verificarEmpate() {
  let empate = true;
  for (let i = 0; i < 3; i++) {
    if (tabuleiro[i].includes(" ")) {
      empate = false;
    }
  }
  if (empate) {
    fimDeJogo = true;
    Swal.fire("EMPATE!").then(() => {
      resetarJogo();

    });
  }
}

function atualizarVitoriasBanco(campeao) {
    fetch(
        "https://jogo-da-velha-507a5-default-rtdb.firebaseio.com/users.json",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(campeao),
        }
      );
}

function resetarJogo() {
  location.reload();
}

function sair() {
    localStorage.removeItem("usuario1");
    localStorage.removeItem("usuario2");
    window.location.href = "login.html";
}