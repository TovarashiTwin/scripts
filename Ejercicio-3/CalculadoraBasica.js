"use strict";
class CalculadoraBasica{
    constructor () {
		this.pantalla="0";
        this.memoria=0.0;
        this.auxMemory = false;
        this.inputkey();
        
	}
    display(){
        //console.log(this.pantalla);
        document.getElementById('pantalla').value = this.pantalla;//TODO se puede usar getElementById?
        if(this.pantalla == "Syntax Error"){
            console.log("Syntax Error")
            this.pantalla = "";
        }
        if(Number.isNaN(this.pantalla)){
            console.log("NaN")
            this.pantalla = "";
        }
    }
    inputkey() {
        document.addEventListener("keydown", (event) => {
            if (["*", "/", "-", "+", "."].some(e => event.key.includes(e))) {
                this.botonSimple(event.key);
            }
            else if (!isNaN(event.key)) {//comprobamos que es un numero
                this.botonSimple(event.key);
            }
            else if (event.key == "Enter") {
                this.botonEnter();
            }
        })
    };
    botonSimple(arg){
        //Esta funcion se usa para los botones que simplemente añaden su simbolo
        if(this.pantalla == "0"){
            this.pantalla = "";
        }
        this.auxMemory = false;
        this.pantalla+=arg;
        this.display();        
    }
    botonPunto(){
        //Esta funcion se usa para los botones que simplemente añaden su simbolo
        this.auxMemory = false;
        this.pantalla+=".";
        this.display();        
    }
    botonClear(){
        this.auxMemory = false;
        this.pantalla ="0";
        this.display();        
    }
    botonMemSum(){
        this.auxMemory = false;
        this.calcularResultado();
        if(document.getElementById('pantalla').value != "Syntax Error"){
            console.log(parseFloat(this.pantalla))
            this.memoria += parseFloat(this.pantalla);
        }
    }
    botonMemSub(){
        this.auxMemory = false;
        this.calcularResultado();
        if(document.getElementById('pantalla').value != "Syntax Error"){
            this.memoria -= parseFloat(this.pantalla);
        }
    }

    botonMemRecallClear(){
        //console.log(this.memoria.toString());
        if(this.auxMemory){//Borramos memoria
            this.memoria = 0.0;
        }else{      
            this.auxMemory = true;
            if(this.pantalla === ""){//Esta vacia, mostramos directamente la memoria//TODO esto no funciona            
                this.pantalla = this.memoria.toString();
                this.display();
            }else{
                //console.log(this.pantalla);
                this.pantalla += this.memoria.toString();
                //console.log(pantalla);
                this.display();
            }
        }

    }

    botonEnter(){
        this.calcularResultado();
        this.display();

    }
    calcularResultado(){
        this.auxMemory = false;
        try{            
            let pantallaAsString = this.pantalla;
            let toEval = "";
            let aux = "";
            for (let i = 0; i < pantallaAsString.length; i++) {
                //Contemplamos dos casos, es un numero o '.' o no lo es
                let char = pantallaAsString[i];
                if(/^[0-9]$/.test(char) || char == '.'){
                    aux += char;
                }else{
                    if (aux != ""){
                        toEval += "new Number(" + aux +")";
                        toEval += char
                        aux = "";
                    }else{
                        toEval += char
                    }
                }
            }
            if(aux != ""){
                toEval += "new Number(" + aux +")"; 
            }
            console.log(toEval) ;
            
            this.pantalla =  eval(toEval).toString();//El toString es para que siempre se interprete como string y funcione todo bien
            // document.getElementById('pantalla').value = this.pantalla;
        }catch(excepcion){
            this.pantalla = "Syntax Error";
            //document.getElementById('pantalla').value = "Syntax Error";
            //console.log(this.memoria);
        }
    }  
    
}
var calculadora = new CalculadoraBasica();