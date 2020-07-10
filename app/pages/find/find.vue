<template>
	<div class="find">
		<!-- 导航标题 -->
		<div class="head-nav" :class="{'hid':current == 1}">
			<radio-group class="radio-group" @change="radioChange">
				<label class="nav-item" :class="{active: current=='0'}" >
					<radio value="0" :checked="current == '0' " />
					<text class="text">精选文章</text>
				</label>
				<label class="nav-item" :class="{active: current=='1'}" >
					<radio value="1" :checked="current == '1'" />
					<text class="text">好物推荐</text>
				</label>
			</radio-group>
			<view v-show = " current == 0 " class="after"></view>
		</div>
		
		<!-- 列表内容 -->
		<div class= "main" v-show = " current == 0 ">
			<!-- 列表导航 -->
			<div class="tops">
				<radio-group  class="img-radio" @change="imgChange">
					<label class="img-label" v-for="(item, index) in imgList" :key="item.id">
						<radio  :value="item.id" :checked="item.id == currents" />
						<div class="imgs" :class="{check: item.id == currents}">
							<image :src="item.id == currents?item.imgA:item.imgz" mode="widthFix"></image>
						</div>
					</label>
				</radio-group>
				
			</div>
			<!-- 精选文章列表内容 -->
			<div class="detail" v-for="item in artList" :key="item.id">
				<view class="top">
					<navigator :url="`article/article?id=${item.id}`">
						<image :src="item.coverImg" mode="widthFix"></image>
					</navigator>
					<view class="texts">
						<text class="big">{{item.title}}</text>
						<text>{{item.author}}</text>
					</view>
					<div class="bot">
						<view class="left">
							<image src="../../static/icons/view.png" mode="widthFix"></image>
							<text>{{item.price}}</text>
						</view>
						<view class="right">
							<image @click="zan" src="../../static/icons/zan.png" mode="widthFix"></image>
							<image @click="share" src="../../static/icons/share.png" mode="widthFix"></image>
						</view>
					</div>
				</view>
			</div>
		</div>
		
		<!-- 分享弹窗 -->
		<uni-popup ref="popup" type="share">
		    <uni-popup-share title="分享到" @select="select"></uni-popup-share>
		</uni-popup>
		
		<!-- 好物推荐内容 -->
		<swiper v-show = " current == 1 " class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
			<!-- <swiper-item v-for="item in goodImg" :key="item.id" :style="background: `url(${item.cover_img})` "> -->
			<swiper-item v-for="item in goodImg" :key="item.id" :style="{ 'background-image': 'url(' + item.cover_img + ')'} ">
				<!-- <view class="swiper-item uni-bg-red">A</view> -->
			</swiper-item>
		</swiper>
		
		
		
	</div>
</template>

