// const serveHost = 'http://localhost';
 import settingFile from '@/setting.js'
import qs from './qs.js';

function http(options) {
	return new Promise((resolve, reject) => {
		// if (options.method.toLowerCase() == 'post') {
		// 	// qs系列化  
		// 	// https://www.npmjs.com/package/qs 
		// 	//  arrayFormat: 'repeat' 作用:  { a: ['b', 'c'] }  ==> 'a=b&a=c'
		// 	//  allowDots: true  作用: { a: { b: { c: 'd', e: 'f' } } }  ==>  'a.b.c=d&a.b.e=f'
		// 	options.data = qs.stringify(options.data, {
		// 		arrayFormat: 'repeat',
		// 		allowDots: true
		// 	})
		// }
		
		var setting = {
			url: settingFile.host + options.url,
			data: options.data,
			method: options.method.toUpperCase() || 'GET',
			timeout: 6000,
			header: {
				'content-type': 'application/x-www-form-urlencoded', // from data
			},
			success(res) {
				resolve(res.data);
			},
			fail(err) {
				console.log('err',err);
				uni.showToast({
					icon:'error',
					title: '网络超时!'
				})
				reject(err);
			},
			
		}
		if (options.header) {
			setting.header = Object.assign(setting.header, options.header);
		}
		uni.request(setting);
	})
}
 

export default http;


// {
// 		url: '/api/leju/front/find/aritlceList',
// 		method: 'get',
// 		data,
// 		header: {
	// xxx:xxx
// }
// 	}
// function foo(options){
// 	return new Promise((resolve,reject)=>{
	// 	requestSttting = {
	// 	    url: options.url, //仅为示例，并非真实接口地址。
	// 		method: options.method.toUpperCase(),
	// 	    data: option.data,
	// 	    header: {
	// 	        'custom-header': 'hello' //自定义请求头信息
	// 	    },
	// 	    success: (res) => {
		       
	// 	        tvar text = 'request success';
	// 			resolve(text);
	// 	    },
	// 		fail: (err)=>{
	// 			reject(err)
	// 		}
	// 	}
	// 	if(options.header){
	// 			requestSttting.header = Object.assign(requestSttting.header,options.header)
	// 	}
	// 	uni.request(requestSttting);
	// })
// }


