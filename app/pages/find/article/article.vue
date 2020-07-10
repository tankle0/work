<template>
	<view class="art">
		<view class="head">
			<image @click="back" src="../../../static/icons/arr-l.png" mode="widthFix"></image>
			<image @click="share" src="../../../static/icons/share-1.png" mode="widthFix"></image>
		</view>
		<view class="top">
			<view class="imgs">
				<image :src="articleList.coverImg" mode="widthFix"></image>
			</view>
			<view class="heart">
				<image @click="collect" src="../../../static/icons/heart.png" mode="widthFix"></image>
			</view>
			
		</view>
		<view class="main">
			<view class="title">
				<view class="big">
					{{articleList.title}}
				</view>
				<view >{{articleList.author}}</view>
			</view>
			<view class="dot">
				<view>
					<text></text>
					<text></text>
					<text></text>
				</view>
				<text class="rights">¥{{articleList.price}}</text>
				
			</view>
		</view>
		<!-- 底部 -->
		<view class="foot">
			<view class="foot-c">
				<view class="content">
					<text>{{zanCount}}</text>
					<image src="../../../static/icons/zan.png" mode="widthFix"></image>
				</view>
				
				<view class="content">
					<text>{{collectCount}}</text>
					<image src="../../../static/icons/collect-active.png" mode="widthFix"></image>
				</view>
				<view class="content">
					<text>{{viewCount}}</text>
					<image src="../../../static/icons/chat-active.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
		
		<!-- 分享 -->
		<uni-popup ref="popup" type="share">
		    <uni-popup-share title="分享到" @select="select"></uni-popup-share>
		</uni-popup>
		
	</view>
</template>

<script>
	import {articleDetail} from "../../../utils/find/find.js"
	import UniPopupShare from '@/components/uni-popup/uni-popup-share.vue'
	export default {
		components:{
			UniPopupShare
		},
		data() {
			return {
				articleList:[],
				collectCount: Math.round(Math.random()*800),
				viewCount:Math.round(Math.random()*800),
				zanCount:Math.round(Math.random()*800)
			};
		},
		onLoad(options){
			articleDetail({
				id:options.id
			})
			.then(res=>{
				console.log(res)
				res.data.data.viewCount = this.viewCount
				res.data.data.zanCount = this.zanCount
				res.data.data.collectCount = this.collectCount
				this.articleList = res.data.data
			})
		},
		methods:{
			back(){
				uni.switchTab({
					url:"../find"
				})
			},
			//收藏
			collect(){
				var item = uni.getStorageSync("collectArticle")
				var obj = {
					...this.articleList,
				}
				if(item){
					var article = item.find(ele => ele.id == this.articleList.id)
					if(article){
						uni.showToast({
						    title: '亲，你已收藏过啦！',
						    duration: 1000,
							icon:'none'
						});
					}else{
						item.push(obj)
						uni.setStorageSync("collectArticle",item)
						uni.showToast({
						    title: '收藏成功！',
						    duration: 1000,
							// icon:'none'
						});
					}
				}else{
					uni.setStorageSync("collectArticle",[obj])
					uni.showToast({
					    title: '收藏成功！',
					    duration: 1000,
						// icon:'none'
					});
				}
				
				// console.log(obj)
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
.art{
	width: 100%;
	height: 100%;
	.head{
		position: fixed;
		left: 0;
		top: 0;
		width: calc(100% - 80rpx);
		padding: 0 40rpx;
		height: 90rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: transparent;
		z-index: 5;
		image{
			width: 46rpx;
			height: 44rpx;
		}
	}
	.top{
		position: relative;
		width: 100%;
		height: 634rpx;
		z-index: 2;
		.imgs{
			height: 100%;
			image{
				width: 100%;
				height: 634rpx!important;
				border-radius: 0 0 0 200rpx;
			}
		}
		.heart{
			position: relative;
			left: 554rpx;
			top: -50rpx;
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			background: #354E44;
			box-shadow: 0 16rpx 24rpx 0 rgba(70,70,70,0.20);
			display: flex;
			justify-content: center;
			align-items: center;
			image{
				width: 48rpx;
				height: 48rpx;
			}
		}
	}
	.main{
		width: calc(100% - 156rpx);
		margin: 84rpx auto 0;
		.title{
			font-size: 30rpx;
			color: #B0B0B0;
			letter-spacing: 2.2rpx;
			margin-bottom: 17rpx;
			.big{
				font-size: 36rpx;
				color: #3E3E3E;
				letter-spacing: 2.6rpx;
			}
		}
		.dot{
			display: flex;
			justify-content: space-between;
			view{
				text:nth-child(1){
					background-color: #663725;
					margin-right: 12rpx;
				}
				text:nth-child(2){
					background-color: #9F4405;
					margin-right: 12rpx;
				}
				text:nth-child(3){
					background-color: #CB821B;
				}
			}
			
			.rights{
				background-color: transparent;
				margin-right: 60rpx;
			}
			text{
				display: inline-block;
				width: 28rpx;
				height: 28rpx;
				border-radius: 50%;
				font-size: 36rpx;
				color: #3E3E3E;
				letter-spacing: 2.6rpx;
			}
		}
	}
	.foot{
		width: 100%;
		height: 140rpx;
		position: fixed;
		left: 0;
		bottom: 0;
		.foot-c{
			height: 100%;
			display: flex;
			align-items: center;
			flex-direction: row-reverse;
			.content{
				display: flex;
				align-items: center;
				margin-right: 40rpx;
				image{
					width: 48rpx;
					height: 48rpx;
					margin-right: 24rpx;
				}
			}
		}
	}
}

</style>
