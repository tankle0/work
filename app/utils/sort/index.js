import http from "../http.js"
//分类页数据请求
var kind = function(){
	return http.get("/api/leju/front/kind/list")
}
//商品列表
var productList = function(params){
	return http.get("/api/leju/front/product/list",params)
}

//根据ID查詢
var detailsList = function(params){
	return http.get("/api/leju/front/product/detail",params)
}
//提交订单
var pay = function(params){
	return http.post("/api/leju/front/order/payConfirm",params)
}


export{
	kind,
	productList,
	detailsList,
	pay
}