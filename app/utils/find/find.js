import http from "../http.js"
//发现页数据请求
var seriesAll= function(){
	return http.get("/api/leju/front/find/seriesAll")
}
//商品明细
var productList = function(params){
	return http.get("/api/leju/front/find/product",params)
}

//文章明细
var articleDetail = function(params){
	return http.get("/api/leju/front/find/articleDetail",params)
}
//文章列表
var articleList = function(params){
	return http.get("/api/leju/front/find/aritlceList",params)
}


export{
	seriesAll,
	productList,
	articleDetail,
	articleList
}