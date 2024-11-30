<template>
  <div>
    <h2>{{ dataItem.title }}</h2>
    <iframe
      v-if="isYouTubeVideo"
      :src="youTubeEmbedUrl"
      width="100%"
      height="315"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
    <video v-else :src="dataItem.videoUrl" controls></video>
    <p>{{ dataItem.description }}</p>
  </div>
</template>

<script>
export default {
  props: {
    dataItem: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isYouTubeVideo() {
      return this.dataItem.videoUrl.includes("youtube");
    },
    youTubeEmbedUrl() {
      const videoId = this.dataItem.videoUrl.split("v=")[1];
      return `https://www.youtube.com/embed/${videoId}`;
    },
  },
};
</script>
