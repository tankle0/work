<template>
	<view class="shop">
		<view class="shop-c">
			<view class="main" >
				<view class="checkbox" >
					<view class=" checklabel" v-for="item in shopList" :key="item.id">
						<view class="money">
							<view class="lefts">
								<evan-checkbox class="box" @change="childChange" v-model="item.checked" ﻿ :key="item.id" :label="item.id">
								</evan-checkbox>
								<view class="center">
									<image :src="item.img" mode="widthFix"></image>
									<view class="mid">
										<text>{{item.name}}</text>
										<text>编号：{{item.code}}</text>
										<text>数量：X1</text>
									</view>
								</view>
							</view>
							<text class="last">¥{{item.price}}</text>
						</view>
						<view class="numcount" @click="add(item.id)">
							<uni-number-box  @change="numChange" :min="0" :value="item.count" :max="item.maxcount"></uni-number-box>
						</view>
					</view>
				</view>
				
				
				<!-- 猜你喜欢 -->
				
				<view class="like">
					<text></text>
					<view>猜你喜欢</view>
					<text></text>
				</view>
				
				<view class="floor">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
						<swiper-item class="items" v-for="item in shopList" :key="item.id">
							<image :src="item.img" mode="widthFix"></image>
						</swiper-item>
					</swiper>
				</view>
				
				
				<!-- 结算 -->
				<view class="foot">
					<checkbox-group @change="checkAll">
						<label class="allcheck" >
							<view>全选</view>
							<checkbox value="isAllcheck" :checked="isAllcheck" />
						</label>
					</checkbox-group>
					
					<view class="rights">
						<text>合计：¥{{totals}}</text>
						<button @click="gopay" type="default" size="mini">结算</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	export default {
		
		data() {
			return {
				shopList:[],
				total:0,
				color:null,
				isAllcheck:false,
				indicatorDots: false,
				autoplay: false,
				interval: 2000,
				duration: 500,
				chooseId:"",
				childCheckId:""
			};
		},
		components:{
			uniNumberBox
		},
		onLoad(){
			var list = uni.getStorageSync("cartGood")
			for(var i in list){
				list[i].checked = false
			}
			this.shopList = list
			console.log(this.shopList)
		},
		computed:{
			totals(){
				return this.shopList.reduce((total,current)=>{
					if(current.checked){
						return total + (current.count*current.price)
						// return total + current
					}else{
						return  total
					}
				},0)
			}
		},
		methods:{
			childChange(e){
				// console.log(e,this.shopList)
				var bol = this.shopList.every(ele => ele.checked == true)
				if(bol){
					this.isAllcheck = true
				}else{
					this.isAllcheck = false
				}
			},
			add(e){
				// console.log(e)
				this.chooseId = e
			},
			
			numChange(e){
				var item = this.shopList.find(ele => ele.id == this.chooseId)
				if(item){
					item.count = e
				}
			
			},
			checkAll(e){
				this.isAllcheck = !this.isAllcheck
				console.log(e.detail.value)
				this.shopList.forEach((ele,index,arr)=>{
					ele.checked = !ele.checked
				})
			},
			gopay(){
				var ischoose = this.shopList.some(ele => ele.checked == true)
				if(ischoose){
					var item = this.shopList.filter(ele => ele.checked == true)
					uni.setStorageSync("payGoods",item)
					uni.navigateTo({
						url:"../sort/pay/pay"
					})
				}else{
					uni.showToast({
					    title: '亲，请先选择需要结算的商品！',
					    duration: 2000,
						icon:'none'
					});
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
body,html,uni-page-body {
	height: 100%!important;
	background-color: #F1ECE7;
}
.shop{
	width: 100%;
	height: 100%;
	.shop-c{
		width: 100%;
		height: 100%;
		.main{
			width: 100%;
			height: 100%;
			overflow: scroll;
			.checkbox{
				width: 672rpx;
				// height: 208rpx;
				margin: 0 auto;
				overflow: hidden;
				.checklabel{
					width: calc(100% - 60rpx);
					padding: 20rpx 30rpx;
					height: 208rpx;
					// margin: 0 auto;
					display: flex;
					flex-wrap: wrap;
					align-content: space-around;
					background: #FFFFFF;
					box-shadow: 0 8rpx 16rpx 0 rgba(83,66,49,0.08);
					border-radius: 24rpx;
					margin: 32rpx 0;
					.money{
						width: 100%;
						display: flex;
						align-items: center;
						justify-content: space-between;
						.lefts{
							display: flex;
							align-items: center;
						}
						.center{
							display: flex;
							align-items: center;
						}
						image{
							width: 136rpx!important;
							height: 136rpx!important;
							margin-right: 46rpx;
						}
						.mid{
							text{
								display: block;
								font-size: 22rpx;
								color: #8D8D8D;
								letter-spacing: 1.57rpx;
							}
							text:first-child{
								font-size: 26rpx;
								color: #3E3E3E;
								letter-spacing: 1.86rpx;
							}
						}
						.last{
							font-size: 26rpx;
							color: #8D8D8D;
						}
					}
					.numcount{
						margin-left: 380rpx;
					}
				}
			}
		}
		.foot{
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: fixed;
			left: 0;
			bottom: 0;
			width: calc(100% - 60rpx);
			padding: 0 30rpx;
			line-height: 160rpx;
			background-color: #FFFFFF;
			.allcheck{
				display: flex;
				align-items: center;
				view{
					margin-right: 10rpx;
				}
				
			}
			.rights{
				display: flex;
				align-items: center;
			}
			button{
				width: 208rpx;
				height: 80rpx;
				background: #354E44;
				border-radius: 14rpx;
				font-size: 36rpx;
				color: #FFFFFF;
				letter-spacing: 2.57rpx;
				margin-left: 26rpx;
			}
		}
		.floor{
			width: calc(100% - 60rpx);
			padding: 0 30rpx;
			margin: 0 auto;
			
			.swiper{
				margin:49rpx auto 136rpx;
				.items{
					width: 208rpx!important;
					height: 208rpx!important;
					padding-right: 24rpx;
					image{
						width: 100%;
						height: 208rpx!important;
						border-radius: 30rpx;
					}
				}
			}
		}
		.like{
			width: 100%;
			text-align: center;
			font-size: 32rpx;
			color: #3E3E3E;
			letter-spacing: 2.29rpx;
			margin-top: 94rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			text{
				width: 170rpx;
				height: 1rpx;
				border: 1rpx solid #DCCEC0;
				background-color: #DCCEC0;
				
			}
			view{
				margin: 0 34rpx;
			}
		}
		.box{
			margin-right: 20rpx;
		}
		
	}
}
</style>
