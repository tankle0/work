import http from "../http.js"
//查询订单
var orderList = function(params){
	return http.get("/api/leju/front/order/list",params)
}
//取消未支付订单
var delOrderPre = function(params){
	return http.get("/api/leju/front/order/delOrderPre",params)
}
//确认收货
var allDone = function(params){
	return http.get("/api/leju/front/order/allDone",params)
}
//退单列表
var orderBackList = function(params){
	return http.get("/api/leju/front/order/orderBackList",params)
}
//修改密码 updatePwd
// var updatePwd = function(params){
// 	return http.post("/api/leju/front/user/updatePwd",params)
// }

export{
	orderList,
	delOrderPre,
	allDone,
	orderBackList,
	
}