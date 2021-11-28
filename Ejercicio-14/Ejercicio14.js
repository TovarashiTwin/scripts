"use strict"
class SVGVisualizer{    
    constructor(){
        this.svg = localStorage.getItem("svg");        
    }
    leerSVG(){
        //LEEMOS EL FICHERO
        let file = document.getElementById("inputArchivos").files[0];
        //TODO meter que solo acepte svg
        console.log(file.type);
        let lector = new FileReader();
        lector.readAsText(file);
        var self = this;
        lector.onload = function(e){
            self.svg = lector.result;            
            self.mostrarSVG();
        }
    }
    mostrarSVG(){
        if(this.svg != null){
            localStorage.clear();
            localStorage.setItem("svg",this.svg);
            document.querySelector("main").innerHTML = this.svg;
        }       
    }
    


}
var svgVisualizer = new SVGVisualizer();