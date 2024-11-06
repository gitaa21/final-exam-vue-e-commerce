<template>
  <div
    class="header__signup col-8 col-sm-4 fw-semibold d-flex justify-content-evenly align-items-center text-decoration-none me-3"
    style="text-align: right"
  >
    <img
      :src="userData.imageLink"
      alt="Profile"
      width="36"
      height="36"
      class="rounded-circle"
      style="object-fit: cover"
    />
    <ul class="navbar-nav">
      <li class="nav-item dropdown">
        <a
          class="nav-link dropdown-toggle"
          href="#"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        ></a>
        <ul class="dropdown-menu">
          <router-link to="/user/profile-detail" class="dropdown-item">
            <i class="fa-solid fa-user me-2"></i><a href="" style="text-decoration: none; color: black;">Profile</a>
          </router-link>
          <router-link to="/user/transaction-history" class="dropdown-item">
            <i class="fa-solid fa-file-lines me-2"></i><a href="" style="text-decoration: none; color: black;">Order</a>
          </router-link>
          <li class="dropdown-item" @click="showLogoutModal = true">
            <i class="fa-solid fa-right-from-bracket me-2"></i><a href="" style="text-decoration: none; color: black;">Logout</a>
          </li>
        </ul>
      </li>
    </ul>
  </div>

  <div v-if="showLogoutModal" class="modal show modal-custom">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5>Confirm Logout</h5>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to logout?</p>
        </div>
        <div class="modal-footer">
          <button @click="showLogoutModal = false" class="btn-white py-2" style="padding: 0 10px;">Cancel</button>
          <button @click="confirmLogout" class="btn-softpink py-2" style="padding: 0 10px;">Logout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { computed, ref } from 'vue';

const store = useStore();
const router = useRouter();
const userData = computed(() => store.state.auth.userLogin);
const showLogoutModal = ref(false);

const confirmLogout = () => {
  store.commit("auth/setUserLogout");
  router.push("/");
};
</script>

<style scoped>
.modal-custom {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
}
</style>
