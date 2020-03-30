<template>
	<view class="lacation">
		<text>
			<h3>{{address.text}}</h3>		
		</text>
		<button type="primary"  @click="openLocation" style="width: 700rpx">重新获取位置</button>
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
				icon:"success",
				title:"获取位置成功",
				duration:1000
			})
		}else{
			uni.showToast({
				icon:"none",
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

<style>
	.lacation{
		position: absolute;
		bottom: 10rpx;
		margin: 0 auto;
	}
</style>
