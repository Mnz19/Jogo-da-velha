var loginCount = 0;
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            login(event.target);
        });
    });
});

async function login(form) {
    const nome = form.nome.value;
    const senha = form.senha.value;
    let usuario = null;

    try {
        const response = await fetch(`https://jogo-da-velha-507a5-default-rtdb.firebaseio.com/users.json?orderBy="nome"&equalTo="${nome}"&print=pretty'`);
        const data = await response.json();

        if(!response.ok) {
            throw new Error(data.message);
        }

        const objeto = Object.values(data);
        
        if(objeto.length !== null) {
            usuario = objeto[0];
            if(usuario.senha !== senha) {
                usuario = null;
            }
        }

        if(usuario) {
            if(form.id == 'form1') {
                localStorage.setItem('usuario1', JSON.stringify(data));
            } else {
                localStorage.setItem('usuario2', JSON.stringify(data));
            }
            if (localStorage.getItem('usuario1') && localStorage.getItem('usuario2')) {
                Swal.fire({
                    title: "Uhuuu!",
                    text: "Usuários logados com sucesso!",
                    icon: "success",
                    confirmButtonText: "Jogar",
                    cancelButtonText: "Cancelar",
                    showCancelButton: true
                }).then((value) => {
                    if (value.isConfirmed) {
                        window.location.href = "jogo.html";
                    }
                });

            } else {
                Swal.fire({
                    title: "Uhuuu!",
                    text: "Usuário logado com sucesso!",
                    icon: "success"
                });
                form.classList.add('hidden');
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Usuário ou senha inválidos!",
            });
        }
    } catch (error) {
        console.error('Erro ao buscar os dados:', error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Não foi possível realizar o login!",
        });
    }
}

function sair() {
    localStorage.removeItem("usuario1");
    localStorage.removeItem("usuario2");
    window.location.href = "login.html";
}