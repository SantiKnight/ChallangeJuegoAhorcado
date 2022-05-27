
let bienvenida = document.querySelector('.bienvenida');
let principal = document.querySelector('.juego-ahorcado');
let agregar = document.querySelector('.agregar-palabra')

function iniciarJuego(){
    bienvenida.classList.add("invisible");
    agregar.classList.add("invisible");
    principal.classList.remove("invisible");
}

function ocultar(){
    bienvenida.classList.add("invisible");
    principal.classList.add("invisible");
    agregar.classList.remove("invisible");
}

function cancelar(){
    bienvenida.classList.remove("invisible");
    principal.classList.add("invisible");
    agregar.classList.add("invisible");
}