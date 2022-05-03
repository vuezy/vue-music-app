<template>
  <div class="volume">
    <i
      :class="`fas fa-volume${alterVolumeIcon}`"
      :title="`${volume}%`"
      @click="muteAudio"
    ></i>
    <i class="fas fa-minus" @click="volumeDown"></i>
    <input 
      type="range"
      min="0"
      max="100" 
      v-model.number="volume"
    >
    <i class="fas fa-plus" @click="volumeUp"></i>
  </div>
</template>

<script>
export default {
  name: 'Volume',
  data() {
    return {
      volume: 66
    }
  },
  props: {
    song: Object,
    audio: Object
  },
  methods: {
    volumeDown() {
      this.volume = Math.max(0, this.volume - 2)
    },
    volumeUp() {
      this.volume = Math.min(100, this.volume + 2)
    },
    muteAudio() {
      this.volume = 0
    }
  },
  computed: {
    alterVolumeIcon() {
      if (this.volume >= 66) {
        return '-high'
      }
      else if (this.volume >= 33) {
        return ''
      }
      else if (this.volume > 0) {
        return '-low'
      }
      else {
        return '-xmark'
      }
    }
  },
  watch: {
    volume(newVolume) {
      if (Object.keys(this.song).length > 0) {
        this.audio.volume = newVolume / 100
      }
    }
  },
  mounted() {
    if (Object.keys(this.song).length > 0) {
      this.audio.volume = this.volume / 100
    }
  }
}
</script>