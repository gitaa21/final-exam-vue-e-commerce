<template>
    <li class="list-group-item">
      <form @submit.prevent="addNewProduct">
        <div>
          <p class="my-3 fs-5 fw-semibold">General Information</p>
          <div>
            <div class="mb-3">
              <base-input type="file" identity="productImage" label="Product Image" @input="checkImage"></base-input>
              <div>
                <img :src="productData.image" :alt="productData.name" class="image">
              </div>
            </div>
            <div class="mb-3">
              <base-input type="text" identity="productName" placeholder="Give your product a name" label="Product Name"
                v-model="productData.name"></base-input>
            </div>
            <div class="mb-3">
              <base-text-area identity="productDescription" label="Description"
                placeholder="Describe the product's features and style"
                v-model="productData.description"></base-text-area>
            </div>
            <div class="mb-3">
              <base-input type="text" identity="productBrand" placeholder="Brand" label="Brand"
                v-model="productData.brand"></base-input>
            </div>
            <div class="mb-3 mt-3"> 
              <h6>Category <span style="color: #cb3a31;">*</span></h6>
            <base-select class="mt-1 w-100" :data="['Dress', 'One Set', 'Cardigan']"
              v-model="productData.category"></base-select>
          </div>
            <div class="mb-3">
              <base-input type="text" identity="productColor" placeholder="Color" label="Color"
                v-model="productData.color"></base-input>
            </div>
            <div class="mb-3">
              <base-input type="number" identity="productPrice" placeholder="0" label="Price"
                v-model="productData.price"></base-input>
            </div>
            <div class="mb-3">
              <base-input type="number" identity="productShipping" placeholder="0" label="Shipping Cost"
                v-model="productData.shipping"></base-input>
            </div>
            <div class="mb-3">
              <base-input type="text" identity="productSize" placeholder="Size (e.g., S, M, L)" label="Size"
                v-model="productData.size"></base-input>
            </div>
          </div>
        </div>
       
        <div class="border-top py-3 d-flex my-4 justify-content-end">
          <base-button class="cancel-btn px-3 py-2 ms-1" @click="cancel">
            Cancel
          </base-button>
  
          <base-button class="submit-product-btn px-3 py-2 ms-1">
            {{ isEdit ? "Update" : "Add" }}
          </base-button>
        </div>
      </form>
    </li>
  </template>
  
  <script setup>
const props = defineProps({
  isEdit: { type: Boolean, default: false },
});

import BaseInput from '../ui/BaseInput.vue';
import BaseButton from '../ui/BaseButton.vue';
import BaseSelect from '../ui/BaseSelect.vue';
import BaseTextArea from '../ui/BaseTextArea.vue';
import { onMounted, reactive, ref, watchEffect } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import moment from 'moment';

const store = useStore();
const router = useRouter();
const route = useRoute();

onMounted(async () => {
  if (props.isEdit) {
    await store.dispatch("product/getProductDetail", route.params.id);
  }
});

const cancel = () => {
    router.push("/user/user-product");
};

const productData = reactive({
  image: "https://i.pinimg.com/564x/11/d6/32/11d632b2b57ee645b09235bd8f134835.jpg",
  name: "",
  description: "",
  brand: "",
  category: "Dress",
  color: "",
  price: 0,
  shipping: 0,
  size: "",
  createdAt: moment().format("YYYY-MM-DD"),
});

watchEffect(() => {
  if (props.isEdit) {
    const valueEditProduct = store.state.product.productDetail;

    if (valueEditProduct) {
      productData.image = valueEditProduct.image || "";
      productData.name = valueEditProduct.name || "";
      productData.description = valueEditProduct.description || "";
      productData.brand = valueEditProduct.brand || "";
      productData.category = valueEditProduct.category || "";
      productData.color = valueEditProduct.color || "";
      productData.price = valueEditProduct.price || 0;
      productData.shipping = valueEditProduct.shipping || 0;
      productData.size = valueEditProduct.size || "";
      productData.createdAt = moment(valueEditProduct.createdAt).format("YYYY-MM-DD") || moment().format("YYYY-MM-DD");
    }
  }
});

const checkImage = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.addEventListener("load", () => {
    productData.image = reader.result;
  });
};

const addNewProduct = async () => {
  try {
    if (props.isEdit) {
      await store.dispatch("product/updateProduct", {
        id: route.params.id,
        newProduct: productData,
      });
      router.push("/user/user-product");
      alert("Data updated successfully")
      return;
    }

    await store.dispatch("product/addNewProduct", {
      ...productData,
    });
    router.push("/user/user-product");
  } catch (error) {
    console.error({ error });
  }
};
</script>
