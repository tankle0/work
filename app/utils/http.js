import url from "./baseUrl.js"
import qs from "qs"

var obj = {
	get(path,params){
		return new Promise((resolve,rejected) =>{
			uni.request({
				url:url + path,
				data:params,
				success(res){
					resolve(res)
				},
				fail(res){
					rejected(res)
				}
			})
		})
	},
	post(path,params){
		return new Promise((resolve,rejected)=>{
			uni.request({
				url:url + path,
				data:qs.stringify(params,{ allowDots: true}),
				method:"POST",
				header:{
					"content-type":"application/x-www-form-urlencoded"
				},
				success(res){
					resolve(res)
				},
				fail(res){
					rejected(res)
				}
			})
		})
	}
}

export default obj