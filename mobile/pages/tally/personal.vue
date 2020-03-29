<template>
	<view>
		<picker mode="date" @change="dateChange">
			<view style="color: #0088FF">
				{{ date }}
				<uni-icons type="arrowdown"></uni-icons>
			</view>
		</picker>
		<view class="uni-center margin-top">
			<CmdProgress type="circle" :percent="percent" :width="200"></CmdProgress>
			<template>
				<view class="margin-top maintext">应到/实到</view>
			</template>
		</view>
		<uni-list class="margin-top">
			<navigator v-for="(item, key) in dataList" :key="key" :url="item.url"><uni-list-item :title="item.title" :showSwitch="item.showSwitch"></uni-list-item></navigator>
		</uni-list>
	</view>
</template>

<script>
// 圆形进度条
import CmdProgress from '@/components/cmd-progress/cmd-progress.vue';
export default {
	components: { CmdProgress },
	data() {
		return {
			date: new Date()
				.toLocaleDateString()
				.replace(/\//g, '-')
				.substr(0, 6) +"月",
			percent: 80,
			dataList: [
				{ title: '考勤规则', url: 'detail' },
			]
		};
	},
	methods: {
		dateChange(val) {
			this.date = val.detail.value.substr(0, 7)+"月";
		}
	}
};
</script>

<style lang="scss"></style>
