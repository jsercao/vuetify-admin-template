<template>
  <v-container>
    <v-basic-card title="Video">
      <div slot="inner-content">
        <v-video />
      </div>
    </v-basic-card>
  </v-container>
</template>

<script>
import VVideo from '@/components/video/VMain'

export default {
  components: {
    VVideo
  }
}
</script>
