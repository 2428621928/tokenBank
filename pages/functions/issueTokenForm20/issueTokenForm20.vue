<!-- @author：君莫 @date: 2020年11月23日-->
<template>

	<view class="container">
			   
			<!-- 头部轮播 -->
			<view class="carousel-section">
				<!-- 标题栏和状态栏占位符 -->
				<view class="titleNview-placing" style="color: white;text-align: center;font-size: 20px;">
					<view class="laypig-cell" style="float:left;width:20%;line-height:28px;height:28px;">
						<image :src="backSrc" class="backIcon" mode="widthFix" style="margin-top:7px;" @click="navigateBack"></image>
					</view>
					<view class="laypig-cell" style="width:60%;"><label style="text-align: center;font-size:16px;">发行Token</label></view>
					<view class="laypig-cell" style="float:right;width:20%;">
						<label style="text-align:center;" class="laypig-label" @click="toNext" >下一步</label>
					</view>
					
				</view>
			</view>
			
			<view class="laypig-form">
				<view class="laypig-cells">
					<view class="laypig-cell laypig-cell-left"><label class="laypig-label">名称：</label></view>
					<view class="laypig-cell laypig-cell-right">
						<input class="laypig-input" v-model="coinInfo.tokenName" placeholder="请填写名称" placeholder-class="laypig-input-placeholder" />
					</view>
					<view style="clear:both;"></view>
				</view>
				<view class="laypig-cells">
					<view class="laypig-cell laypig-cell-left"><label class="laypig-label">简称：</label></view>
					<view class="laypig-cell laypig-cell-right">
						<input class="laypig-input" v-model="coinInfo.shorthandName" placeholder="请填写简称" placeholder-class="laypig-input-placeholder" />
					</view>
				</view>
				<view class="laypig-cells">
					<view class="laypig-cell laypig-cell-left"><label class="laypig-label">小数位：</label></view>
					<view class="laypig-cell laypig-cell-right">
						<input class="laypig-input" v-model="coinInfo.decimals" type="number" placeholder="请填写Token精度(1-18位)" placeholder-class="laypig-input-placeholder" />
					</view>
				</view>
				<view class="laypig-cells">
					<view class="laypig-cell laypig-cell-left"><label class="laypig-label">总量：</label></view>
					<view class="laypig-cell laypig-cell-right">
						<input class="laypig-input" v-model="coinInfo.total" type="number" placeholder="请填写发行总量" placeholder-class="laypig-input-placeholder" />
					</view>
				</view>
				
				<view class="laypig-cells">
					<view class="laypig-cell laypig-cell-left"><label class="laypig-label" style="height: 100px;line-height: 100px;">介绍：</label></view>
					<view class="laypig-cell laypig-cell-right">
						<textarea class="weui-textarea laypig-textarea" v-model="coinInfo.note" placeholder="请填写介绍" placeholder-class="laypig-input-placeholder" rows="3"></textarea>
					</view>
				</view>
				
				<view class="laypig-cells">
					<view class="laypig-cell laypig-cell-left"><label class="laypig-label">可增发：</label></view>
					<view class="laypig-cell laypig-cell-right">
						<view style="width:85%;">
							<switch :checked="coinInfo.increase" @change="switch1Change" style="float:right;"/>
						</view>
						
					</view>
				</view>
				
				<view class="laypig-cells">
					<view class="laypig-cell laypig-cell-left"><label class="laypig-label">可燃烧：</label></view>
					<view class="laypig-cell laypig-cell-right">
						<view style="width:85%;">
							<switch :checked="coinInfo.burning" @change="switch2Change" style="float:right;"/>
						</view>
						
					</view>
				</view>
				
				
				
			</view>
	
			
			
			
		<view class="weui-footer weui-footer_fixed-bottom">
			<view class="weui-footer__text shuoming">发行声明：您将在Conflux网络上发行通证Token，严禁在该平台一切非法律途径的使用，否则后果自负</view>
		</view>
				
		
	</view>
	

</template>

