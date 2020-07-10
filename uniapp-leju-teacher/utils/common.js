import store from '@/store/index.js'

export function isLogin(){
	var userInfo = store.state.user.userInfo;
	//存在两种情况  1. 压根没登陆  ;  2. 登陆成功存入vuex,但是页面刷新了,vuex丢失
	if(!userInfo.username){
		var userData = uni.getStorageSync('userData') ;
		console.log('vuex不存在 准备去storage获取...',userData);
		if(userData){
			// 说明是刷新把vuex刷没了  已经登陆
			store.commit('user/SET_USER_INFO',userData);
			return true;
		}else{
			return false;
		}
	}
	return true;
}

export function checkLogin(fn){
	if(isLogin()){
		fn();
	}else{
		uni.showModal({
			title: '未登录',
			content: '您未登录，需要登录后才能查看',
			success: (res) => {
				if (res.confirm) {
					uni.navigateTo({
						url: '/pages/mine/login/login'
					});
				}
			}
		});
	}
}