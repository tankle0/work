<template>
	<div class="search-main">
		<div class="search-bar">
			<input type="text" class="search-input" v-model="search" placeholder="搜索">
			<img class="icon" src="/static/icons/search-active.png" alt="">
			<span class="cancle" @click="doCancel">取消</span>	
		</div>
		<div class="search-list hot-search">
			<p class="title">
				热门搜索
			</p>
			<ul class="words">
				<li class="word" v-for="w in words" :key="w">{{w}}</li>
			</ul>
		</div>
		<div class="search-list his-search">
			<p class="title">
				历史搜索
			</p>
			<ul class="words">
				<li class="word" v-for="w in hisWords" :key="w">{{w}}</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Search.vue',
		components: {},
		data() {
			return {
				search: '',
				words: [
					'阳台',
					'灯饰',
					'地中海',
					'香氛',
					'减肥凳',
					'餐桌',
					'创意'
				]
			}
		},
		computed:{
			hisWords(){
				var i = 0 ;
				return this.words.filter(item=>{
					i++;
					if(i%2==1) return item;
				})
			}
		},
		methods: {
			doCancel(){
				this.search = ''
			}
		}
	}
</script>

<style lang='scss' scoped>
	.search-main {
		.search-bar {
			position: relative;
			width: 340px;
			height: 34px;
			margin: 20px auto;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.search-input {
				width: 274px;
				height: 100%;
				outline: none;
				border: none;
				text-indent: 3em;
				background-color: #F4F4F4;
				border-radius: 6px;
			}

			.icon {
				position: absolute;
				left: 0px;
				top: 4px;
				width: 28px;
				height: 28px;
			}

			.cancle {
				font-size: 16px;
			}
		}

		.search-list {
			padding: 0 20px;
			box-sizing: border-box;

			.title {
				font-size: 16px;
				margin: 20px auto;
				margin-bottom: 10px;
				text-align: left;
			}

			.words {
				display: flex;
				flex-wrap: wrap;

				.word {
					padding: 6px 16px;
					background: #F4F4F4;
					border-radius: 8px;
					margin: 6px 10px;
					margin-left: 0;
					;
				}
			}

		}
	}
</style>
