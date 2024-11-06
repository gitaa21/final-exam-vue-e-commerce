<template>
    <ul class="list-group">
        <product-form-body :isEdit="isEdit"></product-form-body>
    </ul>
</template>

<script setup>
defineProps({
  isEdit: {
    type: Boolean,
    default: false
  }
})

import ProductFormBody from './ProductFormBody.vue';

</script>