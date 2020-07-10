<template>
	<view class="login">
		<view class="content">
			<!-- 头部logo -->
			<view class="header">
				<image src="../../../static/icons/leju-logo.png"></image>
			</view>
			<!-- 主体表单 -->
			<view class="main">
				<wInput v-model="phoneData" type="text" maxlength="11" placeholder="用户名/电话"></wInput>
				<wInput v-model="passData" type="password" maxlength="11" placeholder="密码"></wInput>
			</view>
			<wButton bgColor="#354E44" text="登 录" :rotate="isRotate" @click.native="startLogin()"></wButton>

			<!-- 其他登录 -->
			<view class="other_login cuIcon">
				<view class="login_icon">
					<view class="cuIcon-weixin" @tap="login_weixin"></view>
				</view>
				<view class="login_icon">
					<view class="cuIcon-weibo" @tap="login_weibo"></view>
				</view>
				<view class="login_icon">
					<view class="cuIcon-github" @tap="login_github"></view>
				</view>
			</view>

			<!-- 底部信息 -->
			<view class="footer">
				<navigator url="forget" open-type="navigate">找回密码</navigator>
				<text>|</text>
				<navigator url="register" open-type="navigate">注册账号</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	var _this;
	import wInput from '@/components/watch-login/watch-input.vue' //input
	import wButton from '@/components/watch-login/watch-button.vue' //button
	import userApi from '@/api/user/index.js'
	export default {
		data() {
			return {
				//logo图片 base64
				logoImage: '',
				phoneData: 'dpq', //用户/电话
				passData: '123456', //密码
				isRotate: false, //是否加载旋转
				user: {}
			};
		},
		components: {
			wInput,
			wButton,
		},
		mounted() {
			_this = this;
			//this.isLogin();
		},
		methods: {
			isLogin() {
				//判断缓存中是否登录过，直接登录
				// try {
				// 	const value = uni.getStorageSync('setUserData');
				// 	if (value) {
				// 		//有登录信息
				// 		console.log("已登录用户：",value);
				// 		_this.$store.dispatch("setUserData",value); //存入状态
				// 		uni.reLaunch({
				// 			url: '../../../pages/index',
				// 		});
				// 	}
				// } catch (e) {
				// 	// error
				// }
			},
			async startLogin() {
				//登录
				if (this.isRotate) {
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (this.phoneData.length == "") {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '用户名不能为空'
					});
					return;
				}
				if (this.passData.length < 5) {
					uni.showToast({
						icon: 'none',
						position: 'bottom',
						title: '密码不正确'
					});
					return;
				}

				// console.log("登录成功")

				_this.isRotate = true
				setTimeout(function() {
					_this.isRotate = false
				}, 3000)
				uni.showLoading({
					title: '登录中'
				});
				//执行登陆
				var res = await userApi.doLogin({
					username: this.phoneData,
					password: this.passData
				});
					
				if (res.code == 'S') {
					uni.showToast({
						icon: 'success',
						position: 'bottom',
						title: '登录成功'
					});
					this.user = res.data;
					// 这里应该实现  获取用户默认地址 并存储到ls
					this.$store.commit('user/SET_USER_INFO', this.user);
					
					uni.reLaunch({
						url: '../index'
					})
				} else {
					uni.showToast({
						icon: 'error',
						position: 'bottom',
						title: '账号或密码错误!'
					});
				}
				uni.hideLoading();


			},
			login_weixin() {
				//微信登录
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '...'
				});
			},
			login_weibo() {
				//微博登录
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '...'
				});
			},
			login_github() {
				//github登录
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '...'
				});
			}
		}
	}
</script>

<style>
	@import url("../../../components/watch-login/css/icon.css");
	@import url("./css/main.css");
</style>
