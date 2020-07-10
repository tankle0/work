import http from "../http.js"
//注册
var regist = function(params){
	return http.post("/api/leju/front/user/register",params)
}
//重置密码
var resetPwd = function(params){
	return http.get("/api/leju/front/user/resetPwd",params)
}
//修改密码 updatePwd
var updatePwd = function(params){
	return http.post("/api/leju/front/user/updatePwd",params)
}
//退出登录
var doLogout = function(){
	return http.get("/api/leju/front/user/doLogout")
}
//更新用户信息
var update = function(params){
	return http.post("/api/leju/front/user/update",params)
}
//用户登录
var doLogin = function(params){
	return http.post("/api/leju/front/user/doLogin",params)
}





export{
	regist,
	resetPwd,
	updatePwd,
	doLogout,
	update,
	doLogin
}