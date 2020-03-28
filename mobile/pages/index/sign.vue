<template>
	<view style="margin-top: 100rpx;">
		<!-- 纵向排列 -->
		<view class="uni-flex">
			<uni-steps :options="quantums" direction="column" :active="currentActive" activeColor="#CC6600" class="uni-steps maintext"></uni-steps>
			<view class="cycle" @click="setSignAsync">
				<text class="inner-text">{{ time }}</text>
			</view>
		</view>
		<view class="uni-center sign">
			<text ><h2>{{signs.time}}</h2></text>
		</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import uniSteps from '@/components/uni-steps/uni-steps.vue';
export default {
	name: 'Sign',
	components: { uniSteps },
	props:{
		sign:{
			type:String,
			default:""
		}
	},
	data() {
		return {
			signs: {
				userid:"",
				time:"",
				category:"手机考勤",
				position:{}
			},
			time: new Date().toLocaleTimeString(), //当前时分秒
			currentActive: 1
		};
	},
	computed: {
		...mapState({
			quantums: state => {
				const data = state.attendance.data[0];
				if (data) {
					return [{ title: '上班时间', desc: data.quanstart }, { title: '下班时间', desc: data.quanend }];
				}
			},
			position:state=>state.location.position
		})
	},
	// 获得服务器上今天的打卡记录
	// watch:{
	// 	sign:function(newVal,oldVal){
	// 		this.sign = newVal
	// 	}
	// },
	created() {
		var that = this;
		setInterval(() => {
			const time = new Date().toTimeString().substr(0, 8);
			that.time = time;
		}, 1000);
	},
	methods: {
		setSignAsync() {
			// 获得缓存的用户id
			try{
			this.signs.userid = uni.getStorageSync("user")
			}catch(e){
				//TODO handle the exception
				console.log(e)
			}
			this.signs.time = this.time
			this.signs.position = this.position
			console.log(this.signs)
		}
	}
};
</script>

<style>
.uni-steps {
	/* background-color: #007aff; */
	width: 205rpx;
}
.cycle {
	width: 300rpx;
	height: 300rpx;
	border-radius: 150rpx;
	border: 2rpx solid #aaaaff;
	box-shadow:0rpx 0rpx 15rpx #00557f;
	line-height: 300rpx;
	text-align: center;
	vertical-align: middle;
	background-color: #5555ff;
}
.inner-text {
	font-size: 50rpx;
	color: #ffffff;
}
.sign{
	margin-top: 100rpx;
}
</style>
