<template>
	<view class="content">
		<Card title="班次信息" isShadow isFull>
			<view>
				<text>今日需要打卡？	{{ isNeedSign ? '是' : '否' }}</text>
			</view>
			<view>
				<text class="maintext">上下班时间</text>
			</view>
			<view>
				<text>上班时间: {{ rank.quanstart }}</text>
			</view>
			<view>
				<text>下班时间:	{{ rank.quanend }}</text>
			</view>
			<view>
				<text class="maintext">休息</text>
			</view>
			<view>
				<text>是否中间休息:	{{ rank.rest ? '是' : '否' }}</text>
			</view>
			<view v-if="rank.rest">
				<text>中间休息时间:{{ rank.firststart }}--{{rank.firstend}}</text>
			</view>
			<view>
				<text class="maintext">签到时间</text>
			</view>
			<view>
				<text>上班前 {{ rank.signinbefore }} 分钟可以签到</text>
			</view>
			<view>
				<text>下班后 {{ rank.signoffafter }} 分钟可以签退</text>
			</view>
		</Card>
		<Card title="公司信息" isShadow isFull>
			<view>
				<view class="maintext"><text>名称</text></view>
				<view>
					<text>{{ company.name }}</text>
				</view>
			</view>
			<view>
				<view class="maintext"><text>地理位置</text></view>
				<view>
					<text>经度:{{ company.longitude }}</text>
				</view>
				<view>
					<text>纬度:{{ company.latitude }}</text>
				</view>
			</view>
		</Card>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import Card from '@/components/uni-card/uni-card.vue';
export default {
	name: 'RankDetail',
	components: {
		Card
	},
	data() {
		return {
			isNeedSign: false,
			// 公司位置
			company: {
				name: 'XX科技股份有限公司',
				longitude: 116.4,
				latitude: 39.9
			}
		};
	},
	computed: {
		...mapState({ rank: state => state.user.data })
	},
	created() {
		if(this.rank.signin&&this.rank.signoff){
			const day = new Date().getDate()
			let days = this.rank.rankdays.split("-")
			days = days.map(Number)
			this.isNeedSign = days.includes(day)
		}
	},
};
</script>

<style></style>
