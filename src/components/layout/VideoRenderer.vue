<template>
  <div v-if="dataItem">
    <h1>{{ dataItem.title }}</h1>
    <div v-if="isYouTube">
      <iframe :src="youtubeEmbedUrl" frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>
    </div>
    <div v-else>
      <video controls :src="dataItem.videoUrl"></video>
    </div>
  </div>
</template>

<script>
export default {
  name: "VideoRenderer",
  props: {
    dataItem: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isYouTube() {
      return this.dataItem.videoUrl.includes("youtube.com") || this.dataItem.videoUrl.includes("youtu.be");
    },
    youtubeEmbedUrl() {
      const videoIdMatch = this.dataItem.videoUrl.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})/);
      return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : "";
    },
  },
};
</script>

<style scoped>
iframe,
video {
  width: 100%;
  height: auto;
}
</style>
