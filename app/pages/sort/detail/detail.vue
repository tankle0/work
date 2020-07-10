<template>
	<view class="car">
		<!--  #ifdef  MP-WEIXIN -->
			<view class="status_bar">
				 <!-- 这里是状态栏 -->
			</view>
		<!--  #endif -->
		
		<view class="head">
			<!-- <navigator open-type="navigate" :url="`../product/product?kindId=${this.backId}`"> -->
			<!-- <navigator url="../product/product"> -->
				<image @click="back" src="../../../static/icons/arr-l.png" mode="widthFix"></image>
			<!-- </navigator> -->
			<text>乐居</text>
			<text></text>
		</view>
		<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
			<swiper-item v-for="img in detailImgs.imgs">
				<image :src="img" mode="scaleToFill"></image>
			</swiper-item>
		</swiper>
		<view class="star">
			<image @click="collect" src="../../../static/icons/collect.png" mode="widthFix"></image>
		</view>
		<view class="dots">
			<text ></text>
			<text ></text>
		</view>
		<view class="detail">
			<view>{{detailsList.gname}}</view>
			<view>{{detailsList.detail_desc}}</view>
			<view>¥{{detailsList.price_now}}</view>
		</view>
		<view class="girl">
			<image :src="detailsList.cover_img" mode="widthFix"></image>
		</view>
		
		
		<!-- //弹窗 -->
		<view class="pop" v-show="show">
			<view class="main">
				<view class="main-c">
					<view class="ban">
						<view class="lefts">
							<image  :src="detailsList.cover_img" mode="widthFix"></image>
						</view>
						<view class="tip">
							<view >{{detailsList.gname}}</view>
							<view >库存数量:{{count}}</view>
						</view>
						<image class="close" @click="show = false" src="../../../static/icons/x.png" mode="widthFix"></image>
					</view>
					
					<view class="kinds">
						<view class="tops">
							颜色分类
						</view>
						<view class="select">
							 <radio-group class="group" @change="radioChange">
								<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in skuList" :key="item.id">
									<view class="big">
										<radio :value="item.id" class="radios" :checked="index === current" />
										<view class="cont">{{item.color_text}}</view>
									</view>
								</label>
							</radio-group>
						</view>
					</view>
					
					<view class="fen">
						<view class="tops">
							特色服务
						</view>
						<view class="send">
							 <text>送货入户</text>
							 <text>【商家赠送】</text>
						</view>
						<view class="send">
							 <text>上门安装</text>
							 <text>【商家赠送】</text>
						</view>
					</view>
					
					<!-- 购买数量 -->
					<view class="pay">
						<text>购买数量</text>
						<view class="numb">
							<view @click="ad">-</view>
							<view>{{num}}</view>
							<view @click="del">+</view>
						</view>
					</view>
					<button @click="push" :class="{have:ishave}"  type="default">确定</button>
				</view>
				
			</view>
		</view>
		
		
		<view class="foot">
			<image src="../../../static/icons/kf.png" mode="widthFix"></image>
			<view class="right">
				<!-- <image src="../../../static/icons/cart.png" mode="widthFix"></image> -->
				<button class="mini-btn" @click="add" >加入购物车</button>
				<button type="primary" @click="buy" >立即购买</button>
			</view>
		</view>
		
	</view>
	
</template>

