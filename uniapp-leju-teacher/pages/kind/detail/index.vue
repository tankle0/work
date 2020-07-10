<template>
	<view class="detail-main">
		<view class="banner">
			<swiper class="banner-swiper swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="400">
				<swiper-item class="swiper-item" v-for="img in product.imgs" :key="img">
					<image class="image" :src="img" mode=""></image>
				</swiper-item>
			</swiper>
			<view class="collect" @tap="collect">
				<image class="image" src="../../../static/icons/collect.png" mode="scaleToFill"></image>
			</view>
			<view class="dotts">
				<span class="dott" :style="{backgroundColor: d.color}" v-for="d in skuList" :key="d.id"></span>
			</view>
		</view>
		<view class="title-block">
			<div class="detail_title">{{product.detail_title}} </div>
			<div class="detail_desc">{{product.detail_desc}}</div>
			<div class="price">¥ {{product.price_now | money}}</div>
		</view>
		<view class="content">
			<rich-text class="rich-area" :nodes="product.content"></rich-text>
		</view>
		<view class="goods-nav">
			<view class="kf"></view>
			<view class="buy-btns">
				<view class="btn-goods-cart" @tap="addCart">添加到购物车</view>
				<view class="btn-goods-buy" @tap="addBuy">立即购买</view>
			</view>
		</view>
		<!-- ref 给组建起一个名字 使得在vue中可以通过this.$refs.xx获取到当前组件对象 -->
		<Sku :skuList="skuListCom" @select-sku="handleSelSku" ref="skuCard"></Sku>
	</view>
</template>

<script>
	import productApi from '@/api/kind/product.js'
	import Sku from '../sku/index.vue'
	import {checkLogin} from '@/utils/common.js'
	import NP from 'number-precision'
	export default {
		components: {
			Sku
		},
		data() {
			return {
				productId: '',
				product: {
					imgs: []
				},
				skuList: [],
				buyType: 0, // 0 添加购物车, 1 购买


			}
		},
		onLoad(option) {
			this.productId = option.productId;
			this.getDetail();
			
		},
		computed:{
			skuListCom(){
				for(var i = 0 ; i < this.skuList.length ; i ++){
					if(this.product.imgs.length>i){
						this.skuList[i].img = this.product.imgs[i];
					}else{
						break;
					}
				}
				return this.skuList;
			}
		},
		methods: {
			getDetail() {
				productApi.detail({
					productId: this.productId
				}).then(res => {
					this.product = res.data;
					this.product.content = this.product.content.replace(/<img/ig,'<img style="max-width:100%;height:auto;"');
					if (res.data.imgs) {
						this.product.imgs = res.data.imgs.split(',');
					}
					if (this.product) {
						this.skuList = res.data.skuList;
					}
					

				})
			},
			// rs 是从 sku.vue 中选中的某个sku组成的对象,并$emit返回给当前页面的对象
			handleSelSku(rs) {
				console.log('ok',rs)
				var skuObj = {
							skuCode: rs.sku_code,
							gname: this.product.gname,
							coverImg: this.product.cover_img,
							color_text: rs.color_text,
							skuId: rs.id,
							price: rs.price,
							count: rs.count
						};
				// 0 添加购物车   ;  1 直接购买
				if(this.buyType == '0'){
					var buycart = uni.getStorageSync('leju-buycart');
					if(!buycart){
						buycart = [];
						uni.setStorageSync('leju-buycart',buycart);
					}
					// 时间戳为临时id
					skuObj.tempId = new Date().getTime();
					buycart.push(skuObj);
					// 重置购物车
					uni.setStorageSync('leju-buycart',buycart);
					uni.showToast({
						title: '添加购物车成功!',
						duration: 800
					})
					return;
				}
				// 1. 用户选择的sku拼装为订单并且提交
				// 说明: 09班 之前的订单逻辑做了增强. 之前的逻辑是用户未支付订单在本地ls保存,现在改成了用户添加订单,如果未支付
				// 则状态为0,也是提交到服务器
				// 2. 把当前用户的sku订单 传递到订单确认页面
				rs.gname = this.product.gname;
				//构建订单对象
				var orderObj = {
					userId: this.$store.getters.userId,
					count: rs.count, // 因为商品详情页 只有一个sku 所以sku的count就是总count
					freight: 0, // 运费 , 见api
					price: rs.count * rs.price,  // 总价格
					orderDetailList: [
						skuObj
					]
				}
				//存入vuex
				this.$store.commit('order/ADD_ORDER_TEMP',orderObj)
				
				// 跳转到订单确认页面
				uni.navigateTo({
					url:'../../mine/order/detail/index'
				})

			},
			addCart(){
				checkLogin(()=>{
					this.buyType = 0;
					this.$refs.skuCard.openCard();
				})
			},
			addBuy(){
				// 1. 判断了是否登陆,如果未登录 直接提示登陆
				// 2. 如果登陆了,则直接在回调里执行下一步
				
				checkLogin(()=>{
					this.buyType = 1;
					// 打开小卡片
					this.$refs.skuCard.openCard();
				})
				
				
			},
			collect(){
				uni.showToast({
					title:'已收藏!',
					duration: 800
				})
			},

		}
	}
