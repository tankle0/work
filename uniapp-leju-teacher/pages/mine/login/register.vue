<template>
	<view class="register">
	
		<view class="content">
			<!-- 头部logo -->
			<view class="header">

				<image :src="avatar" @tap="seleAvatar"></image>

			</view>
			<!-- 主体 -->
			<view class="main">
				
				<wInput
		 				v-model="tel"
						type="text"
						maxlength="11"
						placeholder="手机号"
					></wInput>
					<wInput
						v-model="password"
						type="password"
						maxlength="11"
						placeholder="登录密码"
						isShowPass
					></wInput>
					<wInput
							v-model="username"
							type="text"
							maxlength="11"
							placeholder="用户名"
						></wInput>
					<wInput
							v-model="nickname"
							type="text"
							maxlength="11"
							placeholder="昵称"
						></wInput>
					<wInput
						v-model="verCode"
						type="number"
						maxlength="4"
						placeholder="验证码"
						
						isShowCode
						ref="runCode"
						@setCode="getVerCode()"
					></wInput>
					 
				</view>
				
				<wButton 
					text="注 册"
					:rotate="isRotate" 
					bgColor="#354E44"
					@click.native="startReg()"
				></wButton>
			
			<!-- 底部信息 -->
			<view class="footer">
				<text 
					@tap="isShowAgree" 
					class="cuIcon"
					:class="showAgree?'cuIcon-radiobox':'cuIcon-round'"
				>同意</text>
				<!-- 协议地址 -->
				<navigator url="" open-type="navigate">《协议》</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	var _this;
	import wInput from '@/components/watch-login/watch-input.vue' //input
	import wButton from '@/components/watch-login/watch-button.vue' //button
	import setting from'@/setting.js'
	import userApi from '@/api/user/index.js'
	export default {
		data() {
			return {
				//logo图片 base64
				avatar: '/static/icons/leju-logo.png',
				tel:'', // 用户/电话
				password:'', //密码
				verCode:'', //验证码
				nickname: '', // 昵称
				showAgree:true, //协议是否选择
				isRotate: false, //是否加载旋转
			}
		},
		components:{
			wInput,
			wButton,
		},
		mounted() {
			_this= this;
		},
		methods: {
			isShowAgree(){
				//是否选择协议
				_this.showAgree = !_this.showAgree;
			},
			getVerCode(){
				//获取验证码
				if (_this.tel.length != 11) {
				     uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '手机号不正确'
				    });
				    return false;
				}
				 
				this.$refs.runCode.$emit('runCode'); //触发倒计时（一般用于请求成功验证码后调用）
				uni.showToast({
				    icon: 'none',
					position: 'bottom',
				    title: '模拟倒计时触发'
				});
				
				setTimeout(function(){
					_this.$refs.runCode.$emit('runCode',0); //假装模拟下需要 终止倒计时
					uni.showToast({
					    icon: 'none',
						position: 'bottom',
					    title: '模拟倒计时终止'
					});
				},3000)
			},
		    startReg() {
				//注册
				if(this.isRotate){
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (this.showAgree == false) {
				    uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '请先同意《协议》'
				    });
				    return false;
				}
				if (this.tel.length !=11) {
				    uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '手机号不正确'
				    });
				    return false;
				}
				if (this.username.length < 2) {
				    uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '用户名长度2~12'
				    });
				    return false;
				}
		        if (this.password.length < 6) {
		            uni.showToast({
		                icon: 'none',
						position: 'bottom',
		                title: '密码不正确'
		            });
		            return false;
		        }
				if (this.verCode.length != 4) {
				    uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '验证码不正确'
				    });
				    return false;
				}
				
				_this.isRotate=true
				
				userApi.register({
					tel: this.tel,
					password: this.password,
					nickname: this.nickname,
					avatar: this.avatar,
					username: this.username
				}).then(res=>{
					
					 if(res.code = 'S'){
						 uni.showToast({
						 	title: '注册成功!'
						 })
						 uni.redirectTo({
						 	url:'./login'
						 })
					 }else{
						 uni.showToast({
						 	title: res.msg
						 })
					 }
					 _this.isRotate=false
				}).catch(err=>{
					console.log(err);
				})
				 
		    }
			,seleAvatar(){
				var that = this;
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: function (res) {
						uni.uploadFile({
						            url: `${setting.host}/api/leju/admin/material/uploadImg`, //仅为示例，非真实的接口地址
						            filePath: res.tempFilePaths[0],
						            name: 'file',
									fileType: 'image/video/audio',
						            success: (uploadFileRes) => {
						                var res2 = JSON.parse(uploadFileRes.data);
										that.avatar = res2.ossUrl;
						            }
						        });
				    }
				});
			}
		}
	}
</script>

<style>
	@import url("../../../components/watch-login/css/icon.css");
	@import url("./css/main.css");
</style>