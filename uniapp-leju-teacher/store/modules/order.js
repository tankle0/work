const state = {
	tempOrder: {},
	tempOrderBack:{}
}
 
const mutations ={
	ADD_ORDER_TEMP(state,data){
		
		//临时变量 存储订单
		state.tempOrder = data;
	},
	ADD_ORDER_CART(state,data){
		state.tempOrder = data;
		
	},
	ADD_TEMP_ORDER_BACK(state,data){
		
		//临时变量 存储订单
		state.tempOrderBack = data;
	},
}

const actions = {
	
}

 

export default {
	namespaced: true,
	state,
	mutations,
	actions
}