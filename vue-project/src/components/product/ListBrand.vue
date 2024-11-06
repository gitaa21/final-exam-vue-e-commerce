<!-- ListBrand.vue -->
<template>
    <div class="brands d-flex flex-wrap">
      <button
        v-for="brand in brands"
        :key="brand"
        class="btn-outline-softpink mb-2 me-2"
        @click="$emit('selectBrand', brand)"
      >
        {{ brand }}
      </button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      brands: {
        type: Array,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  .btn-outline-softpink {
    border: 1px solid #ff82cd;
    color: #ff82cd;
    background-color: white;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
  }
  .btn-outline-softpink:hover {
    background-color: #ff82cd;
    color: white;
  }
  </style>
  