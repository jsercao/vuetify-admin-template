<template>
  <div>
    <v-snackbar
      v-model="visible"
      :color="color || type"
      :top="y === 'top'"
      :left="x === 'left'"
      :bottom="y === 'bottom'"
      :right="x === 'right'"
      :multi-line="mode === 'multi-line'"
      :timeout="timeout"
      :vertical="mode === 'vertical'"
    >
      {{ text }}
      <v-btn
        icon
        @click="close"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { VSnackbar, VBtn } from 'vuetify'

export default {
  components: {
    VSnackbar,
    VBtn
  },
  data() {
    return {
      visible: false,
      y: 'top',
      x: null,
      mode: '',
      timeout: 4000,
      text: '',
      color: null,
      timer: null,
      closed: false,
      duration: this.timeout,
      type: 'info'
    }
  },
  mounted() {
    this.duration = this.timeout
    this.startTimer()
    document.addEventListener('keydown', this.keydown)
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.keydown)
  },
  methods: {
    close() {
      this.visible = false
      this.closed = true
      setTimeout(() => {
        this.$destroy(true)
        this.$el.parentNode.removeChild(this.$el)
      }, 500)
    },
    clearTimer() {
      clearTimeout(this.timer)
    },
    startTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close()
            this.duration = 0
          }
        }, this.duration)
      }
    },
    keydown(e) {
      if (e.keyCode === 27 && !this.closed) {
        this.close()
      }
    }
  }
}
</script>
