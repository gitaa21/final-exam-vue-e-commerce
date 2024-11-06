<template>
  <div class="profile-edit-container">
    <h5 class="mb-3" style="color: gray;">Edit Profile</h5>
    <form @submit.prevent="updateProfile">
      <div class="d-flex justify-content-between">
        <div>
          <p>Photo</p>
        </div>
        <div class="profile-picture">
          <img :src="userData.imageLink" alt="Foto Profil" v-if="userData.imageLink" class="profile-img" style="object-fit: cover">
          <input type="file" @change="handleFileChange" accept="image/*" style="display: none;" ref="fileInput">
          <button class="btn btn-secondary btn-sm" @click="chooseFile">Pilih</button>
          <span class="text-muted mx-2">JPG, JPEG, atau PNG, maksimal 1 MB.</span>
          <i class="fa-solid fa-trash ms-5" style="color: gray;" @click="removeImage"></i>
        </div>
      </div>
      <div class="mb-3">
        <base-input type="text" label="Fullname" id="fullName" v-model="userData.fullname"></base-input>
      </div>
      <div class="mb-3">
        <base-input type="text" label="Username" id="username" v-model="userData.username"></base-input>
      </div>
      <div class="mb-3">
        <base-input type="email" label="Email" id="email" v-model="userData.email"></base-input>
      </div>
      <div class="d-flex justify-content-end">
        <base-button class="login w-25 my-2">Update Profile</base-button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import BaseButton from '../ui/BaseButton.vue';
import BaseInput from '../ui/BaseInput.vue';

const store = useStore();
const router = useRouter(); 

const userData = ref({
  fullname: '',
  username: '',
  email: '',
  imageLink: '',
});

onMounted(() => {
  const valueEditProfile = store.state.auth.userLogin;
  if (valueEditProfile) {
    userData.value = {
      fullname: valueEditProfile.fullname || "",
      username: valueEditProfile.username || "",
      email: valueEditProfile.email || "",
      imageLink: valueEditProfile.imageLink || ""
    };
  }
});

watch(() => store.state.auth.userLogin.imageLink, (newValue) => {
  userData.value.imageLink = newValue;
});

const updateProfile = async () => {
  try {
    await store.dispatch('auth/updateUserEmail', userData.value);
    router.push('/user/profile-detail');
  } catch (err) {
    console.error(err); 
  }
};

const fileInput = ref(null); 

const chooseFile = () => {
  fileInput.value.click();
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      store.commit('auth/updateUserImage', e.target.result);
    };
    reader.readAsDataURL(file);
  }
};

const removeImage = () => {
  store.commit('auth/updateUserImage', '');
};
</script>
