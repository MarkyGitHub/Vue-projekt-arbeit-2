<template>
    <div class="data-card">
        <!-- Thumbnail for non-text items -->
        <div v-if="item.type !== 'text'" class="thumbnail">
            <img v-bind:src="item.thumbnail" class="thumbnail-img" :alt="item.title" />
        </div>
        <!-- Content Section -->
        <div class="content">
            <h3 class="data-title">{{ item.title }}</h3>
            <p class="data-description">{{ item.description }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "DataItemCard",
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style scoped>
/* Card container */
.data-card {
    background-color: #ffffff;
    /* White background */
    border: 1px solid #e0e0e0;
    /* Light border */
    border-radius: 8px;
    /* Rounded corners */
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    /* Subtle shadow */
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

/* Hover effects */
.data-card:hover {
    transform: translateY(-5px);
    /* Slight lift */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    /* Enhanced shadow */
}

/* Thumbnail container */
.thumbnail {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f9f9f9;
    /* Light background */
    padding: 10px;
    border-bottom: 1px solid #e0e0e0;
    /* Separator line */
}

/* Thumbnail image */
.thumbnail-img {
    max-width: 100%;
    /* Responsive width */
    height: auto;
    /* Maintain aspect ratio */
    border-radius: 4px;
    /* Rounded edges for images */
}

/* Content section */
.content {
    padding: 16px;
    text-align: center;
    /* Center-align content */
}

/* Title styling */
.data-title {
    font-size: 1.2rem;
    font-weight: 700;
    /* Bold font */
    color: #333333;
    /* Dark text */
    margin-bottom: 8px;
}

/* Description styling */
.data-description {
    font-size: 1rem;
    color: #666666;
    /* Subtle text color */
    line-height: 1.4;
    margin: 0;
}
</style>
