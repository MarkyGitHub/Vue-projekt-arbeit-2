<template>
  <div id="data-cards-container" class="data-grid">
    <DataItemCard v-for="item in dataItems" :key="item.id" :item="item" />
  </div>
</template>

<script>
import DataItemCard from "@/components/layout/DataItemCard.vue";

export default {
  components: {
    DataItemCard,
  },
  computed: {
    dataItems() {
      return this.$store.getters.dataItems;
    },
  },
};
</script>

<style scoped>
/* Grid container for data cards */
.data-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  /* Responsive grid */
  gap: 20px;
  /* Space between grid items */
  padding: 20px;
  justify-content: center;
  align-items: start;
}

/* Styling for individual data cards */
.data-card {
  background-color: #ffffff;
  /* White background */
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  /* Subtle shadow */
  overflow: hidden;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.data-card:hover {
  transform: scale(1.05);
  /* Slight zoom on hover */
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  /* Darker shadow on hover */
}

/* Thumbnail styling */
.thumbnail-img {
  width: 100%;
  height: auto;
  display: block;
}

/* Content styling */
.content {
  padding: 10px;
  text-align: center;
}

.data-title {
  font-size: 1.1rem;
  font-weight: bold;
  margin: 10px 0 5px;
}

.data-description {
  font-size: 0.9rem;
  color: #555555;
  line-height: 1.4;
}
</style>
