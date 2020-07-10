import request from '@/api/request.js'

function doLogin(data){
	return request({
		url: '/api/leju/front/user/doLogin',
		method: 'POST',
		data
	})
}
function register(data){
 	return request({
 		url: '/api/leju/front/user/register',
 		method: 'POST',
 		data
 	})
 }
export default {
	doLogin,
	register
}