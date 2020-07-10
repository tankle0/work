<template>
	<view class="collect">
		<view class="collect-c">
			<view class="main" v-for="item in collectGood" :key="item.id">
				<image src="" mode="widthFix"></image>
				<view class="detail">
					<view class="title">{{}}</view>
					<view>{{}}</view>
					<view>{{}}</view>
					<view class="num">
						<text>收藏：{{}}</text>
						<text>¥ {{8980}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				collectGood:[]
			};
		},
		onLoad(){
			this.collectGood = uni.getStorageSync("collectGood")
		}
	}
</script>

<style lang="scss" scoped>
body,html,uni-page-body {
	height: 100%!important;
	background-color: #F1ECE7;
}
.collect{
	width: 100%;
	overflow: scroll;	
	height: 100%;
	.collect-c{
		width: calc(100% - 80rpx);
		margin: 0 auto;
		height: 100%;
		.main{
			width: calc(100% - 108rpx);
			padding: 34rpx 54rpx;
			height: 208rpx;
			background: #FFFFFF;
			box-shadow: 0 8rpx 16rpx 0 rgba(83,66,49,0.08);
			border-radius: 24rpx;
			margin: 40rpx auto;
			display: flex;
			align-items: center;
			// justify-content: space-between;
			image{
				width: 140rpx;
				height: 140rpx;
				margin-right: 66rpx;
			}
			.detail{
				font-size: 22rpx;
				color: #8D8D8D;
				.title{
					font-size: 26rpx;
					color: #3E3E3E;
					letter-spacing: 1.86rpx;
				}
				.num{
					font-size: 24rpx;
					color: #3E3E3E;
					letter-spacing: 1.71rpx;
					margin-top: 12rpx;
					text:last-child{
						font-size: 28rpx;
						color: #3E3E3E;
						letter-spacing: 2rpx;
						margin-left: 140rpx;
					}
				}
			}
		}
	}
}
</style>
