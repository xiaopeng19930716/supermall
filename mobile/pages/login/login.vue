<template>
	<view class="content">
		<view class="input-group">
			<view class="input-row border">
				<text class="title">服务器：</text>
				<m-input :isDisable="true" class="m-input" type="text" clearable focus :value="server"  placeholder="地址"></m-input>
			</view>
			<view class="input-row border">
				<text class="title">账号：</text>
				<m-input class="m-input" type="text" clearable focus v-model="account" placeholder="工号或学号"></m-input>
			</view>
			<view class="input-row">
				<text class="title">密码：</text>
				<m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
			</view>
		</view>
		<view class="btn-row">
			<button type="primary" class="primary" @tap="bindLogin">登录</button>
		</view>
		<view class="action-row">
			<navigator url="./reg">配置服务器</navigator>
			<text>|</text>
			<navigator url="./pwd">忘记密码</navigator>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations,mapActions} from 'vuex'
	import myRequest from '../../network/api.js'
	import mInput from '../../components/m-input.vue'
	export default {
		components: {
			mInput
		},
		data() {
			return {
				server:'',
				account: '',
				password: '',
			}
		},
		onShow() {
			try{
				this.server=uni.getStorageSync("url")
			}catch(e){
				//TODO handle the exception
			}
		},
		onLoad() {
			try{
			const userid = uni.getStorageSync("user")
				if(userid&&userid!==""){
					uni.reLaunch({
						url:"../index/index"
					})
				}
			}catch(e){
				//TODO handle the exception
			}
			// 如果用户已经登陆过
		},
		methods: {
			...mapMutations(['login']),
		bindLogin() {
				const params = {
					account: this.account,
					password: this.password
				};
				if(!params.account||!params.password){
					uni.showToast({
						title:"请输入账号或者密码"
					})
				}else{
				myRequest("/login",params)
				.then(user=>{
					if(user.status){
						// 提交到Store并缓存
						this.login(user.data)
						uni.reLaunch({
							url: '../index/index',
						});
						uni.showToast({
							icon: 'none',
							title: '登陆成功',
						});	
						// 获取用户数据
						this.getUserData({userid:params.account})
					} else {
						uni.showToast({
							icon: 'none',
							title: '用户账号或密码不正确',
						});
					}
				})	
				}
			}
		},
	}
</script>

<style>
	.action-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.action-row navigator {
		color: #007aff;
		padding: 0 10px;
	}

	.oauth-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}

	.oauth-image {
		position: relative;
		width: 50px;
		height: 50px;
		border: 1px solid #dddddd;
		border-radius: 50px;
		margin: 0 20px;
		background-color: #ffffff;
	}

	.oauth-image image {
		width: 30px;
		height: 30px;
		margin: 10px;
	}

	.oauth-image button {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
</style>
