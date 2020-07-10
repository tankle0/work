<template>
	<view class="regist">
		<view class="regist-c">
			<view class="iptBox">
				<view class="all">
					<text>姓名：</text>
					<wInput
						class="ipt"
					    v-model="username"       
					    type="text"                       
					    placeholder="请输入姓名" 
					></wInput>
				</view>
				
				<view class="all">
					<text>昵称：</text>
					<wInput
					class="ipt"
					    v-model="nickname"       
					    type="text"    
						maxlength="11"
					    placeholder="请输入昵称" 
					></wInput>
				</view>
				<view class="all">
					<text>密码：</text>
					<wInput
					class="ipt"
					    v-model="password"       
					    type="password"              
						isShowPass = true
					    placeholder="请输入密码" 
					></wInput>
				</view>
				<view class="all">
					<text>手机号：</text>
					<wInput
					class="ipt"
					    v-model="tel"       
					    type="text"              
					    maxlength="11"            
					    placeholder="请输入手机号" 
					></wInput>
				</view>
				
				<view class="all">
					<text>邮箱：</text>
					<wInput
					class="ipt"
					    v-model="email"       
					    type="text"                      
					    placeholder="请输入邮箱" 
					></wInput>
				</view>
			</view>
			
			<view class="code">
				<button @click="push" class="btn" type="default">提交</button>
				
				<view class="detail">
					完成注册即代表你同意
					<text>用户协议</text>和
					<text>隐私政策</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import wInput from '@/components/watch-login/watch-input.vue'  
	import {regist} from "../../../../utils/user/index.js"
	export default {
		data() {
			return {
				username:'',
				nickname:'',
				password: "",
				tel:"",
				email:""
			};
		},
		 components:{
			wInput,  //input
		},
		methods:{
			push(){
				regist({
					
				})
				.then(res=>{
					
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
	background-color: #F1ECE7;
	.regist-c{
		width: calc(100% - 100rpx);
		margin: 138rpx auto 0;
		// overflow: hidden;
	
		.iptBox{
			margin: 78rpx 0 48rpx;
			// height: 78rpx;
			.all{
				display: flex;
				align-items: center;
				text{
					width: 150rpx;
					text-align: right;
				}
			}
			.ipt{
				flex: 1;
				background-color: #E3DFDA!important;
				border-radius: 14rpx;
				font-size: 24rpx;
				color: black!important;
			}
		}
		.code{
			width: 100%;
			.btn{
				width: 100%;
				background-color: #354E44;
				color: #FFFFFF;
				font-size: 30rpx;
				letter-spacing: 2.14rpx;
				margin-bottom: 22rpx;
			}
			.detail{
				font-size: 24rpx;
				color: #A5A5A5;
				letter-spacing: 1.71rpx;
				text{
					font-size: 24rpx;
					color: #170000;
					letter-spacing: 1.71rpx;
					line-height: 33rpx;
				}
			}
		}
		.toGo{
			width: 100%;
			text-align: center;
			margin-top: 215rpx;
			font-size: 32rpx;
			color: #354E44;
			letter-spacing: 2.29rpx;
		}
	}
}
</style>
