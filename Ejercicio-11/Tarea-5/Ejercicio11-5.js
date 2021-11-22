"use strict"
class Map{
    constructor(){        
        //Api geolocalizacion
       navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this));
       
        //Parametros mapbox
        this.apiKey = "pk.eyJ1IjoidW8yNjUwMDkiLCJhIjoiY2t3YW41MjU4Mm8wNDJ2cDZjamIzZmlyZiJ9.HI0OvDVrFK1OJeiT89a8Sg";
        this.container = "map";//la id del tag donde vamos a meter el mapa
        this.mapStyle = "mapbox://styles/mapbox/outdoors-v11";
        this.center = [-3.7344397656591397, 40.43341788237872];//valor por defecto si el usaurio no da su posicion
        this.zoom = 4;      

    }
    mostrarMapaDinamico(){
       

       let longitude = posicion.coords.longitude;
       let latitude = posicion.coords.latitude;
       console.log(longitude);
       mapboxgl.accessToken = this.apiKey;
       const map = new mapboxgl.Map({
         container: this.container, // Specify the container ID
         style: this.mapStyle, // Specify which map style to use
         center: this.center, // Specify the starting position [lng, lat]
         zoom: this.zoom // Specify the starting zoom
        });
       const marker1 = new mapboxgl.Marker()
           .setLngLat(this.center)
           .addTo(map);
    }
    ponerUsuario(){

    }
}
// function init(){//preguntar por esto
//     var mapa = new Map();
//     //mapa.mostrarMapaDinamico();    
// };
// onload = init;

var mapa = new Map();
// var mapa = new Map();
// mapa.mostrarMapaDinamico()
