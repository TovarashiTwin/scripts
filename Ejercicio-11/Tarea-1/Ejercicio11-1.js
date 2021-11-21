// "use strict"
// class Geolocation{
//     constructor (){
//         navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this));
//     }
//     cargarUbicacion(){
//         var datos="";
//         datos+="<p>Latitud: " + posicion.coords.latitude + " grados</p>";
//         datos+="<p>Longitud: " + posicion.coords.longitude + " grados</p>";
//         datos+="<p>Precisión: " + posicion.coords.accuracy + " metros</p>";
//         datos+="<p>Altitud: " + posicion.coords.altitude + " metros.</p>";
//         datos+="<p>Precisión de la altitud: " + posicion.coords.altitudeAccuracy + " metros</p>";
//         datos+="<p>Rumbo: " + posicion.coords.heading+" grados</p>";
//         datos+="<p>Velocidad: " + posicion.coords.speed + " metros/segundo</p>";
//         document.getElementById(ubicacion).innerHTML=datos;
//     }
// }
// function init(){
//     var localizacion = new Geolocation();
//     localizacion.cargarUbicacion();
// }
// onload = init;
// 104-ClaseGeolocalizacion.js
// Versión 1.0 16/noviembre/2018. Juan Manuel Cueva Lovelle. Universidad de Oviedo
// Version 1.1 23/10/2021 
"use strict";
class Geolocalización {
    constructor (){
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this));
    }
    getPosicion(posicion){
        this.longitud         = posicion.coords.longitude; 
        this.latitud          = posicion.coords.latitude;  
        this.precision        = posicion.coords.accuracy;
        this.altitud          = posicion.coords.altitude;
        this.precisionAltitud = posicion.coords.altitudeAccuracy;
        this.rumbo            = posicion.coords.heading;
        this.velocidad        = posicion.coords.speed;       
    }
    getLongitud(){
        return this.longitud;
    }
    getLatitud(){
        return this.latitud;
    }
    getAltitud(){
        return this.altitud;
    }
    verTodo(dondeVerlo){
        var ubicacion=document.getElementById(dondeVerlo);
        var datos=''; 
        datos+='<p>Longitud: '+this.longitud +' grados</p>'; 
        datos+='<p>Latitud: '+this.latitud +' grados</p>';
        datos+='<p>Precisión de la latitud y longitud: '+ this.precision +' metros</p>';
        datos+='<p>Altitud: '+ this.altitude +' metros</p>';
        datos+='<p>Precisión de la altitud: '+ this.precisionAltitud +' metros</p>'; 
        datos+='<p>Rumbo: '+ this.rumbo +' grados</p>'; 
        datos+='<p>Velocidad: '+ this.velocidad +' metros/segundo</p>';
        ubicacion.innerHTML = datos;
    }
}


function init(){
    var miPosicion = new Geolocalización();
    miPosicion.verTodo("ubicacion");
}
onload = init;