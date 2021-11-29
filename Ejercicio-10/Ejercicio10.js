"use strict"
class Electricidad{    
    constructor(){       
        this.format = "json";        
    }
   
    cargarDatos(){
        var self = this;
        $.ajax({
            dataType: "json",
            url: "https://apidatos.ree.es/es/datos/mercados/componentes-precio?start_date=2019-01-01T00:00&end_date=2019-12-31T23:59&time_trunc=month",
            method: 'GET',
            success: function(data){
                self.datos = data;
                console.log(data);                
                self.visualizarDatos(data);                
            },
            error:function(){
                alert("Ha ocurrido un error al acceder a la API");    
            }
        });
    }
    visualizarDatos(data){
        //ESTO PASAR A jquery        
        // console.log(data.data.attributes.title);//esto va a ser el h2
        let tabla = "<table>"+"\n";
        tabla += "<tr>"+"\n"+"<th>€/MWh</th>"+"\n"+"<th>fecha</th>";        
        
        // console.log(data.included[5].attributes);
        let datosTabla = data.included[5].attributes.values;
        for (const i in datosTabla) {            
            let valor = Math.round(datosTabla[i].value*100)/100;
            let time = datosTabla[i].datetime.split("T")[0];
            // console.log(valor + "\t" + time);
            tabla += "<tr>"+"\n";
            tabla += "<td>"+valor+"</td>"+"\n";
            tabla += "<td>"+time+"</td>"+"\n";
            tabla += "</tr>"+"\n";
        }
        tabla += "</table>";
        $("p:last").after(tabla);
    }

}
var api = new Electricidad();