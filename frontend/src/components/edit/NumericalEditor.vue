<template>
  <div class="numerical-editor">
    <h3>Edit Numerical Data</h3>

    <!-- Title -->
    <div class="form-group">
      <label for="title">Title:</label>
      <input id="title" v-model="editableItem.title" />
    </div>

    <!-- Description -->
    <div class="form-group">
      <label for="description">Description:</label>
      <textarea id="description" v-model="editableItem.description"></textarea>
    </div>

    <!-- Data Points Editor -->
    <div v-if="editableItem.dataPoints && editableItem.dataPoints.length">
      <DataPointsEditor :initial-data-points="editableItem.dataPoints" @update-data-points="updateDataPoints" />
    </div>
    <div v-else>
      <p>No data points available to edit.</p>
    </div>

    <!-- Visualization Type -->
    <div class="form-group">
      <label for="visualizationType">Visualization Type:</label>
      <select id="visualizationType" v-model="editableItem.visualizationType">
        <option value="bar_chart">Bar Chart</option>
        <option value="line_chart">Line Chart</option>
        <option value="pie_chart">Pie Chart</option>
      </select>
    </div>

    <!-- Source URL -->
    <div class="form-group">
      <label for="sourceUrl">Source URL:</label>
      <input id="sourceUrl" v-model="editableItem.sourceUrl" type="url" placeholder="Enter the source URL" />
    </div>

    <!-- Thumbnail -->
    <div class="form-group">
      <label for="thumbnail">Thumbnail URL:</label>
      <input id="thumbnail" v-model="editableItem.thumbnail" type="url" placeholder="Enter the thumbnail URL" />
    </div>

    <!-- Save and Create Buttons -->
    <div class="button-group">
      <button class="save-button" @click="saveItem">Save</button>
      <button class="create-button" @click="createNewItem">Create</button>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import DataPointsEditor from "@/components/edit/DataPointsEditor.vue";
import couchdbUtils from "@/db/couchdbUtils"; // Import CouchDB utility

export default {
  name: "NumericalEditor",
  components: {
    DataPointsEditor,
  },
  props: {
    dataItem: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const editableItem = ref(null);

    // Watch for changes in props.dataItem and initialize editableItem
    watch(
      () => props.dataItem,
      (newDataItem) => {
        editableItem.value = { ...newDataItem, dataPoints: [...(newDataItem.dataPoints || [])] };
      },
      { immediate: true }
    );

    // Update data points in the editable item
    const updateDataPoints = (updatedPoints) => {
      if (editableItem.value) {
        editableItem.value.dataPoints = updatedPoints;
      }
    };

    // Save the current item
    const saveItem = () => {
      emit("save", editableItem.value);
    };

    // Create a new item
    const createNewItem = async () => {
      try {
        // Generate a unique ID using a UUID generator or similar method
        const newId = crypto.randomUUID(); // Modern browsers support this
        const newItem = {
          ...editableItem.value,
          _id: newId, // Assign a unique ID
        };

        // Insert the new item into CouchDB
        const result = await couchdbUtils.insertDocument(newItem);

        console.log("New item created:", result);

        // Emit a creation event with the new item
        emit("create", newItem);
      } catch (error) {
        console.error("Error creating new item:", error.message);
      }
    };

    return { editableItem, updateDataPoints, saveItem, createNewItem };
  },
};
</script>

<style scoped>
.numerical-editor {
  max-width: 600px;
  margin: 0 auto;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
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
textarea,
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

textarea {
  resize: vertical;
}

.button-group {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.save-button,
.create-button {
  flex: 1;
  padding: 10px 15px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}

.save-button {
  background-color: #42b983;
  color: white;
}

.save-button:hover {
  background-color: #369a6e;
}

.create-button {
  background-color: #007bff;
  color: white;
}

.create-button:hover {
  background-color: #0056b3;
}
</style>
