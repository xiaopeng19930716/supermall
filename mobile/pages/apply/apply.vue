<template>
	<view class="full">
		<view class="gird">
			<view v-for="item in uniIcons" :key="item.id">
				<view class="applyicon background-primay border-radius-20">
					<navigator :url="item.url" class="applyicon background-primay border-radius-20"><uni-icons :type="item.icon" size="50" color="white"></uni-icons></navigator>
					<text class="mintext">{{ item.name }}</text>
				</view>
			</view>
		</view>
		<uni-list>
			<uni-list-item title="申请记录"></uni-list-item>
		</uni-list>
	</view>
</template>
<script>
export default {
	name: 'Apply',
	data() {
		return {
			uniIcons: [
				{ icon: 'person', url: '', name: '补卡' },
				{ icon: "upload", url: '', name: '请假' },
				{ icon: 'paperplane', url: '', name: '出差' },
				{ icon: 'redo', url: '', name: '外出' },
				{ icon: 'plusempty', url: '', name: '加班' },
				// { icon: 'person', url: '', name: '补卡申请' }
			]
		};
	},
	methods: {
		name() {}
	}
};
</script>

<style>
.gird {
	display: grid;
	grid-template-columns: repeat(4,1fr);
	grid-template-rows: repeat(2,180rpx);
	height: 30vh;
	background-color: #ffffff;
	margin-bottom: 100rpx;
}
.applyicon {
	width: 100rpx;
	height: 100rpx;
	text-align: center;
	margin: 5rpx auto;
}
</style>
