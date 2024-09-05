//Inicializaciónn de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let timer = 90;
let temporizador = false;
let tiempoRegresivoId = null;
let timerInicial = 90;

// Apuntando a documento HTML
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante');

let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>(Math.random()-0.5));
console.log(numeros);

//Funciones
function contarTiempo(){
    tiempoRegresivoId = setInterval(()=>{
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if(timer == 0){
            clearInterval(tiempoRegresivoId); 
            bloquearTarjetas();
        }
    },1000);
}

function bloquearTarjetas(){
    for (let i = 0; i<=15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = numeros[i];
        tarjetaBloqueada.disabled = true;
    }
}

//Funcion principal
function destapar(id){

    if(temporizador == false){
        contarTiempo();
        temporizador = true;
    }

    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);

    if(tarjetasDestapadas == 1){
        // Mostarr primer número
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.innerHTML = primerResultado;

        //Desabilitar primer boton
        tarjeta1.disabled = true;
    } else if(tarjetasDestapadas == 2) {
        //Mostrar segundo número
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = segundoResultado;

        //Desabilitar segundo boton
        tarjeta2.disabled = true;

        //Incrementar movimientos
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if(primerResultado == segundoResultado){
            //Contador de tarjetas destapadas
            tarjetasDestapadas = 0;

            //Aumentar aciertos
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

            if(aciertos == 8){
                clearInterval(tiempoRegresivoId);
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 😱`
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} 🤟😎`;
                mostrarTiempo.innerHTML = `Fantastico 🤩 solo demoraste ${timerInicial - timer} segundos`
            }
        }else{
            //Mostrar momentaneamente valores y colver a tapar
            setTimeout(()=>{
                tarjeta1.innerHTML = ' ';
                tarjeta2.innerHTML = ' ';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            }, 800);
        }
    }
}

function cambiarColor() {
    let root = document.documentElement;
    let currentColor = getComputedStyle(root).getPropertyValue('--main-color').trim();

    if (currentColor === '#ff4da6') {
        // Cambiar a azul neón
        root.style.setProperty('--main-color', '#2E9AFE');
        root.style.setProperty('--neon-shadow', '#2E9AFE');
    } else {
        // Cambiar a rosa neón
        root.style.setProperty('--main-color', '#ff4da6');
        root.style.setProperty('--neon-shadow', '#ff4da6');
    }
}

function reiniciarJuego() {
    clearInterval(tiempoRegresivoId);
    movimientos = 0;
    aciertos = 0;
    timer = timerInicial;
    temporizador = false;
    mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
    mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
    mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
    numeros = numeros.sort(() => (Math.random() - 0.5));
    for (let i = 0; i <= 15; i++) {
        let tarjeta = document.getElementById(i);
        tarjeta.innerHTML = '';
        tarjeta.disabled = false;
    }
}