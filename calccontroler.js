class CalcControler{

constructor(){

    this._audio = new Audio("click.mp3");
    this._audioOnOff = false;
    this._lastOperator = '';
    this._lastNumber = '';
    this._operation = [];
    this.locale = "pt-BR";
    this._displaycalcEl = document.querySelector("#display");
    this._dateEl = document.querySelector("#hora");
    this._timeEl = document.querySelector("#data");
    //this._displayCalc;
    this._currentDate;
    this.initialize();
    this.initButtonsEvents();
    this.initKeyboard();
}

pasteFromClipBoard(){

    document.addEventListener('paste', e=>{

       let text = e.clipboardData.getData('Text');

       this.displayCalc = parseFloat(text);

    })

}

copyToClipBoard(){

    let input = document.createElement('input');

    input.value = this.displayCalc;

    document.body.appendChild(input);

    input.select();

    document.execCommand("Copy");

    input.remove();

}

    initialize(){

    this.setDisplayTimeDate();

    setInterval(()=>{

        this.setDisplayTimeDate();


      }, 1000);
        
        
        this.pasteFromClipBoard();
        this.setLastNumberDisplay();

      document.querySelectorAll('.btn-ac').forEach(btn=>{

        btn.addEventListener('dblclick', e=>{

            this.toggleAudio();
    
        })
      })  

}   

toggleAudio(){

    this._audioOnOff = !this._audioOnOff;

}

playAudio(){

    if(this._audioOnOff){

        this._audio.currentTime = 0;
        this._audio.play();

    }

}

initKeyboard(){

    document.addEventListener('keyup', e=>{

        this.playAudio();

        switch(e.key){
        
            case 'Escape':
                this.clearAll();
            break;
            case 'Backspace':
                this.clearEntry();
            break;
            case '+':
            case '-':
            case '*':
            case '/':
            case '%':
               this.addOperation(e.key); 
                break;
            case '=':
            case 'Enter':    
                this.calc();
                break;    
            case '.':
            case ',':
                this.addDot('.')
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
    
                this.addOperation(parseInt(e.key));
                
                break;

            case 'c':
                if(e.ctrlKey) this.copyToClipBoard();
            break        
                                                       
        }
        
    });

}

addEventListenerAll(element, events, fn){

    events.split(' ').forEach(ev => {
        
        element.addEventListener(ev, fn, false);

    });

}

clearAll(){

    this._operation = [];
    this._lastNumber = ''
    this._lastOperator = ''
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

getResult(){
    try{
        return eval(this._operation.join(""));
    }catch(e){
        setTimeout(() => {
            this.setError();
            
        }, 1);
    }
}
//Metodo calculo 
calc(){
    
    let lastnum = '';
    this._lastOperator = this.getLastItem();

    if(this._operation.length < 3){
        
        let firstIt = this._operation[0];
        this._operation = [firstIt, this._lastOperator, this._lastNumber]
    }

    if(this._operation.length > 3){
        lastnum = this._operation.pop();

        this._lastOperator = this.getLastItem();
        this._lastNumber = this.getResult();
    }

    else if(this._operation.length == 3){

        this._lastNumber = this.getLastItem(false);        

    }

    console.log('_lastOperator', this._lastOperator);
    console.log('_lastNumber', this._lastNumber);

    let result = this.getResult();
    
    if (lastnum == '%') {

        result /= 100;

        this._operation[result];

    } else{
    
        this._operation = [result];

        if(lastnum) this._operation.push(lastnum);

    }
    
    this.setLastNumberDisplay();

}

getLastItem(isOperator = true){

    let lastItem;
    
    for(let i = this._operation.length - 1; i >=0; i--){

        if(this.isOperator(this._operation[i])==isOperator){

            lastItem = this._operation[i];
        break;
        }

        if(!lastItem){

            lastItem = (isOperator) ? this._lastOperator : this._lastNumber;

        }    

    }

    return lastItem;
}

setLastNumberDisplay(){

    let lastnumber = this.getLastItem(false);
    
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

        } else{
               
            this.pushOperation(value);
            this.setLastNumberDisplay();
        }
        
    } else{

        if(this.isOperator(value)){

            this.pushOperation(value);

        }else{

            let newValue = this.getLastOperation().toString() + value.toString();
            this.setLastOperation(newValue);

            //Atualizar display
            this.setLastNumberDisplay();

        }      

    }
    
}

setError(){

    this.displayCalc = "Error";

}

addDot(){

    let dot = this.getLastOperation();

    if(typeof dot === 'String' && dot.split('').indexOf('.') > -1) return;

    if(this.isOperator(dot) || !dot){

        this.pushOperation('0.');
    } else{

        this.setLastOperation(dot.toString() + '.');

    }

    this.setLastNumberDisplay();

}

execBtn(value){

    this.playAudio();

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
            this.addDot('.')
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

    set displayCalc(value){

        if(value.toString().length > 10){

            this.setError();
            return false;

        }
        
        this._displaycalcEl.innerHTML = value;

    }

    get currentDate(){

        return this._currentDate = new Date();

    }

    set currentDate(v){

        this._currentDate = v;

    }

}
