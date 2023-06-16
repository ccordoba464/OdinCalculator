let firstOperand = 0;
let secondOperand = "";
let operator;
let calculation = false;
const operators = ["+", "-", "x", "÷", "="];

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(a, b, operator) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "x":
      return multiply(a, b);
    case "÷":
      return divide(a, b);
  }
}

function displayValue(newValue) {
  const display = document.getElementById("display");
  if (
    operator === undefined &&
    !operators.includes(newValue) &&
    newValue !== "CE"
  ) {
    firstOperand == 0 ? (firstOperand = newValue) : (firstOperand += newValue);
    display.textContent = `${firstOperand}`;
  } else if (operator === undefined && newValue !== "=") {
    if (newValue !== "CE") {
      operator = newValue;
      display.textContent = `${firstOperand} ${operator}`;
    } else {
      firstOperand = firstOperand.slice(0, -1);
      display.textContent = `${firstOperand}`;
    }
  } else if (operator !== undefined && !operators.includes(newValue)) {
    if (newValue !== "CE") {
      secondOperand += newValue;
      display.textContent = `${firstOperand} ${operator} ${secondOperand}`;
    } else {
      if (secondOperand === "") {
        console.log("TEST");
        operator = undefined;
        display.textContent = `${firstOperand}`;
      } else {
        secondOperand = secondOperand.slice(0, -1);
        display.textContent = `${firstOperand} ${operator} ${secondOperand}`;
      }
    }
  } else if (newValue === "=" || newValue === "CE") {
    if (newValue === "=") {
      let answer = operate(+firstOperand, +secondOperand, operator);
      display.textContent = answer;
      firstOperand = answer;
      secondOperand = null;
      operator = undefined;
      calculation = true;
      const button = document.getElementById("reset");
      button.textContent = "AC";
    }
  }

  console.log(firstOperand);
  console.log(secondOperand);
  console.log(operator);
}

function AC() {
  firstOperand = null;
  secondOperand = null;
  operator = undefined;
  calculation = false;
  const button = document.getElementById("reset");
  button.textContent = EC;
  display.textContent = 0;
}

const buttons = document.querySelectorAll(".calc-button");
buttons.forEach(button =>
  button.addEventListener("click", () => {
    displayValue(button.textContent);
  })
);
