<template>    
    <div class="container ms-5 product__list-product row">
        <div class="col-12 col-lg-2 col-sm-2 position-relative mt-3" v-for="product in relatedProducts" :key="product.id">
            <router-link :to="`/product/${product.id}`" class="list-item text-decoration-none">
                <img :src="product.image" :alt="product.name" class="product-image">
                <h6 style="color: #ff82cd; margin-top: 10px;">{{ formatRupiah(product.price) }}</h6>
                <p class="small" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: black;">{{ product.name }}</p>
            </router-link>
            <div class="d-flex justify-content-between">
                <p>B/M</p>
                <span><i class="fa-regular fa-heart"></i>12</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const relatedProducts = computed(() => {
    return store.state.product.relatedProducts;
});

function formatRupiah(price) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
}

onMounted(async () => {
    const categoryType = store.state.product.productDetail.category; // Pastikan `productDetail` sudah berisi data yang diambil
    await store.dispatch('product/getRelatedProduct', categoryType);
});
</script>

<style scoped>
.product__list-product {
    display: flex;
    flex-wrap: wrap;
}

.product-image {
    width: 100%; /* Set width to fill container */
    height: 250px; /* Fixed height for uniformity */
    object-fit: cover; /* Crop and fit image */
}
</style>