// ELEMENTOS
// Secciones
const secActividad = document.getElementById('secActividad');
const secVelocidad = document.getElementById('lectura');

// Contenedores
const contenedorLectura = document.getElementById('contenedorLectura');
const contenedorPreguntas = document.getElementById('contenedorPreguntas');

// Botones
const btnContinuarInstrucciones = document.getElementById('btnContinuarInstrucciones');
const btnEmpezarVelocidad = document.getElementById('btnEmpezarVelocidad');
const btnTerminarVelocidad = document.getElementById('btnTerminarVelocidad');
const btnTerminarComprension = document.getElementById('btnTerminarComprension');
const btnReiniciar = document.getElementById('btnReiniciar');
const btnNuevaLectura = document.getElementById('btnNuevaLectura');

// Cadenas de texto
const txtTitulo = document.getElementById('txtTitulo');
const txtLectura = document.getElementById('txtLectura');
const txtContador = document.getElementById('txtContador');
const txtMinutosVelocidad = document.getElementById('txtMinutosVelocidad');
const txtPalabrasVelocidad = document.getElementById('txtPalabrasVelocidad');
const txtPuntuacionComprension = document.getElementById('txtPuntuacionComprension');

// Resultados
const resultadosVelocidad = document.getElementById('resultadosVelocidad');
const resultadosComprension = document.getElementById('resultadosComprension');

// VARIABLES
let lecturasActual;
let lecturaActual;
let procesoContador;
let contadorSegundos;
let contadorMinutos;

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
    if ( procesoContador ) {
        clearInterval(procesoContador);
    }
    const {titulo, lectura} = lecturaActual;

    btnTerminarVelocidad.style.display = 'none';
    resultadosVelocidad.style.display = 'none';
    resultadosComprension.style.display = 'none';
    txtContador.style.display = 'none';
    btnEmpezarVelocidad.style.display = 'initial';
    btnTerminarComprension.style.display = 'initial';

    txtContador.innerHTML = '00:00';
    txtTitulo.innerHTML = titulo;
    txtLectura.innerHTML = lectura;

    let contenido = '';
    lecturaActual.preguntas.map(({pregunta, opciones}, numPregunta) => {
        contenido += `<div class="mb-3"><label class="form-label">${pregunta}</label>`
        opciones.map((opcion, numOpcion) => {
            contenido += `<div class="form-check"><input class="form-check-input" type="radio" value="${opcion}" name="pregunta${numPregunta}" id="pregunta${numPregunta}opcion${numOpcion}"><label class="form-check-label" for="pregunta${numPregunta}opcion${numOpcion}">${opcion}</label></div>`;
        });
        contenido += '</div>';
    });
    contenedorPreguntas.innerHTML = contenido;
    secActividad.scrollIntoView({block: "start", behavior: "smooth"});
}

function obtenerLecturaPorNivel(nivel) {
    lecturasActual = lecturas[nivel - 1];
    obtenerNuevaLectura();
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
    txtPalabrasVelocidad.innerHTML = Math.round((lecturaActual.numPalabras/(contadorMinutos + contadorSegundos/60)) * 10) / 10;
    
    btnTerminarVelocidad.style.display = 'none';
    resultadosVelocidad.style.display = 'initial';

    resultadosVelocidad.scrollIntoView({block: "center", behavior: "smooth"});
}

btnTerminarComprension.onclick = () => {
    let aciertos = 0;
    const {preguntas} = lecturaActual;
    preguntas.map(({respuesta}, numPregunta) => {
        btnTerminarComprension.style.display = 'none';
        Array.from(document.getElementsByName(`pregunta${numPregunta}`)).map((opcion) => {
            opcion.disabled = true;
        })
        let opcionElegida = document.querySelector(`[name="pregunta${numPregunta}"]:checked`);
        if ( opcionElegida ) {
            if (opcionElegida.value == respuesta) {
                opcionElegida.classList.add('is-valid');
                aciertos++;
            } else opcionElegida.classList.add('is-invalid');
        }
    });
    txtPuntuacionComprension.innerHTML = `${Math.round((aciertos/preguntas.length) * 100)}%`;
    resultadosComprension.style.display = 'initial';
    resultadosComprension.scrollIntoView({block: "center", behavior: "smooth"});
}

btnReiniciar.onclick = mostrarLectura;
btnNuevaLectura.onclick = obtenerNuevaLectura;

// INICIO
obtenerLecturaPorNivel(1);