<template>
    <div class="container" style="padding: 10px 0 100px 0;">
      <div class="row">
        <div class="col-md-8">
            <div class="card px-4 py-2">
          <h3 class="mb-4">Order</h3>
            <div v-for="item in cartItems" :key="item.id" class="cart-item mb-4 pb-3 me-3">
                <img :src="item.image" alt="Product Image" class="cart-item-image" />
                <div class=" d-flex align-items-center w-100">
                <div class="product-info d-flex  justify-content-between flex-grow-1 ms-3">
                    <div>
                  <h6 class="product-name">{{ item.name }}</h6>
                  <p class="text-muted mb-1" style="font-size: 16px;">8 / M</p>
                  <p class="mb-1" style="font-size: 16px;">{{ formatRupiah(item.price) }}</p>
                </div>
                  <p>{{  item.qty }} x</p>
                </div>
            </div>
        </div>
            </div>
            <div class="card mt-4 px-4 py-2" >
          <h3 class="mb-4" style="color: grey;">Adress</h3>
            <div class="cart-item mb-4 pb-3 me-3">
                <div class=" d-flex align-items-center w-100" style="border: 1px solid lightgray; border-radius: 5px; padding: 10px;">
                    <div style="background-color: #ffdbdb; border-radius: 50%; padding: 10px 13px">
                        <i class="fa-solid fa-location-dot fa-lg" style="color: #ff82cd;"></i>
                    </div>
                <div class="product-info flex-grow-1 ms-3">
                  <h6 class="product-name">PT. Bungo Stray Dogs</h6>
                  <p class="text-muted mb-1" style="font-size: 16px;">Jl. Asagiri XX No. 99, Yokohama, Jepang 99999 </p>
                </div>
            </div>
            </div>
        </div>
        <div class="card mt-4 px-4 py-2" >
          <h3 class="mb-4" style="color: grey;">Delivery details</h3>
            <div class="cart-item mb-4 pb-3 me-3">
                <div class=" d-flex align-items-center w-100" style="border: 1px solid lightgray; border-radius: 5px; padding: 10px;">
                    <div style="background-color: #ffdbdb; border-radius: 50%; padding: 13px">
                        <i class="fa-solid fa-truck fa-lg" style="color: #ff82cd;"></i>
                    </div>
                <div class="product-info flex-grow-1 ms-3">
                  <h6 class="product-name">Fedex Express Shipping</h6>
                  <p class="text-muted mb-2" style="font-size: 16px;">Rp20.000</p>
                  <div class="d-flex">
                  <i class="fa-regular fa-sm fa-clock me-2" style="margin-top: 10px; color: grey;"></i>
                  <p class="text-muted m-0" style="font-size: 14px;">Home delivery in 1-3 working days</p>
                </div>
                </div>
            </div>
            </div>
        </div>
        <div class="card mt-4 px-4 py-2" >
          <h3 class="mb-4" style="color: grey;">Payment Method</h3>
            <div class="cart-item mb-4 pb-3 me-3">
                <div class=" d-flex align-items-center w-100" style="border: 1px solid lightgray; border-radius: 5px; padding: 10px;">
                    <div style="border-radius: 50%; padding: 13px 13px">
                        <i class="fa-brands fa-cc-visa fa-2x"></i>
                    </div>
                <div class="product-info flex-grow-1">
                  <h6 class="product-name">09087654356789</h6>
                  <p class="text-muted mb-2" style="font-size: 16px;">32/13   999</p>
                  <div class="d-flex">
                  <i class="fa-regular fa-sm fa-credit-card me-2" style="margin-top: 10px; color: grey;"></i>
                  <p class="text-muted m-0" style="font-size: 14px;">Nakahara Chuuya</p>
                </div>
                </div>
            </div>
            </div>
        </div>
          </div>  
          
        <div class="col-md-4 order-summary">
          <div class="card" style="width: 100%;">
            <div class="card-body">
              <div class="mb-3">
                  <p class="card-title mb-3" style="color: grey; font-size: 16px">Order Summary</p>
                  <div class="d-flex justify-content-between">
                    <div>
                        <p style="color: grey; font-size: 18px;">Order</p>
                        <p style="color: grey; font-size: 18px;">Protection fee</p>
                        <p style="color: grey; font-size: 18px;">Shipping</p>
                    </div>
                    <div>
                  <p style="color: grey; font-size: 18px;">{{ formatRupiah(cartTotal) }}</p>
                  <p style="color: grey; font-size: 18px;">Rp 20.000,00</p>
                  <p style="color: grey; font-size: 18px;">{{ formatRupiah(shippingTotal) }}</p>
                </div>
                  </div>
                  <hr>
                  <div class="d-flex justify-content-between">
                    <h5>Total to pay</h5>
                    <h5>{{ formatRupiah(cartTotal + shippingTotal + 20000) }}</h5>
                  </div>
              </div>
              <button class="btn-softpink p-2 w-100" @click="showModal = true">Order Now</button>
            </div>
          </div>
        </div>

            </div>
      </div>

      <div v-if="showModal" class="modal-overlay">
    <div class="modal-content">
      <div class="modal-body text-center">
        <img src="https://i.pinimg.com/736x/84/61/49/846149b6ecaeebf940174a94d179f6be.jpg" alt="Transaction Icon" class="transaction-icon">
        <h4>Order #ORD-89123-823 placed successfully</h4>
        <p>Thank you for doing online shopping at Bloom. You can track and see your order on the transaction history menu.</p>
      </div>
      <div class="modal-footer ">
        <button @click="continueShopping" class="btn-white w-100 py-2">Continue shopping</button>
        <button @click="orderNow" class="btn-softpink w-100 py-2">Go to History Transaction</button>
      </div>
    </div>
  </div>

  </template>
  
  <script setup>
  import { computed, ref } from 'vue';
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  
  const store = useStore();
  const router = useRouter();
  const showModal = ref(false);
  const itemCount = computed(() => store.getters['cart/itemCount']);
  
  const cartItems = computed(() => store.getters['cart/cartItems']);
  const cartTotal = computed(() => store.getters['cart/cartTotal']);
  const shippingTotal = computed(() => store.getters['cart/shippingTotal']);
  
  function formatRupiah(price) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
}

