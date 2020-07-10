import request from '@/api/request.js'

function articleList(data){
	return request({
		url: '/api/leju/front/find/aritlceList',
		method: 'get',
		data
	})
}
function articleDetail(data){
	return request({
		url: '/api/leju/front/find/articleDetail',
		method: 'get',
		data
	})
}


function seriesAll(data){
	return request({
		url: '/api/leju/front/find/seriesAll',
		method: 'get',
		data
	})
}
export default {
	articleList,
	articleDetail,
	seriesAll
}