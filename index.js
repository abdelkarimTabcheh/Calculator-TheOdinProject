let currentInput = '0';
let previousInput = '';
let operator = '';
let shouldResetScreen = false;

const displayScreen = document.querySelector('.display-screen');

function updateDisplay() {
    displayScreen.textContent = currentInput;
}

function clearAll() {
    currentInput = '0';
    previousInput = '';
    operator = '';
    shouldResetScreen = false;
    updateDisplay();
}

function appendNumber(number) {
    if (shouldResetScreen) {
        currentInput = number;
        shouldResetScreen = false;
    } else {
        currentInput = currentInput === '0' ? number : currentInput + number;
    }
    updateDisplay();
}

function chooseOperator(selectedOperator) {
    if (operator !== '') {
        calculate();
    }
    operator = selectedOperator;
    previousInput = currentInput;
    shouldResetScreen = true;
}

function appendDecimal() {
    if (shouldResetScreen) {
        currentInput = '0';
        shouldResetScreen = false;
    }
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay();
    }
}

function calculate() {
    if (operator === '' || shouldResetScreen) return;
    
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);
    
    if (isNaN(prev) || isNaN(curr)) return;
    
    let result;
    
    switch (operator) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            result = curr === 0 ? 'Error' : prev / curr;
            break;
        case '%':
            result = prev % curr;
            break;
        default:
            return;
    }
    
    currentInput = result.toString();
    operator = '';
    shouldResetScreen = true;
    updateDisplay();
}

function toggleSign() {
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateDisplay();
}

document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', () => appendNumber(button.value));
});

document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', () => chooseOperator(button.value));
});

document.querySelector('.clear').addEventListener('click', clearAll);
document.querySelector('.sign').addEventListener('click', toggleSign);
document.querySelector('.modulo').addEventListener('click', () => chooseOperator('%'));
document.querySelector('.operator[value="="]').addEventListener('click', calculate);
document.querySelector('.number[value="."]').addEventListener('click', appendDecimal);

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        button.classList.add('button-clicked');
        setTimeout(() => {
            button.classList.remove('button-clicked');
        }, 100);
    });
});

updateDisplay();
