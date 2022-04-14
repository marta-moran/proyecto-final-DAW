

const app = Vue.createApp({
    data() {
        return {
            message: null,
            usuario: null,
            clave: null,
            error: null,
        };
    },
    methods: {
       async loginUsuario() {
            const response = await fetch("json/usuarios.json")
            const data = await response.json();
            //let nombreUsuario;
            try {
                for (user of data) {
                    if (this.usuario == user.usuario && this.clave == user.clave) {
                        this.message = user.nombre;
                        //location.href = "principal.html";
                        console.log(this.message)
                        //habría que mandar el user.nombre a una variable para q luego se muestre en la página principal
                    }
                }
                
            } catch (error) {
                this.error = error;
            }

        },
        registroUsuario() {
            location.href = "index-registro.html";
        }
    }
       
});

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