<script>
	// import loginConfirm from '@/components/loginConfirm.vue'
	const app = getApp()
	
	export default {
		// components: {
		// 	loginConfirm
		// },
		data() {
			return {
				admin: false,
				hasUserInfo: false,
				changeSrc: '',
				listSrc: '',
				favoriteSrc: '',
				copySrc: '',
				backSrc: '',
				grids: null,
				divHeight: 240,
				coinInfo: {
					tokenName: '',
					shorthandName: '',
					decimals: 18,
					total: '',
					note: '',
					increase: false,
					burning: false
				}
				
			}
		},
		onLoad:function(){
			
			this.loadData();

		},
		onShareAppMessage() {
			return {
				title: 'Conflux一键发币平台',
				path: '/pages/index/index'
			}
		},
		onTabItemTap(index) {
			//console.log(index)
		},
		methods: {
			/**
			 * 请求静态数据只是为了代码不那么乱
			 * 分次请求未作整合
			 */
			async loadData() {
				//异步请求获取 banner 列表
				
				
				let boxIcon = await this.$api.json('boxIcon')
				
				this.changeSrc = boxIcon.changeSrc
				this.listSrc = boxIcon.listSrc
				this.favoriteSrc = boxIcon.favoriteSrc
				this.copySrc = boxIcon.copySrc
				this.backSrc = boxIcon.backSrc

				
			},
			navigateBack: function() {
				
				let pages = getCurrentPages()
				
				if(1 < pages.length) {
					uni.navigateBack({
						delta:1
					})
				} else {
					uni.switchTab({
					    url: '/pages/index/index'
					});
				}
				
			},
			switch1Change: function() {
				this.coinInfo.increase = this.coinInfo.increase? false : true
			},
			switch2Change: function() {
				this.coinInfo.burning = this.coinInfo.burning? false : true
			},
			toNext() {
				
				//校验数据合法性
				if("" == this.coinInfo.tokenName) {
					app.globalData.promise.alert('名称不能为空')
					return;
				}
				
				if("" == this.coinInfo.shorthandName) {
					app.globalData.promise.alert('简称不能为空')
					return;
				}
				
				if("" == this.coinInfo.decimals) {
					app.globalData.promise.alert('小数位不能为空')
					return;
				}
				
				if("" == this.coinInfo.total) {
					app.globalData.promise.alert('总量不能为空')
					return;
				}
				
				if("" == this.coinInfo.note) {
					app.globalData.promise.alert('介绍不能为空')
					return;
				}
				
				app.globalData.issueTokenInfo = this.coinInfo
				
				uni.navigateTo({
					url: '/pages/functions/issueModel/issueModel'
				})
			},
			triggerCollapse(e) {
				if (!this.lists[e].pages) {
					this.goDetailPage(this.lists[e].url);
					return;
				}
				for (var i = 0; i < this.lists.length; ++i) {
					if (e === i) {
						this.lists[i].open = !this.lists[e].open;
					} else {
						this.lists[i].open = false;
					}
				}
			},
			goDetailPage(e) {
				var that = this
				
					
				if (typeof e === 'string') {
					uni.navigateTo({
						url: '/pages/functions/' + e + '/' + e
					})
				} else {
					uni.navigateTo({
						url: e.url
					})
				}
						
			}
		}
	}
</script>

