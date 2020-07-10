<template>
	<div class="buycart-main">
		<checkbox-group @change="ckChange">
			<view class="product-card" v-for="item in productList" :key="item.tempId">

				<view class="info-block">
					<label>
						<checkbox :value="item.tempId+''" :checked="checkbox.includes(item.tempId)"/><text></text>
					</label>
					<navigator class="nav" url="/pages/buyCart/index">
						<image class="cover-img" :src="item.coverImg" mode=""></image>
						<view class="info-text">
							<view class="gname">{{item.gname}}</view>
							<view class="code">
								<text>编号: {{item.skuCode}}</text>
								<text>价格: ¥{{item.price}}</text>
							</view>
							<view>数量: {{item.count}}</view>
						</view>
					</navigator>
				</view>

				<view class="buy-count-steps">
					<text class="step-reduce" @tap="btnReduce">-</text>
					<text class="step-text">{{item.count}}</text>
					<text class="step-add" @tap="btnAdd">+</text>
				</view>
			</view>
		</checkbox-group>

		<view class="footer-bar">
			<view class="sel-all">
                <checkbox-group @change="selAll">
				<label>
					<text>全选</text>
					<checkbox value="0" />
				</label>
                </checkbox-group>
			</view>
			<view>
				<text>合计: ¥</text>
				<text class="btn" @click="goPay">结算</text>
			</view>
		</view>
	</div>
</template>

<script>
	export default {
		name: 'BuyCart',
		components: {

		},
		data() {
			return {
                isSelAll: false,
				productList: [],
				checkbox: []
			};
		},
		onLoad() {
			this.productList = uni.getStorageSync('leju-buycart');
		},
		computed: {

		},
		mounted() {

		},
		methods: {
			btnReduce() {

			},
			btnAdd() {

			},
			ckChange(e) {
                console.log(e.detail)
                this.checkbox = e.detail.value;
            },
            goPay(){
                // 1.构建对象
                var skuList = [];
                for(var i = 0 ; i< this.checkbox.length ; i ++){
                    var tempId = this.checkbox[i];
                    var sku = this.productList.find(item=>(item.tempId == tempId));
                    console.log('sku...',sku)
                    if(sku){
                        skuList.push(sku);
                    }
                }
                // 总数量
                var totalCount = 0 ;
                // 总价格
                var totalPrice = 0;
                skuList.forEach(item => {
                    totalCount += item.count;
                    totalPrice += item.price;
                });
				//构建订单对象
				var orderObj = {
					userId: this.$store.getters.userId,
					count: totalCount, // 因为商品详情页 只有一个sku 所以sku的count就是总count
					freight: 0, // 运费 , 见api
					price: totalPrice,  // 总价格
					orderDetailList: skuList
				}
				//存入vuex
				this.$store.commit('order/ADD_ORDER_TEMP',orderObj)
				
				// 跳转到订单确认页面
				uni.navigateTo({
					url:'/pages/mine/order/detail/index?from=cart'
				})
				
            },
            selAll(e){
                console.log(e.detail)
                var value = e.detail.value;
                if(value.length>0){
                    this.productList.forEach(item=>{
                        this.checkbox.push(item.tempId)
                    })
                }else{
                    this.checkbox = []
                }
            }
		},
	};
</script>

<style scoped lang="scss">
	.buycart-main {
		.product-card {
			width: 672rpx;
			margin: 50rpx auto;
			background-color: #fff;
			border-radius: 24rpx;
			padding: 20rpx 20rpx;
			box-sizing: border-box;

			.info-block {
				display: flex;
				justify-content: flex-start;
				align-items: center;

				.nav {
					display: flex;
					justify-content: flex-start;
					align-items: center;

					.cover-img {
						width: 136rpx;
						height: 136rpx;
						flex-shrink: 1;
					}

					.info-text {
						font-size: 22rpx;
						color: #8D8D8D;
						margin-left: 46rpx;

						.gname {
							font-size: 26rpx;
							color: #3E3E3E;
						}

						.price {
							display: flex;
							justify-content: space-between;
							align-items: center;
						}

					}
				}

			}

			.buy-count-steps {
				display: flex;
				justify-content: flex-end;

				.step-reduce,
				.step-add,
				.step-text {
					width: 60rpx;
					height: 60rpx;
					background: #F1ECE7;
					border-radius: 50%;
					text-align: center;
					line-height: 60rpx;
					font-size: 30rpx;
					margin: 0 6rpx;
				}

				.step-text {
					width: 90rpx;
					border-radius: 30rpx;
				}
			}
		}
		.footer-bar{
			position: fixed;
			display: flex;
			justify-content: space-around;
			align-items: center;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 150rpx;
			background-color: #fff;
			.btn{
				display: inline-block;
				width: 208rpx;
				height: 80rpx;
				background: #354E44;
				border-radius: 14px;
				color: #fff;
				font-size: 36rpx;
				line-height: 80rpx;
				text-align: center;
			}
		}
	}
</style>
