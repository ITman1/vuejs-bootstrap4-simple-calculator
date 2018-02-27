<template>
  <b-container fluid class="bg-info">
    <h1 class="text-center text-light">Simple Calculator</h1>
    <Calculator />
  </b-container>
</template>

<script>
import Calculator from './components/Calculator'

export default {
  name: 'App',
  components: {
    Calculator
  }
}
</script>
<style>
  textarea:focus {
    outline: none;
  }
</style>
