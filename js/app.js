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
        $elem.src = 'imagenes/0' + juego.estado + '.png'

        let palabra = juego.palabra
        let adivinado = juego.adivinado
        $elem = $html.adivinado
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
        for (let letra of errado){
            let $span = document.createElement('span')
            let $txt = document.createTextNode(letra)
            $span.setAttribute('class','letra errada')
            $span.appendChild($txt)
            $elem.appendChild($span)
        }
    }


    dibujar(juego)
}())