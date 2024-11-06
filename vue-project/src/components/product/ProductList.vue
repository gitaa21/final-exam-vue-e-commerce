<template>
    <div class="product__list-product row">
         <div class="col-12 col-lg-2 col-sm-2 position-relative" v-for="(product, index) in products" :key="product.id">
            <router-link :to="`/product/${product.id}`" class="list-item text-decoration-none">
                <img :src="product.image" :alt="product.name">
                <h6 style="color: #ff82cd; margin-top: 10px;">{{ formatRupiah(product.price) }}</h6>
                <p class="small" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: black;">{{ product.name }}</p>
            </router-link>
                <div class="d-flex justify-content-between">
                    <p>8 /  {{ product.size }}</p>
                    <span><i class="fa-regular fa-heart"></i>12</span>
                </div>
            </div>
            <router-link to="/product" class="card col-2 see-product text-decoration-none">
                    <a href="product.html">See All New Products</a>
            </router-link>
    </div>
</template>

<script setup>
    defineProps({
        products: Array,
    })

    function formatRupiah(price) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
}
</script>

<style scoped>
.see-product {
    border-radius: 6px;
    background-color: rgba(159, 3, 97, 0.315);
    display: flex;
    justify-content: center;
    text-align: center;
}

.see-product a {
    text-decoration: none;
    color: white;
    padding: 0 10px;
}

</style>