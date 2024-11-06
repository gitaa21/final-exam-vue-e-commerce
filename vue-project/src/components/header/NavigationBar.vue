<template>
    <div class="nav-button d-flex">
        <component  class="menu-item" v-for="(componentName, index) in menuComponent" 
                   :key="index" 
                   :is="components[componentName]"></component>
        <languange-menu></languange-menu>
    </div>
</template>

<script setup>
import SignupMenu from './SignupMenu.vue';
import LoginMenu from './LoginMenu.vue';
import LikeMenu from './LikeMenu.vue';
import CartMenu from './CartMenu.vue';
import LanguangeMenu from './LanguageMenu.vue';
import { useStore } from 'vuex';
import ProfileMenu from './ProfileMenu.vue';
import { computed, ref, watch } from 'vue';

const menuComponent = ref(["login-menu", "signup-menu"]);
const store = useStore();

const components = {
    'signup-menu': SignupMenu,
    'login-menu': LoginMenu,
    'profile-menu': ProfileMenu,
    'cart-menu': CartMenu,
    'like-menu': LikeMenu 

}

const getToken = computed(() => {
    console.log("Current Token:", store.state.auth.token);
    return store.state.auth.token;
})

if (!getToken.value) {
    menuComponent.value = [ "login-menu", "signup-menu"];
} else {
    menuComponent.value = ["cart-menu", "like-menu", "profile-menu"];
}

watch(getToken, (newValue, oldValue) => {
    if (!newValue) {
    menuComponent.value = ["login-menu", "signup-menu"];
} else {
    menuComponent.value = ["cart-menu", "like-menu", "profile-menu"];
}
})
</script>

<style>

</style>