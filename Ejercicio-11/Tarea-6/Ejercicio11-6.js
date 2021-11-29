"use strict"
class Place{
    constructor(place,lat,lon){

    }
}
class Mapa{
    constructor(){
        this.apiKey = "pk.eyJ1IjoidW8yNjUwMDkiLCJhIjoiY2t3a2t2dGJwMXQyeTJucXZqcnUzbTZhMyJ9.AjG1hxg5ryWTa6zkTsw9hA";
        this.container = "map";//la id del tag donde vamos a meter el mapa
        this.mapStyle = "mapbox://styles/mapbox/outdoors-v11";
        this.center = [-5.850278, 43.3625];
        this.zoom = 7;
        this.map = null;        
       
        this.mapDT = new Map([
            ["Gijón",[-5.67732, 43.52931]],
            ["Oviedo",[-5.850278, 43.3625]],
            ["Avilés",[-5.922222, 43.556111]],
            ["Siero",[-5.634543, 43.394045]],
            ["Langreo",[-5.694447, 43.305144]],
            ["Mieres",[-5.776667, 43.25]],
            ["Castrillón",[-5.992476, 43.545874]],
            ["San Martín del Rey Aurelio",[-5.613778, 43.275019]],
            ["Corvera de Asturias",[-5.887757, 43.517838]],
            ["Villaviciosa",[-5.433462,43.481332]],
        ]);
        
    }
    mostrarMapaDinamico(){       
        mapboxgl.accessToken = this.apiKey;
        this.map = new mapboxgl.Map({
          container: this.container, // Specify the container ID
          style: this.mapStyle, // Specify which map style to use
          center: this.center, // Specify the starting position [lng, lat]
          zoom: this.zoom // Specify the starting zoom
        });
        
    }
    localizacion(lugar){
        const marker1 = new mapboxgl.Marker()
            .setLngLat(this.mapDT.get(lugar))
            .addTo(this.map);
    }
}

var mapa = new Mapa();
