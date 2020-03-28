<template>
	<view>
		<text>
			<h3>当前位置:</h3>
		</text>
		<text>
			<h4>{{address.text}}</h4>
		</text>
		<button type="primary"  @click="openLocation">重新获取位置</button>
	</view>
</template>

<script>
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
	name: 'Location',
	created() {
		this.getLocationData();
		if(this.address.getted){
			uni.showToast({
				title:"获取位置成功",
				duration:1000
			})
		}else{
			uni.showToast({
				title:"获取位置失败",
				duration:2000
			})
		}
	},
	computed:{
		...mapState({address:state=>state.location.address})
	},
	methods: {
		...mapMutations(["setPositionData","setAddressData"]),
		...mapActions(["getLocationData"]),
	// 选择地址
	openLocation() {
		const that = this
		uni.chooseLocation({
			success: function(res) {
			that.setPositionData(res)
			that.setAddressData({getted:true,text:res.address})
			}
		});
	},
	},
}
</script>

<style></style>
