const previousText = document.getElementById("previous");
const currentText = document.getElementById("current");
const buttons = document.querySelectorAll("button");

let current = "";
let previous = "";
let operator = null;

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.innerText;

        if (value === "CLEAR") {
            clearAll();
        } 
        else if (value === "DELETE") {
            deleteNumber();
        } 
        else if (value === "=") {
            calculate();
        } 
        else if (["+", "-", "×", "÷"].includes(value)) {
            chooseOperator(value);
        } 
        else {
            appendNumber(value);
        }
    });
});

function appendNumber(number) {
    if (number === "." && current.includes(".")) return;
    current += number;
    updateDisplay();
}

function chooseOperator(op) {
    if (current === "") return;
    if (previous !== "") {
        calculate();
    }
    operator = op;
    previous = current;
    current = "";
    updateDisplay();
}

function calculate() {
    if (previous === "" || current === "" || operator === null) return;

    const num1 = parseFloat(previous);
    const num2 = parseFloat(current);
    let result;

    switch (operator) {
        case "+": result = num1 + num2; break;
        case "-": result = num1 - num2; break;
        case "×": result = num1 * num2; break;
        case "÷": result = num2 !== 0 ? num1 / num2 : "Error"; break;
    }

    current = result.toString();
    previous = "";
    operator = null;
    updateDisplay();
}

function deleteNumber() {
    current = current.slice(0, -1);
    updateDisplay();
}

function clearAll() {
    current = "";
    previous = "";
    operator = null;
    updateDisplay();
}

function updateDisplay() {
    previousText.innerText = operator ? previous + " " + operator : "";
    currentText.innerText = current || "0";
}