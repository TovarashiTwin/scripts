"use strict"
class Parrafos{    
    write(){
        document.write("<p>Detalles de la asignatura: ");
        document.write(asignatura.nombre);
        document.write("</p>");
        document.write("<p>Titulación: ");
        document.write(asignatura.titulacion);
        document.write("</p>");
        document.write("<p>Centro: ");
        document.write(asignatura.centro);
        document.write("</p>");
        document.write("<p>Universidad: ");
        document.write(asignatura.universidad);
        document.write("</p>");
        document.write("<p>Curso actual: ");
        document.write(asignatura.curso);
        document.write("</p>");
        document.write("<p>Estudiante: ");
        document.write(asignatura.estudiante);
        document.write("</p>");
        document.write("<p>e-mail: ");
        document.write(asignatura.email);
        document.write("</p>");
    }
}
new Parrafos().write();


