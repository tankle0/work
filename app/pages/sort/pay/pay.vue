<template>
	<view class="pay">
		<!--  #ifdef  MP-WEIXIN -->
			<view class="status_bar">
				 <!-- 这里是状态栏 -->
			</view>
		<!--  #endif -->
		
		<!-- 导航栏 -->
		<view class="head">
			<navigator :url="`../detail/detail?productId=${obj.product_id}`">
				<image src="../../../static/icons/arr-l.png" mode="widthFix"></image>
			</navigator>
			<text>确认订单</text>
			<image @click="add" src="#" mode="widthFix"></image>
		</view>
		
		<view class="pay-c">
			<text class="wait">等待支付...</text>
			<navigator open-type="navigate" url="../address/address" class="address">
				<view class="tel">
					tel:{{lists.tel}}
				</view>
				<view class="">
					收货地址:{{lists.address}}
				</view>
			</navigator>
			
			<view class="detail">
				<view class="detail-c">
					<view class="top">
						<text>订单编号:{{obj.id}}</text>
						<text>等待支付</text>
					</view>
					<view class="midl">
						<view class="left">
							<image :src="obj.img" mode="widthFix"></image>
							<view class="left-r">
								<view class="names">
									{{obj.name}}
								</view>
								<view class="nums">
									<text>编号:{{obj.sku_code}}</text>
									<text>规格:{{obj.color_text}}</text>
								</view>
							</view>
						</view>
						<view class="right">
							<view >¥{{obj.price}}</view>
							<view >x{{obj.num}}</view>
						</view>
					</view>
					<view class="bot">
						<view>合计:  {{obj.num*obj.price}}</view>
						<button @click="pay" type="primary" size="mini">确认付款</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {pay} from "../../../utils/sort/index.js"
	export default {
		data() {
			return {
				obj:"",
				lists:{
					tel:"",
					address:""
				}
			};
		},
		onLoad(options){
			
			// console.log(this.obj)
			// console.log(options.useId)
			if(options.useId){
				this.lists = getApp().globalData.addressList.find(ele => ele.useId == options.useId)
				this.obj = this.$store.state.payList
			}else{
				this.obj = uni.getStorageSync("payGoods")
			}
		},
		methods:{
			pay(){
				if(this.lists.tel == "" || this.lists.address == ""){
					uni.showToast({
					    title: '请先添加收货信息！',
					    duration: 2000,
						icon:'none'
					});
				}else{
					// 保存收货信息及商品信息
					this.obj.tel = this.lists.tel
					this.obj.address = this.lists.address
					// console.log(this.obj)
					//待付款的信息
					var order = uni.getStorageSync("unpayOrder")
					if(order){
						var ispay = order.some(ele => ele.id == this.obj.id)
					}
					//已付款
					var doneOrder = uni.getStorageSync("payOrder")
					//提交订单前的提示框
					uni.showModal({
					    title: '提示',
					    content: '确定提交订单吗？',
					    success: res => {
							// console.log(res,this.obj)
					        if (res.confirm) {
					            // console.log('用户点击确定');
								uni.showLoading({
								    title: '支付中...',
									mask:true
								});
								setTimeout(()=>{
									pay({
										userId:"",
										orderId:"",
										payType:""
									})
									.then(res=>{
										console.log(res)
										if(res.data.code == "F"){
											uni.showToast({
											    title: '网络错误，结算失败！',
											    duration: 1000,
												icon:'none'
											});
											uni.hideLoading();
											if(!ispay){
												this.obj.status = 0
												order.push(this.obj)
												uni.setStorageSync("unpayOrder",order)
											}
										}else{
											if(doneOrder){
												this.obj.status = 1
												doneOrder.push(this.obj)
												uni.setStorageSync("payOrder",doneOrder)
											}else{
												this.obj.status = 1
												uni.setStorageSync("payOrder",[this.obj])
											}
											
										}
									})
									.catch(res=>{
										uni.showToast({
										    title: '网络错误，结算失败！',
										    duration: 1000,
											icon:'none'
										});
										if(order){
											if(!ispay){
												this.obj.status = 0
												order.push(this.obj)
												uni.setStorageSync("unpayOrder",order)
											}
										}else{
											this.obj.status = 0
											uni.setStorageSync("unpayOrder",[this.obj])
											// console.log(order)
										}
									})
								},1000)
								
					        } else if (res.cancel) {
					            // console.log('用户点击取消');
								// 创建未支付订单存储本地
								if(order){
									if(!ispay){
										this.obj.status = 0
										order.push(this.obj)
										uni.setStorageSync("unpayOrder",order)
									}
								}else{
									this.obj.status = 0
									uni.setStorageSync("unpayOrder",[this.obj])
									// console.log(order)
								}
					        }
					    }
					});
					
				}
				
			},
		}
	}
</script>

<style>
page{
	height: 100%!important;
	background-color: #F1ECE7;
}
</style>
<style lang="scss" scoped>
body,html,uni-page-body {
	height: 100%!important;
	background-color: #F1ECE7;
}
.status_bar {
  height: var(--status-bar-height);
  height: 50rpx;
  width: 100%;
  background-color: #354E44;
}

.pay{
	overflow: hidden;
	width: 100%;
	height: 100%;
	background-color: #F1ECE7;
	.head{
		width: calc(100% - 80rpx);
		line-height: 90rpx;
		padding: 0 40rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #354E44;
		color: #FFFFFF;
		image{
			width: 40rpx;
			height: 40rpx;
		}
	}
	.pay-c{
		width: calc(100% - 60rpx);
		margin: 80rpx auto;
		.wait{
			font-size: 52rpx;
			line-height: 60rpx;
			::after{
				content: "";
				display: block;
				width: 100%;
				height: 2rpx;
				margin-top: 10rpx;
				background-color: rgba(0,0,0,.2);
			}
		}
		.address{
			font-size: 40rpx;
			font-weight: bolder;
			margin: 80rpx auto;
		}
		.detail{
			width: 100%;
			height: 500rpx;
			background-color: #FFFFFF;
			border-radius: 60rpx;
			.detail-c{
				display: flex;
				flex-wrap: wrap;
				align-content: space-around;
				width: calc(100% - 40rpx);
				height: 100%;
				margin: 0 auto;
				.top{
					font-size: 28rpx;
					color: #7E7E7E;
					// .numbs{
					// 	font-size: 16rpx;
					// 	letter-spacing: .3rpx;
					// }
				}
				.midl{
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.left{
						display: flex;
						align-items:center;
						image{
							width: 160rpx;
							height: 160rpx!important;
						}
						.left-r{
							margin-left: 30rpx;
							.nums{
								text{
									display: block;
									font-size: 28rpx;
									color: #7E7E7E;
								}
							}
						}
					}
				}
				.bot{
					width: 100%;
					text-align: right;
					view{
						padding: 30rpx;
					}
					button{
						width: 220rpx;
						font-size: 32rpx;
						border-radius: 30rpx;
					}
				}
			}
			
		}
	}
}

</style>
