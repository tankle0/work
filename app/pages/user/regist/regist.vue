<template>
	<view class="regist">
		<view class="regist-c">
			<text>注册</text>
			<view class="iptBox">
				<wInput
				class="ipt"
				    v-model="username"       
				    type="text"              
				    maxlength="11"            
				    placeholder="请输入手机号/邮箱" 
				></wInput>
			</view>
			
			<view class="code">
				
				<wInput
				v-if="go"
				    v-model="verCode"        
				    type="number"            
				    placeholder="验证码"      
				    isShowCode               
				    codeText="获取验证码"     
				    setTime="60"             
				    ref="runCode"            
				    @setCode="getVerCode()"  
				></wInput>
				
				<wButton
				v-else
				class="btn"
				    text="获取短信验证码"                 
				    rotate="false"                
				    bgColor="#354E44"              
				    fontColor="#FFFFFF"             
				    @click.native="startRePass()"   
				></wButton>
				
				<navigator v-if="go" url="next/next">
					<button class="btn" type="default">继续</button>
				</navigator>
				
				
				<view class="detail">
					完成注册即代表你同意
					<text>用户协议</text>和
					<text>隐私政策</text>
				</view>
			</view>
			
			<navigator url="../login/login" class="toGo">已有账号  去登录   ▶</navigator>
			
			
		</view>
	</view>
</template>

<script>
	import wInput from '@/components/watch-login/watch-input.vue' 
	import wButton from '@/components/watch-login/watch-button.vue' 
	export default {
		data() {
			return {
				username:'',
				verCode: "",
				go:false
			};
		},
		 components:{
			wInput,  //input
			wButton  //button
		},
		methods:{
			startRePass(){
				this.go = !this.go
				setTimeout(()=>{
				this.$refs.runCode.$emit('runCode');
					
				},200)
			},
			getVerCode(){
				//触发倒计时（一般用于请求成功验证码后调用）
				 this.$refs.runCode.$emit('runCode');
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
	overflow: hidden;
	.regist-c{
		width: calc(100% - 216rpx);
		margin: 138rpx auto 0;
		// overflow: hidden;
		text{
			font-size: 60rpx;
			color: #354E44;
			letter-spacing: 4.29rpx;
			
		}
		.iptBox{
			margin: 78rpx 0 48rpx;
			// height: 78rpx;
			width: 100%;
			
			.ipt{
				/*  #ifdef  MP-WEIXIN */
				background-color: transparent;
				height: 110rpx;
				/*  #endif  */
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
