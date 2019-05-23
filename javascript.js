//object needs to hold first operand, operator and second operand. (ie. 1 + 5)

//calculator objects holds all data needed for a valid expression.
const calculator = {
//displayValue shows input or result of an operation.    
    displayValue: '0',
//firstOperand will hold the first operand of any expression.
    firstOperand: null,
//flag to check whether an expression can be evaulated or whether the second operand needs to be inputed.
    waitingForSecondOperand: false,
//holds the operator for an expression.
    operator: null,
};

//displays the value of displayValue
function updateDisplay(){
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
}

updateDisplay();

//listen for clicks on .calculator-keys to determine which button was clicked.

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
//the target variable is an ojbect that represents the click.
    const { target } = event;
  if (!target.matches('button')) {
    return;
  }

  if (target.classList.contains('operator')) {
    //console.log('operator', target.value);
    handleOperator(target.value);
    updateDisplay();

    return;
  }

  if (target.classList.contains('decimal')) {
    //console.log('decimal', target.value);
    inputDecimal(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains('all-clear')) {
    //console.log('clear', target.value);
    resetCalculator();
    updateDisplay();
    return;
  }

  //console.log('digit', target.value);

  inputDigit(target.value);
 //updates the display after each button is clicked. 
  updateDisplay();
});

function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;
  
    if (waitingForSecondOperand === true) {
      calculator.displayValue = digit;
      calculator.waitingForSecondOperand = false;
    } else {
 // overwrite displayValue if the current value is '0'. Otherwise, overwrite it.
 //ternary operator (?) to see if the current value being displayed on the calculator is '0'.      
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
  
    console.log(calculator);
  }

  function inputDecimal(dot) {
    if (calculator.waitingForSecondOperand === true) return;
  
    // If the `displayValue` does not contain a decimal point
    //Includes method checks to see if displayValue does not already have a decimal point.
    //we append the dot to the number, or do nothing.
    if (!calculator.displayValue.includes(dot)) {
      // Append the decimal point
      calculator.displayValue += dot;
    }
  }
// When an operator key is pressed, 
// we convert the current number displayed 
// on the screen to a number (parseFloat(displayValue)) 
// and then store the result in calculator.firstOperand
// if it does not exist already.



function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator
    const inputValue = parseFloat(displayValue);
  
    if (operator && calculator.waitingForSecondOperand)  {
      calculator.operator = nextOperator;
      console.log(calculator);
      return;
    }
  
    if (firstOperand == null) {
      calculator.firstOperand = inputValue;
    } else if (operator) {
      const currentValue = firstOperand || 0;
      const result = performCalculation[operator](currentValue, inputValue);
  
      calculator.displayValue = String(result);
      calculator.firstOperand = result;
    }
  
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
    console.log(calculator);
  }


  // takes firstOperand and secondOperand and applies the calculation.
  // stored as an object.
const performCalculation = {
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
  
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
  
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
  
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
  
    '=': (firstOperand, secondOperand) => secondOperand
  }; 
    // resets the calculator to it's default state on AC button being clicked.
  function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    console.log(calculator);
  }