<script>
	import {detailsList} from "../../../utils/sort/index.js"
	export default{
		data(){
			return{
				productId:"",
				detailsList:[],
				detailImgs:{
					imgs:[]
				},
				count:0,
				skuList:[],
				isAdd:false,
				current: 0,
				show:false,
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				num:1,
				chooseId:"",
				obj:{},
				backId:"",
				ishave:false
			}
		},
		onLoad(options){
			// console.log(this.colors)
			this.backId = uni.getStorageSync("back")
			this.productId = options.productId
			detailsList({
				productId:this.productId
			})
			.then(res=>{
				// console.log(res)
				this.detailsList = res.data.data
				this.detailImgs.imgs = res.data.data.imgs.split(",")
				this.skuList = this.detailsList.skuList
				this.chooseId = this.skuList[0].id
				// console.log(this.detailsList,this.skuList)
				this.count = this.skuList[0].count
				
			})
		},
	
		methods:{
			add(){
				this.show = !this.show
				this.isAdd = true
			},
			back(){
				uni.navigateBack({
					delta:2
				})
			},
			//立即购买
			buy(){
				this.show = !this.show
				this.isAdd = false
			},
			//收藏
			collect(){
				var item = uni.getStorageSync("collectGood")
				if(item){
					var isHave = item.some(ele => ele == this.productId )
					if(isHave){
						uni.showToast({
						    title: '亲，您已收藏过啦！',
						    duration: 2000,
							icon:'none'
						});
					}else{
						item.push(this.productId)
						uni.setStorageSync('collectGood', item);
						uni.showToast({
						    title: '收藏成功！',
						    duration: 1000,
							icon:'none'
						});
					}
				}else{
					uni.setStorageSync('collectGood', [this.productId]);
					uni.showToast({
					    title: '收藏成功！',
					    duration: 1000,
						icon:'none'
					});
				}
				
			},
			//弹窗确认
			push(){
				//加入购物车
				if(this.isAdd){
					if(this.count == 0){
						uni.showToast({
						    title: '抱歉，商品数量不足！',
						    duration: 1000,
							icon:'none'
						});
					}else{
						var item = uni.getStorageSync("cartGood")
						const chooseGood = this.skuList.find(ele => ele.id == this.chooseId)
						
						if(item){
						// console.log(item,this.productId)
							var isHave = item.some(ele => ele.id == this.chooseId)
							var goods = item.find(ele => ele.id == this.chooseId)
							var index = item.findIndex(ele => ele.id == this.chooseId)
							// console.log(isHave)
							if(isHave){
								goods.count += this.num
								item[index] = goods 
								uni.setStorageSync("cartGood",item)
							}else{
								item.push(
									{
										productId:this.productId,
										count:this.num,
										id:this.chooseId,
										name:this.detailsList.gname,
										img:this.detailsList.cover_img,
										code: chooseGood.sku_code,
										price: chooseGood.price,
										maxcount: this.count
									}
								)
								uni.setStorageSync("cartGood",item)
							}
						}else{
							uni.setStorageSync("cartGood",[
								{
									productId:this.productId,
									count:this.num,
									id:this.chooseId,
									name:this.detailsList.gname,
									img:this.detailsList.cover_img,
									code: chooseGood.sku_code,
									price: chooseGood.price,
									maxcount: this.count
								}
							])
						}
						uni.showToast({
						    title: '添加购物车成功！',
						    duration: 1000,
							icon:'none'
						});
						this.show = !this.show
					}
				//购买	
				}else{
					if(this.count == 0){
						uni.showToast({
						    title: '抱歉，商品数量不足！',
						    duration: 1000,
							icon:'none'
						});
					}else{
						var item = this.skuList.find(ele => ele.id == this.chooseId)
						this.obj = {
							num : this.num,
							price : item.price,
							color : item.color,
							sku_code : item.sku_code,
							color_text : item.color_text,
							product_id : item.product_id,
							id : item.id,
							name:this.detailsList.gname,
							img : this.detailsList.cover_img
						}
						this.$store.commit("pay",this.obj)
						
						// getApp().globalData.obj = this.obj
						// console.log(this.obj ,this.$store.state.payList)
						uni.navigateTo({
							url:"../pay/pay"
						})
					}
					
				}
			},
			
			radioChange(res){
				console.log(this.current,res)
				const item = this.skuList.find(ele => ele.id == res.detail.value)
				this.chooseId = item.id
				this.count = item.count
				if(this.num>item.count){
					this.num = item.count
				}else{
					this.num = 1
				}
			},
			ad(){
				if(this.num<=1){
					uni.showToast({
					    title: '商品数量不能减少了！',
					    duration: 1000,
						icon:'none'
					});
				}else{
					this.num--
				}
			},
			del(){
				if(this.num>=this.count){
					uni.showToast({
					    title: '抱歉，商品数量不足！',
					    duration: 1000,
						icon:'none'
					});
					this.num = this.count
				}else{
					this.num++
				}
				
			}
				
		}
	}

</script>

</style>
<style lang="scss" scoped>
.uni-radio .uni-radio-input{
	width: 242rpx!important;
	height: 60rpx!important;
}
.status_bar {
  height: var(--status-bar-height);
  height: 50rpx;
  width: 100%;
  background-color: #354E44;
}
.car{
	overflow: hidden;
	.head{
		display: flex;
		justify-content: space-between;
		align-items: center;
		// position: fixed;
		width: calc(100% - 40rpx);
		height: 80rpx;
		padding: 0 40rpx;
		background-color: #354E44;
		z-index: 99;
		color: #FFFFFF;
		text:last-child{
			display: inline-block;
			width: 60rpx;
		}
		image{
			width: 40rpx;
			height: 40rpx;
		}
	}
}

