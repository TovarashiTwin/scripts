"use strict"
class Geolocalization{
    constructor (){
        navigator.geolocation.getCurrentPosition(this.cargarUbicacion.bind(this),this.verErrores.bind(this));
        this.datos = "";
    }
    cargarUbicacion(posicion){
        
        this.datos+="<p>Latitud: " + posicion.coords.latitude + " grados</p>";
        this.datos+="<p>Longitud: " + posicion.coords.longitude + " grados</p>";
        this.datos+="<p>Precisión: " + posicion.coords.accuracy + " metros</p>";
        this.datos+="<p>Altitud: " + posicion.coords.altitude + " metros.</p>";
        this.datos+="<p>Precisión de la altitud: " + posicion.coords.altitudeAccuracy + " metros</p>";
        this.datos+="<p>Rumbo: " + posicion.coords.heading+" grados</p>";
        this.datos+="<p>Velocidad: " + posicion.coords.speed + " metros/segundo</p>";
       
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
        document.getElementById('ubicacion').innerHTML=this.datos;
    }
}

var localizacion = new Geolocalization();


