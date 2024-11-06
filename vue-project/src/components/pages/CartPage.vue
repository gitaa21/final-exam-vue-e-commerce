<template>
    <cart-detail></cart-detail>
    <div class="container">
      <h4>Other Product</h4>
    <product-list-all :products="productList.slice(0, 4)" v-if="productListStatus"></product-list-all>
    <product-list-all :products="productList.slice(5, 9)" v-if="productListStatus" style="padding-bottom: 100px;"></product-list-all>
    </div>
</template>

<script setup>
import CartDetail from '../cart/CartDetail.vue';
import ProductListAll from '../product/ProductListAll.vue';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const productListStatus = ref(false);
const productList = ref();

onMounted(async () => {
    try {
        await store.dispatch("product/getProductData");
        productListStatus.value = true;
        productList.value = store.state.product.products;
    } catch (error) {
        console.log(error);

    }
})
</script>


<!-- <template>
    <div class="cart-container">
      <h1>Cart</h1>
      
      <div v-if="cartItems.length > 0">
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <img :src="item.image" alt="Product Image" class="item-image" />
          <div class="item-details">
            <h2>{{ item.name }}</h2>
            <p>{{ item.size }}</p>
            <p>Rp{{ formatCurrency(item.price) }}</p>
            
            <div class="quantity-control">
              <button @click="updateQuantity(item.id, item.quantity - 1)">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="updateQuantity(item.id, item.quantity + 1)">+</button>
            </div>
            
            <button class="remove-button" @click="removeFromCart(item.id)">Remove</button>
          </div>
        </div>
  
        <div class="order-summary">
          <h3>Order Summary</h3>
          <p>Total Items: {{ cartItemCount }}</p>
          <p>Total Price: Rp{{ formatCurrency(cartTotalPrice) }}</p>
          <button class="checkout-button">Checkout</button>
        </div>
      </div>
      
      <div v-else>
        <p>Your cart is empty.</p>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    computed: {
      ...mapGetters('cart', ['cartItems', 'cartItemCount', 'cartTotalPrice']),
    },
    methods: {
      ...mapActions('cart', ['updateQuantity', 'removeFromCart']),
      
      formatCurrency(value) {
        return value.toLocaleString('id-ID');
      }
    }
  };
  </script>
  
  <style scoped>
  .cart-container {
    padding: 20px;
  }
  .cart-item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  .item-image {
    width: 80px;
    height: 80px;
    object-fit: cover;
    margin-right: 15px;
  }
  .item-details {
    flex: 1;
  }
  .quantity-control {
    display: flex;
    align-items: center;
  }
  .quantity-control button {
    width: 30px;
    height: 30px;
  }
  .remove-button {
    color: red;
    cursor: pointer;
  }
  .order-summary {
    border-top: 1px solid #ddd;
    padding-top: 15px;
  }
  .checkout-button {
    background-color: #28a745;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
  }
  </style>
   -->