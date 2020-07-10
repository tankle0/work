<template>
	<view class="box">
		<view class="head" >
			<view class="top " :class=" !isShow?'act':''" >
				<image class="chat" src="../../static/icons/chat.png" mode="widthFix" ></image>
				<view class="texts">
					<v-tabs
					  :tabs="['推荐','品牌']"
					  height="40px"
					  v-model="activeTab"
					  color="#FFFFFF"
					  activeColor="#FFFFFF"
					  fontSize="32rpx"
					  activeFontSize="32rpx"
					  lineHeight="4rpx"
					  :lineScale="1"
					  lineColor="#FFFFFF"
					  @change="changes"
					/>
				</view>
				<view class="right">
					<navigator url="../search/search">
						<image src="../../static/icons/search.png" mode="widthFix"></image>
					</navigator>
					<navigator class="car" url="../shop/shop">
						<image src="../../static/icons/cart.png" mode="widthFix"></image>
					</navigator>
				</view>
			</view>
		</view>
		
		<view class="main" v-if="isShow">
			<!-- //轮播 -->
			<swiper class="swiper"  :indicator-dots="indicatorDots" indicator-active-color="#D8D8D8" :autoplay="autoplay" :circular="circular" :interval="interval" :duration="duration">
				<swiper-item v-for="item in bannerList" :key="item.id">
					<image class="imgs" :src="item.img_url" mode="heightFix" ></image>
				</swiper-item>
			</swiper>
			
			<!-- 品类推荐 -->
			<view class="brand">
				<view class="brandTop">
					<text class="fir">品类推荐</text>
					<view>
						<navigator open-type="switchTab" url="../find/find">
							<text>更多</text>
						</navigator>
						<image src="../../static/icons/arr-r-1.png" mode="widthFix"></image>
					</view>
				</view>
				<navigator open-type="switchTab" url="../find/find">
					<swiper class="swiper" :autoplay="autoplay" :circular="circular"  :interval="interval" :duration="duration">
						<swiper-item  v-for="item in brandList" :key="item.id">
							<view class="sofa">
								<!-- <image  :src="item.coverImg" mode="widthFix" ></image> -->
								<view class="images">
								</view>
							</view>
							<view class="sofaBot">
								<view class="chin">
									{{item.cname}}
								</view>
								<view >
									{{item.descr}}
								</view>
							</view>
						</swiper-item>
					</swiper>
				</navigator>
			</view>
			
			<!-- 特色优选 -->
			<view class="brand feature">
				<view class="brandTop">
					<text class="fir">特色优选</text>
					<view>
						<text>更多</text>
						<image src="../../static/icons/arr-r-1.png" mode="widthFix"></image>
					</view>
				</view>
				<swiper  previous-margin="60rpx" next-margin="60rpx" class="swiper" :autoplay="autoplay" :circular="circular"  :interval="interval" :duration="duration">
					<swiper-item v-for="item in hotList" :key="item.id">
						<navigator class="nav" open-type="navigate" :url="`../sort/detail/detail?productId=${item.id}`">
							<view class="inner">
								<view class="sofa">
									<image class="images" :src="item.cover_img" mode="widthFix"></image>
									<view class="sofaBot">
										<view class="chin">{{item.descr}}</view>
										<view >{{item.detail_desc}}</view>
										<view class="dots">
											<text v-for="(ele,index) in item.colors" :key="index" :style="{background:ele}">
											</text>
										</view>
										<view class="desc">{{item.gname}}</view>
									</view>
								</view>
							</view>
						</navigator>
					</swiper-item>
					
				</swiper>
			</view>
		</view>
		
		<view class="recommend" v-else>
			<view class="mains">
				<view class="content"  v-for="item in brandList">
					<image :src="item.coverImg" mode="widthFix"></image>
					<view class="btitle">
						<view >{{item.cname}}</view>
						<view >{{item.descr}}</view>
					</view>
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import vTabs from '../../components/v-tabs/v-tabs.vue'
	import {banner ,brandList,hotList} from "../../utils/home/index.js"
	export default {
		data() {
			return {
				bannerList:[],
				brandList:[],
				hotList:[],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				circular: true,
				activeTab: 0,
				isShow:true
			}
		},
		components: {
			vTabs,
		 },
		methods: {
			changes(){
				this.isShow = !this.isShow
			}
		},
		onLoad(options){
			banner()
			.then(res=>{
				// console.log(res)
				this.bannerList = res.data.data
			})
			brandList()
			.then(res=>{
				// console.log(res)
				this.brandList = res.data.data
			})
			hotList()
			.then(res=>{
				// console.log(res)
				this.hotList = res.data.data
			})
		}
	}
</script>

