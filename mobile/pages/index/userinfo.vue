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
							<view>
								<navigator url="../detail/detail"><text class="linktext">{{ user.rankname }}</text></navigator>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 日期选择器 -->
			<view class="sign-title-r">
				<view class="uni-flex">
					<view class="maintext border-radius-10 background-primay text-white">
						<text>{{date}}</text>
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
		...mapState({ user: state => state.user })
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
	},
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
.active {
	background: #55aaff;
}
,
.sign-title {
	display: flex;
	justify-content: space-between;
	padding: 30upx 24upx;
	border-bottom: 1upx solid #333;
}
.sign-title .portrait {
	width: 100upx;
	height: 100upx;
	line-height: 100upx;
	border-radius: 50%;
	background-color: #007aff;
	color: #fff;
	font-size: 28upx;
	text-align: center;
}
.sign-title .sign-title-l {
	display: flex;
}
.sign-title .sign-title-l .text {
	margin-left: 20upx;
}
.sign-title .sign-title-l .text .name {
	font-size: 32upx;
}
.sign-title .sign-title-l .text .gz {
	color: darkblue;
	display: inline-flex;
}
.sign-title .sign-title-l .text .gz text {
	display: inline-block;
}
.sign-title .sign-title-l .text .gz .t1 {
	overflow: hidden; /*超出部分隐藏*/
	text-overflow: ellipsis; /* 超出部分显示省略号 */
	white-space: nowrap; /*规定段落中的文本不进行换行 */
	width: 166upx; /*需要配合宽度来使用*/
}
</style>
