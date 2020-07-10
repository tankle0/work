
<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		 globalData: {  
			obj: ''  ,
			addressList:[
				{
					name:"勿二君",
					tel:"13283947222",
					address:"湖南省长沙市镇北街",
					useId:Math.random()
				},
				{
					name:"叶小飞",
					tel:"15273645272",
					address:"河南省郑州市金水区80号",
					useId:Math.random()
				},
				{
					name:"韩立",
					tel:"18372648292",
					address:"河南省郑州市郑东新区60号",
					useId:Math.random()
				}
			]
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
