<template>
    <div class="product__list-product row">
         <div class="col-12 col-lg-2 col-sm-2 position-relative mt-3" v-for="(product, index) in products" :key="product.id">
            <router-link :to="`/product/${product.id}`"  class="list-item text-decoration-none">
                <img :src="product.image" :alt="product.name">
                <h6 style="color: #ff82cd; margin-top: 10px;">{{ formatRupiah(product.price) }}</h6>
                <p class="small" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: black;">{{ product.name }}</p>
            </router-link>
                <div class="d-flex justify-content-between">
                    <p>8 / {{ product.size }}</p>
                    <span><i class="fa-regular fa-heart"></i>12</span>
                </div>
            </div>
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
