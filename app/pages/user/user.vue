<template>
	<view class="user">
		<!--  #ifdef  MP-WEIXIN -->
			<view class="status_bar">
				 <!-- 这里是状态栏 -->
			</view>
		<!--  #endif -->
		<view class="user-c">
			<view class="head">
				<view class="head-c">
					<view class="left">
						<image :src="imgs" mode="widthFix"></image>
						<!-- 未登录 -->
						<view class="text" v-if="!islogin">
							<text>hi~</text>
							<view >你还没有登录呢</view>
						</view>
						<!-- 登录成功 -->
						<view class="text" v-else>
							<text class="nick">{{obj.nickname}}</text>
							<view >用户名：{{obj.username}}</view>
						</view>
					</view>
					<navigator url="safe/safe">
						<image src="../../static/icons/setting.png" mode="widthFix"></image>
					</navigator>
				</view>
				<view class="btn" v-if="!islogin">
					<navigator url="regist/regist">
						<button type="default" size="mini">注册</button>
					</navigator>
					<navigator url="login/login">
						<button class="login" type="default" size="mini">登录</button>
					</navigator>
				</view>
			</view>
			
			<!-- 我的订单 -->
			<view class="order">
				<navigator url="./orderList/orderList?count=0" class="top">
					<text>我的订单</text>
					<image src="../../static/icons/arr-r-1.png" mode="widthFix"></image>
				</navigator>
				<view class="orderList">
					<navigator :url="`${item.url}?count=${item.count}`"  v-for="item in iconList" :key="item.count" class="one">
						<image :src="item.img" ></image>
						<view >{{item.name}}</view>
					</navigator>
				</view>
			</view>
			
			<!-- 收藏列表 -->
			<view class="collect">
				<view class="collect-c">
					<navigator class="final" :url="item.url"  v-for="item in collectList" :key="item.img">
						<view class="center">
							<image :src="item.img" ></image>
							<view>{{item.name}}</view>
						</view>
						
					</navigator>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				iconList:[
					{
						name:"待付款",
						img:"../../static/icons/icon-pay.png",
						count:"1",
						url:"./orderList/orderList"
					},
					{
						name:"待收货",
						img:"../../static/icons/icon-car.png",
						count:"2",
						url:"./orderList/orderList"
					},
					{
						name:"已完成",
						img:"../../static/icons/icon-done.png",
						count:"3",
						url:"./orderList/orderList"
					},
					{
						name:"售后",
						img:"../../static/icons/icon-back.png",
						count:"4",
						url:"./orderList/orderList"
					},
					
				],
				collectList:[
					{
						name:"收藏",
						img:"../../static/icons/save.png",
						url:"./collect/collect"
					},
					{
						name:"品牌",
						img:"../../static/icons/brand.png",
						url:"./brand/brand"
					},
					{
						name:"文章",
						img:"../../static/icons/article.png",
						url:"./article/article"
					},
					{
						name:"地址",
						img:"../../static/icons/address.png",
						url:"../sort/address/address"
					},
					{
						name:"卡包",
						img:"../../static/icons/card.png",
						url:"./card/card"
					},
					{
						name:"客服",
						img:"../../static/icons/kf.png",
						url:"#"
					},
					{
						name:"安全",
						img:"../../static/icons/security.png",
						url:"#"
					},
					{
						name:"关于",
						img:"../../static/icons/about.png",
						url:"./about/about"
					},
				],
				islogin:false,
				imgs:"../../static/icons/head.png",
				obj:{}
			}
		},
		onShow(){
			var item = uni.getStorageSync("user")
			if(item){
				this.islogin = true
				this.obj = item
				this.imgs = item.avatar
			}else{
				uni.showModal({
					title: '未登录',
					content: '您未登录，需要登录后才能查看',
					success: (res) => {
						if (res.confirm) {
							uni.navigateTo({
								url: 'login/login'
							});
						}
					}
				});
			}
		},
		onLoad(){
			
		},
		methods: {
			
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
.status_bar {
  height: var(--status-bar-height);
  height: 100rpx;
  width: 100%;
  background-color: #F1ECE7;
}
.user{
	width: 100%;
	height: 100%;
	overflow: scroll;
	.user-c{
		width: calc(100% - 80rpx);
		padding: 0 40rpx;
		margin-bottom: 137rpx;
		.head{
			width: 100%;
			// margin-top: 30rpx;
			.head-c{
				overflow: hidden;
				margin: 60rpx auto 52rpx;
				.left{
					float: left;
					display: flex;
					align-items: center;
					image{
						width: 150rpx;
						height: 150rpx;
						border-radius: 50%;
						margin-right: 32rpx;
					}
					.text{
						font-size: 28rpx;
						color: #3D4C46;
						letter-spacing: 2rpx;
						.nick{
							    font-size: 40rpx;
							    font-weight: 600;
								margin-bottom: 10rpx;
						}
					}
				}
				image{
					width: 50rpx;
					height: 50rpx;
					float: right;
					// margin-bottom: -125rpx;
				}
			}
			.btn{
				width: 100%;
				text-align: center;
				margin-bottom: 52rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				button{
					border: 2rpx solid #3D4C46;
					border-radius: 10rpx;
					font-size: 30rpx;
					color: #3D4C46;
					letter-spacing: 2.14rpx;
				}
				.login{
					background-color:  #354E44;
					border-radius: 10rpx;
					color: #FFFFFF;
					margin-left: 60rpx;
				}
			}
			
		}
		.order{
			width: 100%;
			height: 208rpx;
			margin-bottom: 40rpx;
			display: flex;
			align-content: space-around;
			flex-wrap: wrap;
			background: #FFFFFF;
			box-shadow: 0 16rpx 24rpx 0 rgba(122,98,75,0.04);
			border-radius: 10rpx;
			.top{
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 564rpx;
				margin: 0 auto;
				margin: 0 58rpx 0 45rpx;
				line-height: 72rpx;
				font-size: 26rpx;
				color: #3E3E3E;
				border-bottom: 1px solid #DDDDDD;
				image{
					width: 20rpx;
					height: 30rpx;
				}
			}
			.orderList{
				width: 90%;
				margin: 0 auto;
				display: flex;
				justify-content: space-between;
				.one{
					width: 90rpx;
					display: flex;
					justify-content: center;
					flex-wrap: wrap;
					font-size: 26rpx;
					color: #3E3E3E;
					letter-spacing: 1.86rpx;
					image{
						width: 40rpx;
						height: 36rpx!important;
						margin-bottom: 14rpx;
					}
				}
			}
		}
		.collect{
			width: 100%;
			background: #FFFFFF;
			box-shadow: 0 16rpx 24rpx 0 rgba(122,98,75,0.04);
			border-radius: 10rpx;
			.collect-c{
				display: flex;
				justify-content: space-around;
				flex-wrap: wrap;
				height: 100%;
				.final{
					width: 30%;
					// height: 30%;
					padding: 50rpx 0;
					height: 110rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					flex-wrap: wrap;
					view{
						width: 100%;
						font-size: 26rpx;
						text-align: center;
						color: #3E3E3E;
						letter-spacing: 1.86rpx;
					}
					image{
						width: 50rpx;
						height: 50rpx;
						margin-bottom: 22rpx;
					}
					&:last-child{
						margin-right: auto;
						margin-left: 3%;
					}
					&:nth-child(7){
						margin-left: 2%;
					}
				}
			}
		}
	}
}
</style>