<script>
	import {seriesAll,productList,articleList} from "../../utils/find/find.js"
	import {kind} from "../../utils/sort/index.js"
	import UniPopupShare from '@/components/uni-popup/uni-popup-share.vue'
	export default {
		components:{
			UniPopupShare
		},
		data() {
			return {
				current:"0",
				currents: "",
				artList:[],
				imgList:[],
				indicatorDots: false,
				autoplay: false,
				interval: 2000,
				duration: 500,
				goodImg:[]
			}
		},
		onLoad(){
			this.getkind();
			
			
			seriesAll()
			.then(res=>{
				this.goodImg = res.data.data
				console.log(this.goodImg)
			})
			
			
		},
		methods: {
			//获取分类  嵌套异步操作 用async
			async getkind(){
				const list = await kind()
				// console.log(list)
				var data = list.data.data
				var icon = [
					{
						imgz:"../../static/icons/bulb.png",
						imgA:"../../static/icons/bulb-active.png"
					},
					{
						imgz:"../../static/icons/gui.png",
						imgA:"../../static/icons/gui-active.png"
					},
					{
						imgz:"../../static/icons/chair.png",
						imgA:"../../static/icons/chair-active.png"
					},
					{
						imgz:"../../static/icons/cloth.png",
						imgA:"../../static/icons/cloth-active.png"
					}
				]
				for(var i in data){
					data[i].imgz = icon[i].imgz
					data[i].imgA = icon[i].imgA
				}
				this.imgList = data
				this.currents = data[0].id
				this.getArticleList();
			},
			//获取文章分类
			async getArticleList(){
				const data = await articleList({
					kindId:this.currents
				})
				this.artList = data.data.data.list
				// console.log(this.artList)
			},
			radioChange(e) {
				this.current = e.detail.value;
				// console.log(e.detail.value)
				
			},
			imgChange(e){
				// console.log(e.detail.value,1)
				this.currents = e.detail.value
				this.getArticleList()
			},
			zan(){
				uni.showToast({
				    title: '赞+1！',
				    duration: 1000,
					// icon:'none'
				});
			},
			share(){
				this.$refs.popup.open()
			},
			select(item,index){
				this.$refs.popup.close()
				uni.showToast({
				    title: '分享成功！',
				    duration: 1000,
					// icon:'none'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
body,html,uni-page-body {
	height: 100%!important;
	background-color: transparent;
}
.find{
	width: 100%;
	// height: 2000rpx;
	overflow: hidden;
	height: 100%;
	// background: #F1ECE7;
	.head-nav {
		width: 100%;
		height: 130rpx;
		background-color: #354E44;
		color: #fff;
		font-size: 32rpx;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 20;
		.radio-group {
			display: flex;
			justify-content: center;
			align-items: center;
			.nav-item {
				radio {
					display: none;
				}
				.text {
					line-height: 88rpx;
					box-sizing: border-box;
					padding: 10rpx 0;
					margin: 0 10rpx;
				}
				&.active .text {
					border-bottom: 1px solid #fff;
				}
			}
		}
	}
	.hid{
		color: black;
		background-color: transparent;
	}
	.after{
		display: block;
		position: relative;
		content: "";
		width: 100%;
		height: 60rpx;
		transform: translateY(5rpx);
		background: #F1ECE7;
		border-radius: 40rpx 40rpx 0 0;
		z-index: 0;
	}
	.main{
		position: relative;
		width: 100%;
		height: 100%;
		z-index: 15;
		background: #F1ECE7;
		margin-top: 100rpx;
		.tops{
			width: calc(100% - 200rpx);
			height: 100rpx;
			margin: 0 auto 80rpx;
			.img-radio{
				width: 100%;
				height: 100rpx;
				margin-bottom: 40rpx;
				justify-content: space-around;
				align-items: center;
				display: flex;
				.img-label{
					width: 100%;
					height: 100%;
					radio{
						display: none;
					}
					.imgs{
						width: 100rpx;
						height: 100rpx;
						border-radius: 50%;
						background: #FEFCFC;
						display: flex;
						justify-content: center;
						align-items: center;
						margin-top: 50rpx;
						image{
							width: 48rpx;
							height: 48rpx;
						}
					}
					.check{
						background: #354E44;
						box-shadow: 0 12px 16px 0 rgba(83,66,49,0.26);
					}
				}
			}
		}
		.detail{
			width: 100%;
			margin-bottom: 56rpx;
			.top{
				position: relative;
				width: 674rpx;
				height: 482rpx;
				margin: 0 auto;
				border-radius: 30rpx;
				background-color: #FFFFFF;
				.bot{
					width: 574rpx;
					margin: 30rpx auto 0;
					display: flex;
					align-items: center;
					justify-content: space-between;
					.left{
						display: flex;
						align-items: center;
						image{
							width: 44rpx;
							height: 28rpx!important;
							margin-right: 10rpx;
						}
						text{
							font-size: 26rpx;
							color: #3E3E3E;
							letter-spacing: 1.86rpx;
						}
					}
					.right{
						image{
							width: 40rpx;
							height: 40rpx!important;
						}
						:first-child{
							margin-right: 43rpx;
						}
					}
				}
				image{
					width: 100%;
					height: 382rpx!important;
				}
				.texts{
					position: absolute;
					left: 20rpx;
					bottom: 120rpx;
					text{
						display: block;
						font-size: 30rpx;
						color: #FFFFFF;
						letter-spacing: 2.14rpx;
						
					}
					.big{
						font-size: 48rpx;
						letter-spacing: 3.43rpx;
					}
				}
				
			}
			
		}
	}
	.swiper{
		position: relative;
		width: 100%;
		height: 100%;
		z-index: 10;
		swiper-item{
			width: 100%;
			height: 100%;
		}
	}
	
	
}

</style>
