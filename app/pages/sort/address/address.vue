<template>
	<view class="address">
		<!--  #ifdef  MP-WEIXIN -->
			<view class="status_bar">
				 <!-- 这里是状态栏 -->
			</view>
		<!--  #endif -->
		
		<!-- 导航栏 -->
		<view class="head">
			<image @click="back" src="../../../static/icons/arr-l.png" mode="widthFix"></image>
			<text>收货地址</text>
			<image class="hadd" @click="add" src="../../../static/icons/add.png" mode="widthFix"></image>
		</view>
		
		<!-- 收货地址 -->
		<view class="all" >
			<view class="all-c" v-for="item in addressList" :key="item.useId">
				<navigator open-type="navigate" :url="`../pay/pay?useId=${item.useId}`" class="go">
					<view class="first" >
						{{item.name.charAt(0)}}
					</view>
					<view class="midl">
						<view >{{item.name}}</view>
						<view >{{item.address}}</view>
						<view >{{item.tel}}</view>
					</view>
				</navigator>
				<button type="default"  @tap="edit(item.useId)" plain size="mini">编辑</button>
			</view>
		</view>
		
		<!-- 微信新增地址按钮 -->
		<!--  #ifdef  MP-WEIXIN -->
			<button class="addbtn" @click="add" type="primary">新增收货地址  + </button>
		<!--  #endif -->
		
		<!-- 弹窗修改 -->
		<view class="person" v-if="show">
			<view class="person-c">
				<view class="main">
					<view class="personName dec">
						<text>姓名:</text> <input class="ipt" data-tye="0" @input="onKeyInput" placeholder="请输入姓名" :value="obj.name" />
					</view>
					<view class="personAddress dec">
						<text>地址:</text> <input class="ipt" data-tye="1" @input="onKeyInput" placeholder="请输入详细地址" :value="obj.address" />
					</view>
					<view class="personTel dec">
						<text>联系方式:</text> <input class="ipt" data-tye="2" @input="onKeyInput" placeholder="请输入手机号" :value="obj.tel" />
					</view>
					<button @click="close" size="default" type="default">取消</button>
					<button @click="sureEdit" size="default" type="primary">确定</button>
				</view>
				
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addressList:[],
				names:"",
				obj:{},
				addObj:{},
				ipts:"",
				show:false,
				isadd:false
			};
		},
		onLoad() {
			this.init()
			// console.log(this.addressList)
		},
		methods:{
			back(){
				uni.navigateBack({
					delta:2
				})
			},
			init(){
				this.addressList = getApp().globalData.addressList
			},
			//添加地址
			add(){
				this.show = true
				this.isadd = true
			},
			//编辑
			edit(val){
				// console.log(val)
				this.show = true
				var item = this.addressList.find(ele => ele.useId == val)
				this.obj = item
				
			},
			onKeyInput(event){
				// console.log(event.target.dataset)
				if(this.isadd){
					if(event.target.dataset.tye == "0"){
						this.addObj.name = event.target.value
					}else if(event.target.dataset.tye == "1"){
						this.addObj.address = event.target.value
					}else if(event.target.dataset.tye == "2"){
						this.addObj.tel = event.target.value
					}
					// console.log(event.target.dataset)
				}else{
					// console.log(event.target.dataset)
					if(event.target.dataset.tye == "0"){
						this.obj.name = event.target.value
					}else if(event.target.dataset.tye == "1"){
						this.obj.address = event.target.value
					}else if(event.target.dataset.tye == "2"){
						this.obj.tel = event.target.value
					}
				}
				
			},
			close(){
				this.show = false
				this.isadd = false
				this.obj = {}
				this.addObj = {}
			},
			sureEdit(){
				if(this.isadd){
					var ipts = document.getElementsByClassName("ipt")
					// console.log(ipts)
					console.log(ipts)
					if(ipts[0].__vue__.valueSync == ""){
						uni.showToast({
						    title: '请输入姓名！',
						    duration: 1000,
							icon:'none'
						});
					}else if(ipts[1].__vue__.valueSync == ""){
						uni.showToast({
						    title: '请输入地址！',
						    duration: 1000,
							icon:'none'
						});
					}else if(ipts[2].__vue__.valueSync == "" || ipts[2].__vue__.valueSync.length != 11 ){
						uni.showToast({
						    title: '请输入正确的手机号！',
						    duration: 1000,
							icon:'none'
						});
					}else{
						this.addressList.useId = Math.random()
						this.addressList.push(this.addObj)
						getApp().globalData.addressList = this.addressList
						uni.showToast({
							title: '添加成功！',
							duration: 1000,
							icon:'none'
						});
						// this.onLoad()
						this.show = false
						this.isadd = false
						this.obj = {}
						this.addObj = {}
						
					}
				}else{
					var ipts = document.getElementsByClassName("ipt")
					// console.log(ipts)
					console.log(ipts[1].__vue__._props.value)
					if(ipts[0].__vue__._props.value == ""){
						uni.showToast({
						    title: '请输入姓名！',
						    duration: 1000,
							icon:'none'
						});
					}else if(ipts[1].__vue__._props.value == ""){
						uni.showToast({
						    title: '请输入地址！',
						    duration: 1000,
							icon:'none'
						});
					}else if(ipts[2].__vue__._props.value == "" || ipts[2].__vue__._props.value.length != 11 ){
						uni.showToast({
						    title: '请输入正确的手机号！',
						    duration: 1000,
							icon:'none'
						});
					}else{
						getApp().globalData.addressList = this.obj
						uni.showToast({
							title: '修改成功！',
							duration: 1000,
							icon:'none'
						});
						// this.onLoad()
						this.show = false
						this.isadd = false
						this.obj = {}
						this.addObj = {}
					}
				}
			}
		}
	}
