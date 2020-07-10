<template>
	<view class="about">
		<view class="about-c">
			<view class="head">
				<image src="../../../static/icons/logo.png" mode="widthFix"></image>
				<view >造物1.1.01</view>
			</view>
			<navigator :url="item.url" class="main" v-for="item in aboutList" :key="item.id">
				<text>{{item.name}}</text>
				<image src="../../../static/icons/arr-r-1.png" mode="widthFix"></image>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				aboutList:[
					{
						name:"隐私声明",
						url:"#",
						id: Math.random()
					},
					{
						name:"官方网站",
						url:"#",
						id: Math.random()
					},
					{
						name:"版本更新",
						url:"#",
						id: Math.random()
					},
					{
						name:"分享app",
						url:"#",
						id: Math.random()
					}
				]
			};
		}
	}
</script>

<style lang="scss" scoped>
body,html,uni-page-body {
	height: 100%!important;
	background-color: #FFFFFF;
}
.about{
	width: 100%;
	height: 100%;
	.about-c{
		transform: translateY(-1rpx);
		.head{
			width: 100%;
			height: 380rpx;
			
			background: #354E44;
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
			text-align: center;
			image{
				width: 212rpx;
				height: 212rpx;
				border-radius: 50%;
				margin: 66rpx auto 22rpx;
			}
			view{
				width: 100%;
				font-size: 26rpx;
				color: #FFFFFF;
				letter-spacing: 1.86rpx;
				margin-bottom: 43rpx;
			}
		}
		.main{
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: calc(100% - 80rpx);
			padding: 0 40rpx;
			line-height: 120rpx;
			font-size: 32rpx;
			color: #3E3E3E;
			letter-spacing: 2.29rpx;
			border-bottom: 2rpx solid #EBEBEB;
			image{
				width: 21rpx;
				height: 34rpx;
			}
		}
	}
}
</style>
