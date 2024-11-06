<template>
  <div class="card mx-auto mt-1" style="width: 450px; margin-bottom: 100px;">
    <div class="card-body">
      <form @submit.prevent="login">
        <a href="index.html" type="button" class="btn-close" aria-label="Close" style="float: right;"></a>
        <h3>Log In</h3>
        <p>Enter your detail below</p>

        <div class="my-4">
          <base-input 
            type="email" 
            identity="email" 
            placeholder="Your email address" 
            label="Email" 
            v-model="loginData.email">
          </base-input>
        </div>

        <div class="my-4">
          <base-input 
            type="password" 
            identity="password" 
            placeholder="Your password" 
            label="Password" 
            v-model="loginData.password">
          </base-input>
        </div>

        <base-button class="login w-100 my-3">Continue</base-button>
      </form>
    </div>
  </div>
</template>

<script setup>
import BaseInput from '../ui/BaseInput.vue';
import BaseButton from '../ui/BaseButton.vue';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore()
const router = useRouter()

const loginData = reactive({
  email: "",
  password: "",
  isLogin: true
})

const login = async () => {
  try {
    await store.dispatch("auth/getLoginData", loginData);
    alert("You have successfully logged in");
    router.push("/");
  } catch (err) {
    alert(err.message);
  }
}
</script>