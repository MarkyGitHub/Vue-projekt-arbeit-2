<template>
  <div>
    <!-- Conditional rendering based on the selected item -->
    <div v-if="selectedItem" id="render-container">
      <button @click="backToGrid">Back</button>
      <!-- Render the appropriate component for the selected item -->
      <component
        :is="getRenderer(selectedItem.type)"
        :data-item="selectedItem"
      />
    </div>
    <div v-else id="data-cards-container" class="data-grid">
      <!-- Grid view for data items -->
      <DataItemCard
        v-for="item in dataItems"
        :key="item.id"
        :item="item"
        @click="selectItem(item)"
      />
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import DataItemCard from "@/components/layout/DataItemCard.vue";
import TextRenderer from "@/components/layout/TextRenderer.vue";
import ImageRenderer from "@/components/layout/ImageRenderer.vue";
import VideoRenderer from "@/components/layout/VideoRenderer.vue";
import NumericalRenderer from "@/components/layout/NumericalRenderer.vue";
import AIRenderer from "@/components/layout/AIRenderer.vue";

export default {
  components: {
    DataItemCard,
    TextRenderer,
    ImageRenderer,
    VideoRenderer,
    NumericalRenderer,
    AIRenderer,
  },
  setup() {
    const store = useStore();
    const selectedItem = ref(null);

    // Access data items from Vuex
    const dataItems = computed(() => store.getters.dataItems);

    // Set the selected item when a card is clicked
    const selectItem = (item) => {
      selectedItem.value = item;
    };

    // Navigate back to the grid
    const backToGrid = () => {
      selectedItem.value = null;
    };

    // Map data types to render components
    const getRenderer = (type) => {
      const rendererMap = {
        text: "TextRenderer",
        image: "ImageRenderer",
        video: "VideoRenderer",
        numerical: "NumericalRenderer",
        ai_result: "AIRenderer",
      };
      return rendererMap[type] || "div"; // Default to 'div' if no match
    };

    return {
      dataItems,
      selectedItem,
      selectItem,
      backToGrid,
      getRenderer,
    };
  },
};
</script>

<style scoped>
/* Styles for the grid view */
.data-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
}

/* Styles for the render container */
#render-container {
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
}

button {
  margin-bottom: 20px;
  padding: 10px 15px;
  font-size: 1rem;
  background-color: #42b983;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #369a6e;
}
</style>
