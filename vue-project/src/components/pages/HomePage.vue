<template>
    <div class="hero">
        <div class="hero-card position-relative">
            <img src="../../assets/images/hero.jpeg" class="card-img-top" alt="background">
            <div class=" hero-card-body position-absolute">
                <h4>Ready to declutter your closet?</h4>
                <router-link to="/product"><button class="btn-softpink w-100 mt-3" type="submit">Shop Now</button></router-link>
            </div>
        </div>
    </div>
    <div class="container mt-2">
        <div class=" d-flex justify-content-between mb-2 mt-3">
            <h4>Popular Item</h4>
            <a class="navbar-link" href="product.html" type="none">See all</a>
        </div>
        <div class="d-flex align-items-center">
                <product-list :products="productList.slice(0, 5)" v-if="productListStatus"></product-list>
        </div>

    </div>
    <div class="container category mt-5">
        <h4 class="mb-3">Shop by Brands</h4>
        <list-brand :brands="brands" @selectBrand="filterByBrand"></list-brand>
    </div>

    <div class="container mt-5">
        <div class="d-flex justify-content-between mb-2">
            <h4>Popular Item</h4>
            <router-link to="/product"><a class="navbar-link" type="none">See all</a></router-link>
        </div>
        <div class="d-flex align-items-center" style="padding-bottom: 100px;">
            <product-list :products="productList.slice(6, 11)" v-if="productListStatus"></product-list>
        </div>
    </div>
    
</template>

<script setup>
import ProductList from '../product/ProductList.vue';
import ListBrand from '../product/ListBrand.vue';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();
const productListStatus = ref(false);
const productList = ref();
const brands = ref([
  'Elegant Couture', 'Blooming Bright', 'Floral Essence', 'Natures Touch', 'Garden Elegance',
  'Spring Blossom'
]);

const filterByBrand = (brand) => {
  router.push({ name: 'product', query: { brand } });
};

onMounted(async () => {
    try {
        await store.dispatch("product/getProductData");
        productListStatus.value = true;
        productList.value = store.state.product.products;
    } catch (error) {
        console.log(error);

    }
})


</script>

