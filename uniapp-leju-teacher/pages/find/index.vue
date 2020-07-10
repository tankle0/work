<template>
	<div class="find-main">
		<div class="head-nav" :style="{backgroundColor:bgColor}">
			<radio-group class="radio-group" @change="radioChange">

				<label class="nav-item" :class="{active: current=='0'}">
					<radio value="0" :checked="current=='0'" /><text class="text">精选文章</text>
				</label>
				<label class="nav-item" :class="{active: current=='1'}">
					<radio value="1" :checked="current=='1'" /><text class="text">好物推荐</text>
				</label>
			</radio-group>
		</div>

		<!-- //分类块 -->
		<div v-show="current == 0" class="article-section">
			<div class="article-section">
				<radio-group class="kind-nav" @change="kindChange">
					<label class="kind-item" :class="{active: currentKind==item.id}" v-for="item in kindList" :key="item.id">
						<radio :value="item.id" />
						<image class="icon" :src="item.icon" mode=""></image>
					</label>
				</radio-group>

				<div class="article-list">
					<div class="article-block" v-for="item in articleList" :key="item.id">
						<navigator :url="'./article-detail/index?articleId='+item.id">
							<image class="cover-img" :src="item.coverImg" mode=""></image>
							<text class="ctitle">{{item.title}}</text>
							<text class="etitle">{{item.author}}</text>
						</navigator>

						<div class="btns-bar">
							<div class="view-block">
								<image class="icon" src="../../static/icons/view.png" mode=""></image>
								<text class="count-text">{{item.zanCount}}</text>
							</div>
							<div class="zan-share">
								<image class="icon" src="../../static/icons/zan.png" mode="" @tap="doZan"></image>
								<!-- #ifndef H5 -->
									<button open-type="share" class="icon btn-share" :data-id="item.id"> </button>
								<!-- #endif -->
							 
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 系列列表 -->
		<div v-show="current == 1" class="series-section" :style="{height: seriesH}">
			<swiper class="swiper" :duration="400" :current-item-id="currentItemId">
				<swiper-item class="swiper-item" v-for="(item,index) in seriesAll" :item-id="item.id" :style="{backgroundImage:'url('+item.bg_img+')'}"
				 :key="item.id">
					<view class="ename">{{item.ename}}</view>
					<view class="cname">{{item.cname}}</view>
					<swiper class="swiper-inner">
						<swiper-item class="swiper-inner-item" v-for="innerItem in item.productList" :key="innerItem.id">
							<navigator class="item-card" :url="'../kind/detail/index?productId='+innerItem.id">
								<view class="swiper-item">

									<image class="image" :src="innerItem.cover_img" mode=""></image>
									<div class="info">
										<div class="gname">{{innerItem.gname}}</div>
										<div class="descr">{{innerItem.descr}}</div>
									</div>
								</view>
							</navigator>
						</swiper-item>

					</swiper>
				</swiper-item>

			</swiper>
		</div>
	</div>
</template>

