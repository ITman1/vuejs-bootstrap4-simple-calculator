<template>
  <b-container>
    <b-row>
      <b-col style="background-color: #ddd" class="rounded p-3 mb-3 mt-3"
             cols="10" offset="1"
             sm="8" offset-sm="2"
             md="6" offset-md="3"
             lg="4" offset-lg="4">
        <b-row>
          <calculator-history :items="history"></calculator-history>
        </b-row>
        <b-row>
          <calculator-screen :input="screenInput"></calculator-screen>
        </b-row>
        <b-row class="no-gutters">
          <calculator-button @click="clearAll">AC</calculator-button>
          <calculator-button @click="negateInput">+/-</calculator-button>
          <div class="col-6"></div>
          <div class="w-100"></div>
          <calculator-button @click="newDigit('7')">7</calculator-button>
          <calculator-button @click="newDigit('8')">8</calculator-button>
          <calculator-button @click="newDigit('9')">9</calculator-button>
          <calculator-button @click="doOperation('/')">&divide;</calculator-button>
          <div class="w-100"></div>
          <calculator-button @click="newDigit('4')">4</calculator-button>
          <calculator-button @click="newDigit('5')">5</calculator-button>
          <calculator-button @click="newDigit('6')">6</calculator-button>
          <calculator-button @click="doOperation('*')">&times;</calculator-button>
          <div class="w-100"></div>
          <calculator-button @click="newDigit('1')">1</calculator-button>
          <calculator-button @click="newDigit('2')">2</calculator-button>
          <calculator-button @click="newDigit('3')">3</calculator-button>
          <calculator-button @click="doOperation('-')">&ndash;</calculator-button>
          <div class="w-100"></div>
          <calculator-button @click="newDigit('0')">0</calculator-button>
          <calculator-button @click="fraction">.</calculator-button>
          <calculator-button @click="calculate">=</calculator-button>
          <calculator-button @click="doOperation('+')">+</calculator-button>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import CalculatorButton from './CalculatorButton'
  import CalculatorHistory from './CalculatorHistory'
  import CalculatorScreen from './CalculatorScreen'

  const DISPLAY_LENGTH = 14
  const States = Object.freeze({
    START_TYPING: Symbol('start'),
    TYPING_INTEGER_PART: Symbol('integer'),
    START_FRACTIONAL_PART: Symbol('start fraction'),
    TYPING_FRACTIONAL_PART: Symbol('fraction'),
    RESULT_AND_START_TYPING: Symbol('result'),
    DIVISION_BY_ZERO: Symbol('Division by zero')
  })
  const Operators = Object.freeze({
    '-': (a, b) => a - b,
    '+': (a, b) => a + b,
    '*': (a, b) => a * b,
    '/': (a, b) => {
      if (b === 0 || isNaN(b)) throw new Error('Division by zero')
      return a / b
    }
  })

  export default {
    name: 'Calculator',
    components: {CalculatorButton, CalculatorHistory, CalculatorScreen},
    data() {
      return {
        history: [],
        operator: null,
        previousValue: null,
        currentValueString: '0',
        state: States.START_TYPING
      }
    },
    methods: {
      clearAll() {
        this.history = []
        this.operator = null
        this.previousValue = null
        this.currentValueString = '0'
        this.state = States.START_TYPING
      },
      negateInput() {
        if (this.state === States.RESULT_AND_START_TYPING) {
          this.previousValue = -this.previousValue
        }
        const oldValue = this.currentValueString
        this.currentValueString = this.currentValueString !== '0' ? this.formatResult(-parseFloat(this.currentValueString)) : this.currentValueString
        this.history.unshift('neg(' + oldValue + ') = ' + this.currentValueString)
      },
      newDigit(digit) {
        const length = this.currentValueString.length

        switch (this.state) {
        case States.START_TYPING:
        case States.RESULT_AND_START_TYPING:
          this.state = States.TYPING_INTEGER_PART
          this.currentValueString = digit
          break
        case States.START_FRACTIONAL_PART:
          if (length < DISPLAY_LENGTH) {
            this.currentValueString += '.' + digit
            this.state = States.TYPING_FRACTIONAL_PART
          }
          break
        case States.TYPING_INTEGER_PART:
          if (this.currentValueString === '0' && digit === '0') break
          if (length < DISPLAY_LENGTH) {
            this.currentValueString += digit
          }
          break
        case States.TYPING_FRACTIONAL_PART:
          if (length < DISPLAY_LENGTH) {
            this.currentValueString += digit
          }
        }
      },
      doOperation(op) {
        if (this.state === States.START_TYPING) {
          return
        }

        if (this.previousValue == null) {
          this.previousValue = parseFloat(this.currentValueString)
          this.state = States.RESULT_AND_START_TYPING
        } else {
          this.calculate()
        }

        this.operator = op
      },
      calculate() {
        if (this.previousValue != null && this.operator != null && this.state !== States.START_TYPING && this.state !== States.RESULT_AND_START_TYPING) {
          this.state = States.RESULT_AND_START_TYPING
          const operation = Operators[this.operator]
          const currentValue = parseFloat(this.currentValueString)
          try {
            const result = operation(this.previousValue, currentValue)
            this.history.unshift(this.formatResult(this.previousValue) + ' ' + this.operator + ' ' + this.currentValueString + ' = ' + this.formatResult(result))
            this.currentValueString = this.formatResult(result)
            this.previousValue = result
            this.operator = null
          } catch (ex) {
            this.currentValueString = ex.message
          }
        }
      },
      fraction() {
        switch (this.state) {
        case States.START_TYPING:
        case States.RESULT_AND_START_TYPING:
          this.currentValueString = '0'
          this.state = States.START_FRACTIONAL_PART
          break
        case States.TYPING_INTEGER_PART:
          this.state = States.START_FRACTIONAL_PART
        }
      },
      formatResult(result) {
        let semiResult = result + ''
        if (semiResult.length > DISPLAY_LENGTH) {
          for (let i = DISPLAY_LENGTH; i >= 0; i--) {
            const adjustedResult = result.toPrecision(i)
            if (adjustedResult.length <= DISPLAY_LENGTH) return adjustedResult
          }
        }
        return semiResult
      }
    },
    computed: {
      screenInput() {
        return this.currentValueString
      }
    }
  }
</script>

<style scoped>

</style>
