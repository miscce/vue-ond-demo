import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id: ''
  },
  mutations: {
    setid(state,payload){
      state.id = payload
      if(localStorage.getItem('id')){
        localStorage.removeItem('id')
      } 
      localStorage.setItem('id', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