<script>
	import kindApi from '@/api/kind/index.js'
	import findApi from '@/api/find/index.js'
	export default {
		name: 'Find',
		data() {
			return {
				current: '0',
				kindList: [],
				currentKind: '',
				articleList: [],
				seriesAll: [],
				sId: '',
				currentItemId: '',
				seriesH: 600,
				shareId: ''
			}
		},
		onLoad(option) {

			this.sId = option.sId;
			// #ifdef H5
			this.sId = window.sId;
			window.sId = null;
			// #endif

			this.getKindList();
			this.getSeriesAll();
			// if(this.sId){
			// 	this.current = '1';
			// 	// setTimeout(()=>{
			// 	// 	this.currentItemId = this.sId;
			// 	// },200)

			// }else{
			// 	this.current = '0';
			// }

		},
		onShow() {

		},
		onReady() {
			// if(this.sId){
			// 	this.current = '1';
			// 	// setTimeout(()=>{
			// 		this.currentItemId = this.sId;
			// 	// },200)

			// }else{
			// 	this.current = '1';
			// }
			// console.log('onready...')
		},
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res)
			}
			return {
				title: '分享id:' + res.target.dataset.id,
				imageUrl: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png',
				path: '/pages/mine/index',
			}
		},
		computed: {
			bgColor() {
				return this.current == '0' ? '#354E44' : 'transparent';
			}
		},
		methods: {
			radioChange(e) {
				this.current = e.detail.value;
				if (this.current == '1') {
					this.seriesH = uni.getSystemInfoSync().windowHeight + 'px'
				}
			},
			//获取文章分类
			async getArticleList() {
				var {
					data
				} = await findApi.articleList({
					kindId: this.currentKind
				});
				this.articleList = data.list;

			},
			//获取分类
			async getKindList() {
				var {
					data
				} = await kindApi.kindList();
				var icons = [
					'../../static/icons/chuangyi.png',
					'../../static/icons/shipin.png',
					'../../static/icons/fengge.png',
					'../../static/icons/dengju.png'
				]
				for (var i = 0; i < data.length; i++) {
					data[i].icon = icons[i];

				}
				this.kindList = data;
				this.currentKind = data[0].id;
				this.getArticleList();
			},
			kindChange(e) {
				this.currentKind = e.detail.value;
				this.getArticleList();
			},
			async getSeriesAll() {
				var {
					data
				} = await findApi.seriesAll();
				this.seriesAll = data;
				console.log('seriesall .end..')
			},
			onShare(id) {
				this.shareId = id;
				console.log(this.shareId)

			},
			doZan(){
				uni.showToast({
					title: '赞 +1 '
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	uni-page-body {
		height: 100%;
	}

	.find-main {
		height: 100%;

		.head-nav {
			width: 100%;
			height: 88rpx;
			background-color: transparent;
			color: #fff;
			font-size: 32rpx;
			position: fixed;
			left: 0;
			top: 0;
			z-index: 999;

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

		.kind-nav {
			display: flex;
			width: 100%;
			height: 84rpx;
			margin-top: 140rpx;
			justify-content: space-around;
			align-items: center;
			box-sizing: border-box;
			padding: 0 80rpx;

			.kind-item {
				width: 84rpx;
				height: 84rpx;
				background-color: #fff;
				border-radius: 50%;
				text-align: center;
				transition: all ease .4s;

				radio {
					display: none;
				}

				.icon {
					width: 50rpx;
					height: 50rpx;
					margin: 17rpx auto;


				}

				&.active {
					width: 98rpx;
					height: 98rpx;
					background-color: $leju-base-bg-color;

					.icon {
						margin-top: 24rpx;
					}
				}
			}
		}

		.article-list {
			margin-top: 100rpx;

			.article-block {
				position: relative;
				width: 674rpx;
				height: 482rpx;
				border-radius: 24rpx;
				background-color: #fff;
				margin: 28rpx auto;
				overflow: hidden;

				.cover-img {
					display: block;
					width: 674rpx;
					height: 382rpx;
					background-color: #8F8F94;
				}

				.ctitle {
					position: absolute;
					left: 20rpx;
					top: 244rpx;
					color: #fff;
					font-size: 48rpx;
					line-height: 68rpx;
				}

				.etitle {
					position: absolute;
					left: 20rpx;
					top: 316rpx;
					color: #fff;
					font-size: 30rpx;
					line-height: 42rpx;
				}

				.btns-bar {
					width: 100%;
					height: 100rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					box-sizing: border-box;
					padding: 0 60rpx;

					.icon {
						width: 40rpx;
						height: 40rpx;

					}

					.view-block {
						height: 100%;
						display: flex;
						align-items: center;

						.icon {
							margin-right: 30rpx;
						}

						.count-text {
							color: #3E3E3E;
							font-size: 26rpx;
						}
					}

					.zan-share {
						height: 100%;
						display: flex;
						align-items: center;

						.icon {
							margin-left: 30rpx;
						}

						.icon.btn-share {
							width: 40rpx;
							height: 40rpx;
							outline: none;
							background: url(../../static/icons/share.png) no-repeat center;
							background-size: contain;

							&::after {
								border: none;
							}
						}

					}
				}

			}
		}

		.series-section {
			width: 100%;
			height: 100%;

			.swiper {
				width: 100%;
				height: 100%;

				.swiper-item {
					position: relative;
					width: 100%;
					height: 100%;

					.ename {
						font-size: 26rpx;
						margin: 120rpx 50rpx;
						color: #fff;
					}

					.cname {
						font-size: 72rpx;
						color: #fff;
						margin: 20rpx 50rpx;
					}

					.swiper-inner {
						position: absolute;
						left: 0px;
						bottom: 100rpx;
						height: 264rpx;
						width: 100%;

						.swiper-inner-item {
							.item-card {
								width: 496rpx;
								height: 264rpx;
								background-color: #fff;
								border-radius: 20rpx;
								margin: 0 auto;

								.swiper-item {
									display: flex;
									justify-content: space-between;
									align-items: center;
									box-sizing: border-box;
									padding: 20rpx;

									.image {
										width: 120rpx;
										height: 120rpx;
										flex-shrink: 0;
									}

									.info {
										margin-left: 20rpx;
										text-align: left;
										width: 200rpx;
										height: 100%;

										.gname {
											font-size: 20rpx;
											font-weight: 600;
										}

										.descr {
											font-size: 20rpx;
											color: #8F8F94;
										}
									}
								}

							}

						}
					}
				}
			}

		}
	}
</style>
