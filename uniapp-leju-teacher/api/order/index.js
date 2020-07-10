import request from '@/api/request.js'

function orderList(data){
	return request({
		url: '/api/leju/front/order/list',
		method: 'get',
		data
	})
}
// 废弃
function addOrders(data){
	return request({
		url: '/api/leju/front/order/addOrders',
		method: 'post',
		data
	})
}
function addOrderBatch(data){
	return request({
		url: '/api/leju/front/order/addOrderBatch',
		method: 'post',
		data
	})
}
function payConfirm(data){
	return request({
		url: '/api/leju/front/order/payConfirm',
		method: 'get',
		data
	})
}
function delOrderPre(data){
	return request({
		url: '/api/leju/front/order/delOrderPre',
		method: 'get',
		data
	})
}
function allDone(data){
	return request({
		url: '/api/leju/front/order/allDone',
		method: 'get',
		data
	})
}
function backOrder(data){
	return request({
		url: '/api/leju/front/order/backOrder',
		method: 'post',
		data
	})
}
// 退单列表
function orderBackList(data){
	return request({
		url: '/api/leju/front/order/orderBackList',
		method: 'get',
		data
	})
}
export default {
	orderList,
	addOrders,
	addOrderBatch,
	payConfirm,
	delOrderPre,
	allDone,
	backOrder,
	orderBackList
}