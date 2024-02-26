let jogador1 = "&#10060;";
let jogador2 = "&#11093;&#65039;";
let vezDoJogador = jogador1;
let fimDeJogo = false;
let  tabuleiro = [
    [" ", " "," "],
    [" ", " ", " "],
    [" ", " ", " "]
];
const displayJogadorNome = document.querySelector('#display_jogador_nome')

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
    celulas.forEach(celula => {
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
    displayJogadorNome.innerHTML = `Vez do jogador: ${vezDoJogador}`
}


function verificarVitoria() {
    let vitoria = false;
    for (let i = 0; i < 3; i++) {
        if (tabuleiro[i][0] === vezDoJogador && tabuleiro[i][1] === vezDoJogador && tabuleiro[i][2] === vezDoJogador) {
            vitoria = true;
        }
        if (tabuleiro[0][i] === vezDoJogador && tabuleiro[1][i] === vezDoJogador && tabuleiro[2][i] === vezDoJogador) {
            vitoria = true;
        }
    }
    if (tabuleiro[0][0] === vezDoJogador && tabuleiro[1][1] === vezDoJogador && tabuleiro[2][2] === vezDoJogador) {
        vitoria = true;
    }
    if (tabuleiro[0][2] === vezDoJogador && tabuleiro[1][1] === vezDoJogador && tabuleiro[2][0] === vezDoJogador) {
        vitoria = true;
    }
    if (vitoria && fimDeJogo == false) {
        fimDeJogo = true;
        const paragrafoVitoria = document.createElement('p')
        paragrafoVitoria.innerHTML = `O jogador ${vezDoJogador} venceu!!`
        Swal.fire({
            title: "Parabéns",
            html: paragrafoVitoria,
            icon: "success"
        });
    }
}

function verificarEmpate() {
    let empate = true;
    for (let i = 0; i < 3; i++) {
        if (tabuleiro[i].includes(" ")) {
            console.log(tabuleiro[i]);
            empate = false;
        }
    }
    if (empate) {
        fimDeJogo = true;
        Swal.fire("EMPATE!");
    }
}
