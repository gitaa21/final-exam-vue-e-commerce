<template>
    <div>
        <h4>My Order</h4>
          <div v-if="transactionHistory.length === 0" class="py-5 text-center empty-cart mb-5" style="background-color: white; border-radius: 10px;">
            <img src="https://i.pinimg.com/736x/4c/c0/89/4cc089b731f9d99af5e7beed9ebdb70a.jpg" alt="" style="width: 200px;">
            <div class="empty-cart-text mt-3">
              <h3>No orders yet</h3>
              <p>When you buy item, your order about it will apprear here.</p>
            </div>
            <router-link to="/product" style="text-decoration: none; color: #ff82cd;"><button class="btn-softpink">Shop Now</button></router-link>
          </div>

    <div v-else>      
    <div class="transaction-history" style="background-color: white; padding: 10px 30px; border-radius: 10px;">
      <div v-for="transaction in transactionHistory" :key="transaction.id" class=" mb-2 p-3 border" style="background-color: white; border-radius: 10px;">
        <div class="transaction-header d-flex align-items-center">
          <div>
            <i class="fa-solid fa-bag-shopping me-2" style="color: #ff82cd;"></i>
            <span>Shopping</span>
          </div>
          <span class="ms-3" style="color: gray;">{{ transaction.date }}</span>
          <span class="status ms-3" style="background-color: #ffdbdb; color: #ff82cd; padding: 5px 10px; border-radius: 15px;">{{ transaction.status }}</span>
          <span class="ms-3" style="color: gray;">{{ transaction.orderNumber }}</span>
        </div>

        <div v-for="item in transaction.items" :key="item.id" class="transaction-body d-flex align-items-center">
          <img :src="item.image" alt="Product Image" class="product-image me-3" />
          <div class="product-details flex-grow-1">
            <h6>{{ item.name }}</h6>
            <p style="color: gray;">{{ item.qty }} product x {{ formatRupiah(item.price) }}</p>
            <p style="color: gray;">8 / {{ item.size }}</p>
          </div>
          <div class="total-price text-end">
            <span style="color: gray;">Total price</span>
            <h6>{{ formatRupiah(transaction.totalPrice) }}</h6>
          </div>
          <router-link  to="/product"><button class="btn-softpink ms-3 py-2">Buy Again</button></router-link>
        </div>
      </div>
    </div>
    </div>
</div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  
  const store = useStore();
  const transactionHistory = computed(() => store.getters['transaction/getTransactions']);
  
  function formatRupiah(price) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
  }
  </script>
  
  <style scoped>
  .product-image {
    width: 80px;
    height: auto;
  }
  .total-price {
    font-weight: bold;
  }
  </style>
  