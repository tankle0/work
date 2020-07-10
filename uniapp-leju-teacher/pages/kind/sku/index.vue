<template>
	<div class="sku-main" v-show="show">
		<div class="card">
			<image src="../../../static/icons/x.png" class="close" @tap="closeCard"></image>
			<image class="img" :src="sku.img"></image>
			<div class="title">单人沙发</div>
			<div class="sku-count">库存数量: {{sku.count}}</div>
			<div class="colors-area">
				<div class="common-title">颜色分类</div>
				<radio-group class="colors" @change="colorSel">
					<template v-if="skuList.length>0">
						<label class="color-item" :class="{active:sku.id==item.id}" v-for="item in skuList" :key="item.id">
							<radio :style="{color:item.color}" :value="item.id" /><text>{{item.color_text}}</text>
						</label>
					</template>
				</radio-group>
			</div>
			<div class="promise_service">
				<div class="common-title">特色服务</div>
				<div class="works">
					<!-- <template v-if="skuList.lenght==0"> -->
					<view class="work-item">
						送货上门
					</view>
					<view class="work-item">
						上门安装
					</view>
					<!-- </template> -->
				</div>
			</div>
			<div class="line"></div>
			<!-- 购买数量 -->
			<div class="buy-count-area">
				<view class="common-title">购买数量</view>
				<view class="buy-count-steps">
					<text class="step-reduce" @tap="btnReduce">-</text>
					<text class="step-text">{{buySku.count}}</text>
					<text class="step-add" @tap="btnAdd">+</text>
				</view>
			</div>

			<!-- 确定 -->
			<div class="btn-buy" @click="handleOk">确定</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Sku',
		data() {
			return {
				show: false,
				sku: {},
				buySku:{
					count: 1
				}
			}
		},
		props: {
			skuList: {
				type: Array,
				default: []
			}
		},
		onLoad() {

		},
		methods: {
			handleOk() {
				var rs = {
					...this.sku,
					count: this.buySku.count
				}
				this.$emit('select-sku',rs);
			},
			openCard(type) {
				this.type = type;
				this.show = true;
				this.sku = this.skuList.length > 0 ? this.skuList[0] : {};
			},
			closeCard() {
				this.show = false;
				this.sku = {};
			},
			colorSel(e) {
				// console.log(e.detail.value)
				this.sku = this.skuList.filter(item=>item.id == e.detail.value)[0];
			},
			btnReduce(){
				if(this.buySku.count > 1){
					this.buySku.count --;
				}
			},
			btnAdd(){
				if(this.buySku.count < this.sku.count){
					this.buySku.count ++;
				}else{
					uni.showToast({
						title:'库存只有'+this.sku.count+'个了!',
						duration: 1000,
						icon:'none'
					})
				}
			}
		}
	}
</script>

<style lang="scss" sopced>
	.sku-main {
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		background-color: rgba(0, 0, 0, .5);
		z-index: 888;

		.card {
			position: absolute;
			left: 50%;
			top: 228rpx;
			margin-left: -314rpx;
			width: 628rpx;
			height: 926rpx;
			background: #FFFFFF;
			border-radius: 40px;
			border-radius: 40px;
			border-radius: 40rpx;

			.close {
				position: absolute;
				right: 62rpx;
				top: 62rpx;
				width: 42rpx;
				height: 42rpx;

			}

			.img {
				position: absolute;
				width: 192rpx;
				height: 192rpx;
				background-color: pink;
				left: 62rpx;
				top: -56rpx;
				border-radius: 10rpx;
			}

			.title {
				font-size: 28rpx;
				color: #3E3E3E;
				margin-left: 284rpx;
				margin-top: 42px;
				font-weight: 600;
			}

			.sku-count {
				font-size: 24rpx;
				color: #B0B0B0;
				margin-top: 6rpx;
				line-height: 33rpx;
				margin-left: 284rpx;
			}

			.common-title {
				font-size: 28rpx;
				color: #3E3E3E;
				line-height: 40rpx;
				letter-spacing: 2px;
				font-weight: 600;
			}

			.colors-area {
				box-sizing: border-box;
				padding: 28rpx 56rpx;
				overflow: hidden;

				.colors {
					radio {
						display: none;
					}

					.color-item {
						box-sizing: border-box;
						float: left;
						width: 242rpx;
						height: 60rpx;
						color: #3E3E3E;
						font-size: 26rpx;
						text-align: center;
						line-height: 60rpx;
						background: #F2F4F3;
						border-radius: 10px;
						border-radius: 10px;
						margin: 10rpx;

						&:nth-child(2n-1) {
							margin-left: 0;
						}
						
						&.active{
							border: 2px #354E44 solid;
						}

					}
				}

			}

			.promise_service {
				box-sizing: border-box;
				padding: 0 56rpx;

				.works {
					.work-item {
						width: 100%;
						height: 60rpx;
						color: #3E3E3E;
						font-size: 26rpx;
						text-align: center;
						line-height: 60rpx;
						background: #F2F4F3;
						border-radius: 10px;
						border-radius: 10px;
						margin: 10rpx auto;
						text-align: left;
						text-indent: 1em;
					}
				}

			}

			.line {
				width: 530rpx;
				height: 3rpx;
				background-color: #F2F4F3;
				margin: 36rpx auto;
			}

			.buy-count-area {
				box-sizing: border-box;
				padding: 0 56rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.buy-count-steps {
					display: flex;
					justify-content: center;

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

			.btn-buy {
				width: 208rpx;
				height: 80rpx;
				background: #354E44;
				border-radius: 14px;
				border-radius: 14px;
				margin: 48rpx auto;
				color: #fff;
				font-size: 32rpx;
				text-align: center;
				line-height: 80rpx;
			}
		}
	}
</style>
