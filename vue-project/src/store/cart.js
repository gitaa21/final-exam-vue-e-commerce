import axios from "axios";

export default {
    namespaced: true,
    state() {
        return {
            cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
            totalPrice: 0,   
        };
    },
    getters: {
        cartItems(state) {
            return state.cartItems; 
        },
        cartTotal(state) {
            return state.cartItems.reduce((total, item) => total + (item.price * item.qty), 0);
        },
        shippingTotal(state) {
            return state.cartItems.reduce((total, item) => total + (item.shipping), 0);
        },
        itemCount(state) {
            return state.cartItems.reduce((count, item) => count + item.qty, 0);
        },
        listItemCount(state) {
            return state.cartItems.length;
        }
    },
    mutations: {
        addToCart(state, product) {
            const quantity = product.qty || 1;

            const itemIndex = state.cartItems.findIndex(item => item.id === product.id);
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].qty += quantity;
            } else {
                state.cartItems.push({ ...product, qty: quantity });
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        removeFromCart(state, productId) {
            state.cartItems = state.cartItems.filter(item => item.id !== productId);
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        updateQuantity(state, { productId, qty }) {
            const itemIndex = state.cartItems.findIndex(item => item.id === productId);
            if (itemIndex >= 0) {
                if (qty <= 0) {
                    state.cartItems.splice(itemIndex, 1);
                } else {
                    state.cartItems[itemIndex].qty = qty;
                }
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        clearCart(state) {
            state.cartItems = [];
            localStorage.removeItem('cartItems');
        }
    },
    actions: {
        addToCart({ commit }, product) {
            commit("addToCart", product); 
        },
        removeFromCart({ commit }, productId) {
            commit("removeFromCart", productId);
        },
        updateQuantity({ commit }, { productId, qty }) {
            commit("updateQuantity", { productId, qty }); 
        },
        clearCart({ commit }) {
            commit("clearCart"); 
        }
    },
};
