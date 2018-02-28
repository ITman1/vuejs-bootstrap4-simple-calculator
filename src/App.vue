<template>
  <b-container fluid class="bg-info h-100">
    <h1 class="text-center text-light display-4 pt-2">Simple Calculator</h1>
    <Calculator/>
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
  html, body {
    height: 100%;
    background-color: #17a2b8;
  }
  textarea:focus {
    outline: none;
  }
  .btn.active.focus,
  .btn.active:focus,
  .btn.focus,
  .btn.focus:active,
  .btn:active:focus,
  .btn:focus {
    outline: 0;
    outline-offset: 0;
    background-image: none;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
</style>
