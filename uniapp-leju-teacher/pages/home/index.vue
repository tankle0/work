<template>
	<view class="home-main">
		<uni-nav-bar class="head-nav" fixed :backgroundColor="headColor">
			<view class="title">
				<text class="nav-item" :class="{active:show==1}" @tap="show=1">推荐</text>
				<text class="nav-item" :class="{active:show==2}" @tap="show=2">品牌</text>
			</view>
			<view slot="left">
				<image @click="goChat" class="icon icon-chat" src="../../static/icons/chat.png"></image>
			</view>
			<view slot="right" class="head-nav-right">
				<navigator class="nav-search" url="/pages/other/search/index">
					<image class="icon icon-search" src="../../static/icons/search.png"></image>
				</navigator>
				<navigator class="nav-cart" url="/pages/buyCart/index">
					<image class="icon icon-cart" src="../../static/icons/cart.png"></image>
				</navigator>
			</view>
		</uni-nav-bar>
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar" v-if="show==2">
			<view class="top_view"></view>
		</view>
		<!-- #endif -->
		<view v-show="show==1" class="section-home">
			<view class="section-banner">

				<swiper class="swiper-banner" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="400">
					<swiper-item v-for="m in bannerList" :key="m.id">
						<view class="swiper-item">
							<image class="img" :src="m.img_url" mode="scaleToFill"></image>
						</view>
					</swiper-item>

				</swiper>
				<!-- 系列 -->
				<div class="section-series">
					<div class="common-title">
						<text class="title">品类推荐</text>
						<text class="more" @tap="seriesMore">更多></text>
					</div>
					<scroll-view class="scroll-series" scroll-x="true">
						<view @tap="goSeries(item.id)" class="series-block" v-for="item in series" :key="item.id">
							<image class="image" :src="item.cover_img" mode=""></image>
							<div class="cname">{{item.cname}}</div>
							<div class="ename">{{item.ename}}</div>
						</view>
					</scroll-view>
				</div>
				<div class="section-hot">
					<div class="common-title">
						<text class="title">特色优选</text>
					</div>
					<swiper class="swiper" previous-margin="80rpx" next-margin="40rpx">
						<swiper-item class="hot-swiper-item" v-for="item in hotList" :key="item.id">
							<navigator :url="'/pages/kind/detail/index?productId='+item.id" class="swiper-item">
								<image class="image" :src="item.cover_img" mode=""></image>
								<div class="inner-card">
									<div class="info">
										<div class="gname">{{item.gname}}</div>
										<div class="sub-gname">{{item.detail_desc}}</div>
										<div class="dotts">
											<span class="dott" v-for="color in item.colors" :key="color" :style="{backgroundColor:color}"></span>
										</div>
										<div class="descr">{{item.descr}}</div>
									</div>
								</div>

							</navigator>
						</swiper-item>
					</swiper>
				</div>
			</view>
		</view>
		<view v-show="show==2" class="section-brand">
			<Brands :brandList="brandList"></Brands>
		</view>

	</view>
</template>

<script>
	import homeApi from '@/api/home'
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import Brands from './brand/index.vue'
	import findApi from '@/api/find/index.js'
	export default {
		components: {
			uniNavBar,
			Brands
		},
		data() {
			return {
				bannerList: [],
				brandList: [],
				show: 1,
				series: [],
				hotList: []
			}
		},
		onLoad() {
			this.initData();
		},
		onPullDownRefresh() {
			this.initData();
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 1600)
		},
		methods: {
			initData() {
				this.getBanners();
				this.getBrandList();
				this.getSeriesAll();
				this.getHotList();
			},
			async getBanners() {
				var {
					data
				} = await homeApi.bannerList({
					use: 0
				});
				this.bannerList = data;
			},

			async getBrandList() {
				var {
					data
				} = await homeApi.brandList();
				this.brandList = data;
			},
			getSeriesAll() {
				findApi.seriesAll()
					.then(res => {
						this.series = res.data
					})
			},
			goSeries(sId) {
				// #ifdef H5
				window.sId = sId;
				// #endif
				uni.reLaunch({
					url: '../find/index?sId=' + sId
				});
			},
			getHotList() {
				homeApi.hotList()
					.then(res => {
						this.hotList = res.data;
					})
			},
			seriesMore() {
				uni.switchTab({
					url: '../find/index'
				})
			},
			goChat() {
				uni.showToast({
					image: '/static/icons/sorry.png',
					title: '客服暂未开通!'
				})
			}

		},
		computed: {
			headColor() {
				return this.show == 1 ? 'transparent' : '#354E44';
			}
		}

	}
