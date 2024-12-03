<template>
  <div>
    <!-- Render container for the selected item -->
    <div v-if="selectedItem" id="render-container">
      <button @click="backToGrid">Back</button>
      <button @click="editItem">Edit</button>

      <!-- Render the appropriate component for the selected item -->
      <div v-if="!isEditing">
        <component
          :is="getRenderer(selectedItem.type)"
          :data-item="selectedItem"
        />
      </div>

      <!-- Edit mode: show editable fields -->
      <div v-else>
        <component
          :is="getEditor(selectedItem.type)"
          :data-item="selectedItem"
          @save="saveItem"
        />
      </div>
    </div>

    <!-- Grid container for data items -->
    <div v-else id="data-cards-container" class="data-grid">
      <DataItemMenuBar />
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
import TextEditor from "@/components/edit/TextEditor.vue";
import ImageEditor from "@/components/edit/ImageEditor.vue";
import VideoEditor from "@/components/edit/VideoEditor.vue";
import NumericalEditor from "@/components/edit/NumericalEditor.vue";
import AIEditor from "@/components/edit/AIEditor.vue";
import couchdbUtils from "@/db/couchdbUtils";
//DatGrid header bar
import DataItemMenuBar from "@/components/layout/DataItemMenuBar.vue";

export default {
  components: {
    DataItemCard,
    TextRenderer,
    ImageRenderer,
    VideoRenderer,
    NumericalRenderer,
    AIRenderer,
    TextEditor,
    ImageEditor,
    VideoEditor,
    NumericalEditor,
    AIEditor,
    DataItemMenuBar,
  },
  setup() {
    const store = useStore();
    const selectedItem = ref(null);
    const isEditing = ref(false);

    // Access data items from Vuex
    const dataItems = computed(() => store.getters.dataItems);

    // Set the selected item when a card is clicked
    const selectItem = (item) => {
      selectedItem.value = { ...item }; // Clone to avoid mutating directly
      isEditing.value = false;
    };

    // Navigate back to the grid
    const backToGrid = () => {
      selectedItem.value = null;
    };

    // Enable edit mode
    const editItem = () => {
      isEditing.value = true;
    };

    // Save the edited item
    const saveItem = async (editedItem) => {
      try {
        await couchdbUtils.insertDocument(editedItem); // Save to CouchDB
        store.dispatch("fetchDataItems"); // Refresh Vuex store
        isEditing.value = false; // Exit edit mode
        console.log("Item saved successfully!");
      } catch (error) {
        console.error("Error saving item:", error.message);
      }
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

    // Map data types to editor components
    const getEditor = (type) => {
      const editorMap = {
        text: "TextEditor",
        image: "ImageEditor",
        video: "VideoEditor",
        numerical: "NumericalEditor",
        ai_result: "AIEditor",
      };
      return editorMap[type] || "div"; // Default to 'div' if no match
    };

    return {
      dataItems,
      selectedItem,
      isEditing,
      selectItem,
      backToGrid,
      editItem,
      saveItem,
      getRenderer,
      getEditor,
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