</script>

<style>
page{
	height: 100%!important;
	background-color: #F1ECE7;
}
</style>
<style lang="scss" scoped>
body,html,uni-page-body {
	height: 100%!important;
	background-color: #F1ECE7;
}
.status_bar {
  height: var(--status-bar-height);
  height: 50rpx;
  width: 100%;
  background-color: #354E44;
}
.addbtn{
	width: 400rpx;
	height: 100rpx;
	border-radius: 50rpx;
}
.address{
	width: 100%;
	height: 100%;
	overflow: hidden;
	// background-color: #F1ECE7;
	.head{
		width: calc(100% - 80rpx);
		line-height: 90rpx;
		padding: 0 40rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #354E44;
		color: #FFFFFF;
		.hadd{
			/*  #ifdef  MP-WEIXIN */
			visibility: hidden;
			/*  #endif  */
		}
		image{
			width: 45rpx;
			height: 45rpx;
		}
	}
	.all{
		overflow: hidden;
		width: calc(100% - 80rpx);
		margin: 40rpx auto 0;
		.all-c{
			width: calc(100% - 80rpx);
			padding: 0 40rpx;
			height: 200rpx;
			background-color: #FFFFFF;
			border-radius: 40rpx;
			margin: 40rpx auto;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.go{
				display: flex;
				align-items: center;
				.first{
					width: 80rpx;
					line-height: 80rpx;
					text-align: center;
					border-radius: 50%;
					background: #354E44;
					color: #FFFFFF;
					margin-right: 26rpx;
				}
				.midl{
					font-size: 22rpx;
					color: #8D8D8D;
					:first-child{
						font-size: 26rpx;
						color: #3E3E3E;
					}
				}
				
			}
			button{
				width: 140rpx;
				height: 60rpx;
				font-size: 26rpx;
				color: #8D8D8D;
			     border: 1px #fff solid;
				border-left: 2px solid #979797;
				background-color: #fff!important;
				margin-right: 0;
				// opacity: 0.35;
			}
		}
	}
	.person{
		width: 100%;
		height: 100%;
		position: fixed;
		background-color: rgba(0,0,0,.2);
		left: 0;
		top: 0;
		.person-c{
			width: 650rpx;
			height: 500rpx;
			position: absolute;
			left: 50%;
			top: 50%;
			margin-left: -325rpx;
			margin-top: -250rpx;
			background-color: #FFFFFF;
			border-radius: 40rpx;
			font-size: 28rpx;
			.main{
				display: flex;
				align-content: space-around;
				flex-wrap: wrap;
				width: 95%;
				height: 100%;
				margin: 0 auto;
				.dec{
					width: 100%;
					display: flex;
					align-items: center;
					.ipt{
						border-bottom: 1rpx solid rgba(0,0,0,.2);
						flex: 1;
					}
				}
				text{
					font-size: 32rpx;
					margin-right: 10rpx;
					font-weight: bold;
				}
			}
			
		}
	}
}

</style>
