<template>
  <div>
    <!-- Header bar for DataItemMenuBar -->
    <div class="header-bar">
      <DataItemMenuBar @filter-type="applyFilter" @search-query="applySearch" @sort-items="applySort" />
    </div>

    <!-- Render container for the selected item -->
    <div v-if="selectedItem" id="render-container">
      <!-- Back and Edit Buttons -->
      <div class="top-navigation">
        <button class="back-button" @click="backToGrid">Back</button>
        <button class="edit-button" @click="editItem">Edit</button>
      </div>

      <!-- Render the appropriate component for the selected item -->
      <div v-if="!isEditing">
        <component :is="getRenderer(selectedItem.type)" :data-item="selectedItem" />
      </div>

      <!-- Edit mode: show editable fields -->
      <div v-else>
        <component :is="getEditor(selectedItem.type)" :data-item="selectedItem" @save="saveItem" />
      </div>

      <!-- Next and Previous Buttons -->
      <div class="bottom-navigation">
        <button class="prev-button" @click="goToPreviousItem">Previous</button>
        <button class="next-button" @click="goToNextItem">Next</button>
      </div>
    </div>

    <!-- Grid container for data items -->
    <div v-else id="data-cards-container" class="data-grid">
      <DataItemCard v-for="item in filteredDataItems" :key="item.id" :item="item" @click="selectItem(item)" />
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
    const filterType = ref("all");
    const searchQuery = ref("");
    const sortState = ref("asc");
    const currentIndex = ref(0);

    // Access data items from Vuex
    const dataItems = computed(() => store.getters.dataItems);

    // Filtered and sorted data items
    const filteredDataItems = computed(() => {
      let items = dataItems.value;
      if (filterType.value !== "all") items = items.filter((item) => item.type === filterType.value);
      if (searchQuery.value.trim()) {
        items = items.filter((item) =>
          item.title.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      }
      items.sort((a, b) =>
        sortState.value === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
      );
      return items;
    });

    const selectItem = (item) => {
      currentIndex.value = dataItems.value.findIndex((i) => i.id === item.id);
      selectedItem.value = { ...item };
      isEditing.value = false;
    };

    const backToGrid = () => {
      selectedItem.value = null;
    };

    const editItem = () => {
      isEditing.value = true;
    };

    const saveItem = async (editedItem) => {
      try {
        await couchdbUtils.insertDocument(editedItem);
        const index = dataItems.value.findIndex((item) => item._id === editedItem._id);
        if (index !== -1) {
          store.commit("updateDataItem", { index, updatedItem: editedItem });
        }
        isEditing.value = false;
        selectedItem.value = null;
      } catch (error) {
        console.error("Error saving item:", error.message);
      }
    };

    const goToNextItem = () => {
      currentIndex.value = (currentIndex.value + 1) % filteredDataItems.value.length;
      selectedItem.value = filteredDataItems.value[currentIndex.value];
    };

    const goToPreviousItem = () => {
      currentIndex.value =
        (currentIndex.value - 1 + filteredDataItems.value.length) % filteredDataItems.value.length;
      selectedItem.value = filteredDataItems.value[currentIndex.value];
    };

    const getRenderer = (type) => {
      const rendererMap = {
        text: "TextRenderer",
        image: "ImageRenderer",
        video: "VideoRenderer",
        numerical: "NumericalRenderer",
        ai_result: "AIRenderer",
      };
      return rendererMap[type] || "div";
    };

    const getEditor = (type) => {
      const editorMap = {
        text: "TextEditor",
        image: "ImageEditor",
        video: "VideoEditor",
        numerical: "NumericalEditor",
        ai_result: "AIEditor",
      };
      return editorMap[type] || "div";
    };

    return {
      dataItems,
      filteredDataItems,
      selectedItem,
      isEditing,
      currentIndex,
      applyFilter: (type) => (filterType.value = type),
      applySearch: (query) => (searchQuery.value = query),
      applySort: (state) => (sortState.value = state),
      selectItem,
      backToGrid,
      editItem,
      saveItem,
      goToNextItem,
      goToPreviousItem,
      getRenderer,
      getEditor,
    };
  },
};
</script>

<style scoped>
.header-bar {
  padding: 10px 20px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
}

#render-container {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: relative;
}

.top-navigation {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  gap: 10px;
}

.bottom-navigation {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
}

button {
  padding: 10px 15px;
  font-size: 1rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #369a6e;
}

.data-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
}
</style>
