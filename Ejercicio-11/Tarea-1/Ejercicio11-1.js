"use strict"
class Geolocalization{
    constructor (){
        navigator.geolocation.getCurrentPosition(this.cargarUbicacion.bind(this));
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
    verPosicion(){
        document.getElementById('ubicacion').innerHTML=this.datos;
    }
}

var localizacion = new Geolocalization();
