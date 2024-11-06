<template>
  <ul class="list-group">
    <li class="list-group-item">
      <div class="d-flex flex-sm-row flex-column justify-content-between align-items-sm-center">
        <div class="mb-3 mb-sm-0">
          <p class="my-0 fs-4 fw-semibold">My Products</p>
          <p class="my-0 text-secondary">Add your original products here</p>
        </div>
        <div>
          <router-link to="/new-product" class="btn-white add-btn px-3 py-2" style="text-decoration: none;">
            <i class="fa-solid fa-circle-plus pe-2"></i>Add Product
          </router-link>
        </div>
      </div>
    </li>
    <li class="list-group-item">
      <p class="mt-2 mb-4 fs-5 fw-semibold">Products</p>
      <div class="row">
        <user-product-card
          v-for="product in products"
          :key="product.id"
          :product="product"
          :buttonName="['Delete', 'Edit']"
          @btnRemove="deleteProduct(product.id)"
          @btnEdit="editProduct(product.id)"
        >
          <p>{{ moment(product.createdAt).format("YYYY-MM-DD") }}</p>
        </user-product-card>
      </div>
    </li>
  </ul>
</template>

<script setup>
import moment from 'moment';
import UserProductCard from './UserProductCard.vue';
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useStore();

const products = computed(() => {
  return store.state.product.products; 
});

const editProduct = (id) => {
  router.push({ name: 'editProductPage', params: { id } });
};

const deleteProduct = async (id) => {
  await store.dispatch("product/deleteProduct", id);
  alert("Product successfully deleted"); 
}

onMounted(async () => {
  try {
    await store.dispatch("product/getProductData");
  } catch (error) {
    console.log(error);
  }
});
</script>
