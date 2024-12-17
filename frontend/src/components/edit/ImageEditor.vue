<template>
  <div class="image-editor-container">
    <!-- Display Image -->
    <div class="image-preview">
      <img :src="editableItem.thumbnail" alt="Image Preview" />
    </div>

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

    <!-- Annotations -->
    <div class="form-group">
      <label for="annotations">Annotations:</label>
      <input id="annotations" v-model="editableItem.annotations" placeholder="Enter annotations (comma-separated)" />
    </div>

    <!-- Source URL -->
    <div class="form-group">
      <label for="sourceUrl">Source URL:</label>
      <input id="sourceUrl" v-model="editableItem.sourceUrl" type="url" placeholder="Enter the source URL" />
    </div>

    <!-- Image Upload Editor -->
    <ImageUploadEditor :initial-url="editableItem.thumbnail" @update-image-url="updateImageUrl" />

    <!-- Save Button -->
    <div class="form-group">
      <button class="save-button" @click="$emit('save', editableItem)">Save</button>
    </div>
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

    const updateImageUrl = (newUrl) => {
      editableItem.value.thumbnail = newUrl;
      editableItem.value.imageUrl = newUrl; // Ensure both are updated
    };

    return { editableItem, updateImageUrl };
  },
};
</script>

<style scoped>
.image-editor-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.image-preview img {
  display: block;
  max-width: 100%;
  margin: 0 auto 20px;
  border-radius: 8px;
  border: 1px solid #ddd;
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
  font-size: 1rem;
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
