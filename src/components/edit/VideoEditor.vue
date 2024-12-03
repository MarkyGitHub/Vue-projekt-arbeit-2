<template>
  <div>
    <h3>Edit Video Item</h3>
    <label>Title:</label>
    <input v-model="editableItem.title" />
    <label>Description:</label>
    <textarea v-model="editableItem.description"></textarea>
    <label>Video URL:</label>
    <input v-model="editableItem.videoUrl" />
    <button @click="$emit('save', editableItem)">Save</button>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "VideoEditor",
  props: {
    dataItem: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const editableItem = ref({ ...props.dataItem }); // Clone data item for editing
    return { editableItem };
  },
};
</script>

<style scoped>
/* Similar styles to TextEditor */
</style>
