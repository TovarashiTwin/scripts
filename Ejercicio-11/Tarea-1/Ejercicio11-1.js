"use strict"
class Geolocation{
    constructor (){
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this));
    }
    cargarUbicacion(){
        var datos="";
        datos+="<p>Latitud: " + posicion.coords.latitude + " grados</p>";
        datos+="<p>Longitud: " + posicion.coords.longitude + " grados</p>";
        datos+="<p>Precisión: " + posicion.coords.accuracy + " metros</p>";
        datos+="<p>Altitud: " + posicion.coords.altitude + " metros.</p>";
        datos+="<p>Precisión de la altitud: " + posicion.coords.altitudeAccuracy + " metros</p>";
        datos+="<p>Rumbo: " + posicion.coords.heading+" grados</p>";
        datos+="<p>Velocidad: " + posicion.coords.speed + " metros/segundo</p>";
        ubicacion.innerHTML=datos;//hacer esto con jquery?
    }
}
function init(){
    var localizacion = new Geolocation();
    localizacion.cargarUbicacion();
}
onload = init;