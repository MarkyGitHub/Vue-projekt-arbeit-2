<template>
  <div>
    <h1>Features</h1>
    <p>Explore the key features of our application.</p>

    <!-- Features Section -->
    <section class="features">
      <div v-for="feature in features" :key="feature.id" class="feature-card">
        <h2>{{ feature.title }}</h2>
        <p>{{ feature.description }}</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "FeaturesView",
  data() {
    return {
      features: [
        {
          id: 1,
          title: "Real-time Synchronization",
          description:
            "Sync your data seamlessly between local and remote databases.",
        },
        {
          id: 2,
          title: "Multi-language Support",
          description:
            "Switch between multiple languages with integrated i18n support.",
        },
        {
          id: 3,
          title: "Responsive Design",
          description: "Enjoy a fully responsive interface on any device.",
        },
        {
          id: 4,
          title: "Customizable Themes",
          description:
            "Toggle between light, dark, and minimal themes for a personalized experience.",
        },
        {
          id: 5,
          title: "CouchDB Integration",
          description:
            "Leverage CouchDB for reliable and scalable data storage.",
        },
      ],
    };
  },
};
</script>

<style scoped>
/* General Styling */
h1 {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 20px;
}

p {
  text-align: center;
  margin-bottom: 40px;
  color: #555;
}

/* Features Section */
.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  padding: 0 20px;
}

/* Feature Card Styling */
.feature-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-card h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #333;
}

.feature-card p {
  font-size: 1rem;
  color: #666;
}
</style>
