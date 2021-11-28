"use strict"
class Map{
    constructor(){
        this.apiKey = "pk.eyJ1IjoidW8yNjUwMDkiLCJhIjoiY2t3YW41MjU4Mm8wNDJ2cDZjamIzZmlyZiJ9.HI0OvDVrFK1OJeiT89a8Sg";
        this.container = "map";//la id del tag donde vamos a meter el mapa
        this.mapStyle = "mapbox://styles/mapbox/streets-v11";
        this.center = [40.43341788237872,-3.73443976565914];//Madrid
        this.zoom = 6;
    }
    mostrarMapa(){       
        L.mapbox.accessToken = this.apiKey;
        var geojson = {//"marker-color": "#ff0000", (rojo) "marker-color": "#00ff00", (verde)
            "type": "FeatureCollection",
            "name": "theKml",
            "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
            "features": [
                { "type": "Feature", "properties": { "title": "Manuel Lorenzo Vega", "marker-color": "#00ff00","description": "Fecha nacimiento: 1999-01-23" }, "geometry": { "type": "Point", "coordinates": [ -3.73443976565914, 40.43341788237872 ] } },
                { "type": "Feature", "properties": { "title": "Alberto Lorenzo Álvarez","marker-color": "#00ff00", "description": "Fecha nacimiento: 1963-01-08" }, "geometry": { "type": "Point", "coordinates": [ -5.830170059192873, 43.375303263953242 ] } },
                { "type": "Feature", "properties": { "title": "Felipe Lorenzo Mohamed", "marker-color": "#00ff00","description": "Fecha nacimiento: 1940-11-17" }, "geometry": { "type": "Point", "coordinates": [ -4.989371610033474, 37.709487005927258 ] } },
                { "type": "Feature", "properties": { "title": "Alejandro Lorenzo Badiola","marker-color": "#00ff00", "description": "Fecha nacimiento: 1913-03-30" }, "geometry": { "type": "Point", "coordinates": [ -3.488908375884684, 42.938947805737257 ] } },
                { "type": "Feature", "properties": { "title": "Alejandro Lorenzo Badiola", "marker-color": "#ff0000","description": "Fecha fallecimiento: 1978-09-28" }, "geometry": { "type": "Point", "coordinates": [ -5.899418998113955, 42.298721618231461 ] } },
                { "type": "Feature", "properties": { "title": "Magdalena Mohamed Molinero", "marker-color": "#00ff00","description": "Fecha nacimiento: 1910-05-01" }, "geometry": { "type": "Point", "coordinates": [ -4.676865556868358, 40.658717640218434 ] } },
                { "type": "Feature", "properties": { "title": "Magdalena Mohamed Molinero", "marker-color": "#ff0000","description": "Fecha fallecimiento: 1959-03-14" }, "geometry": { "type": "Point", "coordinates": [ -4.661815132980382, 40.752266965212328 ] } },
                { "type": "Feature", "properties": { "title": "Maricarmen Álvarez Pendragon","marker-color": "#00ff00", "description": "Fecha nacimiento: 1942-05-14" }, "geometry": { "type": "Point", "coordinates": [ -5.640656849717557, 41.750113515618615 ] } },
                { "type": "Feature", "properties": { "title": "Domingo Álvarez Corral","marker-color": "#00ff00","description": "Fecha nacimiento: 1918-08-04" }, "geometry": { "type": "Point", "coordinates": [ -6.544766049031055, 43.178545480806754 ] } },
                { "type": "Feature", "properties": { "title": "Domingo Álvarez Corral", "marker-color": "#ff0000","description": "Fecha fallecimiento: 1988-11-25" }, "geometry": { "type": "Point", "coordinates": [ -6.03849541081205, 42.463881161231761 ] } },
                { "type": "Feature", "properties": { "title": "Alejandra Pendragon Arturez","marker-color": "#00ff00", "description": "Fecha nacimiento: 1915-12-24" }, "geometry": { "type": "Point", "coordinates": [ -4.110044995699699, 41.293634596741335 ] } },
                { "type": "Feature", "properties": { "title": "Alejandra Pendragon Arturez", "marker-color": "#ff0000","description": "Fecha fallecimiento: 1967-01-16" }, "geometry": { "type": "Point", "coordinates": [ -4.317549797589234, 41.400002229123373 ] } },
                { "type": "Feature", "properties": { "title": "Camila Vega Carbone","marker-color": "#00ff00", "description": "Fecha nacimiento: 1975-06-15" }, "geometry": { "type": "Point", "coordinates": [ 2.238060495548925, 41.464645869229706 ] } },
                { "type": "Feature", "properties": { "title": "Adolfo Vega Suarez","marker-color": "#00ff00", "description": "Fecha nacimiento: 1932-11-21" }, "geometry": { "type": "Point", "coordinates": [ -56.912850288414461, -33.518528070159888 ] } },
                { "type": "Feature", "properties": { "title": "Adolfo Vega Suarez","marker-color": "#ff0000", "description": "Fecha fallecimiento: 2020-06-08" }, "geometry": { "type": "Point", "coordinates": [ 126.979962141262533, 37.568777159367322 ] } },
                { "type": "Feature", "properties": { "title": "Diamantino Vega Delgado","marker-color": "#00ff00", "description": "Fecha nacimiento: 1906-04-18" }, "geometry": { "type": "Point", "coordinates": [ -2.846597552675423, 42.585328675995243 ] } },
                { "type": "Feature", "properties": { "title": "Diamantino Vega Delgado","marker-color": "#ff0000", "description": "Fecha fallecimiento: 1956-10-11" }, "geometry": { "type": "Point", "coordinates": [ -2.934270166924572, 42.687024316312581 ] } },
                { "type": "Feature", "properties": { "title": "Helena Suarez Cabrero","marker-color": "#00ff00", "description": "Fecha nacimiento: 1908-09-09" }, "geometry": { "type": "Point", "coordinates": [ -2.901254320027944, 42.714266593756115 ] } },
                { "type": "Feature", "properties": { "title": "Helena Suarez Cabrero","marker-color": "#ff0000", "description": "Fecha fallecimiento: 1932-11-21" }, "geometry": { "type": "Point", "coordinates": [ -2.934270166924572, 42.687024316312581 ] } },
                { "type": "Feature", "properties": { "title": "Ana Carbone Benitez","marker-color": "#00ff00", "description": "Fecha nacimiento: 1930-08-14" }, "geometry": { "type": "Point", "coordinates": [ -52.675951951861933, -31.399024108806675 ] } },
                { "type": "Feature", "properties": { "title": "Ana Carbone Benitez", "marker-color": "#ff0000","description": "Fecha fallecimiento: 2008-06-02" }, "geometry": { "type": "Point", "coordinates": [ -5.799744873048418, 43.378717496486487 ] } },
                { "type": "Feature", "properties": { "title": "Benito Carbone Silva","marker-color": "#00ff00", "description": "Fecha nacimiento: 1903-04-05" }, "geometry": { "type": "Point", "coordinates": [ -5.583938750921723, 40.883850113276097 ] } },
                { "type": "Feature", "properties": { "title": "Benito Carbone Silva", "marker-color": "#ff0000","description": "Fecha fallecimiento: 1936-11-07" }, "geometry": { "type": "Point", "coordinates": [ -5.660368641176782, 40.969034084568349 ] } },
                { "type": "Feature", "properties": { "title": "Esther Benitez Casillas","marker-color": "#00ff00", "description": "Fecha nacimiento: 1906-02-28" }, "geometry": { "type": "Point", "coordinates": [ -5.659126436438319, 40.861264102103505 ] } },
                { "type": "Feature", "properties": { "title": "Esther Benitez Casillas", "marker-color": "#ff0000","description": "Fecha fallecimiento: 1975-06-15" }, "geometry": { "type": "Point", "coordinates": [ -5.647563614311447, 40.930802006012946 ] } }
            ]           
        };
        
        L.mapbox.map(this.container)
          .setView(this.center, this.zoom)
          .addLayer(L.mapbox.styleLayer(this.mapStyle))
          .featureLayer.setGeoJSON(geojson);
    }     
}
var mapa = new Map();
