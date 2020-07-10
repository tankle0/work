<template>
	<view class="product-main">
		<radio-group class="head-bar" @change="headChange">
			<label class="label" :class="{'active':index==current}" v-for="(item,index) in headItems" :key="item.value">
				<radio :value="item.value" :checked="index === current" />
				<view>{{item.name}}</view>
			</label>
		</radio-group>
		

		<view class="product-list">
			
			<navigator class="product-block" :url="'../detail/index?productId='+item.id" v-for="(item,index) in productListCom">
				<image class="img" :src="item.cover_img" mode="scaleToFill"></image>
				<view class="text-area">
					<view class="gname">
						{{item.gname}}
					</view>
					<view class="price-origin">
						<text class="price">¥{{item.price_now | money}}</text>
						<text class="origin">{{item.origin_city||'不凡'}}</text>
					</view>
				</view>
			</navigator>
			
		</view>
		<uniLoadMore :status="more"></uniLoadMore>
	</view>
</template>

<script>
	import productApi from '@/api/kind/product.js'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue" 
	import NP from 'number-precision'
	export default {
		components: {
			uniLoadMore 
		},
		data() {
			return {
				more: 'more',  //@value more loading前  	@value loading loading中  	@value noMore 没有更多了
				productList: [],
				kindId: '',
				current: '0',
				headItems: [{
						name: '新品',
						value: '0'
					},
					{
						name: '销量',
						value: '1'
					},
					{
						name: '价格',
						value: '2'
					},
					{
						name: '筛选',
						value: '3'
					}
				],
				page: {
					start: 1,
					limit: 10,
					lastPage: false
				}
			}
		},
		onLoad(option) {

			this.kindId = option.kindId;
			this.getProductList();
		},
		 
		onReachBottom(){
			//如果不是最后一页 重新发送请求
			if(!this.page.lastPage){
				this.page.start ++ ;
				this.more = 'loading';
				setTimeout(()=>{
					this.getProductList();
				},500)
				
			}
		},
		methods: {
			
			async getProductList() {
				uni.showLoading({
				    title: '加载中'
				});
				var pageP = {
					start: this.page.start,
					limit: this.page.limit
				}
				//获取列表
				var res = await productApi.productList({
					kindId: this.kindId,
					...pageP
				})
				this.productList = this.productList.concat(res.data.list);
				this.page.lastPage = res.data.lastPage;
				//如果是最后一页
				if(this.page.lastPage){
					this.more="noMore";
				}
				var title = res.kind ? res.kind.ctitle : '';
				uni.setNavigationBarTitle({
					title: title
				})
				uni.hideLoading()
				 
			},
			headChange(e) {
				this.current = e.detail.value;
			},
			 
		},
		
		computed:{
			productListCom(){
				var res = this.productList;
				var obj = JSON.parse(JSON.stringify(this.productList));
				switch (this.current){
					case '0': 
						res = this.productList;
						break;
					case '2': // 根据价格排序
						res = obj.sort((a,b)=>{
							return b.price_now-a.price_now;
						})
						break;
					default:
						break;
				}
				res.map(item=>{
					item.price_now_format = NP.round(item.price_now/100,2)
					return item
				})
				return res;
			}
		}
	}
</script>

<style scoped lang="scss">
	.product-main {
		.head-bar {
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

		.product-list {
			width: 100%;
			margin-top: 120rpx;
			overflow: hidden;
			.product-block {
				float: left;
				width: 316rpx;
				margin-left: 40rpx;
				margin-bottom: 40rpx;
				background-color: #fff;
				border-radius: 4px;

				.img {
					width: 100%;
					height: 238rpx;
				}

				.text-area {
					padding: 36rpx;
					font-size: 26rpx;

					.gname {
						color: #3E3E3E;
						line-height: 38rpx;
						margin-top: 8rpx;
						font-weight: bold;
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
					}

					.price-origin {
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-top: 20rpx;

						.origin {
							color: #3E3E3E;
						}
					}
				}

			}
		}

	}
</style>
