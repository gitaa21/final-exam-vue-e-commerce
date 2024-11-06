<template>
    <div class="user w-100 h-100">
    <div class="container" style="padding: 50px 0 100px 0 ;">
        <div class="row">
            <user-menu @changeComponent="$router.push($event)"></user-menu>
            <div class="col-lg-9">
                <component :is="component[getRoute]"></component>
            </div>
        </div>
        </div>
    </div>
</template>

<script setup>
import UserMenu from '../user/UserMenu.vue';
import ProfileDetail from '../user/ProfileDetail.vue';
import ChangePassword from '../user/ChangePassword.vue';
import TransactionHistory from '../user/TransactionHistory.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import UserProduct from '../user/UserProduct.vue';

const route = useRoute()

const component = {
    "profile-detail": ProfileDetail,
    "change-password": ChangePassword,
    "transaction-history": TransactionHistory,
    "user-product": UserProduct,    
}

const getRoute = computed(() => {
    return route.params.component
})
</script>

<style scoped>
.user {
    background-color: #f0f0f0;
}
</style>