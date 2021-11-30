class Tiempo{
    constructor () {
        this.apikey = "279d1a3b93a9b6972b17d85825274091";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.formato = "&mode=xml";
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
            dataType: "xml",
            url: "http://api.openweathermap.org/data/2.5/weather?q="+lugar+ this.formato +this.unidades + this.idioma + "&APPID=" + this.apikey,
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
        
        var img = $('<img />', {src: "http://openweathermap.org/img/w/"+ $('weather',this.datos).attr("icon")  + ".png",alt: lugar+"-"+$('weather',this.datos).attr("value")});
        let tiempoGeneral = document.createTextNode($('weather',this.datos).attr("value"));
        let tTiempo = $(document.createElement("h3"));
        tTiempo.append(img);
        tTiempo.append(tiempoGeneral);
        lugarLista.append(tTiempo);
        
        let coordenadas = document.createTextNode("Coordenadas: " + $('coord',this.datos).attr("lat") + ", " + $('coord',this.datos).attr("lon"));
        let pCoordenadas = $(document.createElement("p"));
        pCoordenadas.append(coordenadas);
        lugarLista.append(pCoordenadas);
        
        let temperatura = document.createTextNode("Temperatura: " + $('temperature',this.datos).attr("value") + "ºC, Min: " + $('temperature',this.datos).attr("min") + "ºC Max: " + $('temperature',this.datos).attr("max") + "ºC");
        let pTemperatura = $(document.createElement("p"));
        pTemperatura.append(temperatura);
        lugarLista.append(pTemperatura);
        
        let presion = document.createTextNode("Presion: " + $('pressure',this.datos).attr("value") + $('pressure',this.datos).attr("unit"));
        let pPresion = $(document.createElement("p"));
        pPresion.append(presion);
        lugarLista.append(pPresion);
        
        let humedad = document.createTextNode("Humedad: " + this.datos.humidity + "%");
        let pHumedad = $(document.createElement("p"));
        pHumedad.append(humedad);
        lugarLista.append(pHumedad);
        
        let viento = document.createTextNode("Viento: " + $('speed',this.datos).attr("value") + " m/s " + $('direction',this.datos).attr("value") + "º");
        let pViento = $(document.createElement("p"));
        pViento.append(viento);
        lugarLista.append(pViento);
        
        let visibilidad = document.createTextNode("Visibilidad: " + $('visibility',this.datos).attr("value") + " m");
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