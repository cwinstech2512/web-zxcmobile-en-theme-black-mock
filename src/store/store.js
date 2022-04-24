import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    account: sessionStorage.getItem('account')
  },
  mutations: {
    // 将token保存到localStorage里
    SET_ACCOUNT: (state, data) => {
      state.account = data
      sessionStorage.setItem('account', data)
    }
  }
})
export default store
