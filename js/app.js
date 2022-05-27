;(function(){
    let juego = {
        palabra: "ALURA",
        estado: 4,
        adivinado: ['A','L'],
        errado: ['B','J','K','C']
    }

    let $html = {
        hombre: document.getElementById('hombre'),
        adivinado: document.querySelector('.adivinado'),
        errado: document.querySelector('.errado')
    }

    function dibujar(juego){
        let $elem
        $elem = $html.hombre
        let estado = juego.estado
        $elem.src = 'imagenes/0' + estado + '.png'

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
        if (estado===0 || estado===8){
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
                alert('Felicitaciones! Usted ganó')
            }
            //agregar la letra a la lista de letras adivinadas
            adivinado.push(letra)
        }
        else{
            //si no es letra de la palabra, acercamos al hombre un paso mas a ser ahorcado y agregamos la letr a las letras erradas
            juego.estado++
            errado.push(letra)
        }
    }

    window.onkeypress = function adivinarLetra(e){
        let letra = e.key
        letra = letra.toUpperCase()
        if(/[A-ZÑ]/.test(letra)){
            adivinar(juego,letra)
            dibujar(juego)
        }
        else{
            alert('Solo letras')
        }
        
    }

    dibujar(juego)
}())