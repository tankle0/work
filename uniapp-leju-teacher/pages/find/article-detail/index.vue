<template>
	<div class="article-main">
		<rich-text :nodes="article.content2"></rich-text>
	</div>
</template>

<script>
	import findApi from '@/api/find/index.js'
	export default {
		name: 'Article',
		data(){
			return {
				id: '',
				article: {}
			}
		},
		onLoad(option){
			this.id = option.articleId;
			this.getArticleDetail();
		},
		methods:{
			async getArticleDetail(){
				var {data} = await findApi.articleDetail({id:this.id});
				this.article = data;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.article-main{
		padding: 60rpx;
	}
</style>
