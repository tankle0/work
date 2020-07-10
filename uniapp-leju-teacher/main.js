import Vue from 'vue'
import App from './App'
import store from './store'  
import {moneyRound} from '@/filters/index.js'
// 注册全局过滤器 用于对分为单位的 值 进行 缩小100倍的处理
Vue.filter('money',moneyRound)

Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$store = store

const app = new Vue({
	store,
    ...App
})
app.$mount()


