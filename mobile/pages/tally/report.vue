<template>
	<view>
		<view class="gird">
			<button :type="week" size="mini" @click="getWeekData">周</button>
			<button :type="month" size="mini" @click="getMonthData">月</button>
			<view>
				<view class="right">
					<uni-icons type="arrowleft"></uni-icons>
					<text>{{ date }}</text>
					<uni-icons type="arrowright"></uni-icons>
				</view>
			</view>
		</view>
		<view class="gird">
			<view class="m-icon-arrowthinleft">
				
			</view>
		</view>
		<uni-list><uni-list-item v-for="(item, key) in dataList" :key="key" :title="item.title" :rightText="item.value"></uni-list-item></uni-list>
	</view>
</template>

<script>
export default {
	data() {
		return {
			date: '',
			week: 'primary',
			month: 'default',
			dataList: [
				{ title: '平均工时', value: '0天' },
				{ title: '出勤天数', value: '0天' },
				{ title: '出勤班次', value: '0天' },
				{ title: '休息天数', value: '0天' },
				{ title: '迟到', value:'0天' },
				{ title: '早退', value: '0天' },
				{ title: '外勤', value: '0天' },
				{ title: '加班', value: '0天' }
			]
		};
	},
	created() {
		const time = 7 * 24 * 60 * 60 * 1000;
		const startDate = new Date(new Date().getTime() - time).toLocaleDateString().substr(-4);
		const endDate = new Date().toLocaleDateString().substr(-4);
		this.date = startDate + '-' + endDate;
	},
	methods: {
		getWeekData() {
			if (this.week !== 'primary') {
				let temp = this.week;
				this.week = this.month;
				this.month = temp;
			}
			const time = 7 * 24 * 60 * 60 * 1000;
			const startDate = new Date(new Date().getTime() - time).toLocaleDateString().substr(-4);
			const endDate = new Date().toLocaleDateString().substr(-4);
			this.date = startDate + '-' + endDate;
		},
		getMonthData() {
			if (this.month !== 'primary') {
				let temp = this.week;
				this.week = this.month;
				this.month = temp;
			}
			this.date = new Date().toLocaleDateString().substr(0, 6);
		}
	}
};
</script>

<style>
.gird {
	background-color: white;
	display: grid;
	grid-template-columns: 100rpx 100rpx 450rpx;
	margin: 15rpx auto;
	padding: 15rpx;
}
.right {
	float: right;
}
</style>
