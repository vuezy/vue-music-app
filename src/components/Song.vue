<template>
  <div class="row">
    <div class="song">
      <span>{{ song.id }}</span>
      <div 
        class="thumbnail"
        :style="thumbnailBgImg"
      ></div>
      <span>{{ song.fileName }}</span>
    </div>
    <button
      class="fas fa-play"
      @click.prevent="chooseThisSong(song)"
    ></button>
  </div>
</template>

<script>
export default {
  name: 'Song',
  data() {
    return {
      thumbnailBgImg: {
        'background-image': `url("/assets/img/${this.song.fileName} NCS Release.PNG")`
      }
    }
  },
  props: {
    song: Object,
    chooseThisSong: Function
  }
}
</script>