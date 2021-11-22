"use strict"
class Geolocalization{
    constructor (){
        navigator.geolocation.getCurrentPosition(this.cargarUbicacion.bind(this),this.verErrores.bind(this));
        this.longitude = -3.7344397656591397;//Valor por defecto
        this.latitude = 40.43341788237872;
        this.mapSize = 0.05;
        this.apiKey = "pk.eyJ1IjoidW8yNjUwMDkiLCJhIjoiY2t3YW41MjU4Mm8wNDJ2cDZjamIzZmlyZiJ9.HI0OvDVrFK1OJeiT89a8Sg";
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
        // var bounds = [
        //     5.668343999999995,
        //     45.111511000000014,
        //     5.852471999999996,
        //     45.26800200000002
        // ];
        var bounds = [
            this.longitude - this.mapSize,
            this.latitude - this.mapSize,
            this.longitude + this.mapSize,
            this.latitude + this.mapSize
        ];
        var size = [750, 400];

        var vp = geoViewport.viewport(bounds, size);
        var rutaMapa = 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/' +
            vp.center.join(',') + ',' +
            vp.zoom + '/' +
            size.join('x') +
            '?access_token=' + this.apiKey;
        document.getElementById('static-map').innerHTML = "<img src='"+rutaMapa+"' alt='mapa estático google' />";
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