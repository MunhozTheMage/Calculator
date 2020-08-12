//Constants and Variables:

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operator]');
const equalButton = document.querySelector('[data-equal-operator]');
const clearButton = document.querySelector('[data-clear]');
const deleteButton = document.querySelector('[data-delete]');
const currentOperandText = document.querySelector('[data-current-operand]');
const previousOperandText = document.querySelector('[data-previous-operand]');

//Classes:

class Calculator {
	constructor (previousOperandText, currentOperandText) {
		this.currentOperandText = currentOperandText;
		this.previousOperandText = previousOperandText;
		this.operator = undefined;
		this.currentValue = 0;
		this.previousValue = 0;
		this.clearOnNextNumber = false;
	}

	DEV_getCurrentValue () {
		return this.currentValue;
	}

	setNumber (number) {
		if (number == '.' && currentOperandText.innerText.includes('.')) return;
		if (this.clearOnNextNumber) {
			this.clearOnNextNumber = false;
			this.clear();
		}
		let newNumber = currentOperandText.innerText.toString() + number.toString();
		this.currentValue = parseFloat(newNumber);
		this.render(this.previousOperandText.innerText, newNumber);
	}

	setOperation (operation) {
		if (this.operator != undefined) {
			this.operate(false);
		}
		if (this.clearOnNextNumber) {
			this.clearOnNextNumber = false;
		}
		this.operator = operation;
		this.previousValue = this.currentValue;
		this.currentValue = 0;
		this.render(this.currentOperandText.innerText + ' ' + this.operator);
	}

	clear () {
		this.currentOperandText.innerText = '';
		this.previousOperandText.innerText = '';
		this.operator = undefined;
		this.currentValue = 0;
		this.previousValue = 0;
	}

	delete () {
		if (this.currentOperandText == '') return;
		this.currentValue = parseFloat(this.currentOperandText.innerText.slice(0, -1));
		this.render(this.previousOperandText.innerText, this.currentOperandText.innerText.slice(0, -1));
	}

	operate (clearOnNextNumber) {
		let prevText = `${this.previousValue} ${this.operator} ${this.currentValue}`;

		switch (this.operator) {
			case '+':
				this.currentValue += this.previousValue;
				break;
			case '-':
				this.currentValue = this.previousValue - this.currentValue;
				break;
			case '*':
				this.currentValue *= this.previousValue;
				break;
			case '/':
				this.currentValue = this.previousValue / this.currentValue;
				break;
			case '^':
				this.currentValue = Math.pow(this.previousValue, this.currentValue);
				break;
			default:
				return;
		}

		this.clearOnNextNumber = clearOnNextNumber;

		this.previousValue = 0;
		this.render(prevText, this.currentValue);
	}

	render (newPrevious = this.currentOperandText.innerText, newCurrent = '') {
		this.previousOperandText.innerText = newPrevious;
		this.currentOperandText.innerText = newCurrent;
	}
}

//Page Operations:

const calculator = new Calculator(previousOperandText, currentOperandText);

numberButtons.forEach((button) => {
	button.addEventListener('click', () => {
		calculator.setNumber(button.innerText);
	});
});

operationButtons.forEach((button) => {
	button.addEventListener('click', () => {
		calculator.setOperation(button.innerText);
	});
});

equalButton.addEventListener('click', () => {
	calculator.operate(true);
});

deleteButton.addEventListener('click', () => {
	calculator.delete();
});

clearButton.addEventListener('click', () => {
	calculator.clear();
});
