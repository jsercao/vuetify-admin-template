<template>
  <v-container>
    <v-btn @click="test">defrf</v-btn>
  </v-container>
</template>

<script>
export default {
  methods: {
    test() {
      this.$message({
        type: 'info',
        text: 'Ahem: Please add redirect function'
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
