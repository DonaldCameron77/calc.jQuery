'use strict';

const calcState = {
  inbuf: '',  // if we're collecting any characters (number, other?) they go into here
  hasDecimal: false,
  leftOpnd: null, // do these need to be null to distinguish when there is or isn't valid contents?
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
      //  or if c is a redundant leading zero.
      const MAXINBUF = 16;
      if (this.inbuf.length >= MAXINBUF) {
        return;
      }

      if (c === '.') {
        if (this.hasDecimal) {
          return; // discard any decimal other that the first
        }
        else {
          if (this.inbuf === '') { // fix up buffer in case user started number with '.'
            this.inbuf = '0';
          }
          this.hasDecimal = true; // remember there is a decimal point in buffer
        }
      }

      if (this.inbuf === '0' && c !== '.') {
        this.inbuf = ''; // suppress leading zero unless "0."
      }

      this.inbuf += c;
      this.updateDisplay(this.inbuf);
    }; // handleNumeric
    
    
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

      if (this.leftOpnd === null) {
        this.leftOpnd = Number(this.inbuf);
        this.clearEntry(false);
        this.operator = c;
      }
      else if (this.inbuf === '') { // have leftOpnd but no right operand (inbuf)
        // discard older consecutive operators, saving current one (unless it's '=')
        this.operator = (c === '=' ? '' : c); 
      }
      else { // have leftOpnd, inbuf (right operand), and (presumably) a binary op in operator
        this.leftOpnd = calculate(this.leftOpnd, this.operator, Number(this.inbuf));
        this.updateDisplay(this.leftOpnd.toString());
        this.operator = (c === '=' ? '' : c);
        this.clearEntry(false);
      }
    };
    
    // debugger;

    if ((c >= '0' && c <= '9') || c === '.') {
      handleNumeric(c);
    }
    else if (c === '+' ||c === '-' ||c === 'X' ||c === '/' ||c === '=') {
      handleOperatorOrEquals(c);
    }
    else if (c === 'CE') {
      this.clearEntry(true);
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
      "operator =", this.operator
    );
  },
  
  clearEntry: function(clearDisplay) {
    this.inbuf = '';
    this.hasDecimal = false;
    if (clearDisplay) {
      this.updateDisplay('0');
    }
  },

  reset : function() { // leaving this unnested for the time being
    this.clearEntry(true);
    this.operator = '';
    this.leftOpnd = null; // imagining that these should be numeric
  }
};

$(document).ready(() => {
  $("button").on('click', (e) => {
    // debugger;
    // console.log('e', e.target.innerHTML);
    calcState.handleButtonClick(e.target.innerHTML);
  });
});