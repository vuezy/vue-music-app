<template>
  <h1>SONGS</h1>
  <Song 
    v-for="song in songs"
    :key="song.id"
    :song="song"
    :chooseThisSong="chooseThisSong"
  />
</template>

<script>
import Song from '@/components/Song.vue'
import songJSON from '@/song.json'

export default {
  name: 'ListView',
  data() {
    return {
      songs: songJSON
    }
  },
  props: {
    chooseThisSong: Function
  },
  components: {
    Song
  }
}
</script>