<template>
	<view>
		<view class="uni-flex">
			<view class="uni-flex-item">
				<view class="uni-flex">
					<view class="cycle">{{ user.name }}</view>
					<view class="uni-flex-item">
						<!-- 姓名 -->
						<view>
							<text class="maintext">{{ user.name }}</text>
						</view>
						<!-- 班次信息 -->
						<view>
							<navigator url="../tally/detail">
								<text class="linktext">{{ user.rankname }}</text>
							</navigator>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { formateDate } from '../../common/util.js';
export default {
	name: 'UserInfo',
	data() {
		return {
			date: new Date().toLocaleDateString().replace(/\//g, '-'),
			startDate: '',
			endDate: '',
			isDisabled: true
		};
	},
	computed: {
		...mapState({ user: state => state.user.data })
	},
	created() {
		let start = new Date();
		this.startDate = new Date(start.setDate(1));
		this.startDate = formateDate(this.startDate, 'Y-M-D');
		let date = new Date();
		date.setMonth(date.getMonth() + 1);
		let lastDay = date.setDate(0);
		this.endDate = new Date(lastDay);
		this.endDate = formateDate(this.endDate, 'Y-M-D');
	}
};
</script>

<style>
.cycle {
	width: 100rpx;
	height: 100rpx;
	border-radius: 50rpx;
	text-align: center;
	line-height: 100rpx;
	background-color: #aa55ff;
}
</style>
