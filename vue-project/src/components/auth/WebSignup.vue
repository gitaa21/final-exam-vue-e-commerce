<template>
 <div class="card mx-auto mt-1" style="width: 450px; margin-bottom: 100px;">
      <div class="card-body ms-3 me-3">
        <form class="mt-3" @submit.prevent="register">
          <router-link to="/" type="button" class="btn-close" aria-label="Close" style="float: right;"></router-link>
          <h3 class="mb-3">Sign Up</h3>
          <p>Enter your detail below</p>
          <div class="my-4 mt-1">
            <base-input type="text" identity="fullname" placeholder="Ex: Jack" label="Fullname" v-model="signupData.fullname" ></base-input>
          </div>
          <div class="my-4">
            <base-input type="text" identity="username" placeholder="Your username" label="Username" v-model="signupData.username" ></base-input>
          </div>
          <div class="my-4">
            <base-input type="email" identity="email" placeholder="Your email address" label="Email" v-model="signupData.email" ></base-input>
          </div>
          <div class="my-4 sign-up-pass" style="position: relative;">
            <base-input type="password" identity="password" placeholder="Your password" label="Password" v-model="signupData.password" @keyInput="passwordCheck"></base-input>
          <p class="text-danger mt-1 fw-medium" style="font-size: 11px;" :style="{display: passwordStatusDisplay}">The password field must be at least 8 charachter</p>
        </div>
          <div class="my-4 sign-up-pass-conf">
            <base-input type="password" identity="confirmationPassword" placeholder="Same with password" label="Confirmation Password" v-model="signupData.confirmationPassword" @keyInput="confirmationPasswordCheck"></base-input>
          <p class="text-danger mt-1 fw-medium" style="font-size: 11px;" :style="{display: confirmPasswordDoesNotMatch}">The password confirmation does not match</p>
          <p class="text-success mt-1 fw-medium" style="font-size: 11px;" :style="{display: confirmPasswordMatch}">The password confirmation does match</p></div>
          <div class="my-4">
        <base-input type="file" identity="userImage" label="Profile Photo" isImage="true" @input="checkImage">
        <div>
            <div class="border p-1 mt-2 rounded-circle"> 
                <img :src="signupData.imageLink" class="rounded-circle" width="140" height="150" style="object-fit: cover" @input="checkImage"/>
            </div>
            <div class="text-center" style="transform: translateY(-24px)">
              <i class="fa-solid fa-camera fs-5 p-2 rounded-circle bg-white"></i>
            </div>
        </div>
        </base-input>
    </div>
    <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1">
            <label class="form-check-label" for="exampleCheck1">By clicking sign up, I hereby agree
                and consent to <span style="color: #d25ca3c4;">Term & Conditions;</span> I confirm that I have read <span style="color: #d25ca3c4;">Privacy Policy.</span>
            </label>
          </div>
    <base-button class="login w-100 my-3">Sign up</base-button>
        </form>
      </div>
    </div>
</template>

<script setup>
import BaseInput from '../ui/BaseInput.vue';
import BaseButton from '../ui/BaseButton.vue';
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import axios from "axios";
import Cookies from "js-cookie";

const store = useStore()
const router = useRouter()
const passwordStatusDisplay = ref("none")
const confirmPasswordDoesNotMatch = ref("none")
const confirmPasswordMatch = ref("none")

const signupData = reactive({
  fullname: "",
  username: "",
  email: "",
  password: "",
  confirmationPassword: "",
  isLogin: false,
  imageLink: "",
})

const register = async () => {
  try {
    if (
      signupData.password !== signupData.confirmationPassword || signupData.password.length < 8
    ) {
      signupData.confirmationPassword = "";
      signupData.password = "";
      confirmPasswordDoesNotMatch.value = "block";
      confirmPasswordMatch.value = "none";
    } else {
      await store.dispatch("auth/getRegisterData", signupData);
      router.push("/");
      alert("You have successfully registered!");
    }
  } catch (error) {
    alert(err.message);
  }
}

const passwordCheck = () => {
  if (signupData.password.length < 8) {
    passwordStatusDisplay.value = "block"
  } else {
    passwordStatusDisplay.value = "none"
  }
}

const confirmationPasswordCheck = () => {
  if (signupData.confirmationPassword === "") {
    confirmPasswordDoesNotMatch.value = "none";
    confirmPasswordMatch.value = "none";
    return;
  }

  if (signupData.password !== signupData.confirmationPassword) {
    confirmPasswordDoesNotMatch.value = "block";
    confirmPasswordMatch.value = "none";
    return;
  }
  confirmPasswordDoesNotMatch.value = "none";
  confirmPasswordMatch.value = "block";
}

const checkImage = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.addEventListener("load", () => {
    signupData.imageLink = reader.result;
  })
}
</script>
