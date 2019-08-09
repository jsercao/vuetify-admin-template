<template>
  <v-card>
    <v-toolbar v-if="enableHeader" color="transparent" :dense="dense" flat>
      <v-toolbar-title><h4>{{ title }}</h4></v-toolbar-title>
      <v-spacer />
      <slot name="header-action" />
    </v-toolbar>
    <v-divider v-if="enableHeader" />
    <v-card-text :class="contentClass">
      <slot name="inner-content" />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'VBasicCard',
  props: {
    title: {
      type: String,
      default: ''
    },
    dense: {
      type: Boolean,
      default: false
    },
    enableHeader: {
      type: Boolean,
      default: true
    },
    contentClass: {
      type: String,
      default: '#FFFFFF'
    }
  }
}
</script>
