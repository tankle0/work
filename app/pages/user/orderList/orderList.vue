<template>
	<view class="order">
		<view class="order-c">
			<radio-group class="group" @change="radioChange">
				<label class="label" v-for="(item, index) in list" :key="item.value">
					<radio :value="item.value" :checked="item.value == current" />
					<view :class="{active:item.value == current}">{{item.name}}</view>
				</label>
			</radio-group>
			
			<view class="main">
				<view class="main-c" v-for="(item,index) in orderList" :key="index">
					<view class="top">
						<text>订单编号：{{item.orderId}}</text> 
						<!-- {{item.id}} -->
						<text v-if="current!='4'">{{item.status == "0" ? "未付款" : item.status == "1" ? "已付款" : item.status == "2" ? "已发货" : "已完成" }}</text>
						<text v-else>{{item.process == "0" ? "等待处理" : item.status == "1" ? "确认退货" : item.status == "2" ? "确认收货" : "拒绝退货" }}</text>
					</view>
					<view class="midl">
						<image :src="item.cover_img" mode="widthFix"></image>
						<view class="right">
							<view class="fir">
								<view class="title">
									<text>{{item.name}}</text>
									<text v-if="current!='4'">¥{{item.price}}</text>
									<text v-else>¥{{item.order_price}}</text>
								</view>
								<view>
									<text>编号：{{item.sku_code}}</text>
									<text v-if="current!='4'">X{{item.totalCount}}</text>
									<text v-else>X{{item.count}}</text>
								</view>
								<view>
									<text>规格：{{item.color_text}}</text>
								</view>
							</view>
							
							<text v-if="current!='4'" class="total">合计：¥{{item.totalPrice}}</text>
							<text v-else class="total">合计：¥{{item.order_price*item.count}}</text>
						</view>
					</view>
					<view class="bot">
						<view class="btn">
							<button @click="pay" type="default" size="mini">取消订单</button>
							<button v-if="item.status != '1' " @click="cancle" type="default" size="mini">付款</button>
						</view>
						
					</view>
				</view>
			</view>
			
			
			
		</view>
	</view>
</template>

<script>
	import {orderList, orderBackList} from "../../../utils/order/index.js"
	export default {
		
		data() {
			return {
				list:[
					{
						name:"全部",
						value: "0"
					},
					{
						name:"待付款",
						value: "1"
					},
					{
						name:"已付款",
						value: "2"
					},
					{
						name:"已完成",
						value: "3"
					},
					{
						name:"申请退款",
						value: "4"
					}
				],
				// orderList:[],
				current: "0",
				allList:[],
				show:true,
				afterOrder:[]
			};
		},
		onLoad(options){
			var info = uni.getStorageSync("user")
			if(info){
				this.current = options.count
				orderList({
					userId: info.id
				})
				.then(res=>{
					// console.log(res.data.data)
					var items = res.data.data
					// console.log(item)
					var list = []
					for(let i = 0;i<items.totalPage;i++){
						for(let j =0;j<items.list.length;j++){
							list.push(items.list[j])
						}
					}
					console.log(list)
					this.allList = list
				})
				//退单列表
				orderBackList({
					userId: info.id
				})
				.then(res=>{
					console.log(res.data.data)
					this.afterOrder = res.data.data
				})
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
		computed:{
			orderList(){
				// var item = uni.getStorageSync("unpayOrder")
				if(this.current == "0"){
					return this.allList
				}else if(this.current == "1"){
					return this.allList.filter(ele => ele.status == "0")
				}else if(this.current == "2"){
					return this.allList.filter(ele => ele.status == "1")
				}else if(this.current == "3"){
					return this.allList.filter(ele => ele.status == "3")
				}else{
					return this.afterOrder
				}
			}
		},
		methods:{
			radioChange(e){
				this.current = e.detail.value
				console.log(this.current,e.detail.value)
			},
			pay(){
				
			},
			cancle(){
				
			}
		}
	}
</script>

<style lang="scss" scoped>
body,html,uni-page-body {
	height: 100%!important;
	background-color: #F1ECE7;
}
.order{
	width: 100%;
	height: 100%;
	.order-c{
		width: 100%;
		height: 100%;
		overflow: scroll;
		background-color: #F1ECE7;
		// background-color: #FFFFFF;
		.group{
			position: fixed;
			left: 0;
			top: 70rpx;
			/*  #ifdef  MP-WEIXIN */
			top:10rpx;
			/*  #endif  */
			overflow: hidden;
			width: calc(100% - 80rpx);
			padding: 0 40rpx;
			background-color: #354E44;
			font-size: 30rpx;
			color: #FFFFFF;
			letter-spacing: 2.14rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			z-index: 90;
			// transform: translateY(-1rpx);
			.label{
				margin-top: 24rpx;
				width: 140rpx;
				height: 80rpx;
				line-height: 60rpx;
				text-align: center;
				view{
					border-bottom: 2rpx solid transparent;
					box-sizing: border-box;
				}
				radio{
					display: none;
				}
				.active{
					border-bottom: 2rpx solid #F1ECE7;
				}
			}
		}
		.main{
			margin-top: 120rpx;
			.main-c{
				margin: 0 auto 40rpx;
				padding: 18rpx 36rpx 24rpx;
				width: 600rpx;
				height: 290rpx;
				background: #FFFFFF;
				box-shadow: 0 8rpx 16rpx 0 rgba(83,66,49,0.08);
				border-radius: 24rpx;
				// margin-bottom: 40rpx;
				.top{
					width: 100%;
					display: flex;
					justify-content: space-between;
					font-size: 24rpx;
					color: #3E3E3E;
					margin-bottom: 29rpx;
				}
				.midl{
					width: 100%;
					display: flex;
					justify-content: space-between;
					image{
						width: 162rpx;
						height: 162rpx!important;
						margin-right: 28rpx;
					}
					.right{
						// flex: 1;
						display: flex;
						align-content: space-between;
						flex-wrap: wrap;
						.fir{
							display: flex;
							flex-wrap: wrap;
							width: 100%;
							view{
								width: 100%;
								display: flex;
								justify-content: space-between;
								text{
									font-size: 22rpx;
									color: #8D8D8D;
								}
							}
							.title{
								width: 100%;
								display: flex;
								justify-content: space-between;
								text{
									font-size: 26rpx;
									color: #3E3E3E;
								}
								text:last-child{
									color: #8D8D8D;
								}
							}	
						}
						.total{
							width: 100%;
							display: flex;
							flex-direction: row-reverse;
							font-size: 26rpx;
							color: #3E3E3E;
						}
						
					}
				}
				.bot{
					display: flex;
					flex-direction: row-reverse;
					.btn{
						margin-top: 17rpx;
						button{
							opacity: 0.25;
							border: 2rpx solid #6C6C6C;
							border-radius: 10rpx;
						}
						
						button:last-child{
							opacity: 0.76;
							border: 2rpx solid #2D4F43;
							border-radius: 10rpx;
							margin-left: 32rpx;
						}
					}
					
				}
			}
		}
		
	}
}
</style>
