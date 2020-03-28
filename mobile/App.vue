<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import './common/uni.css';
	/* 头条小程序需要把 iconfont 样式放到组件外 */
	@import "components/m-icon/m-icon.css";
	/* 背景文字等样式 */
	@import "./static/css/main.css";
	/*每个页面公共css */
	page {
		min-height: 100%;
		display: flex;
		font-size: 16px;
	}
	
	/* #ifdef MP-BAIDU */
	page {
		width: 100%;
		height: 100%;
		display: block;
	}
	
	swan-template {
		width: 100%;
		min-height: 100%;
		display: flex;
	}
	
	/* 原生组件模式下需要注意组件外部样式 */
	custom-component {
		width: 100%;
		min-height: 100%;
		display: flex;
	}
	
	/* #endif */
	
	/* #ifdef MP-ALIPAY */
	page {
		min-height: 100vh;
	}
	
	/* #endif */
	
	/* 原生组件模式下需要注意组件外部样式 */
	m-input {
		width: 100%;
		/* min-height: 100%; */
		display: flex;
		flex: 1;
	}
	.input-group {
		background-color: #ffffff;
		margin-top: 20px;
		position: relative;
	}
	
	.input-group::before {
		position: absolute;
		right: 0;
		top: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}
	
	.input-group::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}
	
	.input-row {
		display: flex;
		flex-direction: row;
		position: relative;
		font-size: 18px;
		line-height: 40px;
	}
	
	.input-row .title {
		width: 72px;
		padding-left: 15px;
	}
	
	.input-row.border::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 8px;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}
	
	.btn-row {
		margin-top: 25px;
		padding: 10px;
	}
	
	button.primary {
		background-color: #0088ff;
	}
	.full{
		width: 100%;
		display: flex;
		flex: 1;
		flex-direction: column;
	}
	.content {
		width: 100%;
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: #F1F1F1;
		padding: 25rpx;
		margin: 0 auto;
	}
	/* 头部容器 */
	.header{
		width: 700rpx;
		height: 10vh;
		margin-bottom: 1vh;
	}
	.bottom-border{
		border-bottom:1rpx solid #000000 ;
	}
	/* 主体容器 */
	.main{
		width: 700rpx;
		height: 70vh;
		margin: 1vh auto;
	}
	/* 足部容器 */
	.footer{
		width: 700rpx;
		height: 15vh;
		margin: 1vh auto;
		padding: 10rpx;
		position: absolute;
		/* background-color: #00008B; */
		bottom: 1vh;
	}
	/* 主要文字 */
	.maintext{
		font-size: 35rpx;
		font-weight: 1000;
	}
	/* 小型文字 */
	.mintext{
		font-size: 10rpx;
		font-weight: 300;
	}
	/* 大型文字 */
	.largetext{
		font-size: 50rpx;
		font-weight: bold;
	}
	/* 导航文字 */
	.linktext{
		color: #007AFF;
		font-weight: bold;
	}
	/* 圆角 */
	.border-radius-1{
		border-radius:1rpx ;
	}
	.border-radius-5{
		border-radius:5rpx ;
	}
	.border-radius-10{
		border-radius:10rpx ;
	}
	.border-radius-20{
		border-radius:20rpx ;
	}
	/* 背景色 */
	.background-primay{
		background-color: #0088FF;
	}
</style>
