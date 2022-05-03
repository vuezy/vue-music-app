<template>
  <div class="title">
    <h1>{{ songTitle }}</h1>
    <h2>{{ songArtist }}</h2>
    <div
      class="song-img"
      :style="songImg"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'SongTitle',
  props: {
    song: Object
  },
  computed: {
    songTitle() {
      if (Object.keys(this.song).length > 0) {
        return this.song.title
      }
      return '[Unknown]'
    },
    songArtist() {
      if (Object.keys(this.song).length > 0) {
        return this.song.artist
      }
      return '[Unknown]'
    },
    songImg() {
      if (Object.keys(this.song).length > 0) {
        return {
          'background-image': `url("/assets/img/${this.song.fileName} NCS Release.PNG")`
        }
      }
      return ''
    }
  }
}
</script>