<template>
  <b-col class="pb-2">
    <b-form-textarea class="text-right pr-3 bg-white h1" style="font-family: monospace" plaintext :value="input" :no-resize="true"></b-form-textarea>
  </b-col>
</template>

<script>
  export default {
    name: 'CalculatorHistory',
    props: {
      input: {
        type: String,
        required: true
      }
    }
  }
</script>
