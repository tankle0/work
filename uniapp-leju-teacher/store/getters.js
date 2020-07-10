const getters = {
	user(state) {
		// 如果vuex存在  直接返回vuex
		if (state.user.userInfo.username) {
			return state.user.userInfo;
		} else {
			// 如果vuex不存在 
			// 1. 未登录
			// 2. 登陆了,但是刷新没了
			var userInfo = uni.getStorageSync('userData');
			if (!userInfo) {
				uni.showModal({
					title: '未登录',
					content: '您未登录，需要登录后才能查看',
					success: (res) => {
						if (res.confirm) {
							uni.navigateTo({
								url: '../mine/login/login'
							});
						}
					}
				});
				return {};
			} else {
				return userInfo;
			}
		}
	},
	userId(state,getters){
		var user = getters.user;
		console.log('fff',user)
		if(user) return user.id;
		return '';
	},
}

export default getters;