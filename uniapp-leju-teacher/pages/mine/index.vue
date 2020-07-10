<template>
	<div class="mine-main">
		<div class="head">
			<div class="avatar-area">
				<image class="avatar" :src="userInfo.avatar" @tap="goUserCenter" mode=""></image>
				<div class="user-info">
					<template v-if="userInfo.username">
						<view class="nickname">{{userInfo.nickname}}</view>
						<view class="username">用户名: {{userInfo.username}}</view>
					</template>
					<template v-else>
						<div>Hi~</div>
						<div>您还没有登陆呢</div>
					</template>

				</div>
			</div>
			<!-- <image class="icon-setting" src="../../static/icons/setting.png" mode="" @tap="goSetting"></image> -->
		</div>
		<div class="btns" v-if="!userInfo.username">
			<navigator url="login/register" class="btn btn-reg">注册</navigator>
			<navigator url="login/login" class="btn btn-login">登陆</navigator>
		</div>
		<!-- 我的订单 -->
		<view class="my-orders">
			<div class="title">
				我的订单
			</div>
			<div class="navs">
				<!-- 订单状态  1 已付款 ;  2 已发货; 3: 已收货;   9 申请退款 -->
				<navigator class="nav-item" url="./order/index?type=0">
					<image class="icon" src="../../static/icons/icon-pay.png"></image>
					<div class="text">待付款</div>
				</navigator>
				<navigator class="nav-item" url="./order/index?type=1">
					<image class="icon" src="../../static/icons/pay-done.png"></image>
					<div class="text">已付款</div>
				</navigator>
				<navigator class="nav-item" url="./order/index?type=2">
					<image class="icon" src="../../static/icons/icon-car.png"></image>
					<div class="text">待收货</div>
				</navigator>
				<navigator class="nav-item" url="./order/index?type=3">
					<image class="icon" src="../../static/icons/icon-done.png"></image>
					<div class="text">已收货</div>
				</navigator>
				<navigator class="nav-item" url="./order/index?type=9">
					<image class="icon" src="../../static/icons/icon-back.png"></image>
					<div class="text">售后</div>
				</navigator>
			</div>
		</view>
		<view class="grid-block">
			<uni-grid :column="3" :show-border="false">
				<uni-grid-item v-for="item in gridList" :key="item.text">
					<view @tap="navigateTo(item.url,item.text)">
						<image :src="item.img" mode=""></image>
						<text class="text">
							{{item.text}}
						</text>
					</view>
				</uni-grid-item>
			</uni-grid>

		</view>
	</div>
</template>

<script>
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
	import {
		checkLogin
	} from '@/utils/common.js';
	export default {
		components: {
			uniGrid,
			uniGridItem
		},

		name: 'Mine',
		data() {
			return {
				user: {
					avatar: ''
				},
				gridList: [{
						url: '/pages/other/goodsColl/index',
						img: '../../static/icons/save.png',
						text: '收藏'
					},
					{
						url: '',
						img: '../../static/icons/brand.png',
						text: '品牌'
					},
					{
						url: '',
						img: '../../static/icons/article.png',
						text: '文章'
					},
					{
						url: './address/index',
						img: '../../static/icons/address.png',
						text: '地址'
					},
					{
						url: '',
						img: '../../static/icons/card.png',
						text: '卡包'
					},
					{
						url: '/pages/buyCart/index',
						img: '/static/icons/cart2.png',
						text: '购物车'
					},
					{
						url: '',
						img: '../../static/icons/kf.png',
						text: '客服'
					}
				]
			}
		},
		onShow() {
			//检测登陆 自动处理登陆逻辑
			// 如果未登录 直接提示登陆  如果登陆 在回调里处理接下来的逻辑
			checkLogin(() => {
				// 可以获取一些 登陆成功后必须展示的内容 
				console.log('sorry...')
			});
		},
		computed: {
			userInfo() {
				// vuex  this.$store.state.user.userInfo
				return this.$store.getters.user;
			}
		},
		methods: {
			goSetting() {
				
			},
			navigateTo(url,text){
				if(url){
					uni.navigateTo({
						url
					})
				}else{
					uni.showToast({
						image:'/static/icons/sorry.png',
						title: text+'功能暂未开通 !'
					})
				}
				 
			},
			goUserCenter(){
				uni.navigateTo({
					url:'userCenter/index'
				})
			}
		}

	}
</script>

<style lang="scss" scoped>
	.mine-main {
		box-sizing: border-box;
		padding: 0 40rpx;

		.head {
			display: flex;
			justify-content: space-between;
			width: 100%;
			height: 150rpx;
			margin-top: 60rpx;

			.avatar-area {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				height: 150rpx;
				.avatar {
					width: 150rpx;
					height: 150rpx;
					border-radius: 50%;
					background-color: #C8C7CC;
				}

				.user-info {
					display: flex;
					margin-left: 32rpx;
					height: 150rpx;
					color: #3D4C46;
					font-size: 28rpx;
					flex-direction: column;
					justify-content: space-around;
					box-sizing: border-box;
					padding: 14rpx 0;
					.nickname{
						font-size: 40rpx;
						font-weight: 600;
					}
					.username{
						font-size: 26rpx;
						color: #999;
					}
				}
			}

			.icon-setting {
				width: 50rpx;
				height: 50rpx;
			}
		}

		.btns {
			margin: 40rpx auto;
			display: flex;
			justify-content: center;
			align-items: center;

			.btn {
				width: 182rpx;
				height: 76rpx;
				box-sizing: border-box;
				border: 1px solid #354E44;
				color: #354E44;
				font-size: 30rpx;
				text-align: center;
				line-height: 76rpx;
				border-radius: 10rpx;
				margin: 0 30rpx;

				&.btn-login {
					background-color: #354E44;
					color: #fff;
				}
			}
		}

		.my-orders {
			width: 670rpx;
			height: 208rpx;
			border-radius: 4rpx;
			background-color: #fff;
			margin-top: 60rpx;

			.title {
				height: 76rpx;
				font-size: 26rpx;
				line-height: 76rpx;
				border-bottom: 1px solid #ddd;
				box-sizing: border-box;
				margin: 0 54rpx;
			}

			.navs {
				padding: 0 54rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				align-items: center;
				text-align: center;

				.icon {
					width: 40rpx;
					height: 40rpx;
					margin-top: 20rpx;
				}

				.text {
					font-size: 26rpx;
					line-height: 37rpx;
					text-align: center;
				}
			}
		}

		.grid-block {
			width: 670rpx;
			margin-top: 60rpx;
			background-color: #fff;
			border-radius: 20rpx;
			text-align: center;
			padding-top: 20rpx;

			.uni-grid-item {
				image {
					display: block;
					width: 50rpx;
					height: 50rpx;
					margin: 30rpx auto;
				}

				text {
					font-size: 26rpx;
					line-height: 38rpx;
				}

			}
		}
	}
</style>
