class CalcControler{

constructor(){

    this._operation = [];
    this.locale = "pt-BR";
    this._displaycalcEl = document.querySelector("#display");
    this._dateEl = document.querySelector("#hora");
    this._timeEl = document.querySelector("#data");
    this._displayCalc;
    this._currentDate;
    this.initialize();
    this.initButtonsEvents();
}

    initialize(){
        this.setLastNumberDisplay();

        this.setDisplayTimeDate();

    setInterval(()=>{

        this.setDisplayTimeDate();


      }, 1000);

}   

addEventListenerAll(element, events, fn){

    events.split(' ').forEach(ev => {
        
        element.addEventListener(ev, fn, false);

    });

}

clearAll(){

    this._operation = [];
    this.setLastNumberDisplay();

};

clearEntry(){

    this._operation.pop();
    this.setLastNumberDisplay();

}

getLastOperation(){
    
   return this._operation[this._operation.length -1];

}

isOperator(value){

    return (['+', '-', '*','/','%'].indexOf(value) > -1);

}

setLastOperation(value){
    this._operation[this._operation.length -1] = value;
}

calc(){
    
    let lastnum = this._operation.pop();
    let result = eval(this._operation.join(""));
    
    if (lastnum == '%') {

        result /= 100;

        this._operation[result];

    } else{
    
        this._operation = [result, lastnum];

    }
    
    this.setLastNumberDisplay();

}

setLastNumberDisplay(){

    let lastnumber;
    
    for(let i = this._operation.length - 1; i >=0; i--){

        if(!this.isOperator(this._operation[i])){

            lastnumber = this._operation[i];
        break    
        }

    }
    
    if(!lastnumber) lastnumber = 0;

    this.displayCalc = lastnumber;
}


pushOperation(value){
    
    this._operation.push(value);

    if(this._operation.length > 3){

        this.calc();

        console.log(this._operation);

    }

}

addOperation(value){

    if(isNaN(this.getLastOperation())){
      
        if(this.isOperator(value)){
            
            this.setLastOperation(value);

        } else if(isNaN(value)){
            
            console.log('Outra coisa',value);
           
        }else{
               
            this.pushOperation(value);
            this.setLastNumberDisplay();
        }
        
    } else{

        if(this.isOperator(value)){

            this.pushOperation(value);

        }else{

            let newValue = this.getLastOperation().toString() + value.toString();
            this.setLastOperation(parseInt(newValue));

            //Atualizar display
            this.setLastNumberDisplay();

        }      

    }
    
}

setError(){

    this.displayCalc = "Error";

}

execBtn(value){

    switch(value){
        
        case 'ac':
            this.clearAll();
        break;
        case 'ce':
            this.clearEntry();
        break;
        case 'soma':
            this.addOperation('+');
        break;
        case 'subtracao':
            this.addOperation('-');
        break;
        case 'multiplicacao':
            this.addOperation('*');
        break;
        case 'divisao':
            this.addOperation('/');
        break;
        case 'porcento':
            this.addOperation('%');
        break;
        case 'igual':
            this.calc();
        break;
        case 'ponto':
            this.addOperation('.')
        break;
        
        case '0':
        case '1':
        case '2':
        case '3':     
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':

            this.addOperation(parseInt(value));
            
            break;
                       
        default:
            this.setError();
        break;                                        
    }
}

initButtonsEvents(){
    let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        buttons.forEach((btn, index)=>{

            this.addEventListenerAll(btn, "click drag", e=>{

            let textBtn = btn.className.baseVal.replace("btn-","");
                
            this.execBtn(textBtn);
        });
        
        this.addEventListenerAll(btn, "mouseover mouseup mousedown");

            btn.style.cursor = "pointer";

    });
}

setDisplayTimeDate(){

    this.displayDate = this.currentDate.toLocaleDateString(this.locale);
    this.displayTime = this.currentDate.toLocaleTimeString(this.locale);

}
//Determinando hora no visor da calculadora
    get displayTime(){

        return this._timeEl.innerHTML;
    }

    set displayTime(value){

        this._timeEl.innerHTML = value;

    }
//Determiando a data no visor da calculadora
    get displayDate(){

        return this._dateEl.innerHTML;
    }

    set displayDate(value){

        this._dateEl.innerHTML = value;

    }
//Retorno dos números no visor da calculadora
    get displayCalc(){
        
        return this._displaycalcEl.innerHTML;

    }

    set displayCalc(valor){
        
        this._displaycalcEl.innerHTML = valor;

    }

    get currentDate(){

        return this._currentDate = new Date();

    }

    set currentDate(v){

        this._currentDate = v;

    }

}
