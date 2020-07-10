<template>
	<view class="brand">
		<view class="brand-c">
			<view class="main" v-for="item in brandList">
				<view class="imgs">
					<image @click="more" src="../../../static/icons/more.png" mode="widthFix"></image>
				</view>
				<view class="bott">
					<image :src="item.img" mode="widthFix"></image>
					<view class="detail">
						<view>{{item.title}}</view>
						<text>粉丝：{{item.num}}</text>
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
				brandList:[
					{
						img: "",
						title: "Hartford 系列",
						num: 91893,
						id:Math.random()
					},
					{
						img: "",
						title: "迪欧 极简系列",
						num: 18293,
						id:Math.random()
					},
					{
						img: "",
						title: "KUOKUYO品牌家具",
						num: 271890,
						id:Math.random()
					},
				]
			};
		},
		methods:{
			more(){
				
			}
		}
	}
</script>

<style lang="scss" scoped>
body,html,uni-page-body {
	height: 100%!important;
	background-color: #F1ECE7;
}
.brand{
	width: 100%;
	height: 100%;
	overflow: hidden;
	.brand-c{
		width: 100%;
		margin-top: 40rpx;
		.main{
			width: 672rpx;
			height: 208rpx;
			margin: 0 auto 40rpx;
			// padding: 14rpx auto 54rpx 54rpx;
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			background: #FFFFFF;
			box-shadow: 0 8rpx 16rpx 0 rgba(83,66,49,0.08);
			border-radius: 24rpx;
			.imgs{
				width: 100%;
				display: flex;
				flex-direction: row-reverse;
				image{
					width: 40rpx;
					height: 30rpx!important;
					margin-right: 36rpx;
				}
			}
			
			.bott{
				display: flex;
				align-items: center;
				margin-bottom: 34rpx;
				image{
					width: 140rpx;
					height: 140rpx;
					margin: 0 66rpx 0 54rpx;
					background-color: orange;
				}
				.detail{
					font-size: 24rpx;
					color: #3E3E3E;
					letter-spacing: 1.71rpx;
					view{
						font-size: 32rpx;
						color: #3E3E3E;
						letter-spacing: 2.29rpx;
						margin-bottom: 15rpx;
					}
				}
			}
			
		}
	}
}
</style>
