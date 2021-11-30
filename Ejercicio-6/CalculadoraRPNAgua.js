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
    length(){
        return this.items.length;
    }
    displayFila(){
        var result = "";
		for(var i in this.items)
            result += " " + this.items[i];
		return result;
    }
    display(){
        var result = "";
		for (let i = 0; i < this.items.length; i++) {
            result +=  this.items[i]+"\n";//(this.items.length-i) + ".\t\t"+ //esto es si quieres enumerarlo
        }
		return result;
    }
}

class CalculadoraRPNAgua{
    constructor () {
        this.pantalla="";
        this.theStack = new Stack();
    }
    
    botonNumerico(arg){             
        this.pantalla+=arg;
        this.display();        
    }

    botonSuma(){
        if(this.theStack.length() >= 2){
            var param1 = new Number(this.theStack.pop());
            var param2 = new Number(this.theStack.pop());
            this.theStack.push(param2 + param1);
            this.mostrarPila();
        }
       
    }
    botonResta(){
        if(this.theStack.length() >= 2){
            var param1 = new Number(this.theStack.pop());
            var param2 = new Number(this.theStack.pop());
            this.theStack.push(param2 - param1);
            this.mostrarPila();
        }
    }
    botonDivision(){
        if(this.theStack.length() >= 2){
            var param1 = new Number(this.theStack.pop());
            var param2 = new Number(this.theStack.pop());
            this.theStack.push(param2 / param1);
            this.mostrarPila();
        }
    }
    botonMultiplicacion(){
        if(this.theStack.length() >= 2){
            var param1 = new Number(this.theStack.pop());
            var param2 = new Number(this.theStack.pop());
            this.theStack.push(param2 * param1);
            this.mostrarPila();
        }
    }
    
   botonDucha(){
    this.pantalla+=75;
    this.display();    
   }
   botonBanera(){
    this.pantalla+=200;
    this.display();  
   }
   botonTirarCadena(){
    this.pantalla+=9;
    this.display();  
   }
   botonFugaLavabo(){
    this.pantalla+=5;
    this.display();  
   }
   botonFugaCisterna(){
    this.pantalla+=15;
    this.display();  
   }
   botonLavavajillas(){
    this.pantalla+=10;
    this.display();  
   }
   botonLavadora(){
    this.pantalla+=50;
    this.display();  
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
var calculadora = new CalculadoraRPNAgua();