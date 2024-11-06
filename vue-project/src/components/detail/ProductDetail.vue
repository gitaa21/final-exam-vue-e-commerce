<template>
    <div class="container">
           <h4>Detail Product</h4>
           <div class="detail-product d-flex justify-content-between">
               <div class="col-7" style="overflow: hidden; width: 650px; height: 600px;">
                    <img :src="productDetail.image" :alt="productDetail.name" style="width: 650px; height: auto; overflow: hidden;">
               </div>
               <div class="col-5">
                   <div class="card ms-5" style="text-align: left; line-height:1;">
                       <div class="detail-content card-body ms-3 me-3">
                       <h4 class="card-title">{{ formatRupiah(productDetail.price) }}</h4>
                       <h6 class="card-subtitle mb-2 text-body">{{ productDetail.name }}</h6>
                       <p class="card-subtitle mb-2 text-body">
                           <span>8 /  {{ productDetail.size }}</span>
                           <span class="mx-2">•</span>
                           <span>Very Good</span>
                           <span class="mx-2">•</span>
                           <span>Badung</span>
                       </p>
                       <hr>
                       <p class="card-text">Item Description</p>
                       <p class="card-text mb-4 fs-6">{{ productDetail.description }}</p>
                       <div class="container">
                           <div class="row">
                               <div class="col-6" style="padding-left: 0;">
                                   <p><b>Category</b></p>
                                   <p><b>Size</b></p>
                                   <p><b>Condition</b></p>
                                   <p><b>Color</b></p>
                                   <p><b>Uploaded</b></p>
                                   <p><b>Shipping</b></p>
                               </div>
                               <div class="col-6">
                                   <p>{{ productDetail.category }}</p>
                                   <p>8 /  {{ productDetail.size }}</p>
                                   <p>Very Good</p>
                                   <p>White</p>
                                   <p>5 hours ago</p>
                                   <p>{{ formatRupiah(productDetail.price) }}</p>
                               </div>
                           </div>
                       </div>
                       <hr>

                       <div class="d-grid gap-2">
                           <button class="btn-softpink py-2" type="button">Buy Now</button>
                           <button class="btn-white py-2" type="button"  @click="showModal = true" >Add to Cart</button>
                       </div>
                       <hr>
                       <div class="d-flex py-3 mt-3" style="border: 1px solid f0f0f0; border-radius: 5px;">
                            <img class="circular-image me-2 ms-3" src="../../assets/images/product10.jpeg" alt="" style="width: 70px; height: 70px; border-radius: 50%; object-fit: cover;;">
                            <div>
                                <h6 class="mb-1 mt-2">Dazai Osamu</h6>
                                <div>
                                <i class="fa-regular fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                                <span class="ms-2" style="color: grey;">(110)</span>
                            </div>
                            </div>
                        </div>
                   </div>
                   <i class="fa-regular fa-heart position-absolute top-0 end-0 m-3"></i>
               </div>
           </div>
       </div>
   </div>


   <!-- Modal -->
   <div v-if="showModal" class="modal-overlay">
      <div class="modal-content py-4 px-5 ">
        <div class="text-center">
          <img src="https://i.pinimg.com/564x/7b/2e/c5/7b2ec50516d312a8371151a29f8711b4.jpg" alt="" style="width: 150px;">
          <h4 class="mt-3">Product successfully added to cart</h4>
          <p>"{{ productDetail.name }}" successfully added to cart. Check now on the cart or continue shopping.</p>
        </div>

        <div class="justify-content-center mt-4">
          <button @click="continueShopping" class="btn-white p-2 me-2 mb-2">Continue shopping</button>
          <button @click="addToCart" class="btn-softpink p-2">Go to cart</button>
        </div>
      </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';


const store =  useStore()
const route = useRoute()
const router = useRouter()

const showModal = ref(false);

async function continueShopping() {
    await store.dispatch("cart/addToCart", productDetail.value);
    showModal.value = false;
}

const productDetail = computed(() => {
    return store.state.product.productDetail
})

function formatRupiah(price) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
}


async function addToCart() {
    await store.dispatch("cart/addToCart", productDetail.value);
    router.push('/cart');
}

onMounted (async () => {
    await store.dispatch(
        "product/getProductDetail", route.params.id,
        console.log("Product Detail after fetch:", productDetail.value)
    )
})

</script>


<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  text-align: center;
}

/* Transisi Modal */
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.modal-enter, .modal-leave-to /* alias for .modal-leave-active in older versions of Vue */ {
  opacity: 0;
  transform: scale(0.9);
}

.icon {
  color: #ff82cd; 
}

button {
  width: 100%;
}
</style>