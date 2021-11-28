"use strict";
class LectorArchivos{
    constructor () {
        this.nBytes = 0;
        this.datos = "";
        this.contenido = "";
    }
    leerArchivos(){    
        let files = document.getElementById("inputArchivos").files,
        nFiles = files.length;
        for (let i = 0; i < nFiles; i++) {
            this.nBytes += files[i].size;
        }	
        for (let i = 0; i < nFiles; i++) {
            this.datos += "<pre>Archivo " + (i+1) +": "+ files[i].name  + "  Tamaño: " + files[i].size +" bytes " + "  Tipo: " + files[i].type + "  Última modificación: " + files[i].lastModifiedDate+ "</pre>" ;
            var text = "text";
            if (files[i].type.match(/text.*/) || files[i].type.match("application/json") || files[i].type.match("text/xml")) {
                let lector = new FileReader();
                lector.readAsText(files[i]);
                var self = this;
                lector.onload = function (evento) {
                    text = lector.result;
                    self.contenido += "\n\nArchivo " + (i+1) + ":\n" + text;
                }
            }
        }
        
        document.getElementById("numero").innerHTML = document.getElementById("numero").innerHTML + nFiles;
        document.getElementById("tamano").innerHTML = document.getElementById("tamano").innerHTML+ this.nBytes + "bytes";
        document.getElementById("datos").innerHTML = "<h2>Datos:</h2>"+this.datos;
        setTimeout(() => {
            document.getElementById("contenidos").innerText = this.contenido;
        }, 100);
        
    }

}
var lector = new LectorArchivos();