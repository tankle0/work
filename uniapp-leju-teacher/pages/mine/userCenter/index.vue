<template>
	<view class="user-center">
		<view class="item">
			<text class="label">头像</text>
			<image class="avatar" :src="userInfo.avatar" mode=""></image>
		</view>
		<view class="item">
			<text class="label">用户名</text>
			<text class="text">{{userInfo.username}}</text>
		</view>
		<view class="item">
			<text class="label">昵称</text>
			<text class="text">{{userInfo.nickname}}</text>
		</view>
		<view class="item">
			<text class="label">手机号</text>
			<text class="text">{{userInfo.tel}}</text>
		</view>
		<button class="btn-logout" type="default" @tap="doLogout">退出登陆</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		computed:{
			userInfo(){
				return this.$store.getters.user;
			}
		},
		methods: {
			doLogout(){
				this.$store.commit('user/REMOVE_USER_INFO');
				uni.switchTab({
					url:'/pages/mine/index'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.user-center{
		.item{
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 32rpx;
			line-height: 94rpx;
			box-sizing: border-box;
			padding: 10rpx 30rpx;
			border-bottom: 1px solid #E5E5E5;
			&:nth-child(1){
				margin-top: 20rpx;
			}
			.avatar{
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
			}
			.label{
				color: #494949;
			}
			.text{
				color: #A1A1A1;
			}
		}
		.btn-logout{
			position: fixed;
			left: 50%;
			bottom: 20%;
			margin-left: -185rpx;
			width: 370rpx;
			height: 88rpx;
			font-size: 32rpx;
			color: #fff;
			text-align: center;
			line-height: 88rpx;
			background: #1C4B47;
			border-radius: 8px;
		}
	}
</style>
