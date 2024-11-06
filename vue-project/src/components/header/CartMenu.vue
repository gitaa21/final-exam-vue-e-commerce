<template>
    <router-link to="/cart" class="mt-2 ms-3" style="position: relative;">
    <i class="fa-solid fa-lg fa-cart-shopping" style="color: black;"></i>
    <span v-if="listItemCount > 0" class="cart-count">{{ listItemCount }}</span>
</router-link>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const listItemCount = computed(() => store.getters["cart/listItemCount"]);
</script>

<style scoped>
.cart-count {
  position: absolute;
  top: -8px;
  right: -10px;
  background-color: pink;
  color: white;
  border-radius: 50%;
  padding: 1px 7px;
  font-size: 12px;
}
</style>