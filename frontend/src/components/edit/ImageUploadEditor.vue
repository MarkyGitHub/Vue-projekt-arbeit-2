<template>
    <div class="image-upload-container">
        <div class="radio-group">
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
        <div v-if="inputType === 'url'" class="form-group">
            <label for="image-url">Enter Image URL:</label>
            <input id="image-url" v-model="imageUrl" @input="emitImageUpdate(imageUrl)"
                placeholder="Enter image URL here" />
        </div>

        <!-- File Upload -->
        <div v-else class="form-group">
            <label for="file-upload">Upload Image:</label>
            <input id="file-upload" type="file" @change="handleFileUpload" accept="image/*" />
        </div>
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
    },
    data() {
        return {
            inputType: "url",
            imageUrl: this.initialUrl,
        };
    },
    methods: {
        async handleFileUpload(event) {
            const file = event.target.files[0];
            if (!file) return;

            const formData = new FormData();
            formData.append("image", file);

            try {
                const response = await fetch("http://localhost:3000/uploadImage", {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                this.imageUrl = data.fileUrl;
                this.emitImageUpdate(data.fileUrl);
            } catch (error) {
                console.error("Error uploading file:", error);
            }
        },
        emitImageUpdate(newUrl) {
            this.$emit("update-image-url", newUrl);
        },
    },
};
</script>
<style scoped>
.image-upload-container {
    margin-top: 20px;
}

.radio-group {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

label {
    font-weight: bold;
}

.form-group {
    margin-bottom: 20px;
}

input[type="file"] {
    margin-top: 10px;
}

.preview-container img {
    max-width: 100%;
    margin-top: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
}
</style>