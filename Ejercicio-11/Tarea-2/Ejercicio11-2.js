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




// 104-ClaseGeolocalizacion.js
// Versión 1.0 16/noviembre/2018. Juan Manuel Cueva Lovelle. Universidad de Oviedo
// Version 1.1 23/10/2021 
// "use strict";
// class Geolocalización {
//     constructor (){
//         navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this));
//     }
//     getPosicion(posicion){
//         this.longitud         = posicion.coords.longitude; 
//         this.latitud          = posicion.coords.latitude;  
//         this.precision        = posicion.coords.accuracy;
//         this.altitud          = posicion.coords.altitude;
//         this.precisionAltitud = posicion.coords.altitudeAccuracy;
//         this.rumbo            = posicion.coords.heading;
//         this.velocidad        = posicion.coords.speed;       
//     }
//     getLongitud(){
//         return this.longitud;
//     }
//     getLatitud(){
//         return this.latitud;
//     }
//     getAltitud(){
//         return this.altitud;
//     }
//     verTodo(dondeVerlo){
//         var ubicacion=document.getElementById(dondeVerlo);
//         var datos=''; 
//         datos+='<p>Longitud: '+this.longitud +' grados</p>'; 
//         datos+='<p>Latitud: '+this.latitud +' grados</p>';
//         datos+='<p>Precisión de la latitud y longitud: '+ this.precision +' metros</p>';
//         datos+='<p>Altitud: '+ this.altitude +' metros</p>';
//         datos+='<p>Precisión de la altitud: '+ this.precisionAltitud +' metros</p>'; 
//         datos+='<p>Rumbo: '+ this.rumbo +' grados</p>'; 
//         datos+='<p>Velocidad: '+ this.velocidad +' metros/segundo</p>';
//         ubicacion.innerHTML = datos;
//     }
// }


// function init(){
//     var miPosicion = new Geolocalización();
//     miPosicion.verTodo("ubicacion");
// }
// onload = init;