.swiper{
	position: relative;
	width: 100%;
	height: 624rpx;
	// margin-top: 80rpx;
	image{
		position: relative;
		width: 100%;
		height: 100%;
		z-index: 1;
	}
}
.star{
	position: relative;
	width: 100rpx;
	height: 100rpx;
	border-radius: 50%;
	background: #354E44;
	transform: translateX(554rpx) translateY(-50rpx);
	z-index: 10;
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: 0 16px 24px 0 rgba(70,70,70,0.20);
	image{
		width: 46rpx!important;
		height: 46rpx!important;
	}
}
.dots{
	width: 200rpx;
	margin: 0 auto;
	text{
		display: inline-block;
		width: 50rpx;
		height: 50rpx;
		border-radius: 50%;
		background-color: #007AFF;
		margin: 0 20rpx;
	}
}
.detail{
	margin: 28rpx auto 140rpx 68rpx;
	:first-child
	,:last-child{
		font-size: 38rpx;
		color: #3E3E3E;
		letter-spacing: 2.6px;
	}
	:nth-child(2){
		font-size: 30rpx;
		color: #B0B0B0;
		margin-bottom: 23rpx;
	}
}
.girl{
	width: calc(100% - 120rpx);
	text-align: center;
	margin: 200rpx auto;
}
.foot{
	position: fixed;
	left: 0;
	bottom: 0;
	width: calc(100% - 120rpx);
	padding: 0 60rpx;
	height: 120rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: #FFFFFF;
	image{
		width: 60rpx;
		height: 60rpx;
	}
	.right{
		display: flex;
		align-items: center;
		image{
			width: 48rpx!important;
			height: 48rpx!important;
		}
		:first-child{
			margin-right: 24rpx;
			width: 240rpx;
			height: 80rpx;
			background: #E2E2E2;
			border-radius: 14rpx;
		}
		:last-child{
			font-size: 32rpx;
			color: #FFFFFF;
			background: #354E44;
			border-radius: 14rpx;
		}
	}
}
.pop{
	position: fixed;
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
	background-color: rgba(0,0,0,.2);
	z-index: 40;
	.main{
		position: absolute;
		left: 50%;
		top: 50%;
		margin-top: -400rpx;
		margin-left: -315rpx;
		width: 630rpx;
		height: 800rpx;
		background-color: #FFFFFF;
		border-radius: 40rpx;
		.main-c{
			width: calc(100% - 120rpx);
			margin: 0 auto;
			.ban{
				display: flex;
				align-items: center;
				justify-content: space-between;
				.close{
					width: 42rpx;
					height: 42rpx;
				}
				.tip{
					font-size: 28rpx;
					color: #3E3E3E;
					letter-spacing: 2rpx;
					:last-child{
						font-size: 24rpx;
						color: #B0B0B0;
						letter-spacing: 1.71rpx;
					}
				}
			}
		}
		.tops{
			margin-bottom: 16rpx;
			font-size: 28rpx;
			color: #3E3E3E;
		}
		.send{
			display: flex;
			justify-content: space-between;
			padding: 0 20rpx;
			align-items: center;
			width: 380rpx;
			height: 60rpx;
			background: rgba(0,0,0,.2);
			border-radius: 10rpx;
			color: #3E3E3E;
			font-size: 26rpx;
			margin-bottom: 10rpx;
		}
		.lefts{
			transform: translateY(-50rpx);
			image{
				width: 192rpx;
				height: 192rpx;
			}
		}
		.select{
			.group{
				display: flex;
				align-items: center;
				font-size: 26rpx;
				.big{
					position: relative;
					width: 242rpx;
					height: 60rpx;
					.cont{
						position: absolute;
						left: 80rpx;
						top: 0;
					}
					.radios{
						width: 100%;
						height: 100%;
					}
				}
			}
		}
		button{
			width: 208rpx;
			line-height: 80rpx;
			background: #354E44;
			border-radius: 14px;
			color: #FFFFFF;
			margin-top: 48rpx;
		}
		.have{
			background-color: grey;
		}
	}
	.pay{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 60rpx auto 48rpx;
		text{
			font-size: 28rpx;
			color: #3E3E3E;
		}
		.numb{
			display: flex;
			:nth-child(2n-1){
				width: 60rpx;
				line-height: 60rpx;
				text-align: center;
				background: #F1ECE7;
				border-radius: 50%;
			}
			:nth-child(2n){
				width: 72rpx;
				height: 60rpx;
				text-align: center;
				background: #F1ECE7;
				border-radius: 21.6rpx;
			}
		}
	}
}

</style>
