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

    <!-- Save Button -->
    <button class="save-button" @click="saveItem">Save</button>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import DataPointsEditor from "@/components/edit/DataPointsEditor.vue";

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

    watch(
      () => props.dataItem,
      (newDataItem) => {
        editableItem.value = { ...newDataItem, dataPoints: [...(newDataItem.dataPoints || [])] };
      },
      { immediate: true }
    );

    const updateDataPoints = (updatedPoints) => {
      if (editableItem.value) {
        editableItem.value.dataPoints = updatedPoints;
      }
    };

    const saveItem = () => {
      emit("save", editableItem.value);
    };

    return { editableItem, updateDataPoints, saveItem };
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

.save-button {
  display: block;
  width: 100%;
  padding: 10px 15px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.save-button:hover {
  background-color: #369a6e;
}
</style>
