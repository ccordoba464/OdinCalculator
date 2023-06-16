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
  let answer;
  switch (operator) {
    case "+":
      answer = add(a, b);
      break;
    case "-":
      answer = subtract(a, b);
      break;
    case "x":
      answer = multiply(a, b);
      break;
    case "÷":
      answer = divide(a, b);
      break;
  }
  let factor = 10 ** 3;
  return Math.round(answer * factor) / factor;
}

function displayValue(newValue) {
  const display = document.getElementById("display");
  const reset = document.getElementById("reset");

  if (
    operator === undefined &&
    !operators.includes(newValue) &&
    newValue !== "CE"
  ) {
    if (reset.textContent === "AC") {
      reset.textContent = "CE";
      if (newValue === "AC") {
        display.textContent = 0;
        firstOperand = 0;
      } else {
        firstOperand = newValue;
        display.textContent = `${firstOperand}`;
      }
    } else {
      firstOperand == 0
        ? (firstOperand = newValue)
        : (firstOperand += newValue);
      display.textContent = `${firstOperand}`;
    }
  } else if (operator === undefined && newValue !== "=") {
    reset.textContent = "CE";
    if (newValue !== "CE") {
      operator = newValue;
      display.textContent = `${firstOperand} ${operator}`;
    } else {
      firstOperand = firstOperand.slice(0, -1);
      firstOperand !== ""
        ? (display.textContent = `${firstOperand}`)
        : (display.textContent = 0);
    }
  } else if (operator !== undefined && !operators.includes(newValue)) {
    if (newValue !== "CE") {
      secondOperand += newValue;
      display.textContent = `${firstOperand} ${operator} ${secondOperand}`;
    } else {
      if (secondOperand === "") {
        operator = undefined;
        display.textContent = `${firstOperand}`;
      } else {
        secondOperand = secondOperand.slice(0, -1);
        display.textContent = `${firstOperand} ${operator} ${secondOperand}`;
      }
    }
  } else if (newValue === "=") {
    if (firstOperand !== 0 && operator !== undefined && secondOperand !== "") {
      let answer = operate(+firstOperand, +secondOperand, operator);
      if (answer == Infinity) {
        display.textContent = "Try again mfer";
        firstOperand = 0;
      } else {
        display.textContent = answer;
        firstOperand = answer.toString();
      }
      secondOperand = "";
      operator = undefined;
      calculation = true;
      reset.textContent = "AC";
    }
  }
}

const buttons = document.querySelectorAll(".calc-button");
buttons.forEach(button =>
  button.addEventListener("click", () => {
    displayValue(button.textContent);
  })
);
