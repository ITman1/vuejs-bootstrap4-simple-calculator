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
          <calculator-screen :input="input"></calculator-screen>
        </b-row>
        <b-row class="no-gutters">
          <calculator-button @click="clearAll">AC</calculator-button>
          <calculator-button @click="negateInput">+/-</calculator-button>
          <div class="col-6"></div>
          <div class="w-100"></div>
          <calculator-button>7</calculator-button>
          <calculator-button>8</calculator-button>
          <calculator-button>9</calculator-button>
          <calculator-button>&divide;</calculator-button>
          <div class="w-100"></div>
          <calculator-button>4</calculator-button>
          <calculator-button>5</calculator-button>
          <calculator-button>6</calculator-button>
          <calculator-button>&times;</calculator-button>
          <div class="w-100"></div>
          <calculator-button>1</calculator-button>
          <calculator-button>2</calculator-button>
          <calculator-button>3</calculator-button>
          <calculator-button>&ndash;</calculator-button>
          <div class="w-100"></div>
          <calculator-button>0</calculator-button>
          <calculator-button>.</calculator-button>
          <calculator-button>=</calculator-button>
          <calculator-button>+</calculator-button>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import CalculatorButton from './CalculatorButton'
  import CalculatorHistory from './CalculatorHistory'
  import CalculatorScreen from './CalculatorScreen'

  export default {
    name: 'Calculator',
    components: {CalculatorButton, CalculatorHistory, CalculatorScreen},
    data() {
      return {
        history: [],
        input: 1234
      }
    },
    methods: {
      clearAll() {
        this.history = []
        this.input = 0
      },
      negateInput() {
        this.input = this.input !== 0 ? -this.input : this.input
      }
    }
  }
</script>

<style scoped>

</style>
