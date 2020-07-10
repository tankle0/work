<template>
	<view class="box">
		<view class="col"></view>
		<view class="head" >
			<view class="top ">
				<image class="chat" src="../../static/icons/chat.png" mode="widthFix" ></image>
				<view class="texts"></view>
				<view class="right">
					<navigator url="../search/search">
						<image class="searchIcon" src="../../static/icons/search.png" mode="widthFix"></image>
						
					</navigator>
					<navigator url="../shop/shop">
						<image src="../../static/icons/cart.png" mode="widthFix"></image>
					</navigator>
				</view>
			</view>
		</view>
		<view class="fix"></view>
		<view class="contents">	
			<view @click="enter(item.id)" class="pits" :class="'el'+`${index}`"  :key="index" v-for="(item,index) in kindList">
				<view class="left">
					<text>{{item.ctitle}}</text>
					<text>{{item.etitle}}</text>
				</view>
				<navigator :url="'./product/product?kindId='+item.id " open-type="navigate">
					<image :src="item.img" mode="widthFix"></image>
				</navigator>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {kind} from "../../utils/sort/index.js"
	export default {
		data() {
			return {
				kindList:[],
			}
		},
		onLoad(){
			kind()
			.then(res=>{
				console.log(res)
				this.kindList = res.data.data
			})
		},
		methods: {
			enter(val){
				// console.log(val)
				uni.removeStorageSync("back")
				// uni.clearStorage()
				uni.setStorageSync("back",val)
			}
		}
	}
</script>

<style lang="scss" scoped>
.box{
	width: 100%;
	height: 100%;
	.fix{
		position: fixed;
		width: 100%;
		height: 1332rpx;
		background: #F1ECE7;
		box-shadow: 0 16px 24px 0 rgba(83,66,49,0.08);
		border-radius: 40px;
		z-index: 5;
	}
	.contents{
		position: relative;
		width: 100%;
		margin-top: 86rpx;
		z-index: 10;
		overflow: hidden;
		display: flex;
		flex-wrap: wrap;
		.pits{
			width: 670rpx;
			height: 302rpx;
			margin: 24rpx auto ;
			overflow: hidden;
			display: flex;
			background: #D5D5D5;
			box-shadow: 0 12rpx 20rpx 0 rgba(83,66,49,0.05);
			border-radius: 20rpx;
			font-size: 48rpx;
			color: #3E3E3E;
			letter-spacing: 3.43rpx;
			.left text:nth-child(2){
				font-size: 30rpx;
				color: #7F7F7F;
				letter-spacing: 2.14rpx;
			}
			text{
				position: relative;
				display: block;
				font-size: 48rpx;
				color: #3E3E3E;
				letter-spacing: 3.43rpx;
				z-index: 10;
			}
			.left{
				margin: 148rpx auto auto 52rpx;
				
			}
		}
		.el0{
			margin-top: 50rpx;
			image{
				width: 416rpx;
				height: 252rpx!important;
				margin-top: 50rpx;
			}
		}
		.el1{
			position: relative;
			background-color: #FFFFFF;
			image{
				position: absolute;
				width: 492rpx!important;
				height: 100%!important;
				left: 178rpx;
				z-index: 1;
			}
		}
		.el2
		,.el3{
			position: relative;
			width: 312rpx;
			height: 442rpx;
			position: relative;
			background-color: #FFFFFF;
			image{
				position: absolute;
				width: 100%;
				height: 392rpx!important;
				z-index: 1;
				left: 0;
				bottom: 0;
			}
		}
		.el3 image{
			height: 100%!important;
		}
	}
}
.col{
	position: fixed;
	left: 0;
	top: 0;
	width: calc(100% - 60rpx);
	padding: 10rpx 30rpx;
	height: 208rpx;
	z-index: 2;
	background-color: rgb(53, 78, 68);
}
.top{
	position: fixed;
	left: 0;
	top: 0;
	width: calc(100% - 60rpx);
	padding: 20rpx 30rpx 0;
	height: 50rpx;
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	z-index: 20;
	background-color: rgb(53, 78, 68);
	.right{
		display: flex;
		align-items: center;
		.searchIcon{
			margin-right: 36rpx;
		}
	}
	image{
		width: 36rpx;
		height: 36rpx;
	}
	.texts{
		margin-left: 40rpx;
		letter-spacing: 6rpx!important;
	}
	.chat{
		width: 42rpx;
		height: 42rpx;
	}
	
}
</style>
