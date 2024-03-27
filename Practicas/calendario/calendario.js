
//Constantes globales
const diasAbreviacion = ['Dom', 'Lun', 'Mar', 'Miér', 'Juev', 'Vier', 'Sáb'];
const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const img = ["img/Alemania.png","img/Argentina.png","img/España.png","img/EstadosUnidos.png","img/Filipinas.png","img/Francia.png",
    "img/Inglaterra.png","img/Italia.png","img/Japon.png","img/Marruecos.png","img/Mexico.png","img/Portugal.png","img/Sudafrica.png","img/Venezuela.png" ];

//Variables globales
//Mes del año consultado
let mes = 0;
//Año consultado
let año = 0;

//Escuchar eventos del documento HTML 
//El "DOM" proporciona una representación estructurada del documento DOMContentLoaded
//El evento "DOMContentLoaded" se dispara cuando el documento HTML ha sido completamente cargado y parseado, sin esperar hojas de estilo, imágenes y subtramas para finalizar la carga.
document.addEventListener('DOMContentLoaded', function () {
    
    //La primera vez que se carga la página se muestra el calendario del mes actual
    mes = obtenerFechaActual().getMonth();
    año = obtenerFechaActual().getFullYear(); 
    crearCalendario(mes, año);

    const imageElement = document.getElementById("image");
    let currentIndex = 0;
    // Cambiar la imagen cada 5 segundosº
    setInterval(function() {
        // Cambiar el src de la imagen
        imageElement.src = img[currentIndex];
        // Incrementar currentIndex para pasar a la siguiente imagen
        currentIndex++;
        // Si currentIndex llega al final del array, reiniciar a 0
        if (currentIndex >= img.length) {
            currentIndex = 0;
        }
    }, 5000); // 5000 milisegundos = 5 segundos
});

//Función para obtener la fecha actual
function obtenerFechaActual() {
    const fechaActual = new Date();
    return fechaActual;
}

//Función para crear el calendario conforme el mes y año
function crearCalendario(mesCalendario, añoCalendario) {
    mes = mesCalendario;
    año = añoCalendario;

    const fechaActual = obtenerFechaActual();
    const mesActual = fechaActual.getMonth();
    const añoActual = fechaActual.getFullYear();

    //Obtener el primer y último día del mes
    const primerDia = new Date(añoCalendario, mesCalendario, 1);
    const ultimoDia = new Date(añoCalendario, mesCalendario + 1, 0);
    const diasMes = ultimoDia.getDate();
    const primerDiaSemana = primerDia.getDay();

    const tablaCalendario = document.createElement('table');

    // Encabezado de días de la semana
    const filaEncabezado = document.createElement('tr');
    for (let i = 0; i < 7; i++) {
        const celda = document.createElement('th');
        celda.textContent = diasAbreviacion[i];
        celda.title = diasSemana[i];
        filaEncabezado.appendChild(celda);
    }
    tablaCalendario.appendChild(filaEncabezado);

    // Filas de días del mes
    let dia = 1;
    for (let i = 0; i < 6; i++) { // 6 filas para cubrir la mayoría de los meses
        const fila = document.createElement('tr');
        for (let j = 0; j < 7; j++) { // 7 columnas para cubrir todos los días de la semana
            if (i === 0 && j < primerDiaSemana) { //celdas vacías antes del primer día del mes
                const celda = document.createElement('td');
                fila.appendChild(celda);
            } else if (dia > diasMes) {//celdas vacías después del último día del mes
                break;
            } else { //Celdas con los días del mes
                const celda = document.createElement('td');
                celda.textContent = dia;
                if (mesCalendario === mesActual && añoCalendario === añoActual && dia === fechaActual.getDate()) {
                    celda.classList.add('dia-actual'); //Resaltar el día actual
                }
                fila.appendChild(celda);
                dia++;
            }
        }
        tablaCalendario.appendChild(fila); //Agregar fila al calendario
    }
    //Insertar tabla dentro del elemento con id calendario
    document.getElementById('calendario').appendChild(tablaCalendario);
    //Actualizar mes y año dentro del elemento con id mes y año
    document.getElementById('mes').innerHTML = "<h4>" + meses[mesCalendario] + "</h4>";
    document.getElementById('año').innerHTML = "<h4>" + añoCalendario + "</h4>";
}

//Función para avanzar el mes del calendario
function avanzarMesCalendario() {
    const fecha = new Date(año, mes, 1);
    //Si el mes es diciembre, avanzar al siguiente año
    fecha.getMonth() === 11 ? fecha.setFullYear(fecha.getFullYear() + 1) && fecha.setMonth(0) : fecha.setMonth(fecha.getMonth() + 1); 
    document.getElementById('calendario').innerHTML = '';
    document.getElementById('mes').innerHTML = "";
    document.getElementById('año').innerHTML = "";
    crearCalendario(fecha.getMonth(), fecha.getFullYear());
}

//Función para retroceder el mes del calendario
function retrocederMesCalendario() {
    const fecha = new Date(año, mes, 1);
    //Si el mes es enero, retroceder al año anterior
    fecha.getMonth() === 0 ? fecha.setFullYear(fecha.getFullYear() - 1) && fecha.setMonth(11) : fecha.setMonth(fecha.getMonth() - 1);
    document.getElementById('calendario').innerHTML = '';
    document.getElementById('mes').innerHTML = "";
    document.getElementById('año').innerHTML = "";
    crearCalendario(fecha.getMonth(), fecha.getFullYear());
}

//Función para mover el calendario
document.addEventListener('DOMContentLoaded', function () {
    const elem = document.getElementById('movible');
    let offsetX = 0;
    let offsetY = 0;
    let drag = false;

    elem.addEventListener('mousedown', function (e) { //Evento para cuando se presiona el mouse
        offsetX = e.clientX - elem.getBoundingClientRect().left;
        offsetY = e.clientY - elem.getBoundingClientRect().top;
        drag = true;
    });

    document.addEventListener('mouseup', function () { //Evento para cuando se suelta el mouse
        drag = false;
    });

    document.addEventListener('mousemove', function (e) { //Evento para cuando se mueve el mouse
        if (drag) {
            elem.style.left = e.clientX - offsetX + 'px';
            elem.style.top = e.clientY - offsetY + 'px';
        }
    });
});
