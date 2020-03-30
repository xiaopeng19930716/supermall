<template>
	<view class="sign">
		<view class="margin-top flex-column-between flex-column-around" v-for="(sign, key) in signs" :key="key">
			<text>{{ sign.type }} {{ sign.time }}</text>
		</view>
		<!-- 纵向排列 -->
		<view>
			<view class="cycle" @click="setSignAsync">
				<text class="inner-text">{{ time }}</text>
			</view>
			<uni-steps :options="quantums" direction="row" :active="currentActive" activeColor="#c83dff" class="uni-steps"></uni-steps>
		</view>
		
	</view>
</template>

<script>
import { mapState } from 'vuex';
import uniSteps from '@/components/uni-steps/uni-steps.vue';
export default {
	name: 'Sign',
	components: { uniSteps },
	data() {
		return {
			count: 0,
			signs: [
				{
					userid: '',
					time: '',
					category: '手机考勤',
					position: {}
				}
			],
			time: new Date().toLocaleTimeString(), //当前时分秒
			currentActive: 1
		};
	},
	computed: {
		...mapState({
			quantums: state => {
				const data = state.user.data;
				if (data) {
					return [{ title: '上班', desc: data.quanstart }, { title: '下班', desc: data.quanend }];
				}
			},
			position: state => state.location.position
		})
	},
	created() {
		var that = this;
		setInterval(() => {
			const time = new Date().toTimeString().substr(0, 8);
			that.time = time;
		}, 1000);
	},
	methods: {
		setSignAsync() {
			try {
				var userid = uni.getStorageSync('user');
			} catch (e) {
				//TODO handle the exception
				console.log(e);
			}
			const sign = {
				userid: userid,
				time: this.time,
				category: '手机考勤',
				position: this.position,
				type: ''
			};
			if (!sign.position.address) {
				uni.showToast({
					title: '请获取地址',
					duration: 2000
				});
			} else {
				sign.type = this.count % 2 === 0 ? '上班打卡:' : '下班打卡:';
				this.count++;
				this.signs.push(sign);
			}
		}
	}
};
</script>

<style>
.uni-steps {
	margin: 0 auto;
	width: 400rpx;
	font-size: 40rpx;
}
.cycle {
	width: 300rpx;
	height: 300rpx;
	border-radius: 150rpx;
	border: 2rpx solid #aaaaff;
	box-shadow: 0rpx 0rpx 15rpx #00557f;
	line-height: 300rpx;
	text-align: center;
	background-color: #5555ff;
	margin: 5vh auto;
}
.inner-text {
	font-size: 50rpx;
	color: #ffffff;
}
.sign {
	background-color: yellow;
	display: flex;
	margin: 0 auto;
}
</style>
