<template>
    <div class="nav-search me-2">
      <i class="fa-solid fa-magnifying-glass search-icon me-auto"></i>
      <input
        type="text"
        class="form-control"
        placeholder="Search for items"
        v-model="searchQuery"
        @input="searchProduct"
      />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const searchQuery = ref('');
  const router = useRouter();
  
  // Handle search input and push query to the URL
  const searchProduct = () => {
    if (searchQuery.value.trim()) {
      router.push({ name: 'product', query: { search: searchQuery.value } });
    } else {
      // Clear the query parameter if search is empty
      router.push({ name: 'product', query: { search: '' } });
    }
  };
  </script>
  

<style scoped>
.nav-search {
    position: relative;
}
.search-results {
    position: absolute;
    background-color: white;
    border: 1px solid #ccc;
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
    z-index: 1000;
}
</style>
