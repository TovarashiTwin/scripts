function ejercicio7() {
	$("#ocultar_mostrar").click(function(){
		if($("#fruta").is(":visible")){
			$("#fruta").hide();
		}
		else {
			$("#fruta").show();
		}
	});
	$("#add").click(function(){
		$("#ocultar_mostrar").after("<p id=\"fruta\"> " + $("#inputParrafo").val() + "</p>");
	});
	$("#delete").click(function(){
		$("#fruta").first().remove();
	});
	$("#elementoPadre").click(function(){
		$("*", document.body).each(function() {
			var etiquetaPadre = $(this).parent().get(0).tagName;
			$(this).prepend(document.createTextNode( "Padre : <" + etiquetaPadre + "> elemento : <" + $(this).get(0).tagName +"> valor:"));
		});
	});
	$("#sumTabla").click(function(){
		var sumRows = 0;
		var sumColumns = 0;
		$("table").children().children().each(function() {
			sumRows++;
		});
		$("table").children().children().last().children().each(function() {
			sumColumns++;
		});
		$("#sumTabla").after("<p>Sumatorio Filas: " + sumRows + " Sumatorio Columnas: " + sumColumns +  "</p>");		
	});
}

function init(){
	ej = new ejercicio7();
}
	
onload = init