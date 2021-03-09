import Vue from 'vue'
import Vuex from 'vuex'
// import { mapState } from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user_id: 0,
    username:''
  },
  mutations: {
    loginSucc(state,payload){
      state.username=payload.username;
    },
  }
})

export default store
