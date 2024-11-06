<template>
    <div class="col-lg-3 mb-4">
      <h4>Settings</h4>
      <ul class="list-group ms-4 mt-4" type="none">
        <li 
          class="user-menu mt-3" 
          @click="menuClicked('profile-detail')" 
          :class="{ 'active-color': selectedMenu === 'profile-detail', 'inactive-color': selectedMenu !== 'profile-detail'}"
        >
          <span>Profile Detail</span>
        </li>
        <li 
          class="user-menu mt-3" 
          @click="menuClicked('change-password')" 
          :class="{ 'active-color': selectedMenu === 'change-password', 'inactive-color': selectedMenu !== 'change-password' }"
        >
          <span>Change Password</span>
        </li>
        <li 
          class="user-menu mt-3" 
          @click="menuClicked('transaction-history')" 
          :class="{ 'active-color': selectedMenu === 'transaction-history', 'inactive-color': selectedMenu !== 'transaction-history' }"
        >
          <span>Transaction History</span>
        </li>
        <li 
          class="user-menu mt-3" 
          @click="menuClicked('user-product')" 
          :class="{ 'active-color': selectedMenu === 'user-product' , 'inactive-color': selectedMenu !== 'user-product' }"
        >
        <span>My Product</span>
    </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  
  const emit = defineEmits(['changeComponent']);
  const store = useStore();
  const selectedMenu = ref(''); 
  
  const menuClicked = option => {
    selectedMenu.value = option; 
    console.log(selectedMenu.value); 
    emit("changeComponent", option);
  };
  </script>
  
  <style scoped>
  .user-menu {
    cursor: pointer; 
  }
  
  .active-color {
    color: black; 
  }
  
  .inactive-color {
    color: grey; 
  }
  </style>