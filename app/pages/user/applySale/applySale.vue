<template>
	<view class="apply">
		<view class="apply-c">
			<view class="main">
				<view class="title">
					服务类型
				</view>
				<radio-group class="group" @change="radioChange">
					<label class="labels"  v-for="(item, index) in items" :key="item.value">
						<radio :value="item.value"  :checked="index == current" />
						<view :class="{'active':index == current}">{{item.name}}</view>
					</label>
				</radio-group>
				
				<view class="good">
					<text class="count">订单编号：{{}}</text>
					<view class="mid">
						<view class="left">
							<image src="" mode="widthFix"></image>
							<view class="detail">
								<view class="top">{{}}</view>
								<view>编号：{{}}</view>
								<view>规格：{{}}</view>
							</view>
							
						</view>
						<text>X{{}}</text>
					</view>
					<text class="last">合计：¥{{}}</text>
				</view>
				
				<view class="title">问题描述</view>
				<textarea class="textar" value="" placeholder="请输入您的评价信息" />
				
				<button type="primary" >提交</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items:[
					{
						name:"换货",
						value: "0"
					},
					{
						name:"退货",
						value: "1"
					},
					{
						name:"仅退款",
						value: "2"
					},
				],
				current:"0"
			};
		},
		methods:{
			radioChange(e){
				// console.log(val)
				this.current = e.detail.value
			}
		}
	}
</script>

<style lang="scss" scoped>
body,html,uni-page-body {
	height: 100%!important;
	background-color: #F1ECE7;
}
.apply{
	width: 100%;
	height: 100%;
	.apply-c{
		width: calc(100% - 84rpx);
		padding: 0 42rpx;
		overflow: hidden;
		background-color: #F1ECE7;
		.main{
			margin-top: 22rpx;
			height: 100%;
			.title{
				font-size: 32rpx;
				color: #3E3E3E;
				letter-spacing: 2.29rpx;
				margin-bottom: 19rpx;
			}
			.group{
				display: flex;
				align-items: center;
				margin-bottom: 32rpx;
				.labels{
					font-size: 22rpx;
					radio{
						display: none;
					}
					.active{
						background: #354E44;
						color: #FFFFFF;
					}
					view{
						border: 2rpx solid #2D4F43;
						border-radius: 10px;
						color: #354E44;
						letter-spacing: 1.57rpx;
						text-align: center;
						width: 124rpx;
						line-height: 50rpx;
						margin-right: 32rpx;
					}
				}
			}
			.good{
				margin-bottom: 32rpx;
				height: 276rpx;
				padding: 22rpx 37rpx 51rpx 36rpx;
				background: #FFFFFF;
				box-shadow: 0 8rpx 16rpx 0 rgba(83,66,49,0.08);
				border-radius: 24rpx;
				.count{
					font-size: 24rpx;
					color: #3E3E3E;
				}
				.mid{
					display: flex;
					justify-content: space-between;
					align-items: center;
					text{
						font-size: 28rpx;
						color: #8D8D8D;
						letter-spacing: 2rpx;
					}
					.left{
						display: flex;
						align-items: center;
						image{
							width: 162rpx;
							height: 162rpx;
						}
						.detail{
							font-size: 22rpx;
							color: #8D8D8D;
							letter-spacing: 1.57rpx;
							.top{
								font-size: 26rpx;
								color: #3E3E3E;
							}
						}
					}
				}
				.last{
					display: flex;
					flex-direction: row-reverse;
					font-size: 26rpx;
					color: #3E3E3E;
					letter-spacing: 1.86rpx;
				}
			}
			.textar{
				width: 100%;
				background: #FFFFFF;
				box-shadow: 0 8rpx 16rpx 0 rgba(83,66,49,0.08);
				border-radius: 24rpx;
				margin-top: 31rpx;
				text-indent: 2em;
				margin-bottom: 232rpx;
				font-size: 22rpx;
				line-height: 36rpx;
				color: #8D8D8D;
				letter-spacing: 1.57rpx;
				.uni-textarea-placeholder,
				.uni-textarea-compute{
					top: 14rpx;
				}
			}
			button{
				width: 536rpx;
				line-height: 94rpx;
				background: #354E44;
				border-radius: 14rpx;
				font-size: 30rpx;
				color: #FFFFFF;
				letter-spacing: 2.14rpx;
				// margin-bottom: 190rpx;
			}
		}
	}
}
</style>
