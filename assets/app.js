class Calculator {
    constructor(previousOperandText, currentOperandText) {
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand += number.toString();
    }

    chooseOperation(operation) {
        if (this.operation !== operation) {
            this.operation = operation;
        }
        if (this.previousOperand !== '') {
            this.compute();
        }
        if (this.currentOperand === '') return;
        this.animateDisplayPrevious(this.previousOperandText);
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        if (this.currentOperand === '' || this.previousOperand === '') return;
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (prev === NaN || current === NaN) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    //this function adapts the commas automatically
    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandText.innerText = this.getDisplayNumber(this.currentOperand);
        this.animateDisplayCurrent(this.currentOperandText);
        if (this.operation != null) {
            this.previousOperandText.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandText.innerText = '';
        }
    }

    animateDisplayCurrent(element) {
        element.classList.add('animateCurrent');
        setTimeout(() => {
            element.classList.remove('animateCurrent');
        }, 200); // Duración de la animación en milisegundos
    }
    animateDisplayPrevious(element) {
        element.classList.add('animatePrevious');
        setTimeout(() => {
            element.classList.remove('animatePrevious');
        }, 200); // Duración de la animación en milisegundos
    }
}

const numberBtn = document.querySelectorAll('[data-number]');
const operationBtn = document.querySelectorAll('[data-operation]');
const equals = document.querySelector('[data-equals]');
const clear = document.querySelector('[data-clear]');
const deleteBtn = document.querySelector('[data-delete]');
const previousOperandText = document.querySelector('[data-previous-operand]');
const currentOperandText = document.querySelector('[data-current-operand');


const calculator = new Calculator(previousOperandText, currentOperandText);



numberBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationBtn.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});


equals.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

clear.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteBtn.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});

//dark mode
var theme = document.querySelector(".theme");

theme.addEventListener("click", function () {
    document.body.classList.toggle("dark-theme");
    if (document.body.classList.contains("dark-theme")) {
        theme.classList.remove("fa-moon");
        theme.classList.add("fa-sun");
        theme.style.color = "var(--primary-100)";
    } else {
        theme.classList.remove("fa-sun");
        theme.classList.add("fa-moon");
        theme.style.color = "var(--primary-100)";
    }
})
//loader
const loader = document.querySelector('.loader');
loader.addEventListener("animationend", (event) => {
    if (event.animationName === "loaderHide") {
        // Eliminamos el elemento 'loader' del DOM
        document.body.removeChild(loader);
    }
});