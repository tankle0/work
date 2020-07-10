<template>
	<div class="brand-main">
		<div v-for="item in brandList" :key="item.id" class="brand-block">
			<image :src="item.coverImg" mode=""></image>
			<div class="title">{{item.cname}}</div>
			<div class="descr">{{item.descr}}</div>
		</div>
	</div>
</template>

<script>
	export default {
		props:{
			brandList:{
				type:Array,
				default: []
			}
		}
	}
</script>

<style lang="scss" scoped>
	.brand-main{
		.brand-block{
			width: 670rpx;
			height: 612rpx;
			border-bottom-right-radius: 20rpx;
			border-bottom-left-radius: 20rpx;
			background-color: #fff;
			margin: 56rpx auto;
			.img{
				width: 670rpx;
				height: 426rpx;
				background-color: #999999;
			}
			.title{
				font-size: 32rpx;
				line-height: 45rpx;
				margin-top: 30rpx;
				color: #3E3E3E;
				margin-left: 56rpx;
			}
			.descr{
				font-size: 22rpx;
				color: #B1B1B1;
				line-height: 30rpx;
				margin-top: 20rpx;
				white-space: nowrap;
				overflow: hidden;
				margin-left: 56rpx;
			}
		}
	}
</style>
