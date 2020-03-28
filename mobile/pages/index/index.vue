<template>
	<view class="content">
		<UserInfo class="header bottom-border"></UserInfo>
		<Sign class="main"></Sign>
		<Location class="footer"></Location>
	</view>
</template>

<script>
import { mapState ,mapGetters,mapActions}from 'vuex';
import { formateDate, pointInsideCircle, isSameDay } from '@/common/util.js';
import { Location ,UserInfo ,Sign} from './index.js'
export default {
	name:"index",
	components:{
		Location ,UserInfo ,Sign
	},
	data() {
		return {
			isCompany: true, //正常在公司打卡（还是外勤打卡）
			isSign: false, //是否打卡
			date: formateDate(new Date(), 'Y-M-D'),
			//打卡信息 （模式，经纬度，地址，时间）
			signInfo: { 
				mode: '', 
				latitude: '', 
				longitude: '', 
				address: '', 
				time: '', 
				remarks: '' ,
			}, 
		};
	},
	computed: {
		...mapGetters(["startTime","endTime"])
	},
	methods: {
		
	}
};
</script>

<style>
.map {
	width: 750rpx;
	height: 260rpx;
}
.uni-list-cell-left {
	padding: 0 30upx;
}
.text-desc {
	display: flex;
	justify-content: space-between;
	padding: 10upx 20upx;
}
.colorRed {
	color: red;
}
.colorGreen {
	color: #32cd32;
}
.colorYellow {
	color: yellow;
}
.colorBlue {
	color: #007aff;
}

.bgBlue {
	background-color: #007aff;
}
.bgGreen {
	background-color: #32cd32;
}
.bgAsh {
	background-color: #c8c7cc;
}

.desc-pad {
	padding: 0 0upx;
}
.desc-pad .bz {
	color: rgb(0, 122, 255);
}
.desc-pad .bz .icon {
	color: rgb(0, 122, 255);
}



.content-show {
	width: 100%;
}
.iswq {
	padding: 0px 12px;
	color: #99cc33;
	border: 1px solid #99cc33;
	width: 26px;
	height: 24px;
	border-radius: 4px;
	margin-left: 20upx;
	display: inline-block;
}
.desc-pad .last {
	margin-bottom: 80upx;
}
.relocation {
	color: #0000ff;
}
.uni-popup .content .text {
	color: #5555ff;
}
</style>
