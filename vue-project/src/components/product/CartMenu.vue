cart menu

<template>
    <div class="container" style="margin-bottom: 150px;">
      <div class="row">
        <div class="col-md-8">
          <h3 style="margin-bottom: 40px;">Cart</h3>
          <div v-if="cartItems.length === 0" class="py-5 text-center empty-cart">
            <i class="fas fa-shopping-cart empty-cart-icon"></i>
            <div class="empty-cart-text">
              <h3>Your cart is still empty</h3>
              <p>Find your favorite items and add to cart before checkout.</p>
            </div>
            <router-link to="/product" class="find-products-btn">Find Products</router-link>
          </div>
          <div v-else>
            <div v-for="item in cartItems" :key="item.id" class="cart-item">
              <div class="cart-item-details">
                <img :src="item.image" alt="Product Image" class="cart-item-image" />
                <div class="product-info">
                  <h6 class="product-name">{{ item.name }}</h6>
                  <p>{{ formatRupiah(item.price) }} ( x{{ item.qty }} )</p>
                  <div class="quantity-controls">
                    <button @click="increaseQuantity(item.id)">+</button>
                    <span class="quantity-display">{{ item.qty }}</span>
                    <button @click="decreaseQuantity(item.id)" :disabled="item.qty <= 1">-</button>
                  </div>
                </div>
                <button class="remove-btn" @click="removeFromCart(item.id)">Remove</button>
              </div>
              <hr>
            </div>
          </div>
        </div>
        <div class="order-summary">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Order Summary</h5>
              <p class="card-text">{{ cartItems.length }} items</p>
              <p class="card-text text-muted">Not include shipping fee</p>
              <h6 class="total-price mb-3">{{ calculateTotal() }}</h6>
              <hr>
              <button class="checkout-btn" :disabled="cartItems.length === 0">Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from "vue";
  import { useStore } from "vuex";
  
  const store = useStore();
  const cartItems = computed(() => store.getters['cart/cartItems']);
  
  function removeFromCart(productId) {
    store.commit('cart/removeFromCart', productId);
  }
 
  function increaseQuantity(productId) {
    const item = cartItems.value.find(item => item.id === productId);
    if (item) {
      store.commit('cart/addToCart', { ...item, qty: 1 }); 
    }
  }
  
  function decreaseQuantity(productId) {
    const item = cartItems.value.find(item => item.id === productId);
    if (item) {
      if (item.qty > 1) {
        store.commit('cart/addToCart', { ...item, qty: -1 });
      } else {
        removeFromCart(productId); 
      }
    }
  }
  
  function formatRupiah(price) {
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR', 
      minimumFractionDigits: 0, 
      maximumFractionDigits: 0 
    }).format(price);
  }

  function calculateTotal() {
    return formatRupiah(cartItems.value.reduce((total, item) => total + (item.price * item.qty), 0));
  }
  </script>
  
  <style scoped>
  .cart-item {
    display: flex;
    align-items: center;
    margin-bottom: 80px;
  }
  .cart-item-details {
    display: flex;
    align-items: center;
    justify-content: space-between; 
    width: 100%; 
  }
  .product-info {
    flex-grow: 1; 
    margin-right: 10px; 
  }
  .product-name {
    white-space: nowrap; 
    overflow: hidden; 
    text-overflow: ellipsis; 
  }
  .cart-item-image {
    width: 100px; 
    height: auto;
    margin-right: 15px;
  }
  .quantity-controls {
    display: flex;
    align-items: center;
    margin: 0 10px; 
  }
  .quantity-controls button {
    margin: 0 5px;
    padding: 5px 10px;
  }
  .quantity-display {
    padding: 5px 10px; 
    border: 1px solid #ccc; 
    border-radius: 5px; 
    text-align: center; 
  }
  .empty-cart {
    text-align: center;
  }
  .empty-cart-icon {
    font-size: 50px;
    color: #ff82cd;
  }
  .empty-cart-text h3 {
    font-weight: bold;
    margin-top: 20px;
  }
  .empty-cart-text p {
    color: #666;
    margin-bottom: 30px;
  }
  .find-products-btn {
    background-color: #ff82cd;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    margin-top: 40px;
    text-decoration: none;
  }
  .remove-btn {
    background-color: red; 
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
  }
  .remove-btn:hover {
    background-color: darkred; 
  }
  .order-summary {
    width: 25%;
  }
  .order-summary .total-price {
    font-weight: bold;
    font-size: 1.5em;
  }
  .order-summary .checkout-btn {
    width: 100%;
    background-color: #ff82cd;
    color: white;
    padding: 10px 0;
    border-radius: 5px;
    border: none;
  }
  .order-summary .checkout-btn:disabled {
    cursor: not-allowed;
    }
</style>
