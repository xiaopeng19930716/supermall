<template>
	<view class="content">
		<view class="uni-flex">
			<button type="primary" @click="updatePassword">修改密码</button>
			<button type="primary" @click="bindLogout">退出登录</button>
		</view>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
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
