<template>
	<div class="order-main">
		<radio-group class="head-bar" @change="headChange">
			<label class="label" :class="{'active':item.value==current}" v-for="(item,index) in headItems" :key="item.value">
				<radio :value="item.value" :checked="item.value === current" />
				<view>{{item.name}}</view>
			</label>
		</radio-group>

		<div class="card-list">
				<div class="card" v-for="item in orderListCom" :key="item.orderId">
				<div class="order-title">
					<text>订单编号: {{item.orderId}}</text>
					<text class="status" v-if="current!=9">{{orderStatusText}}</text>
					<text class="status" v-if="current==9">{{orderProcessText(item.process)}}</text>
					
				</div>
				<!-- skublock -->
				 
				<navigator :url="'../../kind/detail/index?productId='+sku.product_id" class="sku-block" v-for="(sku,index) in item.subList" :key="index">
					<image class="img" :src="sku.cover_img" mode=""></image>
					<div class="info">
						<div class="p1">
							<text class="title">{{sku.gname}}</text>
							<!-- 后台需要添加skuprice -->
							<text class="price">¥{{sku.price | money}}</text>
						</div>
						<div class="p2">
							<text>编号：{{sku.sku_code}}</text>
							<text>x 1</text>
						</div>
						<div class="p3">
							<text>规格：{{sku.color_text}}</text>

						</div>
						<div v-show="item.status=='2'" class="p4" >
							<text v-if="!sku.backId" @tap="goOrderBack(item.orderId,sku)">退货</text>
							<text style="color: red;" v-else>退货中</text>
						</div>

					</div>

				</navigator>
				<div class="total-price">
					<table>时间: {{item.addTime}}</table>
					<text>合计: ¥{{item.totalPrice | money}}</text>
				</div>
				<!-- buttons -->
				<div class="btns">
					<div class="btn btn-cancel-order" @click="cancleOrder(item.orderId)" v-if="current==0">取消订单</div>
					<div class="btn btn-pay" @click="goPay(item.orderId,item.totalPrice)" v-if="current==0">付款</div>
					<div class="btn btn-receive" @click="allDone(item.orderId)" v-if="current==2">确认收货</div>
					<div class="btn btn-closed" v-if="item.statusend=='1'">订单已关闭,删除记录</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import orderApi from '@/api/order/index';
	import {isLogin,checkLogin} from '@/utils/common.js';
	export default {
		name: 'Order',
		data() {
			return {
				orderList: [],
				// process 进度: 0 等待处理 ; 1 确认退货,等待收货; 2 : 确认收货,已退款 ; 9 : 拒绝退货
				orderBackList: [],
				current: '1',
				// <!-- 订单状态  1 已付款 ;  2 已发货; 3: 已收货;   9 申请退款 -->
				headItems: [{
						name: '待付款',
						value: '0'
					}, {
						name: '已付款',
						value: '1'
					},
					{
						name: '已发货',
						value: '2'
					},
					{
						name: '已收货',
						value: '3'
					},
					{
						name: '申请退款',
						value: '9'
					}
				],
				orderListLocal: [], // 未支付订单
			}
		},
		onLoad(option) {
			this.current = option.type;
			 
			if(isLogin()){
				this.getOrderList();
				//退单列表
				this.getOrderBackList();
			}else{
				uni.showModal({
					title: '未登录',
					content: '您未登录，需要登录后才能查看',
					success: (res) => {
						if (res.confirm) {
							uni.navigateTo({
								url: '../login/login'
							});
						}
					}
				});
			}
		},
		computed: {
			orderListCom() {
				if(this.current == 9){
					return this.orderBackList;
				}
				return this.orderList.filter(item => item.status == this.current);
			},
			orderStatusText() {
				var text = '未付款';
				switch (this.current) {
					case '0':
						text = '未付款'
						break;
					case '1':
						text = '等待发货'
						break;
					case '2':
						text = '已发货'
						break;
					case '3':
						text = '已收货'
						break;
					
					default:
						break;
				}
				return text;
			},
			// 如果是退单 process 进度: 0 等待处理 ; 1 确认退货,等待收货; 2 : 确认收货,已退款 ; 9 : 拒绝退货
			
		},
		onBackPress(){
			 
			uni.switchTab({
				url: '/pages/mine/index'
			})
			return true

		},
		methods: {
			async getOrderList() {
				var userId = this.$store.getters.user.id;
				// 通过网络获取orderList
				var res = await orderApi.orderList({
					userId
				});
				// 获取本地未支付订单
				this.orderListLocal = uni.getStorageSync('leju_order');
				
				this.orderList = res.data.list;

			},
			headChange(e) {
				this.current = e.detail.value;
				// console.log('current',this.current)
				window.location.hash = '#/pages/mine/order/index?type='+this.current
			},
			//取消未支付订单
			cancleOrder(orderId){
				orderApi.delOrderPre({
					orderId
				}).then(res=>{
					if(res.code == 'S'){
						this.getOrderList()
					}else{
						uni.showToast({
							title: '删除订单失败!',
							duration: 1000
						})
					}
				})
			},
			// 去支付
			goPay(orderId,price){
				uni.navigateTo({
					url: '/pages/pay/payment/payment?price='+price+'&orderId='+orderId
				})
			},
			//确认收货
			allDone(orderId){
				orderApi.allDone({
					id:orderId
				}).then(res=>{
					if(res.code == 'S'){
						this.getOrderList()
					}else{
						uni.showToast({
							title: '确认收货失败!',
							duration: 1000
						})
					}
				})
			},
			goOrderBack(orderId,sku){
				this.$store.commit('order/ADD_TEMP_ORDER_BACK',sku);
				uni.navigateTo({
					url:'./orderback/index'
				})
			},
			getOrderBackList(){
				orderApi.orderBackList({
					userId: this.$store.getters.userId
				}).then(res=>{
					var backList = res.data;
					for(var i = 0 ;i < backList.length ; i ++){
						var item = backList[i];
						this.orderBackList.push({
							orderId: item.orderId,
							process: item.process,
							// 后台需要更新backPrice  后台bug
							totalPrice: item.count* item.back_price,
							subList: [{
								...item
							}]
						})
					}
				})
				
			},
			orderProcessText(process){
				var text = '等待处理';
				switch (process) {
					case '0':
						text = '等待处理'
						break;
					case '1':
						text = '确认退货,等待发货'
						break;
					case '2':
						text = '确认收货,已退款'
						break;
					case '9':
						text = '拒绝退货'
						break;
					
					default:
						break;
				}
				return text;
			}
		}

	}
