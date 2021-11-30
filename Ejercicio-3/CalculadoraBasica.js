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
            this.memoria += new Number(this.pantalla);//TODO CAMBIAR POR NEW NUMBER
        }
    }
    botonMemSub(){
        this.auxMemory = false;
        this.calcularResultado();
        if(document.getElementById('pantalla').value != "Syntax Error"){
            this.memoria -= new Number(this.pantalla);
        }
    }

    botonMemRecallClear(){
        //console.log(this.memoria.toString());
        if(this.auxMemory){//Borramos memoria
            this.memoria = 0.0;
        }else{      
            this.auxMemory = true;
            this.pantalla += this.memoria.toString();            
            this.display();
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
                        let  numCeros = 0;
                        for(let j = 0;j<aux.length;j++){//eliminamos los ceros del principio
                            if(aux[j] == '0'){
                                numCeros ++;
                            }
                            else{
                                break;
                            }
                        }
                        aux = aux.substring(numCeros,aux.length);
                        toEval += "new Number(" + aux +")";
                        toEval += char
                        aux = "";
                    }else{
                        toEval += char
                    }
                }
            }
            if(aux != ""){
                let  numCeros = 0;
                for(let j = 0;j<aux.length;j++){//eliminamos los ceros del principio
                    if(aux[j] == '0'){
                        numCeros ++;
                    }
                    else{
                        break;
                    }
                }
                aux = aux.substring(numCeros,aux.length);
                toEval += "new Number(" + aux +")"; 
            }
            console.log(toEval) ;
            
            this.pantalla =  eval(toEval).toString();//El toString es para que siempre se interprete como string y funcione todo bien
            // document.getElementById('pantalla').value = this.pantalla;
        }catch(excepcion){
            this.pantalla = "Syntax Error";
            //document.getElementById('pantalla').value = "Syntax Error";
            console.log(excepcion);
        }
    }  
    
}
var calculadora = new CalculadoraBasica();