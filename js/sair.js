function sair() {
    localStorage.removeItem("usuario1");
    localStorage.removeItem("usuario2");
    window.location.href = "index.html";
}