<template>
  <main>
    <div
      :class="{ 'particles': !isEnded }"
      :style="[colorCode, { 'animation-play-state': playState }]"
    ></div>
    <SongTitle :song="song" />
    <Timeline
      ref="timeline"
      :song="song"
      :audio="audio"
      :playState="playState"
      :backward20s="backward20s"
      :backward10s="backward10s"
      :forward10s="forward10s"
      :forward20s="forward20s"
      :defaultForwardBackwardState="defaultForwardBackwardState"
      :endSong="endSong"
      @play-after-end="playAfterEnd"
    />
    <Buttons
      ref="buttons"
      :song="song"
      :audio="audio"
      :isEnded="isEnded"
      @play-song="playSong"
      @pause-song="pauseSong"
      @replay-song="replaySong"
      @backward-20s="() => { backward20s = true }"
      @backward-10s="() => { backward10s = true }"
      @forward-10s="() => { forward10s = true }"
      @forward-20s="() => { forward20s = true }"
    />
    <Volume
      :song="song"
      :audio="audio"
    />
  </main>
</template>

<script>
import SongTitle from '@/components/SongTitle.vue'
import Timeline from '@/components/Timeline.vue'
import Buttons from '@/components/Buttons.vue'
import Volume from '@/components/Volume.vue'

export default {
  name: 'HomeView',
  data() {
    return {
      playState: 'running',
      backward20s: false,
      backward10s: false,
      forward10s: false,
      forward20s: false,
      isEnded: false
    }
  },
  props: {
    song: Object,
    audio: Object,
    songHasChanged: Boolean,
    songHasStarted: Function
  },
  components: {
    SongTitle,
    Timeline,
    Buttons,
    Volume
  },
  methods: {
    playSong() {
      if (Object.keys(this.song).length > 0) {
        this.playState = 'running'
      }
    },
    pauseSong() {
      this.playState = 'paused'
    },
    endSong() {
      this.playState = 'paused'
      this.isEnded = true
    },
    playAfterEnd() {
      this.playState = 'running'
      this.isEnded = false
    },
    replaySong() {
      this.playState = 'running'
      this.isEnded = false
      this.$refs.timeline.replay()
    },
    defaultForwardBackwardState() {
      this.backward20s = false
      this.backward10s = false
      this.forward10s = false
      this.forward20s = false
    }
  },
  computed: {
    colorCode() {
      if (Object.keys(this.song).length > 0) {
        return { animation: `${this.song.colorCode}-particles 4s linear infinite alternate` }
      }
      return ''
    }
  },
  mounted() {
    if (this.songHasChanged) {
      this.$refs.buttons.playSong()
      this.songHasStarted()
    }
  }
}
</script>
