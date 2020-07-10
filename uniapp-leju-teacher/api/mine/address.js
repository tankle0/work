import request from '@/api/request.js'

function addressList(data){
	return request({
		url: '/api/leju/front/address/list',
		method: 'get',
		data
	})
}
function addressSave(data){
	return request({
		url: '/api/leju/front/address/save',
		method: 'post',
		data
	})
}
function detail(data){
	return request({
		url: '/api/leju/front/address/detail',
		method: 'get',
		data
	})
}
function addressUpdate(data){
	return request({
		url: '/api/leju/front/address/update',
		method: 'post',
		data
	})
}
export default {
    addressList,
    addressSave,
	detail,
	addressUpdate
}