<template>
	<view class="safe">
		<view class="safe-c">
			<navigator :url="item.url" class="go" v-for="item in list" :key="item.id">
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
				list:[
					{
						name:"Z号",
						url:"#",
						id: Math.random()
					},
					{
						name:"个人资料",
						url:"#",
						id: Math.random()
					},
					{
						name:"绑定手机号",
						url:"#",
						id: Math.random()
					},
					{
						name:"微信账号",
						url:"#",
						id: Math.random()
					},
					{
						name:"QQ账号",
						url:"#",
						id: Math.random()
					},
					{
						name:"支付绑定",
						url:"#",
						id: Math.random()
					},
					{
						name:"设置登录密码",
						url:"#",
						id: Math.random()
					},
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
.safe{
	width: 100%;
	height: 100%;
	.safe-c{
		width: calc(100% - 80rpx);
		padding: 0 40rpx;
		.go{
			width: 100%;
			line-height: 125rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 32rpx;
			color: #3E3E3E;
			letter-spacing: 2.29rpx;
			border-bottom:  2rpx solid #EBEBEB;;
			image{
				width: 21rpx;
				height: 34rpx;
			}
		}
	}
}
</style>
