// script.js
document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.button');
    let displayValue = '0';
    let firstValue = null;
    let operator = null;
    let waitingForSecondValue = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (button.id === 'clear') {
                displayValue = '0';
                firstValue = null;
                operator = null;
                waitingForSecondValue = false;
            } else if (button.id === 'equals') {
                if (firstValue !== null && operator !== null) {
                    displayValue = calculate(firstValue, displayValue, operator);
                    firstValue = null;
                    operator = null;
                    waitingForSecondValue = false;
                }
            } else if (button.classList.contains('operator')) {
                if (firstValue === null) {
                    firstValue = displayValue;
                } else if (operator) {
                    displayValue = calculate(firstValue, displayValue, operator);
                    firstValue = displayValue;
                }
                operator = value;
                waitingForSecondValue = true;
            } else {
                if (waitingForSecondValue) {
                    displayValue = value;
                    waitingForSecondValue = false;
                } else {
                    displayValue = displayValue === '0' ? value : displayValue + value;
                }
            }

            updateDisplay();
        });
    });

    function calculate(first, second, operator) {
        first = parseFloat(first);
        second = parseFloat(second);

        if (operator === '+') return first + second;
        if (operator === '-') return first - second;
        if (operator === '*') return first * second;
        if (operator === '/') return first / second;
        return second;
    }

    function updateDisplay() {
        display.textContent = displayValue;
    }

    updateDisplay();
});