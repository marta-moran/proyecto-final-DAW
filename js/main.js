const minusculas = "abcdfghijklmnñopqrstuvwxyz";
const mayusculas = minusculas.toLocaleUpperCase();
const especiales = "!?¿¡/()&¬%$·#+^[]{};.";
const numeros = "1234567890";

/*
class Usuario {
    constructor(nombre, nuevoNombreUsuario, nuevaClaveusuario) {
        this.usuario = nombre;
        this.clave = nuevoNombreUsuario;
        this.nombre = nuevaClaveusuario;
    }
}
*/

const app = Vue.createApp({
    data() {
        return {
            result: null,
            usuario: null,
            clave: null,
            error: null,
            usuarios: new Map(),
            newName: "",
            newUserName: "",
            newPass: "",
            repeatNewPass: "",
            nuevoUsuario: [],

        };
    },
    created() {
        fetch("json/usuarios.json")
            .then(response => response.json())
            .then(response => this.usuarios = response)
    },
    methods: {
        async loginUsuario() {
            /*const response = await fetch("json/usuarios.json");
            const data = await response.json();
            this.usuarios = data;
            console.log(this.usuarios);*/
            let existe = false;

            for (user of this.usuarios) {
                if (this.usuario == user.usuario && this.clave == user.clave) {
                    this.result = user.nombre;
                    existe = true;
                    console.log(user.nombre)
                    console.log(this.usuarios)
                    //location.href = "principal.html";
                    //habría que mandar el user.nombre a una variable para q luego se muestre en la página principal
                }
            }
            if (!existe) {
                this.error = "Usuario o contraseña incorrectos";
            }
        },
        registroUsuario() {
            location.href = "index-registro.html";
        },

        validarNuevoUsuario() {
            let especialesOk = true;
            let mayusculasOk = true;
            let userNameRepetido = false;

            for (user of this.usuarios) {
                if (this.newUserName == user.usuario) {
                    userNameRepetido = true
                    this.error = "El nombre de usuario ya existe"
                }
            }


            for (let i = 0; i < especiales.length; i++) {
                for (let j = 0; j < mayusculas.length; j++) {
                    if (this.newUserName.includes(especiales.charAt(i))) {
                        especialesOk = false;
                    }
                    if (this.newUserName.includes(mayusculas.charAt(j))) {
                        mayusculasOk = false;
                    }
                }
            }

            if(!mayusculasOk || !especialesOk) {
                this.error = "El nombre de usuario no puede contener mayúsculas y/o carcateres especiales distintos de _ o -"
            }

            if (especialesOk && mayusculasOk && !userNameRepetido) {
                return true;
            }
        },

        validarClaveNuevoUsuario() {
            let especialesOk = false;
            let mayusculasOk = false;
            let numeroOk = false;


            if (this.newPass != this.repeatNewPass) {
                this.error = "Las contraseñas no coinciden";
            }

            for (let i = 0; i < mayusculas.length; i++) {
                for (let j = 0; j < especiales.length; j++) {
                    for (let k = 0; k < numeros.length; k++) {
                        if (this.newPass.includes(mayusculas.charAt(i))) {
                            mayusculasOk = true;
                        }
                        if (this.newPass.includes(especiales.charAt(j))) {
                            especialesOk = true;
                        }
                        if (this.newPass.includes(numeros.charAt(k))) {
                            numeroOk = true;
                        }
                    }
                }
            }

            if (!especialesOk || !mayusculasOk || !numeroOk) {
                this.error = "la contraseña debe contener al menos 6 caracteres y al menos 1 mayúscula, 1 caracter especial y 1 número"
            }

            if (this.newPass.length > 6 && mayusculasOk  && especialesOk  && numeroOk) {
                return true;
            }
        },
        validarUsuarioyClave() {
            this.validarNuevoUsuario();
            this.validarClaveNuevoUsuario();

            if (this.validarNuevoUsuario() && this.validarClaveNuevoUsuario()) {
                console.log("Usuario creado correctamente");
                this.nuevoUsuario =  {"usuario":this.newUserName,"clave":this.newPass, "nombre": this.newName} 
                this.usuarios.push(this.nuevoUsuario)
                
            } else if (this.newName == "" || this.newUserName == "" || this.newPass == "" || this.repeatNewPass == "") {
                this.error = "Por favor, rellena todos los campos"
            }

          
           console.log(this.usuarios);

        }
    }
})

/*
function crearMapa() {
    var map = L.map('map').setView([40.5483956, -3.6906404, 15.35], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([40.5463039, -3.6969561]).addTo(map);
    L.marker([40.5471316, -3.6946928]).addTo(map);
    L.marker([40.5464535, -3.6935156]).addTo(map);
    L.marker([40.547737, -3.6877735]).addTo(map);
    // .bindPopup('Patio')
    // .openPopup();

    console.log("e")
}
crearMapa();

//api tiempo

*/

/**/