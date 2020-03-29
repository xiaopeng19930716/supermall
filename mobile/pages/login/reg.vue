<template>
	<view class="content">
		<view class="input-group">
			<view class="input-row border">
				<text class="title">地址：</text>
				<m-input type="text" displayable v-model="serverUrl"></m-input>
			</view>
		</view>
		<view class="btn-row"><button type="primary" class="primary" @tap="register">测试连接</button></view>
	</view>
</template>

<script>
import mInput from '../../components/m-input.vue';
import{mapMutations} from 'vuex'
export default {
	components: {
		mInput
	},
	data() {
		return {
			serverUrl:""
		};
	},
	methods: {
		...mapMutations(["setServerUrl"]),
		register() {
			const that = this
			uni.request({
				url:that.serverUrl+"/mobile",
				method:"GET",
				success:(res) =>{
					if(res.statusCode===200&&res.data.status){
						uni.setStorageSync("url",this.serverUrl)
						that.setServerUrl(this.serverUrl)
						uni.showToast({
							title:"连接成功",
							duration:1000
						})
					}else{
						uni.showToast({
							title:"连接失败",
							duration:2000
						})
					}
				},
				fail:(err)=> {
					uni.showToast({
						title:"连接失败",
						duration:2000
					})
				}
			})
			
			
		}
	}
};
</script>

<style></style>
