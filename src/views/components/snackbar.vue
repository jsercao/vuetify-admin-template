<template>
  <v-container>
    <v-btn @click="test">Show Messages</v-btn>
  </v-container>
</template>

<script>
export default {
  methods: {
    test() {
      this.$message({
        type: 'info',
        text: 'I\'am text .'
      })
    }
  }
}
</script>
