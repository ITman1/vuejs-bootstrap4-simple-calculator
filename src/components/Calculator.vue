<template>
  <b-container>
    <b-row>
      <b-col style="background-color: #ddd" class="rounded p-3 mb-3 mt-3"
             cols="10" offset="1"
             sm="8" offset-sm="2"
             md="6" offset-md="3"
             lg="4" offset-lg="4">
        <b-row>
          <calculator-history :items="historyScreen"></calculator-history>
        </b-row>
        <b-row>
          <calculator-screen :input="valueScreen"></calculator-screen>
        </b-row>
        <b-row class="no-gutters">
          <calculator-button @click="clearAll">AC</calculator-button>
          <calculator-button @click="negateInput">+/-</calculator-button>
          <div class="col-6"></div>
          <div class="w-100"></div>
          <calculator-button @click="appendDigit('7')">7</calculator-button>
          <calculator-button @click="appendDigit('8')">8</calculator-button>
          <calculator-button @click="appendDigit('9')">9</calculator-button>
          <calculator-button @click="recordValueOrCalculate('/')">&divide;</calculator-button>
          <div class="w-100"></div>
          <calculator-button @click="appendDigit('4')">4</calculator-button>
          <calculator-button @click="appendDigit('5')">5</calculator-button>
          <calculator-button @click="appendDigit('6')">6</calculator-button>
          <calculator-button @click="recordValueOrCalculate('*')">&times;</calculator-button>
          <div class="w-100"></div>
          <calculator-button @click="appendDigit('1')">1</calculator-button>
          <calculator-button @click="appendDigit('2')">2</calculator-button>
          <calculator-button @click="appendDigit('3')">3</calculator-button>
          <calculator-button @click="recordValueOrCalculate('-')">&ndash;</calculator-button>
          <div class="w-100"></div>
          <calculator-button @click="appendDigit('0')">0</calculator-button>
          <calculator-button @click="startFractionPart">.</calculator-button>
          <calculator-button @click="calculate">=</calculator-button>
          <calculator-button @click="recordValueOrCalculate('+')">+</calculator-button>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import CalculatorButton from './CalculatorButton';
  import CalculatorHistory from './CalculatorHistory';
  import CalculatorScreen from './CalculatorScreen';

  const DISPLAY_LENGTH = 14;
  const InputStates = Object.freeze({
    START_TYPING: Symbol('START_TYPING'),
    TYPING_INTEGER_PART: Symbol('TYPING_INTEGER_PART'),
    START_FRACTIONAL_PART: Symbol('START_FRACTIONAL_PART'),
    TYPING_FRACTIONAL_PART: Symbol('TYPING_FRACTIONAL_PART')
  });
  const Operators = Object.freeze({
    '-': (a, b) => a - b,
    '+': (a, b) => a + b,
    '*': (a, b) => a * b,
    '/': (a, b) => {
      if (b === 0 || isNaN(b)) throw new Error('Division by zero');
      return a / b;
    }
  });

  export default {
    name: 'Calculator',
    components: {CalculatorButton, CalculatorHistory, CalculatorScreen},
    data() {
      return {
        history: [],
        operator: null,
        previousValue: null,
        currentValueString: '0',
        inputState: InputStates.START_TYPING
      };
    },
    methods: {
      clearAll() {
        this.history = [];
        this.operator = null;
        this.previousValue = null;
        this.currentValueString = '0';
        this.inputState = InputStates.START_TYPING;
      },
      negateInput() {
        switch (this.inputState) {
          case InputStates.START_TYPING:
            break; // No support for negation of calculated results
          default:
            this.currentValueString = this.currentValueString !== '0' ? this.formatResult(-parseFloat(this.currentValueString)) : this.currentValueString;
        }
      },
      appendDigit(digit) {
        const length = this.currentValueString.length;

        switch (this.inputState) {
          case InputStates.START_TYPING:
            this.inputState = InputStates.TYPING_INTEGER_PART;
            this.currentValueString = digit;
            // We started to type new value so we do not care about previous result
            if (this.operator == null) this.previousValue = null;
            break;
          case InputStates.START_FRACTIONAL_PART:
            if (length < DISPLAY_LENGTH) {
              this.currentValueString += '.' + digit;
              this.inputState = InputStates.TYPING_FRACTIONAL_PART;
            }
            break;
          case InputStates.TYPING_INTEGER_PART:
            if (this.currentValueString === '0') {
              this.currentValueString = digit;
              break;
            }
            if (length < DISPLAY_LENGTH) {
              this.currentValueString += digit;
            }
            break;
          case InputStates.TYPING_FRACTIONAL_PART:
            if (length < DISPLAY_LENGTH) {
              this.currentValueString += digit;
            }
        }
      },
      recordValueOrCalculate(operator) {
        if (this.previousValue == null) {
          this.previousValue = parseFloat(this.currentValueString);
          this.inputState = InputStates.START_TYPING;
        } else {
          this.calculate();
        }

        this.operator = operator;
      },
      calculate() {
        switch (this.inputState) {
          case InputStates.START_TYPING:
            break;
          default:
            if (this.previousValue != null && this.operator != null) {
              this.inputState = InputStates.START_TYPING;
              const operation = Operators[this.operator];
              const currentValue = parseFloat(this.currentValueString);
              try {
                const result = operation(this.previousValue, currentValue);
                this.history.unshift(this.formatResult(this.previousValue) + ' ' + this.operator + ' ' + this.currentValueString + ' = ' + this.formatResult(result));
                this.currentValueString = this.formatResult(result);
                this.previousValue = result;
                this.operator = null;
              } catch (ex) {
                this.currentValueString = ex.message;
              }
            }
        }
      },
      startFractionPart() {
        switch (this.inputState) {
          case InputStates.START_TYPING:
            this.currentValueString = '0';
            this.inputState = InputStates.START_FRACTIONAL_PART;
            // We started to type new value so we do not care about previous result
            if (this.operator == null) this.previousValue = null;
            break;
          case InputStates.TYPING_INTEGER_PART:
            this.inputState = InputStates.START_FRACTIONAL_PART;
        }
      },
      formatResult(result) {
        let formatted = result + '';
        if (formatted.length > DISPLAY_LENGTH) {
          for (let i = DISPLAY_LENGTH; i >= 0; i--) {
            const adjustedResult = result.toPrecision(i);
            if (adjustedResult.length <= DISPLAY_LENGTH) return adjustedResult;
          }
        }
        return formatted;
      }
    },
    computed: {
      historyScreen() {
        let nextHistoryItem = this.previousValue != null && this.operator != null ? this.formatResult(this.previousValue) + this.operator : '';
        nextHistoryItem += this.inputState !== InputStates.START_TYPING ? this.valueScreen : '';

        const historyClone = this.history.slice(0);
        return (nextHistoryItem !== '') ? historyClone.unshift(nextHistoryItem) && historyClone : historyClone;
      },
      valueScreen() {
        return this.currentValueString + (this.inputState === InputStates.START_FRACTIONAL_PART ? '.' : '');
      }
    }
  };
</script>

<style scoped>

</style>
