<template>
  <div class="video-container">
    <video class="video" src="./video.mp4" />
    <div class="video-contrl-content">
      <v-row>
        <v-col cols="12">
          <v-radio-group v-model="frameRate" hide-details label="Rate" row>
            <v-radio
              v-for="n in Object.values(frameRates)"
              :key="n"
              color="primary"
              :label="n.toString()"
              :value="n"
            />
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="7">
          <v-radio-group v-model="seek.type" hide-details label="Seek Type" row>
            <v-radio
              v-for="n in types"
              :key="n"
              color="primary"
              :label="n"
              :value="n"
            />
          </v-radio-group>
        </v-col>
        <v-col cols="12" sm="2">
          <v-text-field
            v-model="seek.to"
            hide-details
            label="Seek To"
            type="text"
          />
        </v-col>
        <v-col cols="12" sm="2">
          <v-text-field
            v-model="seek.step"
            hide-details
            label="Seek Step"
            type="text"
          />
        </v-col>
      </v-row>
      <v-row class="py-2">
        <v-btn class="mx-2" :color="state.playing?'error':'success'" @click="play">{{ state.playing?'Pause':'Play' }}</v-btn>
        <v-btn class="mx-2" @click="seekBackward(seek.step)">seekBackward</v-btn>
        <v-btn class="mx-2" @click="seekForward(seek.step)">seekForward</v-btn>
        <v-btn class="mx-2" @click="seekTo(seek.type, seek.to)">seekTo</v-btn>
        <v-btn class="mx-2" color="primary" @click="getScreenShot">getScreenShot</v-btn>
      </v-row>
      <!-- screenShots -->
      <v-row v-if="screenShots.length>0">
        <v-col v-for="(item, index) in screenShots" :key="index" cols="6" sm="4">
          <v-img :src="item.url" />
          <div>{{ item.time }}</div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
const frameRates = {
  film: 24,
  NTSC: 29.97,
  NTSC_Film: 23.98,
  NTSC_HD: 59.94,
  PAL: 25,
  PAL_HD: 50,
  web: 30,
  high: 60
}
const types = ['SMPTE', 'time', 'frame', 'seconds', 'milliseconds']

export default {
  data() {
    return {
      state: {
        playing: false
      },
      video: null,
      types,
      frameRates,
      frameRate: 24,
      currentTime: 0,
      screenShots: [],
      seek: {
        step: 1,
        type: 'SMPTE',
        to: 0
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.video = this.$el.getElementsByTagName('video')[0]
    },
    play() {
      this.state.playing = !this.state.playing
      if (this.video) {
        if (this.state.playing) {
          this.video.play()
        } else {
          this.video.pause()
        }
      }
    },
    get() {
      return Math.floor(this.video.currentTime.toFixed(5) * this.frameRate)
    },
    wrap(n) {
      return ((n < 10) ? '0' + n : n)
    },
    toTime(frames) {
      const time = (typeof frames !== 'number' ? this.video.currentTime : frames)
      const frameRate = this.frameRate
      const dt = (new Date())
      const format = 'hh:mm:ss' + (typeof frames === 'number' ? ':ff' : '')
      dt.setHours(0)
      dt.setMinutes(0)
      dt.setSeconds(0)
      dt.setMilliseconds(time * 1000)
      return format.replace(/hh|mm|ss|ff/g, (format) => {
        switch (format) {
          case 'hh': return this.wrap(dt.getHours() < 13 ? dt.getHours() : (dt.getHours() - 12))
          case 'mm': return this.wrap(dt.getMinutes())
          case 'ss': return this.wrap(dt.getSeconds())
          case 'ff': return this.wrap(Math.floor(((time % 1) * frameRate)))
        }
      })
    },
    toSMPTE(frame) {
      if (!frame) { return this.toTime(this.video.currentTime) }
      const frameNumber = Number(frame)
      const fps = this.frameRate
      const _hour = ((fps * 60) * 60)
      const _minute = (fps * 60)

      const _hours = (frameNumber / _hour).toFixed(0)
      const _minutes = (Number((frameNumber / _minute).toString().split('.')[0]) % 60)
      const _seconds = (Number((frameNumber / fps).toString().split('.')[0]) % 60)
      const SMPTE = this.wrap(_hours) + ':' + this.wrap(_minutes) + ':' + this.wrap(_seconds) + ':' + this.wrap(frameNumber % fps)
      return SMPTE
    },
    toSeconds(SMPTE) {
      if (!SMPTE) { return Math.floor(this.video.currentTime) }
      const time = SMPTE.split(':')
      return (((Number(time[0]) * 60) * 60) + (Number(time[1]) * 60) + Number(time[2]))
    },
    toMilliseconds(SMPTE) {
      const frames = (!SMPTE) ? Number(this.toSMPTE().split(':')[3]) : Number(SMPTE.split(':')[3])
      const milliseconds = (1000 / this.frameRate) * (isNaN(frames) ? 0 : frames)
      return Math.floor(((this.toSeconds(SMPTE) * 1000) + milliseconds))
    },
    toFrames(SMPTE) {
      const time = (!SMPTE) ? this.toSMPTE().split(':') : SMPTE.split(':')
      const frameRate = this.frameRate
      const hh = (((Number(time[0]) * 60) * 60) * frameRate)
      const mm = ((Number(time[1]) * 60) * frameRate)
      const ss = (Number(time[2]) * frameRate)
      const ff = Number(time[3])
      return Math.floor((hh + mm + ss + ff))
    },
    __seek(direction, frames) {
      if (!this.video.paused) {
        this.video.pause()
        this.state.playing = false
      }
      const frame = Number(this.get())
      this.video.currentTime = ((((direction === 'backward' ? (frame - frames) : (frame + frames))) / this.frameRate) + 0.00001)
    },
    seekForward(frames) {
      if (!frames) { frames = 1 }
      this.__seek('forward', Number(frames))
    },
    seekBackward(frames) {
      if (!frames) { frames = 1 }
      this.__seek('backward', Number(frames))
    },
    seekTo(type, value) {
      // type: [SMPTE, time, frame, seconds, milliseconds]
      // value example: ['00:01:12:22', '00:01:12', 1750, 72, 72916]
      let seekTime
      switch (type) {
        case 'SMPTE':
        case 'time':
          seekTime = ((this.toMilliseconds(value) / 1000) + 0.001)
          break
        case 'frame':
          seekTime = ((this.toMilliseconds(this.toSMPTE(value)) / 1000) + 0.001)
          break
        case 'seconds':
          seekTime = Number(value)
          break
        case 'milliseconds':
          seekTime = ((Number(value) / 1000) + 0.001)
          break
      }

      if (!isNaN(seekTime)) {
        this.video.currentTime = seekTime
      }
    },
    getScreenShot() {
      const time = this.toSMPTE()
      let image = document.createElement('canvas')
      image.width = this.video.videoWidth
      image.height = this.video.videoHeight
      image.getContext('2d').drawImage(this.video, 0, 0)
      image = image.toDataURL('image/jpeg')
      this.screenShots.push({
        time,
        url: image
      })
    }
  }
}
</script>

<style lang="scss">
.video-container {
    position: relative;
    width: 100%;
    .video {
        width: 100%;
        height: 300px;
        vertical-align: middle;
        background: #000
    }
    .video-contrl-content {
        padding: 10px 0;
    }
}

</style>