const continueShopping = () => {
  const transaction = {
      id: Date.now(),
      date: new Date().toLocaleDateString('id-ID'),
      status: 'Done',
      orderNumber: `ORD-${Date.now()}`,
      items: cartItems.value,
      totalPrice: cartTotal.value,
    };
    store.dispatch('transaction/checkout', transaction);
  showModal.value = false;
};

  const orderNow = () => {
    const transaction = {
      id: Date.now(),
      date: new Date().toLocaleDateString('id-ID'),
      status: 'Done',
      orderNumber: `ORD-${Date.now()}`,
      items: cartItems.value,
      totalPrice: cartTotal.value,
    };
    store.dispatch('transaction/checkout', transaction);
    router.push('/user/transaction-history');
  };
  </script>
  
  <style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.cart-item {
    display: flex;
    align-items: center;
  }
  
  .cart-item-image {
    width: 100px;
    height: auto;
  }
.modal-content {
  background: white;
  width: 90%;
  max-width: 500px;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.transaction-icon {
  width: 150px;
  height: auto;
  margin-bottom: 20px;
}

.modal-body h4 {
  margin: 10px 0;
  font-size: 18px;
  font-weight: bold;
}

.modal-body p {
  color: #777;
  font-size: 14px;
  margin-bottom: 20px;
}

.modal-footer {
  display: flex;
  gap: 10px;
}

.btn-outline {
  flex: 1;
  padding: 10px;
  border: 1px solid #00bfa6;
  color: #00bfa6;
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  flex: 1;
  padding: 10px;
  background: #00bfa6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>