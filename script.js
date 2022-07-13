// Referencia a DOM
let mypass = document.getElementById("mypass");
let passHistory = document.getElementById("history");
let btnNumerica = document.getElementById("btnNumerica");
let btnAlfanumerica = document.getElementById("btnAlfanumerica");
let btnAlfabetica = document.getElementById("btnAlfabetica");
let btnResetHistorial = document.getElementById("btnResetHistorial");
let btnLogout = document.getElementById("btnLogout");
let contSaludo = document.getElementById("contSaludo");
let appContainer = document.getElementById("appContainer");

let removedFromHistory = document.querySelector("#history:nth-child(5)");

let claveACopiarDom = document.getElementById("claveACopiar");

// Variables Formulario
let contFormulario = document.querySelector(".contFormulario");
let formulario = document.getElementById("formulario");
let nombre = document.getElementById("nombre");
let usuario = document.getElementById("usuario");
let clave = document.getElementById("clave");

let inputNombre = sessionStorage.getItem("inputNombre");
let inputUsuario = sessionStorage.getItem("inputUsuario");
let inputClave = sessionStorage.getItem("inputClave");

// Variables del objeto password
let type = "";
let pass = "";

// Variables de password generada
let pass1;
let pass2;
let pass3;
let pass4;

let Minúsculas = [];
let Mayúsculas = [];

// Localstorage
let nombreUsuario = localStorage.getItem("nombreUsuario");
let usuarioUsuario = localStorage.getItem("usuarioUsuario");
let claveUsuario = localStorage.getItem("claveUsuario");



// Funcion ocultar app

const ocultarApp = () => {
    appContainer.style.display = "none";
};

// Funcion Mostrar app

const mostrararApp = () => {
    appContainer.style.display = "block";
};

// Funcion ocultar formulario

const ocultarFormulario = () => {
    contFormulario.style.display = "none";
    contSaludo.innerHTML = `
    <h2>Hola ${nombreUsuario}</h2>`;
};

// Funcion Formulario de Ingreso

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    nombreUsuario = nombre.value;
    usuarioUsuario = usuario.value;
    claveUsuario = clave.value;

    localStorage.setItem("nombreUsuario", nombre.value);
    localStorage.setItem("usuarioUsuario", usuario.value);
    localStorage.setItem("claveUsuario", clave.value);

    contSaludo.style.display = "block";

    ocultarFormulario();
    mostrararApp();

    Swal.fire({
        icon: "success",
        title: `Bienvenido ${nombreUsuario}`,
        showConfirmButton: false,
        timer: 1500,
    });
});




// Funcion constructora objeto password
class Password {
    constructor(type, pass) {
        this.type = type;
        this.pass = pass;
    }
}

// Generar array de numeros 0-9
let numeros = [];
for (let i = 0; i < 10; i++) {
    numeros.push(i);
}
let numeros2 = numeros;
let numerosPass = numeros.concat(numeros2);

// Generar Objetos con tipo de passowd y arrays



let password1 = new Password("Numérica", numerosPass);
let letras = new Password("Alfabética", Minúsculas);
let letrasMayusculas = new Password("Alfabética", Mayúsculas);
const concatLetras = letras.pass.concat(letrasMayusculas.pass);
let password3 = new Password("Alfabética", concatLetras);
const concatAlphanumeric = password1.pass.concat(password3.pass);
let password2 = new Password("Alfanumérica", concatAlphanumeric);

// Historial
let historial = [];
let historyLog = [];
historyLog = JSON.parse(localStorage.getItem("historyLog"));
let ultimo = "";
const printHistory = () => {
    if (historial.length > 1) {
        let div = document.createElement("div");
        ultimo = historial[historial.length - 2];
        div.innerHTML = `<p class="notification is-warning animate__animated animate__fadeInDown">${ultimo}</p>`;
        setTimeout(() => {
            passHistory.prepend(div);
        }, 900);
    }
};

// Funcion para imprimir password generada en DOM
const printPass = () => {
    mypass.innerHTML = `<h2 id="claveACopiar" class="clave notification is-success title is-5 animate__animated animate__pulse">${pass}</h2>`;
    printHistory();

    console.log(type);
    console.log(pass);
    console.log(...historyLog);
};

