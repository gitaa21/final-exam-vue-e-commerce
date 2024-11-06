<template>
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <h3 class="mb-4">Cart</h3>
          <div class="d-flex mb-4" style="background-color: #f0f0f0; padding: 10px 15px; align-items: center;">
            <i class="fa-solid fa-location-dot me-2"></i>
            <p class="m-0">Shipping to <b>Kuta, Badung</b></p>
          </div>
          <div v-if="cartItems.length === 0" class="py-5 text-center empty-cart mb-5">
            <img src="https://i.pinimg.com/564x/94/90/50/9490507ef4389a963c88f9fe5eee26ef.jpg" alt="" style="width: 200px;">
            <div class="empty-cart-text mt-3">
              <h3>Your cart is still empty</h3>
              <p>Find your favorite items and add to cart before checkout.</p>
            </div>
            <router-link to="/product" class="find-products-btn" style="text-decoration: none; color: #ff82cd;">Find Products</router-link>
          </div>
  
          <div v-else>
            <div v-for="item in cartItems" :key="item.id" class="cart-item mb-4 pb-3 me-3" style="border-bottom: 8px solid #f0f0f0">
                <img :src="item.image" alt="Product Image" class="cart-item-image" />
                <div class=" d-flex align-items-center w-100">
                <div class="product-info flex-grow-1 ms-3">
                  <h6 class="product-name">{{ item.name }}</h6>
                  <p class="text-muted mb-1" style="font-size: 16px;">8 / M</p>
                  <p class="mb-1" style="font-size: 16px;">{{ formatRupiah(item.price) }}</p>
                  <button class="btn-white py-1 px-2" @click="removeFromCart(item.id)">Remove</button>
                </div>
                <div class="quantity-controls d-flex ms-auto align-items-center">
                  <button class="btn-white" @click="increaseQuantity(item.id)">+</button>
                  <span class="quantity-display btn-softpink mx-2 px-3 py-1">{{ item.qty }}</span>
                  <button class="btn-white" @click="decreaseQuantity(item.id)" :disabled="item.qty <= 1">-</button>
                </div>
            </div>
            </div>
          </div>
        </div>
  
        <div class="col-md-4 order-summary">
          <div class="card" style="width: 100%;">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h5 class="card-title">Order Summary</h5>
                  <p class="text-muted" style="font-size: 14px;">{{ itemCount }} items</p>
                </div>
                <div>
                  <h6 class="total-price fs-4 mb-0">{{ formatRupiah(cartTotal) }}</h6>
                  <p class="text-muted">Not include shipping fee</p>
                </div>
              </div>
              <hr>
              <router-link to="/order"><button class="btn-softpink p-2 w-100" :disabled="cartItems.length === 0">Checkout</button></router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  
  const store = useStore();
  const router = useRouter();
  
  const cartItems = computed(() => store.getters['cart/cartItems']);
  const cartTotal = computed(() => store.getters['cart/cartTotal']);
  const itemCount = computed(() => store.getters['cart/itemCount']);
  
  function removeFromCart(productId) {
    store.dispatch('cart/removeFromCart', productId);
  }
  
  function increaseQuantity(productId) {
    const item = cartItems.value.find(item => item.id === productId);
    if (item) {
      store.dispatch('cart/addToCart', { ...item, qty: 1 });
    }
  }
  
  function decreaseQuantity(productId) {
    const item = cartItems.value.find(item => item.id === productId);
    if (item) {
      const newQty = item.qty - 1;
      store.dispatch('cart/updateQuantity', { productId, qty: newQty });
    }
  }
  
  function formatRupiah(price) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
}

  </script>
  
  <style scoped>
  .cart-item {
    display: flex;
    align-items: center;
  }
  .cart-item-image {
    width: 100px;
    height: auto;
  }
  .product-info {
    margin-right: 10px;
  }
  .product-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .quantity-controls button {
    padding: 5px 10px;
  }
  .empty-cart {
    text-align: center;
  }
  .empty-cart-icon {
    font-size: 100px;
    color: #ff82cd;
    margin-bottom: 10px;
  }
  .order-summary .checkout-btn {
    background-color: #ff82cd;
    color: white;
    border-radius: 5px;
  }
  
  </style>
  