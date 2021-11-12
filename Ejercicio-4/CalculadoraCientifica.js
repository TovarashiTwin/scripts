class CalculadoraBasica{
    constructor () {
		this.pantalla="";
        this.memoria=0.0;
        this.auxMemory = false;
	}
    display(){
        //console.log(this.pantalla);
        document.getElementById('pantalla').value = this.pantalla;//TODO se puede usar getElementById?
    }
    botonSimple(arg){
        //Esta funcion se usa para los botones que simplemente añaden su simbolo
        this.auxMemory = false;
        this.pantalla+=arg;
        this.display();        
    }
    botonClear(){
        this.auxMemory = false;
        this.pantalla ="";
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
    //TODO remove
    botonMemSave(){
        this.calcularResultado();
        if(document.getElementById('pantalla').value != "Syntax Error"){
            this.memoria = this.pantalla;
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
            document.getElementById('pantalla').value = eval(toEval);
            this.pantalla = document.getElementById('pantalla').value;
        }catch(excepcion){
            document.getElementById('pantalla').value = "Syntax Error";
            //console.log(this.memoria);
        }
    }  
    
}
class CalculadoraCientifica extends CalculadoraBasica{ 
    constructor(){
        super();        
    }
    //x^2
    botonPotenciaDeDos(){
        this.pantalla = Math.pow(eval(this.consola,2)).toString();
        this.display();
    }
    //x^y
    botonPotenciaDeX(){
        //this.pantalla = Math.pow(eval(this.consola,2)).toString();
        //this.primerArgumento
        this.pantalla = "";
        this.display();
    }
    
    botonRaizCuadrada(){
        this.pantalla = Math.sqrt(eval(this.pantalla)).toString();
        this.display();
    }

    botonParentesisIzquierdo(){
        this.auxMemory = false;
        this.pantalla+="(";
        this.display();   
    }

    botonParentesisDerecho(){
        this.auxMemory = false;
        this.pantalla+=")";
        this.display();   
    }
}
var calculadora = new CalculadoraCientifica();