<script setup>
const props = defineProps({
  videosrc: String,
});
</script>

<template>
  <div class="player">
    <video loop autoplay muted :src="videosrc"></video>
    <div class="player__controls">
      <a href="#" @click.prevent="$emit('prevVideo')">⬆️</a>
      <a href="#"@click.prevent="$emit('nextVideo')">⬇️</a>
    </div>
  </div>
</template>

<style scoped>
video {
  max-height: 100vh;
}

.player {
  background-image: url('/thumb.png');
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
}

.player__controls {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2em;
}
</style>
