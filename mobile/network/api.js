const BASE_URL = "http://192.168.1.101:3000"

const request = (url, params) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + url,
			method: "POST",
			data: params,
			success: (res) => {
				return resolve(res)
			},
			fail: (err) => {
				return reject(err)
			}
		})
	})
}
export default function myRequest(url, params) {
	return request(url, params)
		.then(res => {
			if(res.statusCode===200){
				return res.data
			}else{
				console.log(res.statusCode)
			}
		}).catch(err => {
			console.log(err)
		})
}
