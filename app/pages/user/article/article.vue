<template>
	<view class="art">
		<view class="art-c">
			<view class="main" v-for="item in articleList" :key="item.id">
				<image :src="item.coverImg" mode="widthFix"></image>
				<view class="top">
					<view >{{item.title}}</view>
					<text>{{item.collectCount}}人已收藏</text>
				</view>
				<!-- <view class="bot">{{}}</view> -->
				<view class="bot">
					<rich-text :nodes="item.content2"></rich-text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				articleList:[]
			};
		},
		onLoad(){
			this.articleList = uni.getStorageSync("collectArticle")
		}
	}
</script>

<style lang="scss" scoped>
body,html,uni-page-body {
	height: 100%!important;
	background-color: #F1ECE7;
}
.art{
	width: 100%;
	height: 100%;
	background-color: #F1ECE7;
	.art-c{
		width: calc(100% - 80rpx);
		padding: 40rpx 40rpx 0;
		height: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		background-color: #F1ECE7;
		overflow: scroll;
		.main{
			width: 316rpx;
			margin-bottom: 48rpx;
			background: #FFFFFF;
			box-shadow: 0 8rpx 16rpx 0 rgba(83,66,49,0.06);
			// overflow: hidden;
			border-radius: 10rpx;
			image{
				width: 316rpx;
				height: 238rpx!important;
				border-radius: 10rpx;
			}
			.top{
				margin: 28rpx auto 30rpx 36rpx;
				font-size: 22rpx;
				color: #8D8D8D;
				letter-spacing: 1.57rpx;
				view{
					font-size: 26rpx;
					color: #3E3E3E;
					letter-spacing: 1.86rpx;
					margin-bottom: 5rpx;
				}
			}
			.bot{
				color: #B1B1B1;
				font-size: 22rpx;
				margin: 0 auto 18rpx 36rpx;
				font-weight: none;
			}
		}
	}
}
</style>