</script>
<!-- 
	沉浸式说明:
	1. uniapp默认为沉浸式体验 无法取消 参考: https://ask.dcloud.net.cn/question/69469
	2. 如果取消原生导航头(),需要自己实现沉浸式造成的内容遮挡头部状态栏的问题 参考: https://ask.dcloud.net.cn/article/34921
		2.1 取消原生导航头: 当设置 "navigationStyle":"custom" 取消原生导航栏后，由于窗体为沉浸式，占据了状态栏位置。 参考: https://uniapp.dcloud.io/frame?id=css%e5%8f%98%e9%87%8f
		2.2 填充状态栏高度,可以通过uniapp自定义的变量来设置:  var(--status-bar-height) 的 view 放在页面顶部，避免页面内容出现在状态栏。 
	3. 不同平台,h5/app/微信小程序 可以根据测试,配合 条件编译来实现各自的需求. 参考: https://uniapp.dcloud.io/platform?id=pagesjson-%e7%9a%84%e6%9d%a1%e4%bb%b6%e7%bc%96%e8%af%91
	 
 -->
<style scoped lang="scss">
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		background-color: #354E44;
	}

	.top_view {
		height: var(--status-bar-height);
		width: 100%;
		position: fixed;
		background-color: #354E44;
		top: 0;
		z-index: 999;
	}

	.home-main {
		.head-nav {
			background-color: $leju-base-bg-color;
			background-color: transparent;
			box-sizing: border-box;
			position: fixed;
			left: 0;
			top: var(--status-bar-height);
			/* #ifdef MP-WEIXIN */
			top: 0;
			/* #endif */
			z-index: 999;
			border-bottom: none;

			::v-deep .uni-navbar--border {
				border-bottom: none;
			}

			.title {
				width: 100%;
				display: flex;
				justify-content: center;

				.nav-item {
					font-size: 32rpx;
					color: #fff;
					line-height: 45rpx;
					margin: 0 20rpx;
					padding-bottom: 12rpx;

					&.active {
						border-bottom: 2px solid #fff;
					}
				}
			}

			.icon {
				width: 36rpx;
				height: 36rpx;

				&.icon-chat {
					margin-left: 20rpx;
				}

				&.icon-search {
					margin-right: 40rpx;
				}
			}

			.head-nav-right {
				display: flex;
				justify-content: space-between;
				align-items: center;

				image,
				img {
					width: 36rpx;
					height: 36rpx;
				}
			}

		}

		.common-title {
			font-size: 32rpx;
			color: #3E3E3E;
			line-height: 44rpx;
			margin: 40rpx auto;
			box-sizing: border-box;
			padding: 0 40rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.title {
				font-weight: 600;
			}

			.more {
				font-size: 26rpx;
				color: #8C8C8C;
			}
		}

		.section-banner {
			width: 100%;
			height: 470rpx;

			.top-bar {
				width: 100%;
				height: 88rpx;
				background-color: green;
			}

			.swiper-banner {
				width: 100%;
				height: 470rpx;

				.swiper-item {
					width: 750rpx;
					height: 100%;

					.img {
						width: 100%;
						height: 100%;
					}
				}
			}

			.section-series {
				width: 100%;

				.scroll-series {
					width: 100%;
					white-space: nowrap;

					.series-block {
						display: inline-block;
						margin: 0 20rpx;
						width: 208rpx;

						.image {
							width: 208rpx;
							height: 176rpx;
						}

						.cname {
							font-size: 26rpx;
							line-height: 38rpx;
							color: #3E3E3E;
							text-align: center;
							margin-top: 20rpx;
							font-weight: 600;
						}

						.ename {
							font-size: 20rpx;
							color: #B0B0B0;
							line-height: 28rpx;
							text-align: center;
						}
					}
				}
			}

			.section-hot {
				margin-bottom: 200rpx;

				.swiper {
					width: 100%;
					height: 314rpx;

					.hot-swiper-item {
						position: relative;
						width: 590rpx;
						height: 314rpx;

						.image {
							position: absolute;
							left: 44rpx;
							top: 0;
							width: 194rpx;
							height: 280rpx;
							border-radius: 10rpx;
						}

						.inner-card {
							margin-top: 50rpx;
							width: 590rpx;
							height: 260rpx;
							background-color: #fff;
							border-radius: 20rpx;

							.info {
								width: 316rpx;
								height: 100%;
								box-sizing: border-box;
								padding: 36rpx;
								margin-left: 274rpx;

								.gname {
									font-size: 26rpx;
									line-height: 38rpx;
									font-weight: 600;
								}

								.sub-gname {
									white-space: nowrap;
									overflow: hidden;
									font-size: 18rpx;
									color: #B0B0B0;
									line-height: 36rpx;
								}

								.dotts {
									width: 100%;
									height: 40rpx;
									display: flex;
									justify-content: flex-start;
									align-items: center;

									.dott {
										width: 20rpx;
										height: 20rpx;
										border-radius: 50%;
										margin-right: 16rpx;
									}
								}

								.descr {
									font-size: 22rpx;
									line-height: 30rpx;
									margin-top: 12rpx;
									white-space: nowrap;
									overflow: hidden;
								}
							}
						}


					}
				}

			}
		}

		.section-brand {
			margin-top: 100rpx;
		}

	}
</style>
