"use strict"
class Map{
    constructor(){
        this.apiKey = "pk.eyJ1IjoidW8yNjUwMDkiLCJhIjoiY2t3YW41MjU4Mm8wNDJ2cDZjamIzZmlyZiJ9.HI0OvDVrFK1OJeiT89a8Sg";
        this.container = "map";//la id del tag donde vamos a meter el mapa
        this.mapStyle = "mapbox://styles/mapbox/streets-v11";
        this.file = "arbol.kml";
    }
    mostrarMapaKML(){       
        L.mapbox.accessToken = this.apiKey;
        var map = L.mapbox.map(this.container)
            .addLayer(L.mapbox.styleLayer(this.mapStyle));

        // omnivore will AJAX-request this file behind the scenes and parse it:
        // note that there are considerations:
        // - The file must either be on the same domain as the page that requests it,
        //   or both the server it is requested from and the user's browser must
        //   support CORS.

        // Internally this uses the toGeoJSON library to decode the KML file
        // into GeoJSON
        var runLayer = omnivore.kml(this.file)
            .on('ready', function() {
                map.fitBounds(runLayer.getBounds());
            })
            .addTo(map);
    }     
}
var mapa = new Map();
