<template>
	<view class="content">
		<view class="header"><UserInfo class="bottom-border"></UserInfo></view>
		<view class="main">
			<view></view>
			<Sign></Sign>
			<view></view>
		</view>
		<Location></Location>
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