<style>
body,html{
	height: 100%!important;
	background-color: #F1ECE7!important;
}
</style>
<style lang="scss" scoped>
.act{
	width: 100%;
	padding: 0 30rpx;
	margin: 0!important;
	background-color: rgb(53, 78, 68);
	border-radius: 0 0 30rpx 30rpx;
}
.box{
	width: 100%;
	height: 1500rpx;
	background-color: #F1ECE7!important;
}
.status_bar {
	 height: var(--status-bar-height);
	 // height: 60rpx;
	 width: 100%;
	 // background-color: transparent;
}
.swiper{
	width: 100%;
	height: 516rpx;
	.imgs{
		width: 100%!important;
		height: 100%;
	}
}
.top{
	position: fixed;
	left: 0;
	top: 0;
	width: calc(100% - 60rpx);
	height: 88rpx;
	margin: 0 30rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	z-index: 10;
	image{
		width: 36rpx;
		height: 36rpx;
	}
	.texts{
		margin-left: 40rpx;
		letter-spacing: 6rpx!important;
	}
	.chat{
		width: 42rpx;
		height: 42rpx;
	}
	.right{
		display: flex;
		.car{
			margin-left: 36rpx;
		}
	}
}
.brand{
	width: calc(100% - 60rpx);
	margin: 0 auto;
	image{
		width: 12rpx;
		height: 18rpx;
		margin-left: 3rpx;
	}
	.brandTop{
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 26rpx;
		color: #8C8C8C;
		letter-spacing: 1.86rpx;
		margin: 40rpx auto;
		.fir{
			font-size: 32rpx;
			color: #3E3E3E;
			letter-spacing: 2.29rpx;
		}
		view{
			display: flex;
			align-items: center;
		}
	}
	.swiper{
		width: 100%;
		height: 286rpx;
		display: flex;
		justify-content: space-around;
		margin-bottom: 46rpx;
		
		swiper-item{
			width: 35%!important;
			// padding: 0 20rpx 0 0;
			// margin-right: 40rpx;
			text-align: center;
			.sofaBot{
				width: 88%;
				font-size: 20rpx;
				color: #B0B0B0;
				letter-spacing: 1.43rpx;
				.chin{
					font-size: 26rpx;
					color: #3E3E3E;
					letter-spacing: 1.86rpx;
				}
			}
		}
	}
	.sofa{
		position: relative;
		width: 208rpx;
		height: 140rpx;
		background: #FFFFFF;
		box-shadow: 0 8px 24px 0 rgba(122,98,75,0.06);
		border-radius: 20px;
		margin-bottom: 80rpx;
		.images{
			position: absolute;
			background-color: orange;
			left: 32rpx;
			top: 52rpx;
			width: 144rpx!important;
			height: 100%!important;
		}
	}
}
.brand.feature{
	width: 100%;
	margin-bottom: 80rpx;
	.brandTop{
		width: calc(100% - 60rpx);
		margin: 93rpx auto;
	}
	.swiper{
		overflow: hidden;
		margin-bottom: 80rpx;
		// height: 300rpx;
		
		swiper-item{
			overflow: auto;
			width: 100%!important;
			height: 314rpx!important;
			.inner{
				position: relative;
				height: 314rpx;
				// margin-top: 40rpx;
			}
			.sofa{
				position: relative;
				width: 590rpx;
				margin: 0 auto;
				bottom: -34rpx;
				height: 260rpx;
				display: flex;
				align-items: center;
				.images{
					position: absolute;
					left: 44rpx;
					top:auto;
					bottom: 34rpx;
					width: 194rpx!important;
					height: 280rpx!important;
				}
				.sofaBot{
					text-align: left;
					width: auto!important;
					margin-left: 270rpx;
					.dots{
						text{
							display: inline-block;
							width: 20rpx;
							height: 20rpx;
							border-radius: 50%;
							// background: #446675;
						}
					}
				}
			}
		}
		
		
	}
	
}

.recommend{
	background-color: #EFE9E4;
	width: 100%;
	overflow: hidden;
	.mains{
		// height: 100%;
		height: 4120rpx;
		margin-top: 120rpx;
	}
	.content{
		width: 670rpx;
		height: 612rpx;
		background: #FFFFFF;
		box-shadow: 0 8px 20px 0 rgba(122,98,75,0.08);
		border-radius: 20px;
		margin: 0 auto 56rpx;
		image{
			width: 100%;
			height: 426rpx!important;
		}
		.btitle{
			margin: 56rpx 56rpx 0;
			font-size: 22rpx;
			color: #B1B1B1;
			letter-spacing: 1.57rpx;
			:first-child{
				font-size: 32rpx;
				color: #3E3E3E;
				letter-spacing: 2.29rpx;
				margin-bottom: 17rpx;
			}
		}
	}
}

</style>
