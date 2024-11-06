import axios from "axios";

export default {
    namespaced: true,
    state() {
        return {
            products: [],
            productDetail: {},
            relatedProducts: [],
            searchResults: [],
        }
    },
    getters: {},
    mutations: {
        setProductData(state, payload) {
            state.products = payload
        },
        setProductDetail(state, payload) {
            state.productDetail = payload
        },
        setRelatedProduct(state, payload) {
            state.relatedProducts = payload
        },
        setNewProduct(state, payload) {
            state.products.push(payload);
        },
        setSearchResults(state, payload) {
            state.searchResults = payload; 
        }
    },
    actions: {
        async getProductData({ commit }) {
            try {
                const { data } = await axios.get(
                    "https://e-commerce-89ceb-default-rtdb.firebaseio.com/products.json"
                )
                const arr = []
                // console.log("yoo", arr)
                for (let key in data) {
                    arr.push({ id: key, ...data[key] })
                }
                commit("setProductData", arr)
            } catch (error) {
                console.log(error)
            }
        },

        async getProductDetail({ commit }, payload) {
            try {
                const { data } = await axios.get(
                    `https://e-commerce-89ceb-default-rtdb.firebaseio.com/products/${payload}.json`
                )
                commit("setProductDetail", data)
            } catch (error) {
                console.log(error)
            }
        },

        async getRelatedProduct({ commit, state }, categoryType) {
            try {
                const { data } = await axios.get("https://e-commerce-89ceb-default-rtdb.firebaseio.com/products.json");
                const arr = [];
                for (let key in data) {
                    if (data[key].category === categoryType && key !== state.productDetail.id) {
                        arr.push({ id: key, ...data[key] });
                    }
                }
                commit("setRelatedProduct", arr);
            } catch (error) {
                console.log(error);
            }
        },
        async addNewProduct({ commit, rootState }, payload) {
            // const uid = nanoid(10)
            const newData = {
                ...payload,
                // id: uid,
                username: rootState.auth.userLogin.username,
                createAt: Date.now(),
                likes: ["null"],
                userId: rootState.auth.userLogin.userId,
            };
            try {
                const { data } = await axios.post(
                    `https://e-commerce-89ceb-default-rtdb.firebaseio.com/products.json?auth=${rootState.auth.token}`, newData
                );

                commit("setNewProduct", { id: data.name, ...newData });
            } catch (err) {
                console.log(err)
            }
        },

        async deleteProduct({ dispatch, rootState }, payload) {
            try {
                await axios.delete(
                    `https://e-commerce-89ceb-default-rtdb.firebaseio.com/products/${payload}.json?auth=${rootState.auth.token}`
                );
                await dispatch("getProductData")
            } catch (err) {
                console.log(err)
            }
        },

        async updateProduct({ dispatch, rootState }, { id, newProduct }) {
            try {
                await axios.put(
                    `https://e-commerce-89ceb-default-rtdb.firebaseio.com/products/${id}.json?auth=${rootState.auth.token}`,
                    newProduct,
                );

                await dispatch("getProductData");
            } catch (err) {
                console.log(err)
            }
        },
        async searchProducts({ commit }, searchTerm) {
            try {
                const { data } = await axios.get("https://e-commerce-89ceb-default-rtdb.firebaseio.com/products.json");
                const arr = [];
                for (let key in data) {
                    if (data[key].name.toLowerCase().includes(searchTerm.toLowerCase())) {
                        arr.push({ id: key, ...data[key] });
                    }
                }
                commit("setSearchResults", arr);
            } catch (error) {
                console.log(error);
            }
        },
    }
}
