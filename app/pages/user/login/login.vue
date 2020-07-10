<template>
	<view class="regist">
		<view class="regist-c">
			<view class="head">
				<image src="../../../static/icons/leju-logo.png" mode="widthFix"></image>
			</view>
			<view class="write">
				<view class="all">
					<view class="imgs mail">
						<image src="../../../static/icons/mail.png" mode="widthFix"></image>
					</view>
					<wInput
					class="ipt"
					    v-model="nickname"       
					    type="text"    
						maxlength="11"
					    placeholder="请输入手机号/邮箱" 
					></wInput>
				</view>
				<view class="all">
					<view class="imgs">
						<image src="../../../static/icons/password.png" mode="widthFix"></image>
					</view>
					<wInput
					class="ipt"
					    v-model="password"       
					    type="password"              
						isShowPass = true
					    placeholder="请输入密码" 
					></wInput>
				</view>
				<button @click="login" type="default">登录</button>
				<view class="mobile">
					<text>海外手机号登录</text>
					<text>忘记密码</text>
				</view>
			</view>
			
			<view class="botm">
				<navigator url="../regist/regist" class="now">立即注册</navigator>
				<view class="other">第三方软件登录</view>
				<view class="imgs">
					<view class="imgs-c">
						<image src="../../../static/icons/QQ.png" mode="widthFix"></image>
						<image src="../../../static/icons/bock.png" mode="widthFix"></image>
						<image src="../../../static/icons/wechat.png" mode="widthFix"></image>
					</view>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import wInput from '@/components/watch-login/watch-input.vue'
	import wButton from '@/components/watch-login/watch-button.vue' 
	import {doLogin} from "../../../utils/user/index.js"
	export default {
		data() {
			return {
				nickname:'',
				password:''
			};
		},
		components:{
			wInput,  //input
			wButton  //button
		},
		methods:{
			login(){
				var obj = {
					username:this.nickname,
					password:this.password
				}
				doLogin(obj)
				.then(res=>{
					console.log(res)
					if(res.data.code == "S"){
						uni.switchTab({
							url:"../user"
						})
						obj = {
							...res.data.data
						}
						uni.setStorageSync("user",obj)
					}
				})
			}
		}
	}
</script>
<style>
page{
	/*  #ifdef  MP-WEIXIN */
	height: 100%;
	background-color: #F1ECE7;
	/*  #endif  */
}
</style>
<style lang="scss" scoped>
body,html,uni-page-body {
	height: 100%!important;
	background-color: #F1ECE7;
}
.regist{
	width: 100%;
	height: 100%;
	overflow: scroll;
	.regist-c{
		width: calc(100% - 200rpx);
		margin: 138rpx auto 0;
		.head{
			margin: 110rpx auto 186rpx;
			text-align: center;
			image{
				width: 212rpx;
				height: 212rpx;
				border-radius: 50%;
			}
		}
		.write{
			.all{
				position: relative;
				display: flex;
				align-items: center;
				border-radius: 14rpx;
				margin-bottom: 12rpx;
				.imgs{
					position: absolute;
					// background-color: #E3DFDA!important;
					width: 60rpx;
					line-height: 110rpx;
					text-align: center;
					image{
						width: 40rpx;
						height: 40rpx;
					}
				}
				.mail{
					image{
						width: 60rpx;
						height: 40rpx;
						margin-top: 40rpx;
					}
				}
				text{
					width: 150rpx;
					text-align: right;
				}
				.ipt{
					flex: 1;
					background-color: #E2DED9!important;
					border-radius: 0 14rpx 14rpx 0;
					font-size: 24rpx;
					height: 46rpx;
					/*  #ifdef  MP-WEIXIN */
					height: 150rpx;
					/*  #endif  */
					text-indent: 0.1rem;
					color: black!important;
				}
			}
			button{
				width: 100%;
				background: #354E44;
				border-radius: 14rpx;
				height: 94rpx;
				color: #FFFFFF;
				margin-bottom: 22rpx;
			}
			.mobile{
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 24rpx;
				color: #A5A5A5;
				letter-spacing: 1.71rpx;
				margin-bottom: 239rpx;
			}
		}
		.botm{
			width: 100%;
			margin-bottom: 194rpx;
			.now{
				width: 100%;
				text-align: center;
				font-size: 40rpx;
				color: #354E44;
				letter-spacing: 2.86rpx;
				margin-bottom: 28rpx;
			}
			.other{
				position: relative;
				width: 100%;
				text-align: center;
				font-size: 24rpx;
				color: #A5A5A5;
				letter-spacing: 1.71rpx;
				margin-bottom: 69rpx;
				&::before{
					content: "";
					display: inline-block;
					width: 126rpx;
					height: 2rpx;
					position: absolute;
					top: 16rpx;
					left: 0rpx;
					background-color: #DDDDDD;
				}
				&::after{
					content: "";
					display: inline-block;
					width: 126rpx;
					height: 2rpx;
					position: absolute;
					top: 16rpx;
					right: 0rpx;
					background-color: #DDDDDD;
				}
			}
			.imgs{
				width: 100%;
				display: flex;
				justify-content: center;
				.imgs-c{
					image{
						width: 64rpx;
						height: 64rpx;
						margin: 0 26rpx;
					}
				}
				
				
			}
		}
	}
}
</style>
