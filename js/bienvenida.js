
let bienvenida = document.querySelector('.bienvenida');
let principal = document.querySelector('.juego-ahorcado');
let agregar = document.querySelector('.agregar-palabra');
let input = document.getElementById('input-text')

function iniciarJuego(){
    bienvenida.classList.add("invisible");
    agregar.classList.add("invisible");
    principal.classList.remove("invisible");
}

function ocultar(){
    bienvenida.classList.add("invisible");
    principal.classList.add("invisible");
    agregar.classList.remove("invisible");
    input.value = "";
}

function cancelar(){
    bienvenida.classList.remove("invisible");
    principal.classList.add("invisible");
    agregar.classList.add("invisible");
}