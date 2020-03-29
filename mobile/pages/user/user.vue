<template>
	<view class="content">
		<uni-list class="margin-top">
			<navigator v-for="(item, key) in dataList" :key="key" :url="item.url"><uni-list-item :title="item.title" :showSwitch="item.showSwitch"></uni-list-item></navigator>
		</uni-list>
		<view class="footer">
			<button type="primary" @click="updatePassword">修改密码</button>
			<button type="primary" @click="bindLogout" class="margin-top">退出登录</button>
		</view>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
	name: 'User',
	data() {
		return {
			dataList: [
				{ title: '快捷打卡', url: '',showSwitch:true},
				{ title: '我的手机', url: '' },
			]
		};
	},
	methods: {
		...mapMutations(['logout']),
		bindLogout() {
			this.logout();
			uni.reLaunch({
				url: '../login/login'
			});
		},
		updatePassword() {}
	}
};
</script>

<style></style>
