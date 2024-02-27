const form = document.querySelector('form');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    cadastrar();
})

async function cadastrar() {
    const nome = document.getElementById('nome').value;
    const senha = document.getElementById('senha').value;
    const vitorias = 0;
    const existe = await verificarExistenciaUsuario(nome);

    if(existe) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Usuário já cadastrado!",
          });
        return;
    } else {
        try {
            const response = await fetch('https://jogo-da-velha-507a5-default-rtdb.firebaseio.com/users.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({nome, senha, vitorias})
            })
    
            if(!response.ok) {
                throw new Error(data.message);
            }
    
            Swal.fire({
                title: "Uhuuu!",
                text: "Usuário cadastrado com sucesso!",
                icon: "success"
            });
    
            limparCampos();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Não foi possível cadastrar o usuário!",
              });
        }
    }
}

async function verificarExistenciaUsuario(nome) {
    const response = await fetch(`https://jogo-da-velha-507a5-default-rtdb.firebaseio.com/users.json?orderBy="nome"&equalTo="${nome}"&print=pretty'`);
    const data = await response.json();
    if(data && Object.keys(data).length > 0) {
        return true;
    } else {
        return false;
    }
}

function limparCampos() {
    document.getElementById('nome').value = '';
    document.getElementById('senha').value = '';
}