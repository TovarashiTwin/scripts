class Ejercicio7 {

	ocultar(){//Tarea 1
		if($("p").is(":visible")){
			$("p").hide();
		}
		else {
			$("p").show();
		}
		
	}

	modificar(){//tarea 2
		$("p").text(function(i, origText){
			return origText.toUpperCase(); 
		  });
	}

	add(){	//tarea 3
		$("#modificar").after("<p> " + $("#inputParrafo").val() + "</p>");
		
	}
	delete(){//tarea 4
		$("p").remove();
		
	}
	mostrarElementoPadre(){		//tarea 5
		//Table. tbody y tr no deben de contener "texto"
		$("*", document.body).not("table").not("tbody").not("tr").each(function() {
			var etiquetaPadre = $(this).parent().get(0).tagName;
			$(this).prepend(document.createTextNode( "Padre : <" + etiquetaPadre + "> elemento : <" + $(this).get(0).tagName +"> valor: "));
		});		
		
	}
	sumTabla(){ //tarea 6
		console.log("Tarea 6")
		var sumRows = 0;
		var sumColumns = 0;
		$("table").children().children().each(function() {			
			sumRows++;
		});
		$("table").children().children().last().children().each(function() {
			sumColumns++;
		});
		$("#sumTabla").after("<p>Sumatorio Filas: " + sumRows + " Sumatorio Columnas: " + sumColumns +  "</p>");		
		
	}
	
	
}

// function init(){
// 	ej = new ejercicio7();
// }
	
// onload = init

var ej = new Ejercicio7();