import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const store = new Vuex.Store({
    state: {
      count: 0 ,// this.$store.state.count
	  productList:[], //所有产品列表
	  payList:[]   //已付款列表
    },
    mutations: {
      // inc(state,val){ // this.$store.commit("inc",113)
      //   state.count += val ;
      // },
      // dec(state){
      //   state.count -- ;
      // }
	  push(state,val){
		  state.productList = val
	  },
	  pay(state,val){
		  state.payList = val
	  }
    },
    actions: {
    },
    modules: {
      // lists  //挂载到module上使用
    }
  })

export default store  // import  ass from "./store"