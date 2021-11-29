"use strict"
class Map{
    constructor(){
        this.apiKey = "pk.eyJ1IjoidW8yNjUwMDkiLCJhIjoiY2t3a2t2dGJwMXQyeTJucXZqcnUzbTZhMyJ9.AjG1hxg5ryWTa6zkTsw9hA";
        this.container = "map";//la id del tag donde vamos a meter el mapa
        this.mapStyle = "mapbox://styles/mapbox/streets-v11";
        this.center = [40.43341788237872,-3.73443976565914];//Madrid
        this.zoom = 6;
    }
    cargarMapa(){       
        //LEEMOS EL FICHERO
        let file = document.getElementById("inputArchivos").files[0];        
        let lector = new FileReader();
        lector.readAsText(file);
        var self = this;
        lector.onload = function(e){
            var geojson = lector.result;
            console.log(geojson)
            self.mostrarMapa(geojson);
        }        
    }
    mostrarMapa(geojson){
        //CREAMOS EL MAPA A PARTIR DEL FICHERO
        L.mapbox.accessToken = this.apiKey;        
        L.mapbox.map(this.container)
            .setView(this.center, this.zoom)
            .addLayer(L.mapbox.styleLayer(this.mapStyle))
            .featureLayer.setGeoJSON(JSON.parse(geojson));//tenemos que interpretar el texto como json
    }
}
var mapa = new Map();
