<template>
  <div class="ai-editor">
    <h3>Edit AI Result Item</h3>

    <!-- Title Input -->
    <div class="form-group">
      <label for="title">Title:</label>
      <input id="title" v-model="editableItem.title" />
    </div>

    <!-- Description Textarea -->
    <div class="form-group">
      <label for="description">Description:</label>
      <textarea id="description" v-model="editableItem.description"></textarea>
    </div>

    <!-- Model Type -->
    <div class="form-group">
      <label for="modelType">Model Type:</label>
      <input id="modelType" v-model="editableItem.modelType" />
    </div>

    <!-- AI Results Editor -->
    <div class="form-group">
      <h4>Results</h4>
      <AIResultsEditor :initial-results="editableItem.results" @update-results="updateResults" />
    </div>

    <!-- Source URL -->
    <div class="form-group">
      <label for="sourceUrl">Source URL:</label>
      <input id="sourceUrl" v-model="editableItem.sourceUrl" />
    </div>

    <!-- Thumbnail -->
    <div class="form-group">
      <label for="thumbnail">Thumbnail:</label>
      <input id="thumbnail" v-model="editableItem.thumbnail" />
    </div>

    <!-- Save Button -->
    <button class="save-button" @click="saveChanges">Save</button>
  </div>
</template>

<script>
import { ref } from "vue";
import AIResultsEditor from "@/components/edit/AIResultsEditor.vue";

export default {
  name: "AIEditor",
  components: {
    AIResultsEditor,
  },
  props: {
    dataItem: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const editableItem = ref({ ...props.dataItem }); // Clone the data item for editing

    const updateResults = (updatedResults) => {
      editableItem.value.results = updatedResults; // Update results in the editable item
    };

    const saveChanges = () => {
      emit("save", editableItem.value); // Emit the updated data item to the parent
    };

    return { editableItem, updateResults, saveChanges };
  },
};
</script>

<style scoped>
.ai-editor {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

h3 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

textarea {
  resize: vertical;
  height: 100px;
}

.save-button {
  display: block;
  width: 100%;
  padding: 10px 15px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
}

.save-button:hover {
  background-color: #369a6e;
}
</style>
