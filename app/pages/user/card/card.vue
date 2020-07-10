<template>
	<view class="card">
		<view class="card-c">
			<view class="main" v-for="item in cardList" :key="item.id">
				<image :src="item.img" mode="widthFix"></image>
				<view class="detail">
					<view class="top">{{item.name}}</view>
					<text>店铺优惠券</text>
					<view>{{item.time}}</view>
				</view>
				<view class="go">
					去使用
				</view>
				<text class="dot top"></text>
				<text class="dot bot"></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cardList:[
					{
						img:"",
						name:"¥50满500减",
						time:"2019.1.3-2019.5.11"
					},
					{
						img:"",
						name:"¥150满1000减",
						time:"2019.1.3-2019.5.11"
					},
					{
						img:"",
						name:"¥30满200减",
						time:"2019.1.3-2019.5.11"
					},
					{
						img:"",
						name:"¥10满150减",
						time:"2019.1.3-2019.5.11"
					},
				]
			};
		}
	}
</script>

<style lang="scss" scoped>
body,html,uni-page-body {
	height: 100%!important;
	background-color: #F1ECE7;
}
.card{
	width: 100%;
	height: 100%;
	overflow: hidden;
	.card-c{
		margin-top: 40rpx;
		.main{
			position: relative;
			width: 672rpx;
			height: 208rpx;
			margin: 0 auto 40rpx;
			background: #FFFFFF;
			box-shadow: 0 8rpx 16rpx 0 rgba(83,66,49,0.08);
			border-radius: 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			image{
				width: 136rpx;
				height: 136rpx;
				margin: 0 46rpx 0 56rpx;
				background-color: orange;
				border-radius: 10rpx;
			}
			.detail{
				font-size: 20rpx;
				color: #8D8D8D;
				letter-spacing: 1.43rpx;
				.top{
					font-size: 32rpx;
					color: #000000;
					letter-spacing: 1.71rpx;
					line-height: 37rpx;
				}
			}
			.go{
				width: 156rpx;
				text-align: center;
				line-height: 208rpx;
				border-left: 2rpx dashed #979797;
			}
			.dot{
				position: absolute;
				width: 60rpx;
				height: 60rpx;
				border-radius: 50%;
				background-color: #F1ECE7;
			}
			.top{
				right: 130rpx;
				top: -30rpx;
			}
			.bot{
				bottom: -30rpx;
				right: 130rpx;
			}
		}
	}
}
</style>
