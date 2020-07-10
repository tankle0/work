import request from '@/api/request.js'

function bannerList(data){
	return request({
		url: '/api/leju/front/home/banners',
		method: 'get',
		data
	})
}
function brandList(data){
	return request({
		url: '/api/leju/front/home/brandList',
		method: 'get',
		data
	})
}
function hotList(data){
	return request({
		url: '/api/leju/front/home/hotList',
		method: 'get',
		data
	})
}
export default {
	bannerList,
	brandList,
	hotList
}