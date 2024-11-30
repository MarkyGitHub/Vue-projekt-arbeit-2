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
import TextRenderer from "./TextRenderer.vue";
import ImageRenderer from "./ImageRenderer.vue";
import VideoRenderer from "./VideoRenderer.vue";
import NumericalRenderer from "./NumericalRenderer.vue";
import AIRenderer from "./AIRenderer.vue";

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
