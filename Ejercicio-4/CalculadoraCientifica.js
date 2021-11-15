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
                    if(char == '.'){
                        if(aux != ""){
                            aux += char;
                        }else{
                            toEval += char
                        }
                    }else{
                        aux += char;
                    }                   
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
        this.funcionDosOperadores = "";//para las funciones de dos operadores guardamos aqui el primero operador, introducimos el segundo y le damos al enter

    }


    calcularResultado(){
        if(this.funcionDosOperadores == ""){
            super.calcularResultado();
        }else{
            this.pantalla = this.funcionDosOperadores+this.pantalla+")";
            this.funcionDosOperadores = "";
            super.calcularResultado();
        }
       
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
            if(this.hyperbolica){
                //sinh -> sinh
                document.querySelector("input[value=sinh⁻¹]").setAttribute("value", "sinh")
                document.querySelector("input[value=cosh⁻¹]").setAttribute("value", "cosh")
                document.querySelector("input[value=tanh⁻¹]").setAttribute("value", "tanh")
                document.querySelector("input[value=sech⁻¹]").setAttribute("value", "sech")
                document.querySelector("input[value=csch⁻¹]").setAttribute("value", "csch")
                document.querySelector("input[value=coth⁻¹]").setAttribute("value", "coth")
            }else{
                //sin -> sin
                document.querySelector("input[value=sin⁻¹]").setAttribute("value", "sin")
                document.querySelector("input[value=cos⁻¹]").setAttribute("value", "cos")
                document.querySelector("input[value=tan⁻¹]").setAttribute("value", "tan")
                document.querySelector("input[value=sec⁻¹]").setAttribute("value", "sec")
                document.querySelector("input[value=csc⁻¹]").setAttribute("value", "csc")
                document.querySelector("input[value=cot⁻¹]").setAttribute("value", "cot")
            }
        }else{
            this.arco = true;
            if(this.hyperbolica){
                //asinh sinh^-1
                document.querySelector("input[value=sinh]").setAttribute("value", "sinh⁻¹")
                document.querySelector("input[value=cosh]").setAttribute("value", "cosh⁻¹")
                document.querySelector("input[value=tanh]").setAttribute("value", "tanh⁻¹")
                document.querySelector("input[value=sech]").setAttribute("value", "sech⁻¹")
                document.querySelector("input[value=csch]").setAttribute("value", "csch⁻¹")
                document.querySelector("input[value=coth]").setAttribute("value", "coth⁻¹")
                
            }else{
                //asin sin^-1
                document.querySelector("input[value=sin]").setAttribute("value", "sin⁻¹")
                document.querySelector("input[value=cos]").setAttribute("value", "cos⁻¹")
                document.querySelector("input[value=tan]").setAttribute("value", "tan⁻¹")
                document.querySelector("input[value=sec]").setAttribute("value", "sec⁻¹")
                document.querySelector("input[value=csc]").setAttribute("value", "csc⁻¹")
                document.querySelector("input[value=cot]").setAttribute("value", "cot⁻¹")
            }
        }
    }
    botonCambioHyperbolico(){
        if(this.hyperbolica){
            this.hyperbolica = false;
            if(this.arco){
                document.querySelector("input[value=sinh⁻¹]").setAttribute("value", "sin⁻¹")
                document.querySelector("input[value=cosh⁻¹]").setAttribute("value", "cos⁻¹")
                document.querySelector("input[value=tanh⁻¹]").setAttribute("value", "tan⁻¹")   
                document.querySelector("input[value=sech⁻¹]").setAttribute("value", "sec⁻¹")
                document.querySelector("input[value=csch⁻¹]").setAttribute("value", "csc⁻¹")
                document.querySelector("input[value=coth⁻¹]").setAttribute("value", "cot⁻¹")           
            }else{
                document.querySelector("input[value=sinh]").setAttribute("value", "sin")
                document.querySelector("input[value=cosh]").setAttribute("value", "cos")
                document.querySelector("input[value=tanh]").setAttribute("value", "tan")
                document.querySelector("input[value=sech]").setAttribute("value", "sec")
                document.querySelector("input[value=csch]").setAttribute("value", "csc")
                document.querySelector("input[value=coth]").setAttribute("value", "cot")
            }

        }else{
            this.hyperbolica = true;
            if(this.arco){
                document.querySelector("input[value=sin⁻¹]").setAttribute("value", "sinh⁻¹")
                document.querySelector("input[value=cos⁻¹]").setAttribute("value", "cosh⁻¹")
                document.querySelector("input[value=tan⁻¹]").setAttribute("value", "tanh⁻¹")  
                document.querySelector("input[value=sec⁻¹]").setAttribute("value", "sech⁻¹")
                document.querySelector("input[value=csc⁻¹]").setAttribute("value", "csch⁻¹")
                document.querySelector("input[value=cot⁻¹]").setAttribute("value", "coth⁻¹")  
            }else{
                document.querySelector("input[value=sin]").setAttribute("value", "sinh")
                document.querySelector("input[value=cos]").setAttribute("value", "cosh")
                document.querySelector("input[value=tan]").setAttribute("value", "tanh")
                document.querySelector("input[value=sec]").setAttribute("value", "sech")
                document.querySelector("input[value=csc]").setAttribute("value", "csch")
                document.querySelector("input[value=cot]").setAttribute("value", "coth")
            }
        }
    }



    botonCeil(){
        this.calcularResultado();
        this.pantalla = Math.ceil(this.pantalla).toString();
        this.display();
    }
    botonFloor(){
        this.calcularResultado();
        this.pantalla = Math.floor(this.pantalla).toString();
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
        this.pantalla = (this.pantalla).toString().substring(0,this.pantalla.length-1)
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
        this.calcularResultado();
        if(this.cambioFunciones){
            this.pantalla = Math.pow(parseFloat(this.pantalla),3).toString();
        }else{
            this.pantalla = Math.pow(parseFloat(this.pantalla),2).toString();
        }        
        this.display();
    }
    //x^y
    botonExponencial(){
        this.calcularResultado();
        if(this.cambioFunciones){
            this.funcionDosOperadores = "Math.pow("+this.pantalla+",";//tenemos que completar nosotros el parentesis
            this.pantalla = "";
        }else{
            this.funcionDosOperadores = "this.nthroot("+this.pantalla+",";//tenemos que completar nosotros el parentesis
            this.pantalla = "";
        }
        this.display();
    }
    
    //https://stackoverflow.com/questions/7308627/javascript-calculate-the-nth-root-of-a-number
    nthroot(x, n) {
        try {
          var negate = n % 2 == 1 && x < 0;
          if(negate)
            x = -x;
          var possible = Math.pow(x, 1 / n);
          n = Math.pow(possible, n);
          if(Math.abs(x - n) < 1 && (x > 0 == n > 0))
            return negate ? -possible : possible;
        } catch(e){}
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