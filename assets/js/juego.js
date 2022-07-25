(() => {   // Encapsulamos el codigo en un modulo (funcion autoinvocante) para que no pueda ser manipulado por el usuario
    'use strict'

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
    especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugador = 0,
        puntosComputadora = 0;

    // Referencias del HTML
    const btnPedir = document.querySelector('#btnPedir');
    const btnDetener = document.querySelector('#btnDetener');
    const btnNuevo = document.querySelector('#btnNuevo');
    const divCartasJugador = document.querySelector('#jugador-cartas')
    const divCartasComputadora = document.querySelector('#computadora-cartas')
    const puntosHTML = document.querySelectorAll('small');
    const playerName = document.getElementById('playerName');
    const formulario = document.getElementById("formulario");




    document.getElementById('container').style.display = 'none';


    // Funcion nombre de jugador
    let nombreIngresado = '';
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    nombreIngresado = nombre.value;
    playerName.innerText = nombreIngresado;
    formulario.style.display = 'none';
    container.style.display = 'block';
} )



    // Esta funcion crea una nueva baraja

    const crearDeck = () => {

        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }

        for (let tipo of tipos) {
            for (let esp of especiales)
                deck.push(esp + tipo);
        }

        deck = _.shuffle(deck);

        return deck;
    }

    crearDeck();

    // Esta funcion me permite tomar una carta

    const pedirCarta = () => {
        if (deck.length === 0) {
            throw 'Ya no hay cartas en el deck';
        }

        const carta = deck.pop();
        return carta;
    }

    // pedirCarta()

    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1;
    }

    // Turno de la computadora

    const turnoComputadora = (puntosMinimos) => {

        do {
            const carta = pedirCarta();

            puntosComputadora = puntosComputadora + valorCarta(carta);
            puntosHTML[1].innerText = puntosComputadora; //* [1] porque es la segunda etiqueta <spann></spann>

            // <img class="carta" src="assets/cartas/10C.png">
            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${carta}.png`;
            imgCarta.classList.add('carta');
            divCartasComputadora.append(imgCarta);

            if (puntosMinimos > 21) {
                break;
            }

        } while ((puntosComputadora < puntosMinimos) && puntosMinimos <= 21);

        setTimeout(() => {

            if (puntosComputadora === puntosMinimos) {
                aSwal.fire('Es un empate!');
            } else if (puntosMinimos > 21) {
                Swal.fire('Computadora Gana');
            } else if (puntosComputadora > 21) {
                Swal.fire(`${nombreIngresado} es el ganador!!!`);
            } else {
                Swal.fire('Computadora Gana');
            }

        }, 1000);  //* Para ejecutar los alert 1 segundo despues de que se ejecute el turno de la computadora, evitando que se muestre antes que las cartas.

    }



    // Eventos

    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();

        puntosJugador = puntosJugador + valorCarta(carta);
        puntosHTML[0].innerText = puntosJugador; //* [0] porque es la primera etiqueta <spann></spann>

        // <img class="carta" src="assets/cartas/10C.png">
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugador.append(imgCarta);

        if (puntosJugador > 21) {
            console.warn('Lo siento mucho, perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);


        } else if (puntosJugador === 21) {
            console.warn('21, Genial!');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    })

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    });

    btnNuevo.addEventListener('click', () => {

        console.clear();
        deck = [];
        crearDeck();

        btnPedir.disabled = !true;
        btnDetener.disabled = !true;

        puntosJugador = 0;
        puntosComputadora = 0;

        puntosHTML[0].innerText = 0;
        puntosHTML[1].innerText = 0;

        divCartasComputadora.innerHTML = '';
        divCartasJugador.innerHTML = '';
        pedirNombreJugador();
    });

})();



