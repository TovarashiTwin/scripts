class CalculadoraBasica{
    constructor () {
		this.pantalla="";
        this.memoria=0.0;
        this.auxMemory = false;

        this.primerNumero = null;//Esto lo meteremos en un Number
        this.operacion = "";
        
        //aqui vamos metiendo los numeros en formato string hasta que llegue la hora de convertirlo
        this.numeroProvisional = "";

	}
    display(){
        //console.log(this.pantalla);
        document.getElementById('pantalla').value = this.pantalla;//TODO se puede usar getElementById?
    }


    botonNumerico(arg){
        //Esta funcion se usa para los numeros del 0 al 9
        this.auxMemory = false;

        this.numeroProvisional += arg; //vamos almacenando los numeros como string, luego lo pasaremos a number
        this.pantalla+=arg;
        this.display();
    }

    botonOperacion(arg){
        //esta funcion se usa para + - / *
        this.operacion = arg;//Si pulsamos otra se sobreescribe
        //persistimos el primer numero y borramos la pantalla
        this.primerNumero = new Number(this.numeroProvisional);
        this.numeroProvisional = "";
        this.pantalla = "";
        this.display();        
    }


    botonClear(){
        this.auxMemory = false;
        this.pantalla ="";
        this.numeroProvisional = "";
        this.primerNumero = null;
        this.display();        
    }


    calcularResultado(){
        this.auxMemory = false;
        try{
            //Dependiendo de la operacion necesitemos uno o dos numeros
            if(this.primerNumero != null){
                let segundoNumero = new Number(this.numeroProvisional);
                //let toEval = this.primerNumero + this.operacion +segundoNumero;
                //console.log(toEval);                
                let resultado = eval(this.primerNumero + this.operacion +segundoNumero);

                //Lo mostramops
                document.getElementById('pantalla').value = resultado;
                this.pantalla = resultado;
                this.primerNumero = null;//document.getElementById('pantalla').value;
                this.numeroProvisional = resultado;
            }else{
                console.log("Faltaba primer numero");
                //document.getElementById('pantalla').value = "Syntax Error";
            }
            
            //document.getElementById('pantalla').value = eval(this.pantalla);
            
        }catch(excepcion){
            console.log(excepcion);
            document.getElementById('pantalla').value = "Syntax Error";
            //console.log(this.memoria);
        }
    }  


    ///BOTONES ESPECIALES DE MEMORIA
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
    
    
}
var calculadora = new CalculadoraBasica();