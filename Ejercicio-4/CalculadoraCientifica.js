"use strict";
class CalculadoraBasica{
    constructor () {
		this.pantalla="";
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
        //Es importante usar Number.isNaN en vez de isNaN porque solo comprueba que en este momento es NaN,
        //los Strings que no seran numeros validos no los considera NaN 
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
class CalculadoraCientifica extends CalculadoraBasica{ 
    constructor(){
        super();
        this.arco = false;
        this.hyperbolica = false;
        this.cambioFunciones = false;

    }
    //nuevas funciones de memoria
    botonMemClear(){
        this.memoria = 0.0;
    }
    botonMemRecall(){
        this.pantalla += this.memoria;
        this.display();
    }
    botonMemSave(){
        this.calcularResultado();
        if(document.getElementById('pantalla').value != "Syntax Error"){
            this.memoria = parseFloat(this.pantalla);
        }
        this.display();
    }

    //IDK
    botonUnidadDeAngulo(){

    }
    botonNotacionDiezElevado(){

    }
    botonRand(){

    }
    botonDms(){

    }
    botonDeg(){

    }
    //FUNCIONES TRIGONOMETRICAS
    //sin sinh y sin^-1
    botonSeno(){        
        this.calcularResultado();        
        this.seno();
        this.display(); 
    }
    seno(){
        if(!this.arco){            
            if(!this.hyperbolica){
                //seno sin                
                this.pantalla = Math.sin(this.pantalla);                
            }
            else{                
                //seno hyperbolico sinh
                this.pantalla = Math.sinh(this.pantalla);   
            }
        }else{
            if(!this.hyperbolica){
                 //arcoseno sin^-1 asin
                 this.pantalla = Math.asin(this.pantalla);   
            }
            else{
                //arcoseno hyperbolico asinh
                this.pantalla = Math.asinh(this.pantalla);   
            }
        }
    }

    botonCoseno(){        
        this.calcularResultado();
        this.coseno();
        this.display(); 
    }

    coseno(){
        if(!this.arco){            
            if(!this.hyperbolica){
                //seno sin                
                this.pantalla = Math.cos(this.pantalla);                
            }
            else{                
                //seno hyperbolico sinh
                this.pantalla = Math.cosh(this.pantalla);   
            }
        }else{
            if(!this.hyperbolica){
                 //arcoseno sin^-1 asin
                 this.pantalla = Math.acos(this.pantalla);   
            }
            else{
                //arcoseno hyperbolico asinh
                this.pantalla = Math.acosh(this.pantalla);   
            }
        }
    }
    botonTangente(){
        this.calcularResultado();
        this.tangente();
        this.display(); 
    }
    tangente(){
        if(!this.arco){            
            if(!this.hyperbolica){
                //seno sin                
                this.pantalla = Math.tan(this.pantalla);                
            }
            else{                
                //seno hyperbolico sinh
                this.pantalla = Math.tanh(this.pantalla);   
            }
        }else{
            if(!this.hyperbolica){
                 //arcoseno sin^-1 asin
                 this.pantalla = Math.atan(this.pantalla);   
            }
            else{
                //arcoseno hyperbolico asinh
                this.pantalla = Math.atanh(this.pantalla);   
            }
        }
    }
   
    
    botonSecante(){
        this.calcularResultado();
        this.seno();
        this.pantalla = (1/parseFloat(this.pantalla)).toString();
        this.display(); 
    }
    botonCosecante(){
        this.calcularResultado();
        this.coseno();
        this.pantalla = (1/parseFloat(this.pantalla)).toString();
        this.display(); 
    }
    botonCotangente(){
        this.calcularResultado();
        this.tangente();
        this.pantalla = (1/parseFloat(this.pantalla)).toString();
        this.display(); 
    }
    botonCambioArco(){//TODO falta hacer que cambien visualmente todos
        if(this.arco){
            this.arco = false;
        }else{
            this.arco = true;
        }
    }
    botonCambioHyperbolic(){
        if(this.hyperbolica){
            this.hyperbolica = false;
        }else{
            this.hyperbolica = true;
        }
    }



    botonCeil(){
        this.calcularResultado();
        this.pantalla = Math.ceil(this.pantalla);
        this.display();
    }
    botonFloor(){
        this.calcularResultado();
        this.pantalla = Math.floor(this.pantalla);
        this.display();
    }
    botonCambioFunciones(){
        if(this.cambioFunciones){
            this.cambioFunciones = true;
        }else{
            this.cambioFunciones = false;
        }
    }
    botonPi(){
        //podia haber hardcodeado el numero pi truncado pero me parecia más flexible hacerlo de esta manera
        this.pantalla += this.truncateDecimals(Math.PI,4);
        this.display();
    }
    //https://stackoverflow.com/questions/4912788/truncate-not-round-off-decimal-numbers-in-javascript
    truncateDecimals (num, digits) {
        var numS = num.toString(),
            decPos = numS.indexOf('.'),
            substrLength = decPos == -1 ? numS.length : 1 + decPos + digits,
            trimmedResult = numS.substr(0, substrLength),
            finalResult = isNaN(trimmedResult) ? 0 : trimmedResult;
    
        return parseFloat(finalResult);
    }
    botonDms(){

    }
    botonQuitar(){
        this.pantalla = this.pantalla.substring(0,this.pantalla.length-1)
        this.display();
    }
    botonInverso(){
        this.calcularResultado();
        this.pantalla = (1/parseFloat(this.pantalla)).toString();
        this.display();
    }
    botonAbsolute(){
        this.calcularResultado();
        this.pantalla = Math.abs(parseFloat(this.pantalla)).toString();
        this.display();
    }
    botonExp(){

    }
    botonMod(){

    }

    //x^2 y x^3
    botonElevadoConstante(){//TODO Cambiar esto, fatla x^3 y hacer el eval bien
        this.pantalla = Math.pow(eval(this.consola,2)).toString();
        this.display();
    }
    //x^y
    botonExponencial(){
        //this.pantalla = Math.pow(eval(this.consola,2)).toString();
        //this.primerArgumento
        this.pantalla = "";
        this.display();
    }
    
    botonRaizCuadrada(){
        this.pantalla = Math.sqrt(eval(this.pantalla)).toString();//TODO esto deberia hacer como en calcular resulado
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
    botonFactorial(){
        this.calcularResultado();
        this.pantalla = parseFloat(this.pantalla);
        let aux = 1;
        for (var i = 2; i <= this.pantalla; i++){
            aux = aux * i;
        }
        this.pantalla = aux.toString();
        this.display();
    }
    botonDiezElevado(){
        this.calcularResultado();
        this.pantalla = Math.pow(10,parseFloat(this.pantalla)).toString();
        this.display();
    }
    botonLogaritmo(){
        this.calcularResultado();
        this.pantalla = Math.log10(parseFloat(this.pantalla)).toString();
        this.display();
    }
    botonLogNeperiano(){
        this.calcularResultado();
        this.pantalla = Math.log(parseFloat(this.pantalla)).toString();
        this.display();
    }
}
var calculadora = new CalculadoraCientifica();