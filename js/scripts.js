'use strict';

const inputState = {
  inbuf: '0',  // if we're collecting any characters (number, other?) they go into here
  hasDecimal: false,
  leftOpnd: null, // do these need to be null to distinguish when there is or isn't valid contents?
  rightOpnd: null, // not convinced we need this since we have inbuf
  operator: '',
  
  updateDisplay: function(buf) {
    const display = document.getElementById("display");
    display.innerHTML = buf;
  },
  
  handleButtonClick : function(c) {

    console.log('*****');
    console.log('handleButtonClick - button =', c);
  
    const handleNumeric = (c) => {
      // append c to inbuf except
      //  throw c away if there are too many digits for the display,
      //  or if c is a '.' and inbuf already has one,
      //  or if c is a redundant leading zero
      const MAXINBUF = 16;
      if (this.inbuf.length >= MAXINBUF) {
        return;
      }

      if (c === '.') {
        if (this.hasDecimal) {
          return; // discard any decimal other that the first
        }
        else {
          this.hasDecimal = true; // remember there is a decimal point in buffer
        }
      }

      if (this.inbuf === '0' && c !== '.') {
        this.inbuf = ''; // suppress leading zero unless "0."
      }

      this.inbuf += c;
      this.updateDisplay(this.inbuf);
    }; // handleNumeric
    
    const finalizeOpnd = () => {
      if (this.leftOpnd === null) {
        this.leftOpnd = Number(this.inbuf);
      }
      else if (this.rightOpnd === null) {
        this.rightOpnd = Number(this.inbuf);
      }
      this.inbuf = '0';
      this.hasDecimal = false;
    };
    
    const calculate = (leftOpnd, operator, rightOpnd) => {
      console.log("calculate: leftOpnd =", leftOpnd, "operator =", operator, "rightOpnd =", rightOpnd);
      switch (operator) {
        case '+': return leftOpnd + rightOpnd;
        case '-': return leftOpnd - rightOpnd;
        case 'X': return leftOpnd * rightOpnd;
        case '/': return leftOpnd / rightOpnd;
      }
    }
        
    const handleOperatorOrEquals = (c) => {
      // infix operator which may terminate collection of number elements in
      // inbuf, but may also refer to existing left operand, finalize previous infix
      // binary expression, or follow equals which will have already stored a result

      // debugger;

      finalizeOpnd();
      if (this.operator === '') {
        this.operator = c;
      }
      else {
        this.leftOpnd = calculate(this.leftOpnd, this.operator, this.rightOpnd);
        this.rightOpnd = null;
        this.updateDisplay(this.leftOpnd.toString());
        this.operator = (c === '=' ? '' : c);
      }
    };
    
    if ((c >= '0' && c <= '9') || c === '.') {
      handleNumeric(c);
    }
    else if (c === '+' ||c === '-' ||c === 'X' ||c === '/' ||c === '=') {
      handleOperatorOrEquals(c);
    }
    else if (c === 'AC') {
      this.reset();
    }
    else {
      console.log("UNIMPLEMENTED BUTTION:", c);
    } 

    // DEBUG
    console.log("handleButtonClick:",
      "button = ", c,
      "display =", document.getElementById("display").innerHTML,
      "inbuf =", this.inbuf,
      "leftOpnd =", this.leftOpnd,
      "rightOpnd =",this.rightOpnd,
      "operator =", this.operator
    );
  },
  
  reset : function() { // leaving this unnested for the time being
    this.inbuf = '0';
    this.hasDecimal = false;
    this.operator = '';
    this.leftOpnd = this.rightOpnd = null; // imagining that these should be numeric
    this.updateDisplay(this.inbuf);
  }
};

$(document).ready(() => {
  $("button").on('click', (e) => {
    // debugger;
    // console.log('e', e.target.innerHTML);
    inputState.handleButtonClick(e.target.innerHTML);
  });
});