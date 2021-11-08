class Tiempo{
    constructor () {
        this.apikey = "279d1a3b93a9b6972b17d85825274091";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.http_request = false;
        this.lugares = "Madrid";//["Madrid","Oviedo","Ávila","Badalona","Trinidad"];
    }
    
    //Esto es para leer un xml
    makeRequest () { 
        if (window.XMLHttpRequest) { //Navegadores modernos          
            this.http_request = new XMLHttpRequest();
            if (this.http_request.overrideMimeType) {
                this.http_request.overrideMimeType('text/xml');
            }
        } else if (window.ActiveXObject) { //Navegadores antiguos
            this.http_request = new ActiveXObject("Microsoft.XMLHTTP");
        } 

        if (!this.http_request) {
            alert('Ha ocurrido un error inesperadao');
                return false;
        }
        if (this.http_request.readyState !== 4) {
            console.log("Un saludo");
        }
        var self = this;
        this.http_request.onreadystatechange = function(){            
            if (self.http_request.readyState == 4) {//request finished and response is ready 
                if (self.http_request.status == 200) {//"OK"
                    var xmldoc = self.http_request.responseXML;
                    var root_node = xmldoc.getElementsByTagName('ruta').item(0);
                    var hitos = root_node.getElementsByTagName('hito');
                    for (let i = 0; i < hitos.length; i++){
                        let hito = hitos.item(i);
                        let coordenadas = hito.getElementsByTagName('coordenadas').item(0);
                        let latitud = coordenadas.getElementsByTagName('latitud').item(0);
                        let longitud = coordenadas.getElementsByTagName('longitud').item(0);
                        self.cargarDatos(hito);
                    }
                } else {
                    alert('Ha ocurrido un error con la petición');
                }
            }           
        };
        
        this.http_request.open('GET', this.url, true);
        this.http_request.send(null);
    }

    //Esto para cargarlo, como tenemos ya las ciudades es mas sencllo
    cargarDatos(lugar){
        
        let coordenadas = lugar.getElementsByTagName('coordenadas').item(0);
        let latitud = coordenadas.getElementsByTagName('latitud').item(0).getAttribute('grados');
        let longitud = coordenadas.getElementsByTagName('longitud').item(0).getAttribute('grados');
        var self = this;
        $.ajax({
            dataType: "json",
            url: "http://api.openweathermap.org/data/2.5/weather?lat=" + latitud + "&lon=" + longitud + this.unidades + this.idioma + "&APPID=" + this.apikey,
            method: 'GET',
            success: function(data){
                self.datos = data;                
                self.verDatos(lugar);
            },
            error:function(){
                alert("Ha ocurrido un error al acceder a la API");    
            }
        });
    }
    verDatos(lugar){
        let lugarLista = $(document.createElement("li"));
        let titulo = $(document.createElement("h2"));
        let nombre = document.createTextNode(lugar.getAttribute("nombre"));
        titulo.append(nombre);
        lugarLista.append(titulo);
        
        var img = $('<img />', {src: "http://openweathermap.org/img/w/"+ this.datos.weather[0].icon  + ".png",alt: this.datos.weather[0].main});
        let tiempoGeneral = document.createTextNode(this.datos.weather[0].description);
        let tTiempo = $(document.createElement("h3"));
        tTiempo.append(img);
        tTiempo.append(tiempoGeneral);
        lugarLista.append(tTiempo);
        
        let coordenadas = document.createTextNode("Coordenadas: " + this.datos.coord.lat + ", " + this.datos.coord.lon);
        let pCoordenadas = $(document.createElement("p"));
        pCoordenadas.append(coordenadas);
        lugarLista.append(pCoordenadas);
        
        let temperatura = document.createTextNode("Temperatura: " + this.datos.main.temp + "ºC, Min: " + this.datos.main.temp_min + "ºC Max: " + this.datos.main.temp_max + "ºC");
        let pTemperatura = $(document.createElement("p"));
        pTemperatura.append(temperatura);
        lugarLista.append(pTemperatura);
        
        let presion = document.createTextNode("Presion: " + this.datos.main.pressure + " mb");
        let pPresion = $(document.createElement("p"));
        pPresion.append(presion);
        lugarLista.append(pPresion);
        
        let humedad = document.createTextNode("Humedad: " + this.datos.main.humidity + "%");
        let pHumedad = $(document.createElement("p"));
        pHumedad.append(humedad);
        lugarLista.append(pHumedad);
        
        let viento = document.createTextNode("Viento: " + this.datos.wind.speed + " m/s " + this.datos.wind.deg + "º");
        let pViento = $(document.createElement("p"));
        pViento.append(viento);
        lugarLista.append(pViento);
        
        let visibilidad = document.createTextNode("Visibilidad: " + this.datos.visibility + " m");
        let pVisibilidad = $(document.createElement("p"));
        pVisibilidad.append(visibilidad);
        lugarLista.append(pVisibilidad);
        
        let lista = $(document.createElement("ul"));
        lista.append(lugarLista);
        $('body').append(lista);
    };
}
function init(){
    var elTiempo = new Tiempo();
    elTiempo.makeRequest();
}
onload = init;