<template>
  <b-container class="p-3">
    <b-row>
      <b-col style="background-color: #ddd" class="p-2 rounded" cols="8" offset="2" sm="8" offset-sm="2" md="6"
             offset-md="3" lg="4" offset-lg="4">
        <b-row>
          <b-col class="pl-4 pr-4 pt-2 pb-2">
            <b-form-textarea class="text-right pr-3 bg-white" plaintext :value="historyScreen" :no-resize="true" max-rows="3"></b-form-textarea>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="pl-4 pr-4 pt-2 pb-2">
            <b-form-textarea class="text-right pr-3 bg-white h3" plaintext :value="valueScreen" :no-resize="true"></b-form-textarea>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'Calculator',
  data () {
    return {
      historyScreen: 'L1\nL2\nL3\nL4\nL5\nL6',
      valueScreen: '1234'
    }
  }
}
</script>

<style scoped>

</style>
