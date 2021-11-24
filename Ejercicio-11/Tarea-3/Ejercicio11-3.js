"use strict"
class Geolocalization{
    constructor (){
        navigator.geolocation.getCurrentPosition(this.cargarUbicacion.bind(this),this.verErrores.bind(this));
        this.longitude = -3.7344397656591397;//Valor por defecto
        this.latitude = 40.43341788237872;
        this.mapSize = 0.05;
        this.apiKey = "pk.eyJ1IjoidW8yNjUwMDkiLCJhIjoiY2t3YW41MjU4Mm8wNDJ2cDZjamIzZmlyZiJ9.HI0OvDVrFK1OJeiT89a8Sg";
        this.size = [750, 400];
    }
    cargarUbicacion(posicion){
        this.latitude = posicion.coords.latitude;
        this.longitude = posicion.coords.longitude;        
       
    }
    verErrores(error){
        switch(error.code) {
            case error.PERMISSION_DENIED:
                alert("Se ha denegado la peticion de geolocalizacion por el usuario");
                break;
            case error.POSITION_UNAVAILABLE:
                alert("Geolocalización no disponible")
                break;
            case error.TIMEOUT:
                alert("La petición de geolocalización ha caducado");
                break;
            case error.UNKNOWN_ERROR:
                alert("Se ha producido un error desconocido");
                break;
            }
    }
    verPosicion(){     
        var bounds = [
            this.longitude - this.mapSize,
            this.latitude - this.mapSize,
            this.longitude + this.mapSize,
            this.latitude + this.mapSize
        ];
        
        //En funcion de los bordes y el tamaño nos calcula el centro y el zoom
        var vp = geoViewport.viewport(bounds, this.size);
        var rutaMapa = 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/' +
            vp.center.join(',') + ',' +
            vp.zoom + '/' +
            this.size.join('x') +
            '?access_token=' + this.apiKey;
        document.getElementById("map").innerHTML = "<img src='"+rutaMapa+"' alt='mapa estático' />";
    }
}

var localizacion = new Geolocalization();