</script>

<style scoped lang="scss">
	.detail-main {
		.banner {
			width: 100%;
			position: relative;

			.banner-swiper {
				width: 100%;
				height: 634rpx;

				.swiper-item {
					width: 750rpx;
					height: 100%;

					.image {
						width: 100%;
						height: 100%;
					}
				}
			}

			.collect {
				position: absolute;
				width: 100rpx;
				height: 100rpx;
				top: 634rpx;
				right: 100rpx;
				margin-top: -50rpx;
				background: #354E44;
				box-shadow: 0 16px 24px 0 rgba(70, 70, 70, 0.20);
				text-align: center;
				border-radius: 50%;

				.image {
					width: 44rpx;
					height: 44rpx;
					margin-top: 29rpx;
				}
			}

			.dotts {
				width: 100%;
				margin-top: 20rpx;
				display: flex;
				justify-content: center;
				align-items: center;

				.dott {
					width: 50rpx;
					height: 50rpx;
					margin: 0 20rpx;
					border-radius: 50%;
				}
			}
		}

		.title-block {
			box-sizing: border-box;
			padding: 68rpx;
			padding-top: 0;

			.detail-title {
				font-size: 36rpx;
				font-weight: bold;
			}

			.detail_desc {
				font-size: 30rpx;
				color: #B0B0B0;
				line-height: 1.5;

			}

			.price {
				margin-top: 20rpx;
			}
		}

		.content {
			box-sizing: border-box;
			padding: 68rpx;
			overflow: hidden;
			margin-bottom: 60px;

			::v-deep img {
				width: 100%;
			}
			// .rich-area{
			// 	.rich-img{
			// 		width: 100%;
			// 		height: auto;
			// 	}
			// }
		}

		.goods-nav {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			z-index: 888;
			display: flex;
			box-sizing: border-box;
			padding: 0 60rpx;
			justify-content: space-between;
			background-color: #fff;
			align-items: center;
			height: 120rpx;
			.kf {
				width: 60rpx;
				height: 60rpx;
				background: url('../../../static/icons/kf.png') no-repeat 0 center;
				background-size: 40rpx 40rpx;
				
			}
			.buy-btns{
				display: flex;
				justify-content: center;
				height: 100%;
				.btn-goods-cart,
				.btn-goods-buy{
					width: 238rpx;
					height: 80rpx;
					margin-top: 20rpx;
					// border-radius: 14rpx;
					font-size: 30rpx;
					color: #fff;
					line-height: 80rpx;
					text-align: center;
					// font-weight: 600;
					background-color: #354E44;
					&.btn-goods-cart{
						background-color: #E2E2E2;
						color: #8F8F94;
					}
				}
			}
		}
	}
</style>
