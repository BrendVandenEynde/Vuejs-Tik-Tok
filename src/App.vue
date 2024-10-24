<script setup>
import { onMounted, ref, reactive } from 'vue';

import VideoPlayer from "./components/Video/VideoPlayer.vue";
import VideoDetails from "./components/Video/VideoDetails.vue";
import Chat from "./components/Chat/Chat.vue";

const currentTitle = ref('Some title here');
const currentVideo = ref('');
const videos = reactive([]);
const currentVideoIndex = ref(0);

onMounted(() => {
  fetch('https://api.jsonbin.io/v3/b/670ccbfaad19ca34f8b81951')
    .then(response => response.json())
    .then(data => {
      videos.value = data.record.data.videos;
      currentVideo.value = data.record.data.videos[0].video;
      currentTitle.value = data.record.data.videos[0].description;
    });
});

function nextVideo() {
  const index = videos.value.findIndex(video => video.video === currentVideo.value);

  // Go to the next video, or loop back to the first video if at the end
  if (index < videos.value.length - 1) {
    currentVideo.value = videos.value[index + 1].video;
    currentTitle.value = videos.value[index + 1].description;
  } else {
    // Loop back to the first video
    currentVideo.value = videos.value[0].video;
    currentTitle.value = videos.value[0].description;
  }
}

function prevVideo() {
  const index = videos.value.findIndex(video => video.video === currentVideo.value);

  // Go to the previous video, or loop back to the last video if at the beginning
  if (index > 0) {
    currentVideo.value = videos.value[index - 1].video;
    currentTitle.value = videos.value[index - 1].description;
  } else {
    // Loop back to the last video
    currentVideo.value = videos.value[videos.value.length - 1].video;
    currentTitle.value = videos.value[videos.value.length - 1].description;
  }
}

</script>

<template>
  <div class="grid">
    <div class="player">
      <VideoPlayer @prevVideo="prevVideo" @nextVideo="nextVideo" :videosrc="currentVideo" />
    </div>
    <div class="messages">
      <VideoDetails :title="currentTitle" />
      <Chat />
    </div>
  </div>
</template>

<style scoped>
.grid {
  font-family: Helvetica;
  display: grid;
  grid-template-columns: 3fr 2fr;
}
</style>
