// store/modules/transaction.js
export default {
  namespaced: true,
  state() {
    return {
      transactions:  JSON.parse(localStorage.getItem('transactions')) || [],
    };
  },
  mutations: {

    addTransaction(state, payload) {
      state.transactions.push(payload);
    },
  },
  actions: {
    checkout({ commit }, transaction) {
      commit('addTransaction', transaction);
    },
  },
  getters: {
    getTransactions(state) {
      return state.transactions;
    },
  },
};
