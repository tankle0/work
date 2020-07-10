import Vuex from 'vuex'
import Vue from 'vue'
import user from './modules/user.js'
import order from './modules/order.js'
import getters from './getters.js'
Vue.use(Vuex)
const store = new Vuex.Store({  
    getters,
    modules: {  
        user,
        order
    }  
})  

export default store;