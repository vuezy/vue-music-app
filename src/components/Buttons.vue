<template>
  <div class="controller-btns">
    <button class="fas fa-backward-step" @click.prevent="$emit('backward-20s')"></button>
    <button class="fas fa-backward" @click.prevent="$emit('backward-10s')"></button>
    <button
      :class="alterButtonIcon"
      @click.prevent="playSong"
    ></button>
    <button class="fas fa-forward" @click.prevent="$emit('forward-10s')"></button>
    <button class="fas fa-forward-step" @click.prevent="$emit('forward-20s')"></button>
  </div>
</template>

<script>
export default {
  name: 'Buttons',
  data() {
    return {
      isPaused: true
    }
  },
  props: {
    song: Object,
    audio: Object,
    isEnded: Boolean
  },
  emits: ['play-song', 'pause-song', 'replay-song', 'backward-20s', 'backward-10s', 'forward-10s', 'forward-20s'],
  methods: {
    playSong() {
      if (Object.keys(this.song).length > 0) {
        if (this.isPaused && !this.isEnded) {
          this.$emit('play-song')
          this.audio.play()
          this.isPaused = !this.isPaused
        }
        else if (!this.isPaused && !this.isEnded) {
          this.$emit('pause-song')
          this.audio.pause()
          this.isPaused = !this.isPaused
        }
        else if (this.isEnded) {
          this.$emit('replay-song')
        }
      }
    }
  },
  computed: {
    alterButtonIcon() {
      return [
        'fas', 
        {
          'fa-play': this.isPaused && !this.isEnded
        }, 
        {
          'fa-pause': !this.isPaused && !this.isEnded
        },
        {
          'fa-arrow-rotate-right': this.isEnded
        }
      ]
    }
  }
}
</script>