class Tiempo{
    constructor () {
        this.apikey = "279d1a3b93a9b6972b17d85825274091";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.http_request = false;
        this.lugares = ["Madrid","Oviedo","Ávila","Badalona","Trinidad"];
    }
    
    
    cargarTodosLugares(){
        for (let i = 0; i < this.lugares.length; i++) {
            this.cargarDatos(this.lugares[i]);
        }        
    }

    //Esto para cargarlo, como tenemos ya las ciudades es mas sencllo
    cargarDatos(lugar){                
        var self = this;//Esto es necesario por como funciona this en js

        $.ajax({
            dataType: "json",
            url: "http://api.openweathermap.org/data/2.5/weather?q="+lugar+ this.unidades + this.idioma + "&APPID=" + this.apikey,
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
        let nombre = document.createTextNode(lugar);
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
    elTiempo.cargarTodosLugares();
}
onload = init;