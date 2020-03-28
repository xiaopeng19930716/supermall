<template>
	<view class="full">
		<!-- 顶部导航视图 -->
		<view class="gird-col-4">
			<view v-for="(item, index) in dataList" :key="index" :class="current===index?'nav-item-active':'nav-item'">
				<view @click="setCurrent(index)">
					<text>{{ item.title }}</text>
				</view>
			</view>
		</view>
		<!-- 页面视图 -->
		<Personal v-if="current===0"></Personal>
		<Report v-if="current===1"></Report>
	</view>
</template>

<script>
import Personal from './personal.vue'
import Report from './report.vue'
export default {
	components:{
		Personal,
		Report
	},
	data() {
		return {
			current:0,
			dataList: [{ title: '预览', component: '内容1' },{ title: '报表', component: '内容2'}],
		}
	},
	methods: {
		setCurrent(val){
			this.current = val
		}
	}
};
</script>

<style>
	.gird-col-4{
		display: grid;
		grid-template-columns: repeat(4,1fr);
		background-color: white;
	}
	.nav-item{
		text-align: center;
	}
	.nav-item-active{
		color:#007AFF ;
		text-align: center;
		border-bottom: 4rpx solid #007AFF;
	}
</style>