</script>

<style lang="scss" scoped>
	.order-main {
		.head-bar {
			width: 100%;
			overflow-y: auto;
			position: fixed;
			left: 0;
			top: 0;
			// #ifdef H5
			top: 80rpx;
			// #endif
			display: flex;
			justify-content: space-around;
			width: 100%;
			height: 62rpx;
			padding-top: 14rpx;
			background-color: #354E44;
			color: #fff;
			font-size: 30rpx;
			line-height: 62rpx;
			z-index: 999;

			.label {
				radio {
					display: none;
				}

				&.active {
					border-bottom: 2rpx solid #DD524D;
					color: #DD524D;
				}

			}
		}

		.card-list {
			margin-top: 130rpx;
			.card {
				width: 672rpx;
				box-sizing: border-box;
				padding: 36rpx;
				border-radius: 24rpx;
				background-color: #fff;
				margin: 30rpx auto;
				font-size: 24rpx;
				color: #3E3E3E;

				.order-title {
					line-height: 33rpx;
					display: flex;
					justify-content: space-between;

					.status {
						color: #034C46;
					}

					border-bottom: 1px solid #F1ECE7;
					padding-bottom: 30rpx;
				}

				.sku-block {
					display: flex;
					justify-content: flex-start;
					border-bottom: 1px solid #F1ECE7;
					padding: 30rpx 0;

					.img {
						width: 162rpx;
						height: 162rpx;
						flex-shrink: 0;
						background-color: #8F8F94;
					}

					.info {
						width: 470rpx;
						margin-left: 28rpx;

						.p1,
						.p2 {
							display: flex;
							justify-content: space-between;
							align-items: center;
						}

						.p1 {
							font-size: 26rpx;
							line-height: 37px;

							.title {
								color: #3E3E3E;
							}

							.price {
								colro: #8D8D8D;
							}
						}

						.p2,
						.p3 {
							font-size: 22rpx;
							color: #8D8D8D;
							line-height: 30rpx;
							margin-top: 5rpx;
						}

						.p4 {
							text-align: right;
							margin-top: 10rpx;
							color: #8D8D8D;
							text-decoration: underline;
						}

					}
				}

				.total-price {
					font-size: 26rpx;
					line-height: 37rpx;
					text-align: right;
					margin-top: 14rpx;
					display: flex;
					justify-content: space-between;
				}

				.btns {
					margin-top: 20rpx;
					display: flex;
					justify-content: flex-end;

					.btn {
						width: 124rpx;
						height: 50rpx;
						border: 1px solid #2D4F43;
						font-size: 26rpx;
						border-radius: 10rpx;
						color: #2D4F43;
						text-align: center;
						line-height: 50rpx;
						margin-left: 32rpx;
						&.btn-closed{
							width: auto;
							padding: 0 1em;
							border-color: #DD524D;
						}
					}
				}

			}
		}
	}
</style>
