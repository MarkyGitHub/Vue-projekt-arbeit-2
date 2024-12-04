<template>
    <div>
        <label>Image Source:</label>
        <div>
            <!-- Toggle between URL and File Upload -->
            <label>
                <input type="radio" value="url" v-model="inputType" />
                Image URL
            </label>
            <label>
                <input type="radio" value="file" v-model="inputType" />
                Upload Image
            </label>
        </div>

        <!-- URL Input -->
        <div v-if="inputType === 'url'">
            <label>Enter Image URL:</label>
            <input v-model="imageUrl" placeholder="Enter image URL here" />
        </div>

        <!-- File Upload -->
        <div v-else>
            <label>Upload Image:</label>
            <input type="file" @change="handleFileUpload" accept="image/*" />
            <div v-if="preview">
                <p>Preview:</p>
                <img :src="preview" alt="Uploaded Image Preview" style="max-width: 100%; height: auto;" />
            </div>
        </div>

        <!-- Conditional Save Button -->
        <button v-if="showSaveButton" @click="saveImageSource">Save</button>
    </div>
</template>

<script>
export default {
    name: "ImageUploadEditor",
    props: {
        initialUrl: {
            type: String,
            required: false,
            default: "",
        },
        showSaveButton: {
            type: Boolean,
            default: true, // Show Save button by default
        },
    },
    data() {
        return {
            inputType: "url", // Default to "Image URL" option
            imageUrl: this.initialUrl, // Start with the passed-in URL
            preview: null, // For previewing uploaded images
        };
    },
    methods: {
        saveImageSource() {
            // Emit the image source (URL or uploaded file)
            this.$emit("update-image-url", this.imageUrl || this.preview);
        },
        handleFileUpload(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.preview = e.target.result; // Save base64 preview
                };
                reader.readAsDataURL(file);
            }
        },
    },
};
</script>

<style scoped>
img {
    max-width: 100%;
    height: auto;
    margin-top: 10px;
}
</style>