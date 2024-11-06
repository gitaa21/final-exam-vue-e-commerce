<template>
    <nav class="d-flex position-fixed">
        <div class="nav-image">
                <router-link to="/">
                    <img src="../../assets/images/logo.png" width="100px" alt="">
                </router-link>
        </div>
        <search-menu></search-menu>
        <navigation-bar></navigation-bar>
    </nav>

</template>

<script setup>
import SearchMenu from './SearchMenu.vue';
import NavigationBar from './NavigationBar.vue';
</script>