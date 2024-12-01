<template>
  <div>
    <h1>Visualisierungstafel</h1>
    <main>
      <div id="data-cards-container" class="data-grid">
        <!-- Loop through data items and render using appropriate component -->
        <component v-for="item in dataItems" :key="item.id" :is="getRenderer(item.type)" :dataItem="item" />
      </div>
    </main>
  </div>
</template>

<script>
import TextRenderer from "@/components/layout/TextRenderer.vue";
import ImageRenderer from "@/components/layout/ImageRenderer.vue";
import VideoRenderer from "@/components/layout/VideoRenderer.vue";
import NumericalRenderer from "@/components/layout/NumericalRenderer.vue";
import AIRenderer from "@/components/layout/AIRenderer.vue";

export default {
  components: {
    TextRenderer,
    ImageRenderer,
    VideoRenderer,
    NumericalRenderer,
    AIRenderer,
  },
  computed: {
    dataItems() {
      // Access data items from Vuex
      return this.$store.getters.dataItems || [];
    },
  },
  methods: {
    getRenderer(type) {
      // Map data types to corresponding renderer components
      const rendererMap = {
        text: "TextRenderer",
        image: "ImageRenderer",
        video: "VideoRenderer",
        numerical: "NumericalRenderer",
        ai_result: "AIRenderer",
      };
      return rendererMap[type] || "div"; // Default to 'div' if no match
    },
  },
};
</script>

<style>
/* Add styles specific to HomeView if needed */
.data-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
</style>
