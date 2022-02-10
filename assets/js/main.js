// VARIABLES
// Secciones
let secActividad = document.getElementById('secActividad');
let secVelocidad = document.getElementById('lectura');
let contenedorLectura = document.getElementById('contenedorLectura');

// Botones
let btnContinuarInstrucciones = document.getElementById('btnContinuarInstrucciones');
let btnEmpezarVelocidad = document.getElementById('btnEmpezarVelocidad');
let btnTerminarVelocidad = document.getElementById('btnTerminarVelocidad');
let btnTerminarComprension = document.getElementById('btnTerminarComprension');
let btnReiniciar = document.getElementById('btnReiniciar');
let btnNuevaLectura = document.getElementById('btnNuevaLectura');

// Cadenas de texto
let txtTitulo = document.getElementById('txtTitulo');
let txtLectura = document.getElementById('txtLectura');
let txtContador = document.getElementById('txtContador');
let txtMinutosVelocidad = document.getElementById('txtMinutosVelocidad');
let txtPalabrasVelocidad = document.getElementById('txtPalabrasVelocidad');

// Resultados
let resultadosVelocidad = document.getElementById('resultadosVelocidad');
let resultadosComprension = document.getElementById('resultadosComprension');

let contenedorPreguntas = document.getElementById('contenedorPreguntas');
let = document;
let = document;
let = document;
let = document;
let = document;


let lecturasActual;
let lecturaActual;

let contadorSegundos = 0;
let contadorMinutos = 0;

// FUNCIONES
function obtenerLectura() {
    return lecturasActual[Math.floor(Math.random() * lecturasActual.length)];
}

function obtenerNuevaLectura() {
    let lecturaNueva;
    do {
        lecturaNueva = obtenerLectura();
    } while (lecturaNueva == lecturaActual && lecturasActual.length > 1);
    lecturaActual = lecturaNueva;
    mostrarLectura();
}

function mostrarLectura() {
    if (typeof procesoContador !== 'undefined') clearInterval(procesoContador);
    const {titulo, lectura} = lecturaActual;
    btnTerminarVelocidad.style.display = 'none';
    resultadosVelocidad.style.display = 'none';
    resultadosComprension.style.display = 'none';
    txtContador.style.display = 'none';
    btnEmpezarVelocidad.style.display = 'initial';
    txtContador.innerHTML = '00:00';
    txtTitulo.innerHTML = titulo;
    txtLectura.innerHTML = lectura;
    secActividad.scrollIntoView({block: "start", behavior: "smooth"});
}

function obtenerLecturaPorNivel(nivel) {
    lecturasActual = lecturas[nivel - 1];
    lecturaActual = obtenerLectura();
    mostrarLectura();
}

// LISTENERS
btnContinuarInstrucciones.onclick = () => {
    secActividad.style.display = 'block';
    btnContinuarInstrucciones.outerHTML = '';
    secActividad.scrollIntoView({block: "start", behavior: "smooth"});
}

btnEmpezarVelocidad.onclick = () => {
    contadorSegundos = 0;
    contadorMinutos = 0;

    btnEmpezarVelocidad.style.display = 'none';
    txtContador.style.display = 'initial';
    btnTerminarVelocidad.style.display = 'initial';

    contenedorLectura.scrollIntoView({block: "start", behavior: "smooth"});

    procesoContador = setInterval(() => {
        if (contadorSegundos == 59) {
            contadorMinutos++;
            contadorSegundos = 0;
        } else {
            contadorSegundos++;
        }
        txtContador.innerHTML = `${contadorMinutos < 10 ? 0 : ''}${contadorMinutos}:${contadorSegundos < 10 ? 0 : ''}${contadorSegundos}`;
    }, 1000);
}

btnTerminarVelocidad.onclick = () => {
    clearInterval(procesoContador);
    txtMinutosVelocidad.innerHTML = txtContador.innerHTML;
    txtPalabrasVelocidad.innerHTML = (lecturaActual.numPalabras/(contadorMinutos + contadorSegundos/60));
    
    btnTerminarVelocidad.style.display = 'none';
    resultadosVelocidad.style.display = 'initial';

    resultadosVelocidad.scrollIntoView({block: "center", behavior: "smooth"});
}

btnReiniciar.onclick = mostrarLectura;
btnNuevaLectura.onclick = obtenerNuevaLectura;

obtenerLecturaPorNivel(1);