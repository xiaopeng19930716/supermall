<template>
	<view class="content">
		<view class="header"><UserInfo class="bottom-border"></UserInfo></view>
		<view class="main"><Sign></Sign></view>
		<view class="footer"><Location></Location></view>
	</view>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { formateDate, pointInsideCircle, isSameDay } from '@/common/util.js';
import { Location, UserInfo, Sign } from './index.js';
export default {
	name: 'index',
	components: {
		Location,
		UserInfo,
		Sign
	},
	data() {
		return {
			isCompany: true, //正常在公司打卡（还是外勤打卡）
			isSign: false, //是否打卡
			date: formateDate(new Date(), 'Y-M-D'),
			//打卡信息 （模式，经纬度，地址，时间）
			signInfo: {
				mode: '',
				latitude: '',
				longitude: '',
				address: '',
				time: '',
				remarks: ''
			}
		};
	},
	computed: {
		...mapGetters(['startTime', 'endTime'])
	},
	onShow() {
		try {
			const userid = uni.getStorageSync('user');
			console.log(userid);
			this.getUserData({ userid });
		} catch (e) {
			//TODO handle the exception
		}
	},
	methods: {
		...mapActions(['getUserData'])
	}
};
</script>

<style></style>
