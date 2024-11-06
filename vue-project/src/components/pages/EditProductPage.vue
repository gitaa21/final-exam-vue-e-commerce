<template>
    <main>
        <div class="container-md py-5">
            <product-form v-if="detailData && !isLoading" :isEdit="true" style="padding-bottom: 100px;"></product-form>
        </div>
    </main>
</template>

<script setup>
import ProductForm from '../productForm/ProductForm.vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';


const store = useStore()
const route = useRoute()
const detailData = ref()
let isLoading = false

onMounted(async () => {
    try {
        isLoading = true
        await store.dispatch(
            "product/getproductDetail", route.params.id
        )
        detailData.value = store.state.product.productDetail;
        isLoading = false
    } catch (error) {
        console.log(error);
    }
})


</script>