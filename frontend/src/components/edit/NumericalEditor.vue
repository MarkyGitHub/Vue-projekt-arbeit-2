<template>
  <div>
    <h3>Edit Numerical Data</h3>
    <label>Title:</label>
    <input v-model="editableItem.title" />
    <label>Description:</label>
    <textarea v-model="editableItem.description"></textarea>

    <!-- Data Points Editor -->
    <div v-if="editableItem.dataPoints && editableItem.dataPoints.length">
      <DataPointsEditor :initial-data-points="editableItem.dataPoints" @update-data-points="updateDataPoints" />
    </div>
    <div v-else>
      <p>No data points available to edit.</p>
    </div>

    <!-- Save Button -->
    <button @click="saveItem">Save</button>
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

    // Watch for changes in dataItem and initialize editableItem
    watch(
      () => props.dataItem,
      (newDataItem) => {
        editableItem.value = { ...newDataItem, dataPoints: [...(newDataItem.dataPoints || [])] };
      },
      { immediate: true }
    );

    // Update data points in editableItem
    const updateDataPoints = (updatedPoints) => {
      if (editableItem.value) {
        editableItem.value.dataPoints = updatedPoints;
      }
    };

    // Emit the updated item to the parent when saved
    const saveItem = () => {
      emit("save", editableItem.value);
    };

    return { editableItem, updateDataPoints, saveItem };
  },
};
</script>

<style scoped>
/* Add custom styles for the NumericalEditor here if needed */
</style>
