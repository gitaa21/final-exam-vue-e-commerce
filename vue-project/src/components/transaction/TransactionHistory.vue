<template>
    <div class="transaction-history">
      <h4>My Order</h4>
      <div v-for="transaction in transactions" :key="transaction.id" class="transaction-card mb-4 p-3 border">
        <div class="transaction-header d-flex align-items-center justify-content-between">
          <div>
            <i class="icon-shopping"></i>
            <span>Shopping</span>
          </div>
          <span>{{ transaction.date }}</span>
          <span class="status">{{ transaction.status }}</span>
          <span>{{ transaction.orderNumber }}</span>
        </div>
        <div class="transaction-body d-flex align-items-center">
          <img :src="transaction.productImage" alt="Product Image" class="product-image me-3" />
          <div class="product-details flex-grow-1">
            <h6>{{ transaction.productName }}</h6>
            <p>{{ transaction.quantity }} product x {{ formatRupiah(transaction.price) }}</p>
            <p>{{ transaction.size }}</p>
            <span class="extra-products">{{ transaction.extraProducts }} more products</span>
          </div>
          <div class="total-price text-end">
            <span>Total price</span>
            <h6>{{ formatRupiah(transaction.totalPrice) }}</h6>
          </div>
          <button class="buy-again-btn ms-3">Buy Again</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    name: 'TransactionHistory',
    setup() {
      const store = useStore();
      const transactions = computed(() => store.getters['transaction/getTransactions']);
  
      const formatRupiah = (price) => {
        return new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(price);
      };
  
      return {
        transactions,
        formatRupiah,
      };
    },
  };
  </script>
  
  <style scoped>
  .transaction-card {
    background-color: #f9f9f9;
  }
  .product-image {
    width: 80px;
    height: auto;
  }
  .total-price {
    font-weight: bold;
  }
  .buy-again-btn {
    background-color: #ff82cd;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
  }
  </style>
  