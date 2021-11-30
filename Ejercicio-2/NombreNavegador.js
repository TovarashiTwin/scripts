"use strict"
class NombreNavegador{    
    write(){
        document.write("<p>Nombre: ");
        document.write(infoNavegador.nombre);
        document.write("</p>");
    }
}
new NombreNavegador().write();
