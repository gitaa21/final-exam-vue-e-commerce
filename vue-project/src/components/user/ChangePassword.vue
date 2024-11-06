<template>
  <div class="profile-edit-container">
    <h5 class="mb-3" style="color: gray;">Change Password</h5>
    <form @submit.prevent="updatePassword">
      <div class="mb-3">
        <base-input 
        type="password" 
        label="Old Password" 
        id="oldpassword" 
        v-model="oldPassword" 
        placeholder="Old Password" />
      </div>
      <div class="mb-3">
        <base-input 
        type="password" 
        label="New Password" 
        id="newpassword" 
        v-model="newPassword" 
        placeholder="New Password" />
      </div>
      <div class="mb-3">
        <base-input 
        type="password" 
        label="Confirm New Password" 
        id="confirmationnewpassword" 
        v-model="confirmNewPassword" 
        placeholder="Confirm New Password" />
      </div>
      <div class="d-flex justify-content-end">
        <base-button class="login w-25 my-2">Save Change</base-button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import BaseButton from '../ui/BaseButton.vue';
import BaseInput from '../ui/BaseInput.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useStore();
const oldPassword = ref('');
const newPassword = ref('');
const confirmNewPassword = ref('');

// Fungsi untuk memperbarui password
const updatePassword = async () => {
  // Memastikan password baru dan konfirmasi password cocok
  if (newPassword.value !== confirmNewPassword.value) {
    alert("New passwords do not match!");
    return;
  }

  try {
    // Melakukan dispatch ke Vuex untuk memperbarui password
    await store.dispatch("auth/updatePassword", {
      oldPassword: oldPassword.value,
      newPassword: newPassword.value,
    });
    router.push('/user/profile-detail');
    alert("Password updated successfully.");
  } catch (error) {
    console.error(error);
    alert("Failed to update password.");
  }
};
</script>
