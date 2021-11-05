"use strict"
class Stack{
    //Implementamos la pila en una clase a parte para que sea mas dificil hacer un mal uso de la misma
    constructor() 
    { 
        this.items = []; 
    } 
    push(element) 
    {    
      this.items.push(element); 
    }
    pop() 
    {    
        if (this.items.length == 0) 
            return "Underflow"; 
        return this.items.pop(); 
    } 
    display(){
        var result = "";
		for(var i in this.items)
            result += " " + this.items[i];
		return result;
    }
}

class CalculadoraRPN{
    constructor () {
        this.pantalla="";
        this.theStack = new Stack();
    }
    
    botonNumerico(arg){             
        this.pantalla+=arg;
        this.display();        
    }

    botonSuma(){
        var param1 = parseFloat(this.theStack.pop());
        var param2 = parseFloat(this.theStack.pop());
        this.theStack.push(param1 + param2);
        this.mostrarPila();
    }
    botonResta(){
        var param1 = parseFloat(this.theStack.pop());
        var param2 = parseFloat(this.theStack.pop());
        this.theStack.push(param1 - param2);
        this.mostrarPila();
    }
    botonDivision(){
        var param1 = parseFloat(this.theStack.pop());
        var param2 = parseFloat(this.theStack.pop());
        this.theStack.push(param1 / param2);
        this.mostrarPila();
    }
    botonMultiplicacion(){
        var param1 = parseFloat(this.theStack.pop());
        var param2 = parseFloat(this.theStack.pop());
        this.theStack.push(param1 * param2);
        this.mostrarPila();
    }
    
    botonPotenciaDeX(){
        var param1 = parseFloat(this.theStack.pop());
        var param2 = parseFloat(this.theStack.pop());
        this.theStack.push(Math.pow(param1,param2));
        this.mostrarPila();
    }
    botonPotenciaDeDos(){
        var param1 = parseFloat(this.theStack.pop());       
        this.theStack.push(Math.pow(param1,2));
        this.mostrarPila();
    }
    botonSen(){
        var param1 = parseFloat(this.theStack.pop());       
        this.theStack.push(Math.sin(param1));
        this.mostrarPila();
    }
    botonCos(){
        var param1 = parseFloat(this.theStack.pop());       
        this.theStack.push(Math.cos(param1));
        this.mostrarPila();
    }
    botonTan(){
        var param1 = parseFloat(this.theStack.pop());       
        this.theStack.push(Math.tan(param1));
        this.mostrarPila();
    }


    botonEnter(){
        if(this.pantalla !== ""){
            this.theStack.push(this.pantalla);
            this.mostrarPila();
            this.pantalla = "";//Al apilar borras la pantalla
            document.getElementById('pantalla').value = this.pantalla;
        }
    }

    mostrarPila(){
		document.getElementById('pila').value = this.theStack.display();
	}
    
    display(){
        document.getElementById('pantalla').value = this.pantalla;
    }

    botonClear(){
        this.pantalla = "";
        document.getElementById('pantalla').value = "";
		document.getElementById('pila').value = "";
        while(this.theStack.pop() !== "Underflow"){}
    }

}
var calculadora = new CalculadoraRPN();