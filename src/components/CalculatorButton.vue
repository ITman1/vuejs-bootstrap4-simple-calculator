<template>
  <b-col class="p-1">
    <b-button class="w-100" @click="$emit('click', $event)">
      <h2><slot></slot></h2>
    </b-button>
  </b-col>
</template>

<script>
  export default {
    name: 'CalculatorButton'
  }
</script>
