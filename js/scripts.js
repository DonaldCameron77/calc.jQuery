
/*
    Project: freeCodeCamp Calculator (front-end libraries/platforms project)
    File: scripts.js
    Author: Donald Cameron
    Created: May 2018
*/

// Separate parsing from expression evaluation.  By "parsing" we mean "lexical
// analysis", as there are some challenges, like allowing only a single leading
// zero, and throwing away all but the rightmost in a sequence of operators.

// const isOperator = (token) => {
//   const operators = '+-*/'
//   return operators.includes(token);
// }

$(document).ready(() => {
  $("button").click( buttonClick ) 
})

const buttonClick = (theButton) => {
  alert(theButton)
  console.log(theButton)
}

