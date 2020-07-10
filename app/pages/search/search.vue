<template>
	<view class="content">
		<view class="search-box">
			<!-- mSearch组件 如果使用原样式，删除组件元素-->
			<mSearch class="mSearch-input-box" :mode="2" button="inside" :placeholder="defaultKeyword" @search="doSearch(false)"
			 @input="inputChange" @confirm="doSearch(false)" v-model="keyword"></mSearch>
			<!-- 原样式 如果使用原样式，恢复下方注销代码 -->

			<!-- <view class="input-box">
				<input type="text" :adjust-position="true" :placeholder="defaultKeyword" @input="inputChange" v-model="keyword" @confirm="doSearch(false)"
				 placeholder-class="placeholder-class" confirm-type="search">
			</view>
			<view class="search-btn" @tap="doSearch(false)">搜索</view> -->

			<!-- 原样式 end -->
		</view>
		<view class="search-keyword">
			<scroll-view class="keyword-list-box" v-show="isShowKeywordList" scroll-y>
				<block v-for="(row,index) in keywordList" :key="index">
					<view class="keyword-entry" hover-class="keyword-entry-tap">
						<view class="keyword-text" @tap.stop="doSearch(keywordList[index].keyword)">
							<rich-text :nodes="row.htmlStr"></rich-text>
						</view>
						<view class="keyword-img" @tap.stop="setKeyword(keywordList[index].keyword)">
							<image src="/static/HM-search/back.png"></image>
						</view>
					</view>
				</block>

			</scroll-view>
			<scroll-view class="keyword-box" v-show="!isShowKeywordList" scroll-y>
				
				<view class="keyword-block">
					<view class="keyword-list-header">
						<view class="history">热门搜索</view>
						<view>
							<image @tap="hotToggle" :src="'../../static/icons/attention'+forbid+'.png'"></image>
						</view>
					</view>
					<view class="keyword" v-if="forbid==''">
						<view class="searchText imgs" v-for="(keyword,index) in hotKeywordList" @tap="doSearch(keyword.value)" :key="index">
							<image :src="keyword.img" mode="widthFix"></image>
							<text>{{keyword.value}}</text>
						</view>
					</view>
					<view class="hide-hot-tis" v-else>
						<view>当前搜热门搜索已隐藏</view>
					</view>
				</view>
				
				<view class="keyword-block" v-if="oldKeywordList.length>0">
					<view class="keyword-list-header">
						<view class="history">搜索记录</view>
						<view>
							<image @tap="oldDelete" src="../../static/icons/delete.png"></image>
						</view>
					</view>
					<view class="keyword">
						<view class="searchText" v-for="(keyword,index) in oldKeywordList" @tap="doSearch(keyword)" :key="index">{{keyword}}</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	//引用mSearch组件，如不需要删除即可
	import mSearch from '@/components/mehaotian-search-revision/mehaotian-search-revision.vue';
	export default {
		data() {
			return {
				defaultKeyword: "",
				keyword: "",
				oldKeywordList: [],
				hotKeywordList: [],
				keywordList: [],
				forbid: '',
				isShowKeywordList: false
			}
		},
		onLoad() {
			this.init();
		},
		components: {
			//引用mSearch组件，如不需要删除即可
			mSearch
		},
		methods: {
			init() {
				this.loadDefaultKeyword();
				this.loadOldKeyword();
				this.loadHotKeyword();

			},
			blur() {
				uni.hideKeyboard()
			},
			//加载默认搜索关键字
			loadDefaultKeyword() {
				//定义默认搜索关键字，可以自己实现ajax请求数据再赋值,用户未输入时，以水印方式显示在输入框，直接不输入内容搜索会搜索默认关键字
				this.defaultKeyword = "默认关键字";
			},
			//加载历史搜索,自动读取本地Storage
			loadOldKeyword() {
				uni.getStorage({
					key: 'OldKeys',
					success: (res) => {
						var OldKeys = JSON.parse(res.data);
						this.oldKeywordList = OldKeys;
					}
				});
			},
			//加载热门搜索
			loadHotKeyword() {
				//定义热门搜索关键字，可以自己实现ajax请求数据再赋值
				this.hotKeywordList = [
					{
						img:"../../static/icons/yizi.png",
						value:"椅子"
					},
					{
						img:"../../static/icons/yg.png",
						value:"衣柜"
					},
					{
						img:"../../static/icons/deng.png",
						value:"灯具"
					},
					{
						img:"../../static/icons/yg.png",
						value:"衣柜"
					},
					{
						img:"../../static/icons/zs.png",
						value:"装饰品"
					},
					{
						img:"../../static/icons/yizi.png",
						value:"椅子"
					},
				];
			},
			//监听输入
			inputChange(event) {
				//兼容引入组件时传入参数情况
				var keyword = event.detail ? event.detail.value : event;
				if (!keyword) {
					this.keywordList = [];
					this.isShowKeywordList = false;
					return;
				}
				this.isShowKeywordList = true;
				//以下示例截取淘宝的关键字，请替换成你的接口
				uni.request({
					url: 'https://suggest.taobao.com/sug?code=utf-8&q=' + keyword, //仅为示例
					success: (res) => {
						this.keywordList = [];
						this.keywordList = this.drawCorrelativeKeyword(res.data.result, keyword);

					}
				});
			},
			//高亮关键字
			drawCorrelativeKeyword(keywords, keyword) {
				var len = keywords.length,
					keywordArr = [];
				for (var i = 0; i < len; i++) {
					var row = keywords[i];
					//定义高亮#9f9f9f
					var html = row[0].replace(keyword, "<span style='color: #9f9f9f;'>" + keyword + "</span>");
					html = '<div>' + html + '</div>';
					var tmpObj = {
						keyword: row[0],
						htmlStr: html
					};
					keywordArr.push(tmpObj)
				}
				return keywordArr;
			},
			//顶置关键字
			setKeyword(index) {
				this.keyword = this.keywordList[index].keyword;
			},
			//清除历史搜索
			oldDelete() {
				uni.showModal({
					content: '确定清除历史搜索记录？',
					success: (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
							this.oldKeywordList = [];
							uni.removeStorage({
								key: 'OldKeys'
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			//热门搜索开关
			hotToggle() {
				this.forbid = this.forbid ? '' : '_forbid';
			},
			//执行搜索
			doSearch(keyword) {
				keyword = keyword === false ? this.keyword : keyword;
				this.keyword = keyword;
				this.saveKeyword(keyword); //保存为历史 
				uni.showToast({
					title: keyword,
					icon: 'none',
					duration: 2000
				});
				//以下是示例跳转淘宝搜索，可自己实现搜索逻辑
				/*
				//#ifdef APP-PLUS
				plus.runtime.openURL(encodeURI('taobao://s.taobao.com/search?q=' + keyword));
				//#endif
				//#ifdef H5
				window.location.href = 'taobao://s.taobao.com/search?q=' + keyword
				//#endif
				*/
			},
			//保存关键字到历史记录
			saveKeyword(keyword) {
				uni.getStorage({
					key: 'OldKeys',
					success: (res) => {
						var OldKeys = JSON.parse(res.data);
						var findIndex = OldKeys.indexOf(keyword);
						if (findIndex == -1) {
							OldKeys.unshift(keyword);
						} else {
							OldKeys.splice(findIndex, 1);
							OldKeys.unshift(keyword);
						}
						//最多10个纪录
						OldKeys.length > 10 && OldKeys.pop();
						uni.setStorage({
							key: 'OldKeys',
							data: JSON.stringify(OldKeys)
						});
						this.oldKeywordList = OldKeys; //更新历史搜索
					},
					fail: (e) => {
						var OldKeys = [keyword];
						uni.setStorage({
							key: 'OldKeys',
							data: JSON.stringify(OldKeys)
						});
						this.oldKeywordList = OldKeys; //更新历史搜索
					}
				});
			}
		}
	}
</script>
<style>
page{
	/*  #ifdef  MP-WEIXIN */
	height: 100%;
	background-color: #F1ECE7;
	/*  #endif  */
}
</style>
<style lang="scss" scoped>
	body,
	html,
	uni-page-body {
		height: 100% !important;
		background-color: #F1ECE7;
		overflow: scroll;
	}
	

	view {
		display: block;
	}
	.content{
		height: 100% !important;
		background-color: #F1ECE7!important;
		overflow: scroll;
	}
	.search-box {
		width: calc(100% - 84rpx);
		background-color: rgb(242, 242, 242);
		padding: 15upx 42rpx;
		display: flex;
		justify-content: space-between;
		position: sticky;
		top: 0;
		margin-bottom: 60rpx;
		background-color: #F1ECE7!important;
		z-index: 99;
	}

	.search-box .mSearch-input-box {
		width: 100%;
	}

	.search-box .input-box {
		width: 85%;
		flex-shrink: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.search-box .search-btn {
		width: 15%;
		margin: 0 0 0 2%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-shrink: 0;
		font-size: 28upx;
		color: #fff;
		background: linear-gradient(to right, #ff9801, #ff570a);
		border-radius: 60upx;
	}

	.search-box .input-box>input {
		width: 100%;
		height: 60upx;
		font-size: 32upx;
		border: 0;
		border-radius: 60upx;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		padding: 0 3%;
		margin: 0;
		background-color: #ffffff;
	}

	.placeholder-class {
		color: #9e9e9e;
	}

	.search-keyword {
		width: 100%;
		// background-color: rgb(242, 242, 242);
		background-color: #F1ECE7!important;
	}

	.keyword-list-box {
		height: calc(100vh - 110upx);
		padding-top: 10upx;
		border-radius: 20upx 20upx 0 0;
		background-color: #F1ECE7;
		
	}

	.keyword-entry-tap {
		background-color: #eee;
	}

	.keyword-entry {
		width: 94%;
		height: 80upx;
		margin: 0 42rpx;
		font-size: 30upx;
		color: #333;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: solid 1upx #e7e7e7;
	}

	.keyword-entry image {
		width: 60upx;
		height: 60upx;
		// margin-right: 20rpx;
	}

	.keyword-entry .keyword-text,
	.keyword-entry .keyword-img {
		height: 80upx;
		display: flex;
		align-items: center;
	}

	.keyword-entry .keyword-text {
		width: 90%;
	}

	.keyword-entry .keyword-img {
		width: 10%;
		justify-content: center;
	}

	.keyword-box {
		// height: calc(100vh - 110upx);
		border-radius: 20upx 20upx 0 0;
		background-color: #F1ECE7!important;
	}

	.keyword-box .keyword-block {
		padding: 10upx 0;
		.history{
			font-size: 32rpx;
			color: #3E3E3E;
			letter-spacing: 2.29rpx;
		}
	}

	.keyword-box .keyword-block .keyword-list-header {
		width: 94%;
		padding: 10upx 42rpx;
		font-size: 27upx;
		color: #333;
		display: flex;
		justify-content: space-between;
		// margin-bottom: 50rpx;
	}

	.keyword-box .keyword-block .keyword-list-header image {
		width: 40upx;
		height: 40upx;
		margin-right: 20rpx;
		// background-color: #FFFFFF;
	}

	.keyword-box .keyword-block .keyword {
		width: 96%;
		margin: 0 auto;
		padding: 3px 42rpx;
		display: flex;
		flex-flow: wrap;
		justify-content: flex-start;
		.searchText{
			width: 192rpx!important;
			height: 86rpx!important;
			background-color: #FFFFFF!important;
			box-shadow: 0 4rpx 12rpx 0 rgba(83,66,49,0.05);
			border-radius: 14rpx!important;
			padding: 0;
			margin-right: 46rpx;
		}
		:nth-child(3n){
			margin-right: 0;
		}
		.imgs{
			width: 192rpx!important;
			height: 192rpx!important;
			background: #FFFFFF;
			// box-shadow: 0 4px 12px 0 rgba(83,66,49,0.08);
			border-radius: 30rpx!important;
			display: flex;
			justify-content: center;
			// align-items: center;
			align-content: center;
			flex-wrap: wrap;
			text-align: center;
			image{
				width: 50rpx;
				height: 60rpx;
				margin-bottom: 14rpx;
			}
			text{
				width: 100%!important;
				font-size: 26rpx!important;
				color: #3E3E3E!important;
				letter-spacing: 1.86rpx;
			}
		}
		
	}

	.keyword-box .keyword-block .hide-hot-tis {
		display: flex;
		justify-content: center;
		font-size: 28upx;
		color: #6b6b6b;
	}

	.keyword-box .keyword-block .keyword>view {
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 60upx;
		padding: 0 20upx;
		margin: 10upx 20upx 10upx 0;
		height: 60upx;
		font-size: 28upx;
		background-color: rgb(242, 242, 242);
		color: #6b6b6b;
	}
</style>
