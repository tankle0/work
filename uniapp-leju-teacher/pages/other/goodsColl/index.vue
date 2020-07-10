<template>
	<div class="goods-coll-main">
		<view class="goods-list">
			<view :to="{name:'goodsDetail',id:goods.id}" class="goods-item" v-for="goods in goodsList" :key="goods.id">
				<img class="img" :src="goods.img" alt>
				<div class="info">
					<p class="desc">{{goods.desc}}</p>
					<p class="text">
						<span class="text-save-count">{{goods.saveCount}}收藏</span>
						<span class="text-price">¥ {{goods.price}}</span>
					</p>
				</div>
			</view>
		</view>
	</div>
</template>

<script>
	import GoodsColl from "@/api/other/index.js";
	export default {
		name: "GoodsColl",

		data() {
			return {
				goodsList: []
			};
		},
		created() {
			this.getGoodsCollList();
		},
		methods: {
			getGoodsCollList() {
				GoodsColl.getGoodsCollList().then(res => {
					this.goodsList = res;
				});
			}
		}
	};
</script>

<style lang='scss' scoped>
	page{
		background-color: #fff;
	}
	.goods-coll-main {
		background: #fff;
		.goods-list {
			width: 100%;
			margin: 40rpx auto;
			padding: 0 30rpx;
			box-sizing: border-box;
			.goods-item {
				display: flex;
				margin: 40rpx auto;
				box-sizing: border-box;
				p {
					text-align: left;
				}

				.img {
					width: 160rpx;
					height: 160rpx;
					border-radius: 16rpx;
					margin-right: 40rpx;
				}

				.info {
					display: flex;
					flex-direction: column;
					width: 592rpx;
					justify-content: space-around;
					font-size: 24rpx;
					color: #494949;
					line-height: 36rpx;
					.text {
						display: flex;
						justify-content: space-between;

						.text-price {
							font-size: 32rpx;
							color: #1c4b47;
							font-weight: 600;
						}
					}
				}
			}
		}
	}
</style>
