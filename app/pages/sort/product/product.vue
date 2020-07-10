<template>
	<view class="news">
		<view class="head" >
			<view class="top ">
				<image @click="back" class="chat" src="../../../static/icons/arr-l.png" mode="widthFix" ></image>
				<view class="texts">{{title}}</view>
				<view class="right"></view>
			</view>
			<v-tabs
			  @change = "select(activeTab)"
			  class="tab"
			  :tabs="['新品','销量','价格','筛选']"
			  height="90rpx"
			  v-model="activeTab"
			  color="#FFFFFF"
			  activeColor="#1abc9c"
			  fontSize="30rpx"
			  activeFontSize="30rpx"
			  lineHeight="4rpx"
			  :lineScale="1"
			  lineColor="#FFFFFF"
			/>
		</view>
		<view class="contents">
			<!-- <navigator :url="'../detail/detail?productId='+item.id" class="small" v-for="(item,index) in productList" :key="index"> -->
				<navigator open-type="navigate" :url="`/pages/sort/detail/detail?productId=${item.id}`" class="small" v-for="(item,index) in productList" :key="index">
				
				<image :src="item.cover_img" mode="widthFix"></image>
				<view class="ctitl">
					<text>{{item.gname}}</text>
					<text>{{item.descr}}</text>
				</view>
				<view class="bot">
					<text>¥{{item.price_now}}</text>
					<text>{{item.origin_city}}</text>
				</view>
			</navigator>
		</view>
	</view>
	
	
</template>

<script>
	// import { mapMutations } from "vuex";
	import vTabs from '../../../components/v-tabs/v-tabs.vue'
	import {productList} from "../../../utils/sort/index.js"
	export default{
		data(){
			return{
				kindId:"",
				title:"",
				productList:[],
				activeTab:0,
			}
		},
		components: {
			vTabs,
		 },
		onLoad(option){
			console.log(option)
			this.kindId = option.kindId
			productList({
				kindId:option.kindId
			})
			.then(res=>{
				console.log(res)
				const data = res.data.data;
				const list = [];
				for(let i = 0;i<data.totalPage;i++){
					for(let j = 0;j<data.list.length;j++){
						list.push(data.list[j])
					}
				}
				this.productList = list
				this.title = res.data.kind.ctitle
				this.$store.commit('push', this.productList)
				// console.log(this.$store.state.productList)
			})
		},
		methods:{
			// ...mapMutations([
			// 	"push","this.productList"
			// ])
			back(){
				uni.switchTab({
					url:'/pages/sort/sort'
				})
			},
			select(val){
				console.log(val)
			}
		}
		
	}
	
	
</script>

<style lang="scss" scoped>

.news{
	width: 100%;
	height: 100%;
	background-color: #F1ECE7;
	overflow: hidden;
	
}
.top{
	position: fixed;
	left: 0;
	top: 0;
	width: calc(100% - 60rpx);
	padding: 10rpx 30rpx;
	height: 180rpx;
	display: flex;
	flex-wrap: wrap;
	align-items: flex-start;
	justify-content: space-between;
	z-index: 20;
	background-color: rgb(53, 78, 68);
	image{
		width: 36rpx;
		height: 36rpx;
		/*  #ifdef  MP-WEIXIN  */
		visibility: hidden;
		/*  #endif  */
	}
	
	.texts{
		letter-spacing: 6rpx!important;
		font-size: 34rpx;
		color: #FFFFFF;
		letter-spacing: 2.43rpx;
		margin-top: 15rpx;
	}
	.chat{
		width: 30rpx;
		height: 30rpx;
		margin-top: 15rpx;
	}
}

.tab{
	position: fixed;
	display: flex;
	justify-content: space-around;
	left: 0;
	top: 65rpx;
	width: 100%;
	/*  #ifdef  MP-WEIXIN */
	padding: 0 80rpx;
	/*  #endif  */
	background-color: rgb(53, 78, 68);
	z-index: 20;
}

.contents::before{
	position: fixed;
	left: 0;
	top: 160rpx;
	content: "";
	width: 100%;
	height: 60rpx;
	background-color: #F1ECE7;
	border-radius: 40px 40px 0 0;
	z-index: 25;
}
.contents{
	width: calc(100% - 40rpx);
	margin: 220rpx auto 0;
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
	background-color: #F1ECE7;
	height: auto!important;
	.small{
		width: 316rpx;
		margin-bottom: 48rpx;
		background: #FFFFFF;
		box-shadow: 0 8px 16px 0 rgba(83,66,49,0.06);
		border-radius: 10px;
		.ctitl{
			margin: 28rpx 0 28rpx 36rpx ;
			text{
				display: block;
				font-size: 22rpx;
				color: #8D8D8D;
				letter-spacing: 1.57rpx;
			}
		}
		.ctitl text:first-child{
			font-size: 26rpx;
			color: #3E3E3E;
			letter-spacing: 1.86rpx;
			margin-bottom: 5rpx;
		}
		image{
			width: 100%;
			height: 238rpx;
		}
		.bot{
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 15rpx;
			padding: 0 36rpx;
			text{
				text-align: right;
				width: 100rpx;
				font-size: 22rpx;
				color: #3E3E3E;
				letter-spacing: 1.57rpx;
			}
		}
		.bot text:first-child{
			text-align: left;
			font-size: 26rpx;
			color: #3E3E3E;
			letter-spacing: 1.86rpx;
			
		}
	}
}
</style>
