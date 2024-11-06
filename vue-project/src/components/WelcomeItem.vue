<!-- ProductPage.vue -->
<template>
  <div class="container mt-2" style="padding-bottom: 50px;">
    <div class="border-bottom border-1 border-gray mb-2">
      <h4>Items</h4>
    </div>
    <!-- Display the filtered product list -->
    <ProductListAll :products="filteredProductList" v-if="productListStatus" />
  </div>

  <div v-if="filteredProductList.length === 0 && productListStatus" class="text-center">
    <div class="text-center empty-cart" style="margin-bottom: 100px;">
      <img src="https://i.pinimg.com/564x/29/40/4a/29404a69359c5eb3e5aa10cd031e2473.jpg" alt="" style="width: 200px; margin-bottom: 20px;">
      <div class="empty-cart-text">
        <h3>Product not found</h3>
        <p>We cannot find what you are looking for. Try using other keywords or reset.</p>
      </div>
      <button class="btn-softpink py-2 px-5" @click="resetFilters">Reset Filters</button>
    </div>
  </div>
</template>

<script setup>
import ProductListAll from '../product/ProductListAll.vue';
import { onMounted, ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const store = useStore();

const productListStatus = ref(false);
const productList = ref([]);
const searchTerm = ref('');
const selectedBrand = ref('');

// Fetch product data on component mount
onMounted(async () => {
  try {
    await store.dispatch('product/getProductData');
    productListStatus.value = true;
    productList.value = store.state.product.products;
  } catch (error) {
    console.error(error);
  }
});

// Update filters based on URL query
watch(
  () => route.query,
  (query) => {
    searchTerm.value = query.search || '';
    selectedBrand.value = query.brand || '';
  },
  { immediate: true }
);

// Computed property for filtering products
const filteredProductList = computed(() => {
  let products = productList.value;

  // Filter by brand if selected
  if (selectedBrand.value) {
    products = products.filter((product) => product.brand === selectedBrand.value);
  }

  // Filter by search term if provided
  if (searchTerm.value) {
    products = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  }

  return products;
});

// Reset filters and clear the search query
const resetFilters = () => {
  searchTerm.value = '';
  selectedBrand.value = '';
  router.push({ name: 'product', query: {} });
};
</script>