// Funcion desordenar array
function shuffleArray(inputArray) {
    inputArray.sort(() => Math.random() - 0.5);
    pass1 = inputArray.slice(0, 4);
    pass1 = pass1.join("");
    pass2 = inputArray.slice(4, 8);
    pass2 = pass2.join("");
    pass3 = inputArray.slice(8, 12);
    pass3 = pass3.join("");
    pass4 = inputArray.slice(12, 16);
    pass4 = pass4.join("");
    pass = [].concat(`${pass1}-${pass2}-${pass3}-${pass4}`);
    console.log(pass1);
    console.log(pass2);
    console.log(pass3);
    console.log(pass4);
    historial.push(pass); // push al array historial
    localStorage.setItem("historyLog", JSON.stringify(historial)); // Guarda historial en localstorage
    historyLog = JSON.parse(localStorage.getItem("historyLog")); // Recupera historial de localstorage
}

// Array de obetos con tipos de password
let passwordArray = [password1, password2, password3];
console.log(passwordArray);

// Generacion de password en base a selector
const passwordType = (option) => {
    switch (option) {
        case 1:
            shuffleArray(passwordArray[0].pass);
            type = passwordArray[0].type;
            break;
        case 2:
            shuffleArray(passwordArray[1].pass);
            type = passwordArray[1].type;
            break;
        case 3:
            shuffleArray(passwordArray[2].pass);
            type = passwordArray[2].type;
            break;

        default:
            break;
    }
};

// Eventos para seleccionar tipo de password a generar
btnNumerica.onclick = () => {
    passwordType(Number(1));
    printPass();
};
btnAlfanumerica.onclick = () => {
    passwordType(Number(2));
    printPass();
};
btnAlfabetica.onclick = () => {
    passwordType(Number(3));
    printPass();
};

btnResetHistorial.onclick = () => {
    passHistory.innerHTML = "";
    mypass.innerHTML = "";
    historial = [];
};

btnLogout.onclick = () => {
    localStorage.clear();
    contFormulario.style.display = "block";
    contSaludo.style.display = "none";
    ocultarApp();

    Swal.fire({
        title: "Hasta la proxima!",
        showConfirmButton: false,
        timer: 1500,
    });
};

// Console log de password generado con su tipo
console.log(type);
console.log(pass);

// Ocultar / mostrar Formulario

const usuarioIngreso = () => {
    ocultarFormulario();
    mostrararApp();
};

const usuarioNoIngreso = () => {
    ocultarApp();
};

!!nombreUsuario && !!usuarioUsuario && !!claveUsuario
    ? usuarioIngreso()
    : usuarioNoIngreso();

nombre.value = inputNombre;
usuario.value = inputUsuario;
clave.value = inputClave;

// Session Storage datos de formulario
nombre.addEventListener("input", (e) => {
    sessionStorage.setItem("inputNombre", e.target.value);
});
usuario.addEventListener("input", (e) => {
    sessionStorage.setItem("inputUsuario", e.target.value);
});
clave.addEventListener("input", (e) => {
    sessionStorage.setItem("inputClave", e.target.value);
});



const imprimirHistorialAnterior = () => {
    for (let i = 0; i < historyLog.length - 1; i++) {
        mypass.innerHTML = `<h2 class="clave notification is-success title is-5 animate__animated animate__pulse">${historyLog[0]}</h2>`;
        let div = document.createElement("div");
        div.innerHTML = `<p class="notification is-warning animate__animated animate__fadeInDown">${historyLog[i]}</p>`;
        console.log(historyLog[i]);
        passHistory.prepend(div);
    }
};

// imprimir historial anterior en html al ingresar a la app REVISAR CODIGO
historyLog ? imprimirHistorialAnterior : ocultarApp;

// Funcion copiar password a portapapeles
function copiarAlPortapapeles(id_elemento) {
    var aux = document.createElement("input");
    aux.setAttribute("value", document.getElementById(id_elemento).innerHTML);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
    Swal.fire({
        title: "Copiado al portapapeles!",
        showConfirmButton: false,
        timer: 1500,
    });
}

/* Backlog 
corregir semantica html, y estucturar mediante css

Entregar rpoyecto final


*/

