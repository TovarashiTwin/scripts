"use strict"
class Electricidad{
    // https://developer.nrel.gov/api/alt-fuel-stations/v1.json?fuel_type=E85,ELEC&state=CA&limit=2&api_key=uwHSTLf19qom3SEroWXvj1YhWS3Jnb7wRfOOzgo6
    constructor(){
        this.apikey = "uwHSTLf19qom3SEroWXvj1YhWS3Jnb7wRfOOzgo6";
        this.format = "json";
        this.datos = null;
    }
   
    cargarDatos(){
        var self = this;
        $.ajax({
            dataType: "json",
            url: "https://developer.nrel.gov/api/utility_rates/v3.json?api_key=uwHSTLf19qom3SEroWXvj1YhWS3Jnb7wRfOOzgo6&lat=35.45&lon=-82.98",
            method: 'GET',
            success: function(data){
                self.datos = data;
                console.log(data)
            },
            error:function(){
                alert("Ha ocurrido un error al acceder a la API");    
            }
        });
    }

}
var api = new Electricidad();