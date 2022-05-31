
'use strict'
const palabras = ['ALURA', 'SCRIPT','GITHUB','VISUAL','ESTUDIO','CONSOLA','ADMIN','SCRIPT','ESTILO','CASCADA','CABALLO','OVEJA','CABRA','AUDIO','SONIDO','PROFETA','PINGO','KATANA','ORACLE','JUEGO','PROGRAMA','GRATUITO','YOUTUBE','DIRECTO'];
let texto = document.querySelector('.input-text')
// variable para almacenar la configuracion actual           
let juego = null
//para ver si ya se ha enviada alguna alerta
let finalizado = false

let $html = {
    hombre: document.getElementById('hombre'),
    adivinado: document.querySelector('.adivinado'),
    errado: document.querySelector('.errado')
}

function dibujar(juego){
    //Actualizar imagen
    let $elem
    $elem = $html.hombre

    let estado = juego.estado
    if(juego.estado===8){
        estado = juego.previo
    }
    $elem.src = 'imagenes/0' + estado + '.png'

    //Creamos las letras adivinadas
    let palabra = juego.palabra
    let adivinado = juego.adivinado
    $elem = $html.adivinado
    //Borramos los elementos anteriores
    $elem.innerHTML = ''
    for(let letra of palabra){
        let $span = document.createElement('span')
        let $txt = document.createTextNode('')
        if(adivinado.indexOf(letra) >= 0){
            $txt.nodeValue = letra
        }
        $span.setAttribute('class','letra adivinada')
        $span.appendChild($txt)
        $elem.appendChild($span)
    }

    //Creamos las letras erradas
    let errado = juego.errado
    $elem = $html.errado
    //Borramos los elementos anteriores
    $elem.innerHTML = ''
    for (let letra of errado){
        let $span = document.createElement('span')
        let $txt = document.createTextNode(letra)
        $span.setAttribute('class','letra errada')
        $span.appendChild($txt)
        $elem.appendChild($span)
    }
}


function adivinar(juego, letra){
    let estado = juego.estado
    // si ya se a perdido o ganado, nada que hacer
    if (estado===1 || estado===8){
        return  
    }

    let adivinado = juego.adivinado
    let errado = juego.errado
    // Si ya hemos adivinado o errado la letra, tampoco  hacemos nada
    if(adivinado.indexOf(letra) >= 0 || errado.indexOf(letra) >= 0){
        return
    }

    let palabra = juego.palabra
    //si es letra de la palabra
    if(palabra.indexOf(letra) >= 0){
        let ganado = true;
        //debemos ver si llegamos al estado de ganado
        for(let l of palabra){
            if(adivinado.indexOf(l) < 0 && l != letra){
                ganado = false
                juego.previo = juego.estado
                break
            }
        }
        //si ya se ha ganado debemos indicarlo 
        if(ganado){
            juego.estado = 8;
        }
        //agregar la letra a la lista de letras adivinadas
        adivinado.push(letra)
    }
    else{
        //si no es letra de la palabra, acercamos al hombre un paso mas a ser ahorcado y agregamos la letr a las letras erradas
        juego.estado = juego.estado-1
        errado.push(letra)
    }
}

window.onkeypress = function adivinarLetra(e){
    let letra = e.key
    letra = letra.toUpperCase() 
    if(/[^A-ZÑ]/.test(letra)){
        return
    }
    adivinar(juego, letra)
    let estado = juego.estado
    if(estado === 8 && !finalizado){
        alertaGanado()
        finalizado = true
    }else if(estado === 1 && !finalizado){
        let palabra = juego.palabra
        alertaPerdido(palabra)
        finalizado = true
    }
    dibujar(juego)
}

window.nuevoJuego = function nuevoJuego(){
    let palabra = palabraAleatoria()
    juego = {}
    juego.palabra = palabra
    juego.estado = 7
    juego.adivinado = []
    juego.errado = []
    finalizado = false
    dibujar(juego)
    console.log(juego)
    iniciarJuego()
}

function palabraAleatoria(){
    let index = Math.trunc(Math.random() * palabras.length)
    return palabras[index]
}

function alertaGanado(){
    alert('Felicidades, ganaste!')
}

function alertaPerdido(palabra){
    alert('Lo siento, perdiste... La palabra era: '+palabra)
}

function guardar(){
    let input = texto.value
    if(/[^A-ZÑ]/.test(input)){
        alert('Ingrese una palabra válida,en mayúsculas, entre 2 y ocho letras y sin numeros...')
        input.value = ""
    }else{
        if(input.length<=8 && input.length>1){
            input = input.toUpperCase()
            palabras.push(input)
            nuevoJuego()
            input.value = ""
        }else{
            alert('Ingrese una palabra válida,en mayúsculas, entre 2 y ocho letras y sin numeros...')
            input.value = ""
        }
    }   
}

function desistir(){
    if(!finalizado){
        let palabra = juego.palabra
        alert('Muy difícil? La palabra era: '+palabra)
        cancelar()
    }else{
        cancelar()
    }
    
}
