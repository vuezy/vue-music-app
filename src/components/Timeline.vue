<template>
  <div class="timeline">
    <span>{{ currentTimeStamp }}</span>
    <input
      type="range"
      min="0"
      :max="songDuration - 1"
      v-model.number="currentTime"
      @input="alterCurrentTime"
    >
    <span>{{ getDuration }}</span>
  </div>
</template>

<script>
export default {
  name: 'Timeline',
  data() {
    return {
      currentTime: 0,
      timer: null,
      isEnded: false,
      firstRun: true
    }
  },
  props: {
    song: Object,
    audio: Object,
    playState: String,
    backward20s: Boolean,
    backward10s: Boolean,
    forward10s: Boolean,
    forward20s: Boolean,
    defaultForwardBackwardState: Function,
    endSong: Function
  },
  emits: ['play-after-end'],
  methods: {
    alterCurrentTime() {
      this.audio.currentTime = this.currentTime
      this.playAfterEnd()
    },
    replay() {
      this.currentTime = 0
      this.audio.currentTime = this.currentTime
      this.isEnded = false
      this.audio.play()
    },
    playAfterEnd() {
      if (this.isEnded) {
        this.audio.play()
        this.isEnded = false
        this.$emit('play-after-end')
      }
    }
  },
  computed: {
    songDuration() {
      if (Object.keys(this.song).length > 0) {
        return Math.round(this.audio.duration)
      }
      return 0
    },
    getDuration() {
      let mins = String(Math.floor(this.songDuration / 60))
      let secs = String(this.songDuration % 60)
      if (mins.length === 1) {
        mins = '0' + mins
      }
      if (secs.length === 1) {
        secs = '0' + secs
      }
      return mins + ':' + secs
    },
    currentTimeStamp() {
      let mins = String(Math.floor(this.currentTime / 60))
      let secs = String(this.currentTime % 60)
      if (mins.length === 1) {
        mins = '0' + mins
      }
      if (secs.length === 1) {
        secs = '0' + secs
      }
      return mins + ':' + secs
    }
  },
  watch: {
    playState(newState) {
      console.log(newState)
      if (newState === 'running') {
        this.timer = setInterval(() => {
          if (this.currentTime < this.songDuration) {
            this.currentTime++
          }
        }, 1000)
      }
      else {
        clearInterval(this.timer)
      }
    },
    backward20s(isTrue) {
      if (isTrue) {
        if (Object.keys(this.song).length > 0) {
          this.currentTime = Math.max(0, this.currentTime - 20)
          this.audio.currentTime = this.currentTime
          this.playAfterEnd()
        }
        this.defaultForwardBackwardState()
      }
    },
    backward10s(isTrue) {
      if (isTrue) {
        if (Object.keys(this.song).length > 0) {
          this.currentTime = Math.max(0, this.currentTime - 10)
          this.audio.currentTime = this.currentTime
          this.playAfterEnd()
        }
        this.defaultForwardBackwardState()
      }
    },
    forward10s(isTrue) {
      if (isTrue) {
        if (Object.keys(this.song).length > 0) {
          this.currentTime = Math.min(this.songDuration, this.currentTime + 10)
          this.audio.currentTime = this.currentTime
          this.playAfterEnd()
        }
        this.defaultForwardBackwardState()
      }
    },
    forward20s(isTrue) {
      if (isTrue) {
        if (Object.keys(this.song).length > 0) {
          this.currentTime = Math.min(this.songDuration, this.currentTime + 20)
          this.audio.currentTime = this.currentTime
          this.playAfterEnd()
        }
        this.defaultForwardBackwardState()
      }
    },
    currentTime(time) {
      if (time === this.songDuration) {
        this.endSong()
        this.isEnded = true
      }
    }
  },
  mounted() {
    if (this.firstRun && Object.keys(this.song).length > 0) {
      if (this.playState === 'running') {
        this.timer = setInterval(() => {
          if (this.currentTime < this.songDuration) {
            this.currentTime++
          }
        }, 1000)
      }
      else {
        clearInterval(this.timer)
      }
      this.firstRun = false
    }
  }
}
</script>