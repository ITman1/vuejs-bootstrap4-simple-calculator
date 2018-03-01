<template>
  <b-col class="pb-2">
    <b-form-textarea class="text-right pr-3 bg-white small" plaintext :value="history" :no-resize="true" max-rows="3" rows="3"></b-form-textarea>
  </b-col>
</template>

<script>
  export default {
    name: 'CalculatorHistory',
    props: {
      items: {
        type: Array,
        required: true
      }
    },
    computed: {
      history() {
        return this.items.join('\n')
      }
    }
  }
</script>
