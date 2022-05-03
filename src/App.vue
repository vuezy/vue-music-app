<template>
  <AppHeader />
  <router-view
    :chooseThisSong="chooseThisSong"
    :songHasChanged="songHasChanged"
    :songHasStarted="songHasStarted"
    :song="song"
    :audio="audio"
  />
</template>

<script>
import AppHeader from './components/AppHeader.vue'

export default {
  name: 'App',
  data() {
    return {
      song: {},
      audio: new Audio(),
      songHasChanged: false
    }
  },
  components: {
    AppHeader
  },
  methods: {
    chooseThisSong(chosenSong) {
      this.songHasChanged = true
      this.song = chosenSong
      this.audio.src = `/assets/songs/${this.song.fileName}.mp3`
    },
    songHasStarted() {
      this.songHasChanged = false
      document.title = this.song.fileName
    }
  },
  created() {
    this.audio.preload = 'metadata'
    this.audio.onloadedmetadata = () => {
      this.$router.push('/')
    }
    this.$router.beforeEach((to, from) => {
      if (to.meta.reset && Object.keys(this.song).length > 0) {
        this.songHasChanged = true
        this.audio.currentTime = 0
      }
    })
  }
}
</script>