"use strict"
class Map{
    constructor(){        
        //Api geolocalizacion
       navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this));
       
        //Parametros mapbox
        this.apiKey = "pk.eyJ1IjoidW8yNjUwMDkiLCJhIjoiY2t3a2t2dGJwMXQyeTJucXZqcnUzbTZhMyJ9.AjG1hxg5ryWTa6zkTsw9hA";
        this.container = "map";//la id del tag donde vamos a meter el mapa
        this.mapStyle = "mapbox://styles/mapbox/outdoors-v11";
        // this.center = [-3.7344397656591397, 40.43341788237872];
        this.zoom = 10;
        this.longitude = -3.7344397656591397;//valor por defecto si el usaurio no da su posicion
        this.latitude = 40.43341788237872;

    }
    getPosicion(posicion){
        this.longitude = posicion.coords.longitude;
        this.latitude = posicion.coords.latitude;        
    }

    mostrarMapaDinamico(){     
       let center = [this.longitude,this.latitude];
       mapboxgl.accessToken = this.apiKey;
       const map = new mapboxgl.Map({
         container: this.container, // Specify the container ID
         style: this.mapStyle, // Specify which map style to use
         center: center, // Specify the starting position [lng, lat]
         zoom: this.zoom // Specify the starting zoom
        });
       const marker1 = new mapboxgl.Marker()
           .setLngLat(center)
           .addTo(map);
    }
    
}

var mapa = new Map();
