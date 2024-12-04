<template>
  <div id="data-item-container">
    <h1>{{ dataItem.title }}</h1>
    <p v-if="dataItem.description">{{ dataItem.description }}</p>
    <component
      :is="componentName"
      :data-item="dataItem"
      v-if="componentName"
    ></component>
    <a :href="dataItem.sourceUrl" target="_blank">{{ $t("source-link") }}</a>
  </div>
</template>

<script>
import TextRenderer from "./layout/TextRenderer.vue";
import ImageRenderer from "./layout/ImageRenderer.vue";
import VideoRenderer from "./layout/VideoRenderer.vue";
import NumericalRenderer from "./layout/NumericalRenderer.vue";
import AIRenderer from "./layout/AIRenderer.vue";

export default {
  props: {
    dataItem: {
      type: Object,
      required: true,
    },
  },
  computed: {
    componentName() {
      switch (this.dataItem.type) {
        case "text":
          return TextRenderer;
        case "image":
          return ImageRenderer;
        case "video":
          return VideoRenderer;
        case "numerical":
          return NumericalRenderer;
        case "ai_result":
          return AIRenderer;
        default:
          console.warn("Unknown data type:", this.dataItem.type);
          return null;
      }
    },
  },
};
</script>
