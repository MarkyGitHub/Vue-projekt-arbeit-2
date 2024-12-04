<template>
  <div>
    <h3>Edit Image Item</h3>
    <label>Title:</label>
    <input v-model="editableItem.title" />
    <label>Description:</label>
    <textarea v-model="editableItem.description"></textarea>
    <!-- Use the new ImageUploadEditor component without its Save button -->
    <ImageUploadEditor :initial-url="editableItem.thumbnail" @update-image-url="updateImageUrl"
      :showSaveButton="false" />
    <!-- Main Save button for the editor -->
    <button @click="$emit('save', editableItem)">Save</button>
  </div>
</template>

<script>
import { ref } from "vue";
import ImageUploadEditor from "@/components/edit/ImageUploadEditor.vue";

export default {
  name: "ImageEditor",
  components: {
    ImageUploadEditor,
  },
  props: {
    dataItem: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const editableItem = ref({ ...props.dataItem }); // Clone data item for editing

    // Update the thumbnail URL in the parent component
    const updateImageUrl = (newUrl) => {
      editableItem.value.thumbnail = newUrl;
    };

    return { editableItem, updateImageUrl };
  },
};
</script>

<style scoped>
/* Add similar styles to TextEditor if needed */
</style>
