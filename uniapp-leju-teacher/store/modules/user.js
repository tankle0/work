const state = {
	userInfo:{}
	
}
 
const mutations ={
	SET_USER_INFO(state,data){
		state.userInfo = data;
		console.log('that is ok',data);	
		try{
			uni.setStorageSync("userData",data);
		}catch(e){
			console.log(e)
		}
		
	},
	REMOVE_USER_INFO(state){
		state.userInfo = {};
		uni.removeStorageSync("userData");
	}
	
}

const actions = {
	
	
}

 

export default {
	namespaced: true,
	state,
	mutations,
	actions
}