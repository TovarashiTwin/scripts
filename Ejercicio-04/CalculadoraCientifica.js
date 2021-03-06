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
            console.log(toEval);
            this.pantalla =  eval(toEval).toString();//El toString es para que siempre se interprete como string y funcione todo bien
            // document.getElementById('pantalla').value = this.pantalla;
        }catch(excepcion){
            this.pantalla = "Syntax Error";
            //document.getElementById('pantalla').value = "Syntax Error";
            console.log(excepcion);
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
        this.unidadAngulo = "DEG";
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
            this.memoria = new Number(this.pantalla);
        }
        this.display();
    }

    //IDK
    botonUnidadDeAngulo(){
        if(this.unidadAngulo == "DEG"){
            this.unidadAngulo = "RAD";
            document.getElementById("unidadAngulo").setAttribute("value", "RAD");
        }else if(this.unidadAngulo == "RAD"){
            this.unidadAngulo = "GRAD";
            document.getElementById("unidadAngulo").setAttribute("value", "GRAD");
        }else if(this.unidadAngulo == "GRAD"){
            this.unidadAngulo = "DEG";
            document.getElementById("unidadAngulo").setAttribute("value", "DEG");
        }
    }

    DegToRad(value){
        return value * (Math.PI/180);
    }
    RadToDeg(value){
        return value * (180/Math.PI);
    }
    GradToRad(value){
        return value * (Math.PI/200);
    }
    RadToGrad(value){
        return value * (200/Math.PI);
    }

    botonNotacionDiezElevado(){

    }
    botonRand(){
        this.pantalla += Math.random();
        this.display();
    }
    botonDms(){
        console.log("dms");
        this.calcularResultado();
        let value = new Number(this.pantalla)*3600;
        let grados = Math.floor(value/3600).toString();
        let minutos = Math.floor((value%3600)/60).toString();
        let segundos = Math.floor((value%3600)%60).toString();
        if(minutos.length == 1){
            minutos = "0"+minutos;
        }
        if(segundos.length == 1){
            segundos = "0"+segundos;
        }
        this.pantalla = grados+","+minutos+segundos;
        this.display();
    }
    botonDeg(){
        this.calcularResultado();    
        let numero = this.pantalla.split(".")
        let toReturn = numero[0]+"."
        if(numero[1].length > 1){
            if(numero[1].length == 1){//solo tenemos minutos
                toReturn += (new Number(numero[1]+"0") / 60).toString().split(".")[1];
            }else if(numero[1].length == 2){
                toReturn += (new Number(numero[1]) / 60).toString().split(".")[1];
            }
            else{//tenemos segundos                
                let decimalesGrandes = (new Number(numero[1].substring(0,2)) / 60);
                let decimalesChikitos = (new Number(numero[1].substring(2,numero[1].length)) / 3600);
                toReturn += (decimalesGrandes + decimalesChikitos).toString().split(".")[1];
            }
           
        }
        this.pantalla = toReturn;
        this.display();
    }
    //FUNCIONES TRIGONOMETRICAS
    //sin sinh y sin^-1
    botonSeno(){        
        this.calcularResultado();        
        this.pantalla = this.seno(new Number(this.pantalla)).toString();
        this.display(); 
    }
    seno(value){
        if(this.unidadAngulo == "DEG"){
            value = this.DegToRad(value);
        }
        if(this.unidadAngulo == "GRAD"){
            value = this.GradToRad(value);
        }
        if(!this.arco){            
            if(!this.hyperbolica){
                //seno sin                
                value = Math.sin(value);                
            }
            else{                
                //seno hyperbolico sinh
                value = Math.sinh(value);
            }
        }else{
            if(!this.hyperbolica){
                 //arcoseno sin^-1 asin
                 value = Math.asin(value); 
            }
            else{
                //arcoseno hyperbolico asinh
                value= Math.asinh(value);  
            }
        }
        // if(this.unidadAngulo == "DEG"){
        //     value = this.RadToDeg(value);
        // }
        // if(this.unidadAngulo == "GRAD"){
        //     value = this.RadToGrad(value);
        // }
        return value;
    }

    botonCoseno(){        
        this.calcularResultado();
        this.pantalla = this.coseno(new Number(this.pantalla)).toString();
        this.display(); 
    }

    coseno(value){
        if(this.unidadAngulo == "DEG"){
            value = this.DegToRad(value);
        }
        if(this.unidadAngulo == "GRAD"){
            value = this.GradToRad(value);
        }
        if(!this.arco){            
            if(!this.hyperbolica){
                //seno sin                
                value = Math.cos(value);                
            }
            else{                
                //seno hyperbolico sinh
                value = Math.cosh(value);   
            }
        }else{
            if(!this.hyperbolica){
                 //arcoseno sin^-1 asin
                 value = Math.acos(value);   
            }
            else{
                //arcoseno hyperbolico asinh
                value = Math.acosh(value);   
            }
        }
        return value;
    }
    botonTangente(){
        this.calcularResultado();
        this.pantalla = this.tangente(new Number(this.pantalla)).toString();
        this.display(); 
    }
    tangente(value){
        if(this.unidadAngulo == "DEG"){
            value = this.DegToRad(value);
        }
        if(this.unidadAngulo == "GRAD"){
            value = this.GradToRad(value);
        }
        if(!this.arco){            
            if(!this.hyperbolica){
                //seno sin                
                value = Math.tan(value);                
            }
            else{                
                //seno hyperbolico sinh
                value = Math.tanh(value);   
            }
        }else{
            if(!this.hyperbolica){
                 //arcoseno sin^-1 asin
                 value = Math.atan(value);   
            }
            else{
                //arcoseno hyperbolico asinh
                value = Math.atanh(value);   
            }
        }
        return value;
    }
   
    
    botonSecante(){
        this.calcularResultado();        
        this.pantalla = (1/new Number(this.seno(new Number(this.pantalla)))).toString();
        this.display(); 
    }
    botonCosecante(){
        this.calcularResultado();
        this.pantalla = (1/new Number(this.coseno(new Number(this.pantalla)))).toString();
        this.display(); 
    }
    botonCotangente(){
        this.calcularResultado();
        this.pantalla = (1/new Number(this.tangente(new Number(this.pantalla)))).toString();
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
            this.cambioFunciones = false;
            document.querySelector("input[value=x³]").setAttribute("value", "x²")
            document.querySelector("input[value=³√x]").setAttribute("value", "²√x")
            document.querySelector("input[value=ʸ√x]").setAttribute("value", "xʸ")
            document.getElementById("elevadoX").setAttribute("value", "10ˣ")//fui incapaz de conseguir que me seleccionase bien ni espando con octales, ni decimales ni unicode :')
            document.querySelector("input[value=logᵧx]").setAttribute("value", "log")
            document.querySelector("input[value=eˣ]").setAttribute("value", "ln")
        }else{
            this.cambioFunciones = true;
            document.querySelector("input[value=x²]").setAttribute("value", "x³")
            document.querySelector("input[value=²√x]").setAttribute("value", "³√x")
            document.querySelector("input[value=xʸ]").setAttribute("value", "ʸ√x")
            document.getElementById("elevadoX").setAttribute("value", "2ˣ")
            document.querySelector("input[value=log]").setAttribute("value", "logᵧx")
            document.querySelector("input[value=ln]").setAttribute("value", "eˣ")
        }
    }
    botonPi(){
        //podia haber hardcodeado el numero pi truncado pero me parecia más flexible hacerlo de esta manera
        this.pantalla += this.truncateDecimals(Math.PI,4);
        this.display();
    }
    botonE(){
        //podia haber hardcodeado el numero pi truncado pero me parecia más flexible hacerlo de esta manera
        this.pantalla += this.truncateDecimals(Math.E,4);
        this.display();
    }
    //https://stackoverflow.com/questions/4912788/truncate-not-round-off-decimal-numbers-in-javascript
    truncateDecimals (num, digits) {
        var numS = num.toString(),
            decPos = numS.indexOf('.'),
            substrLength = decPos == -1 ? numS.length : 1 + decPos + digits,
            trimmedResult = numS.substr(0, substrLength),
            finalResult = isNaN(trimmedResult) ? 0 : trimmedResult;
    
        return new Number(finalResult);
    }
    
    botonQuitar(){
        this.pantalla = (this.pantalla).toString().substring(0,this.pantalla.length-1)
        this.display();
    }
    botonInverso(){
        this.calcularResultado();
        this.pantalla = (1/new Number(this.pantalla)).toString();
        this.display();
    }
    botonAbsolute(){
        this.calcularResultado();
        this.pantalla = Math.abs(new Number(this.pantalla)).toString();
        this.display();
    }
    botonExp(){
        this.calcularResultado();
        this.funcionDosOperadores = this.pantalla +"*Math.pow(10,";//tenemos que completar nosotros el parentesis
        this.pantalla = "";        
        this.display();
    }
    botonMod(){
        this.pantalla+="%";
        this.display(); 
    }

    //x^2 y x^3
    botonElevadoConstante(){//TODO Cambiar esto, fatla x^3 y hacer el eval bien
        this.calcularResultado();
        if(this.cambioFunciones){
            this.pantalla = Math.pow(new Number(this.pantalla),3).toString();
        }else{
            this.pantalla = Math.pow(new Number(this.pantalla),2).toString();
        }        
        this.display();
    }
    //x^y y yraizx
    botonExponencial(){
        this.calcularResultado();
        if(!this.cambioFunciones){
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

      //raiz cuadrada y cubica
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
        this.pantalla = new Number(this.pantalla);
        let aux = 1;
        for (var i = 2; i <= this.pantalla; i++){
            aux = aux * i;
        }
        this.pantalla = aux.toString();
        this.display();
    }
    //10^x 2^x
    botonDiezElevado(){
        this.calcularResultado();
        if(!this.cambioFunciones){
            this.pantalla = Math.pow(10,new Number(this.pantalla)).toString();
        }else{
            this.pantalla = Math.pow(2,new Number(this.pantalla)).toString();
        }        
        this.display();
    }
    //log y logy x
    botonLogaritmo(){
        this.calcularResultado();
        if(!this.cambioFunciones){
            this.pantalla = Math.log10(new Number(this.pantalla)).toString();
            
        }else{
            this.funcionDosOperadores = "this.logaritmoBaseN("+this.pantalla+",";
            this.pantalla = "";
        }
        this.display();
    }
    logaritmoBaseN(x,n){//Aplicaremos la propiedad de cambio de base de los logaritmos
        return Math.log(x)/Math.log(n);
    }
    //ln y e^x
    botonLogNeperiano(){
        this.calcularResultado();
        if(!this.cambioFunciones){
            this.pantalla = Math.log(new Number(this.pantalla)).toString();
        }else{
            this.pantalla = Math.pow(Math.E,new Number(this.pantalla)).toString()
        }       
        this.display();
    }
}
var calculadora = new CalculadoraCientifica();