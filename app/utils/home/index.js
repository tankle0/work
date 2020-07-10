import http from "../http.js"
//首页数据请求
var banner = function(){
	return http.get("/api/leju/front/home/banners",{
		use:0
	})
}
//品牌列表
var brandList = function(){
	return http.get("/api/leju/front/home/brandList")
}

//特色优选
var hotList = function(){
	return http.get("/api/leju/front/home/hotList")
}


export{
	banner,
	brandList,
	hotList
}