<style lang="scss">
	
	.weui-cells:before {
		border-top:0px ;
	}
	
	.weui-cells:after {
		border-bottom:0px ;
	}
	
	.weui-cells {
		background: none;
	}
	
	.weui-cell {
		margin: 2px 8px;
		padding: unset;
		border-radius: 10px;
		background-color: rgba(151,155,200,1)
	}
	
	.uni-row {
	  display: flex;
	  justify-content: left;
	}
	.token-text {
		color: white;
		display: inline-block;
		margin: 5px 10px;
		font-size: 16px;
		width: 100%;
		text-align: left;
	}
	
	.info1 {
		font-size: 12px;
		display: inline-block;
		color: #bababc;
		float: left;
		min-width: 60px;
		padding-left: 9px;
		text-align: left;
	}
	
	.info2 {
		font-size:12px;
		display:inline-block;
		color:#ffffff;
		float:left;
	}
	
	.info3 {
		font-size: 12px;
		display: inline-block;
		color: #bababc;
		float: left;
		min-width: 70px;
		padding-left: 9px;
		text-align: left;
	}
	
	.logoIcon {
		width:26px;
		display:inline-block;
		margin:6px 8px;
		float:left;
	}
	.copyIcon {
		width: 12px;
		display: inline-block;
		margin: 2px 3px;
		float: right;
	}
	
	.copy2Icon {
		width: 15px;
		display: inline-block;
		margin-left: 5px;
		margin-top: 2px;
		margin-bottom: 2px;
		float: right;
	}
	
	.changeIcon {
		// height: 50px;
		width: 33%;
		display: inline-block;
		margin: 6px 10px;
		float: left;
	}
	
	.listIcon {
		width: 29upx;
		display: inline-block;
		margin-left: auto;
		margin-right: 3px;
		margin-top: 12px;
		margin-bottom: 28px;
		margin-left:auto;
		float: right;

	}
	
	.favoriteIcon {
		width: 29upx;
		display: inline-block;
		margin-left: 8px;
		margin-right: 3px;
		margin-top: 9px;
		margin-bottom: 24px;

	}
	

	
	/* #ifdef MP */
	.mp-search-box{
		position:absolute;
		left: 0;
		top: 30upx;
		z-index: 9999;
		width: 100%;
		padding: 0 80upx;
		.ser-input{
			flex:1;
			height: 56upx;
			line-height: 56upx;
			text-align: center;
			font-size: 28upx;
			color:$font-color-base;
			border-radius: 20px;
			background: rgba(255,255,255,.6);
		}
	}
	page{
		.cate-section{
			position:relative;
			z-index:5;
			border-radius:16upx 16upx 0 0;
			margin-top:-20upx;
		}
		.carousel-section{
			padding: 0;
			.titleNview-placing {
				padding-top: 0;
				height: 0;
			}
			.carousel{
				.carousel-item{
					padding: 0;
				}
			}
			.swiper-dots{
				left:45upx;
				bottom:40upx;
			}
		}
	}
	/* #endif */
	
	
	page {
		background: rgb(46, 54, 142);
	}
	
	.carousel-section {
		position: relative;
		padding-top: 10px;
	
		.titleNview-placing {
			height: var(--status-bar-height);
			margin-bottom: 44px;
			box-sizing: content-box;
		}
	
		.titleNview-background {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 353upx;
			transition: .4s;
		}
	}

	.coin-box-left {
		margin-top:10px;
		height:215px;
		border-radius: 10px;
		background: -webkit-linear-gradient(left top, #4dcee8 , #2b7af7); /* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(bottom right, #4dcee8 , #2b7af7); /* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(bottom right, #4dcee8 , #2b7af7); /* Firefox 3.6 - 15 */
		background: linear-gradient(to bottom right, #4dcee8 , #2b7af7); /* 标准的语法（必须放在最后） */
	
	}
	
	.coin-box-right {
		margin-top:10px;
		height:215px;
		background-color:rgba(226,144,55,1);
		border-radius: 10px;
		background: -webkit-linear-gradient(left top, #ec9710 , #f87808); /* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(bottom right, #ec9710 , #f87808); /* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(bottom right, #ec9710 , #f87808); /* Firefox 3.6 - 15 */
		background: linear-gradient(to bottom right, #ec9710 , #f87808); /* 标准的语法（必须放在最后） */
			
		
	}
	
	.btn {
		width:80%;
		color:#FFFFFF;
		border-radius: 8px;
		height: 50px;
		line-height: 50px;
		margin-top:5px;
		margin-bottom:5px;
		
	}
	
	.orange {
		background-color: #f9a437;
	}
	
	.blue {
		background-color: #44b2ed;
	}
	
	.shuoming {
		font-size:1vw;
		-webkit-transform: scale(0.80);
		color: rgb(186, 186, 188);
		width: 100%;
		text-align: center;
	}
</style>
