
/*
    Project: freeCodeCamp Calculator (front-end libraries/platforms project)
    File: scripts.js
    Author: Donald Cameron
    Created: May-June 2018

    Credit: this realization of a calculator in JS and jQuery was inspired by some of Jennifer
    Bland's ideas in https://medium.freecodecamp.org/programming-a-calculator-8263966a8019
*/

// Separate parsing from expression evaluation.  By "parsing" we mean "lexical
// analysis", as there are some challenges, like allowing only a single leading
// zero, and throwing away all but the rightmost in a sequence of operators.

// const isOperator = (token) => {
//   const operators = '+-*/'
//   return operators.includes(token);
// }

// the methods herein have nested functions which want to access properties of the
// enclosing object.  For simplicity these nested functions are realized as arrow
// functions so that 'this' will be bound lexically.

const inputState = {
  inbuf: '',  // if we're collecting any characters (number, other?) they go into here
  hasDecimal: false,
  leftOpnd: 0,
  rightOpnd: 0,
  operator: '',

  updateDisplay: function() {
    display = document.getElementById("display");
    display.innerHTML = this.inbuf;
  },

  nextChar : function(c) {

    const handleNumeric = (c) => {
      // debugger;
      if (c === '.') {
        if (this.hasDecimal) {
          return; // discard any decimal other that the first
        }
        else {
          this.hasDecimal = true;
        }
      }
      if (this.inbuf === '0' && c !== '.') {
        this.inbuf = ''; // suppress leading zero unless "0."
      }
      this.inbuf += c;
      this.updateDisplay();
    }

    if ((c >= '0' && c <= '9') || c === '.') {
      handleNumeric(c);
    }
    else if (c === 'AC') {
      this.reset();
    }
    else {
      console.log("UNIMPLEMENTED BUTTION:", c);
    }

    // if ((c === '+' || c === '-' || c === ))

  },

  reset : function() {
    console.log("reset:");
    this.inbuf = '0';
    this.hasDecimal = false;
    this.operator = '';
    this.leftOpnd = this.rightOpnd = 0; // imagining that these should be numeric
    this.updateDisplay();
  }
};

$(document).ready(() => {
  $("button").on('click', (e) => {
    // debugger;
    // console.log('e', e.target.innerHTML);
    inputState.nextChar(e.target.innerHTML);
  });
});



