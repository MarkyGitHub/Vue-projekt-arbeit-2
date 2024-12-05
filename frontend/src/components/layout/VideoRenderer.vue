<template>
  <div class="video-renderer">
    <h1>{{ dataItem.title }}</h1>
    <div v-if="isYouTube" class="video-container">
      <iframe :src="youtubeEmbedUrl" frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>
    </div>
    <div v-else class="video-container">
      <video controls :src="dataItem.videoUrl"></video>
    </div>
    <p>{{ dataItem.description }}</p>
    <p v-if="dataItem.sourceUrl" class="source">
      <strong>Source:</strong> <a :href="dataItem.sourceUrl" target="_blank">{{ dataItem.sourceUrl }}</a>
    </p>
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
.video-renderer {
  max-width: 600px;
  margin: 0 auto;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: left;
}

h1 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
}

.video-container {
  position: relative;
  padding-bottom: 56.25%;
  /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  margin-bottom: 15px;
}

iframe,
video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  border: none;
}
</style>
