<template>

	
	<view class="container">
			   
			<!-- 头部轮播 -->
		   <view class="carousel-section">
		   	<!-- 标题栏和状态栏占位符 -->
		   	<view class="titleNview-placing" style="color: white;text-align: center;font-size: 20px;">
		   		<view class="laypig-cell" style="float:left;width:20%;line-height:28px;height:28px;">
		   			<image :src="backSrc" class="backIcon" mode="widthFix" style="margin-top:7px;" @click="navigateBack"></image>
		   		</view>
		   		<view class="laypig-cell" style="width:60%;"><label style="text-align: center;font-size:16px;">发行模式</label></view>
		   		<!-- <view class="laypig-cell" style="float:right;width:20%;"><label style="text-align:center;" class="laypig-label" @click="toNext">下一步</label></view> -->
		   		
		   	</view>
		   </view>

	
			<view class="" style="margin-top:100px;margin-bottom:30px;">
				<button class="btn gray" @click="poundageModel()">手续费模式</button>
			</view>
			
			<view class="">
				<button class="btn blue" @click="transferModel()">出让份额</button>
			</view>
			
			
			<view class="" style="border: 1px solid cornflowerblue;border-radius: 8px;margin: 20px 10%;">
				<view class="laypig-cells" >
					<label style="width:100%;text-align:center;display:block;color:#FFFFFF;">发行模式规则</label>
				</view>
				<view class="laypig-cells" >
					<label style="width:100%;text-align:left;display:block;color:#FFFFFF;">①手续费模式：支付定量手续费完成代币创建，目前平台暂不支持该模式</label>
				</view>
				<view class="laypig-cells" >
					<label style="width:100%;text-align:left;display:block;color:#FFFFFF;">②出让份额模式（零手续费模式）：按规则收取您发行Token总量的0.06%作为系统运行维护费用，完成代币创建</label>
				</view>
				<!-- <view class="laypig-cells" >
					<view class="laypig-cell-left" style="display:inline-block;float:left;width:16%;">
						<label style="width:100%;text-align:left;display:block;color:#FFFFFF;">规则：</label>
					</view>
					<view class="laypig-cell-right" style="display:inline-block;width:83%;font-size:12px;">
						<label style="width:100%;text-align:left;display:block;color:#FFFFFF;">发行Token总量 ≦ 1W，持有比例0.001</label>
						<label style="width:100%;text-align:left;display:block;color:#FFFFFF;">1W&lt;发行Token总量&le;100W，持有比例0.0005</label>
						<label style="width:100%;text-align:left;display:block;color:#FFFFFF;">100W&lt;发行Token总量，持有比例0.0003</label>
					</view>
				</view> -->
				
				
			</view>
			
			
			
			
		<view class="weui-footer weui-footer_fixed-bottom">
			<view class="weui-footer__text shuoming">发行即代表阅读并同意协议</view>
		</view>
				
		
	</view>
	
	

</template>

<script>
	
	const app = getApp()
	
	export default {
		components: {
		},
		data() {
			return {

				backSrc: '',
				changeSrc: '',
				listSrc: '',
				favoriteSrc: '',
				copySrc: '',
				grids: null,
				divHeight: 240,
				inputValue: '',
				page: 1,
				rows: 20
			}
		},
		onLoad:function(){
			console.log("issue model")
			console.log(app.globalData.issueTokenInfo)
			this.loadData();

		},
		onShareAppMessage() {
			return {
				title: 'Conflux一键发币平台',
				path: '/pages/index/index'
			}
		},
		onTabItemTap(index) {
			console.log(index)
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
			async poundageModel() {
				app.globalData.promise.alert("暂不支持该模式");
			},
			async transferModel() {
				//检测所有参数是否合法，并且已接收到
				var coinInfo = app.globalData.issueTokenInfo
				
				if(null == coinInfo || !coinInfo) {
					this.navigateBack()
				}
				
				//调用合约创建
				app.globalData.promise.confirm("确认发行Token", "确认", "取消",  async function() {
					
					app.globalData.promise.showLoading("加载中...")
					
					const accounts = await conflux.enable()
					var account = accounts[0]
					
					
					
					if(null == app.globalData.tokenBankContract) {
						//初始化合约 
						app.globalData.tokenBankContract = confluxJS.Contract({
						  abi: app.globalData.tokenBankAbi,
						  address: app.globalData.tokenBankAddress
						});
							
					}
					
					var result = await app.globalData.tokenBankContract.publishToken([coinInfo.tokenName, coinInfo.shorthandName , coinInfo.total * (10 ** coinInfo.decimals ) , '' , coinInfo.increase ,coinInfo.burning , coinInfo.decimals , coinInfo.note,''])
					.sendTransaction({ from: account })
					.confirmed()
					
					app.globalData.promise.hideLoading()
					
					// 跳转我的页面
					uni.switchTab({
						url: '/pages/functions/my/my'
					})
					
					
				}, function() {
					//啥也不用做
				} );
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
			refresh: function () {
			  var that = this
			  that.loadTokens()
			},
			loadMore: function() {
			  var that = this
			  that.page += 1
			  
			  that.loadTokens()
			  
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
	.m-t{
		margin-top: 16upx;
	}
	/* 头部 轮播图 */
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
	.carousel {
		width: 96%;
		padding: 0 2%;
		height: 250upx;

		.carousel-item {
			width: 100%;
			height: 124px;
			padding: 0 0;
			overflow: hidden;
		}

		image {
			width: 100%;
			height: 100%;
			border-radius: 10upx;
		}
	}
	.swiper-dots {
		display: flex;
		position: absolute;
		left: 60upx;
		bottom: 15upx;
		width: 72upx;
		height: 36upx;
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkCAYAAADDhn8LAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTk4MzlBNjE0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTk4MzlBNjA0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0E3RUNERkE0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0E3RUNERkI0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4Gh5BPAAACTUlEQVR42uzcQW7jQAwFUdN306l1uWwNww5kqdsmm6/2MwtVCp8CosQtP9vg/2+/gY+DRAMBgqnjIp2PaCxCLLldpPARRIiFj1yBbMV+cHZh9PURRLQNhY8kgWyL/WDtwujjI8hoE8rKLqb5CDJaRMJHokC6yKgSCR9JAukmokIknCQJpLOIrJFwMsBJELFcKHwM9BFkLBMKFxNcBCHlQ+FhoocgpVwwnv0Xn30QBJGMC0QcaBVJiAMiec/dcwKuL4j1QMsVCXFAJE4s4NQA3K/8Y6DzO4g40P7UcmIBJxbEesCKWBDg8wWxHrAiFgT4fEGsB/CwIhYE+AeBAAdPLOcV8HRmWRDAiQVcO7GcV8CLM8uCAE4sQCDAlHcQ7x+ABQEEAggEEAggEEAggEAAgQACASAQQCCAQACBAAIBBAIIBBAIIBBAIABe4e9iAe/xd7EAJxYgEGDeO4j3EODp/cOCAE4sYMyJ5cwCHs4rCwI4sYBxJ5YzC84rCwKcXxArAuthQYDzC2JF0H49LAhwYUGsCFqvx5EF2T07dMaJBetx4cRyaqFtHJ8EIhK0i8OJBQxcECuCVutxJhCRoE0cZwMRyRcFefa/ffZBVPogePihhyCnbBhcfMFFEFM+DD4m+ghSlgmDkwlOgpAl4+BkkJMgZdk4+EgaSCcpVX7bmY9kgXQQU+1TgE0c+QJZUUz1b2T4SBbIKmJW+3iMj2SBVBWz+leVfCQLpIqYbp8b85EskIxyfIOfK5Sf+wiCRJEsllQ+oqEkQfBxmD8BBgA5hVjXyrBNUQAAAABJRU5ErkJggg==);
		background-size: 100% 100%;

		.num {
			width: 36upx;
			height: 36upx;
			border-radius: 50px;
			font-size: 24upx;
			color: #fff;
			text-align: center;
			line-height: 36upx;
		}

		.sign {
			position: absolute;
			top: 0;
			left: 50%;
			line-height: 36upx;
			font-size: 12upx;
			color: #fff;
			transform: translateX(-50%);
		}
	}
	/* 分类 */
	.cate-section {
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-wrap:wrap;
		padding: 30upx 22upx; 
		background: #fff;
		.cate-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: $font-sm + 2upx;
			color: $font-color-dark;
		}
		/* 原图标颜色太深,不想改图了,所以加了透明度 */
		image {
			width: 88upx;
			height: 88upx;
			margin-bottom: 14upx;
			border-radius: 50%;
			opacity: .7;
			box-shadow: 4upx 4upx 20upx rgba(250, 67, 106, 0.3);
		}
	}
	.ad-1{
		width: 100%;
		height: 210upx;
		padding: 10upx 0;
		background: #fff;
		image{
			width:100%;
			height: 100%; 
		}
	}
	/* 秒杀专区 */
	.seckill-section{
		padding: 4upx 30upx 24upx;
		background: #fff;
		.s-header{
			display:flex;
			align-items:center;
			height: 92upx;
			line-height: 1;
			.s-img{
				width: 140upx;
				height: 30upx;
			}
			.tip{
				font-size: $font-base;
				color: $font-color-light;
				margin: 0 20upx 0 40upx;
			}
			.timer{
				display:inline-block;
				width: 40upx;
				height: 36upx;
				text-align:center;
				line-height: 36upx;
				margin-right: 14upx;
				font-size: $font-sm+2upx;
				color: #fff;
				border-radius: 2px;
				background: rgba(0,0,0,.8);
			}
			.icon-you{
				font-size: $font-lg;
				color: $font-color-light;
				flex: 1;
				text-align: right;
			}
		}
		.floor-list{
			white-space: nowrap;
		}
		.scoll-wrapper{
			display:flex;
			align-items: flex-start;
		}
		.floor-item{
			width: 150upx;
			margin-right: 20upx;
			font-size: $font-sm+2upx;
			color: $font-color-dark;
			line-height: 1.8;
			image{
				width: 150upx;
				height: 150upx;
				border-radius: 6upx;
			}
			.price{
				color: $uni-color-primary;
			}
		}
	}
	
	.f-header{
		display:flex;
		align-items:center;
		height: 140upx;
		padding: 6upx 30upx 8upx;
		background: #fff;
		image{
			flex-shrink: 0;
			width: 80upx;
			height: 80upx;
			margin-right: 20upx;
		}
		.tit-box{
			flex: 1;
			display: flex;
			flex-direction: column;
		}
		.tit{
			font-size: $font-lg +2upx;
			color: #font-color-dark;
			line-height: 1.3;
		}
		.tit2{
			font-size: $font-sm;
			color: $font-color-light;
		}
		.icon-you{
			font-size: $font-lg +2upx;
			color: $font-color-light;
		}
	}
	/* 团购楼层 */
	.group-section{
		background: #fff;
		.g-swiper{
			height: 650upx;
			padding-bottom: 30upx;
		}
		.g-swiper-item{
			width: 100%;
			padding: 0 30upx;
			display:flex;
		}
		image{
			width: 100%;
			height: 460upx;
			border-radius: 4px;
		}
		.g-item{
			display:flex;
			flex-direction: column;
			overflow:hidden;
		}
		.left{
			flex: 1.2;
			margin-right: 24upx;
			.t-box{
				padding-top: 20upx;
			}
		}
		.right{
			flex: 0.8;
			flex-direction: column-reverse;
			.t-box{
				padding-bottom: 20upx;
			}
		}
		.t-box{
			height: 160upx;
			font-size: $font-base+2upx;
			color: $font-color-dark;
			line-height: 1.6;
		}
		.price{
			color:$uni-color-primary;
		}
		.m-price{
			font-size: $font-sm+2upx;
			text-decoration: line-through;
			color: $font-color-light;
			margin-left: 8upx;
		}
		.pro-box{
			display:flex;
			align-items:center;
			margin-top: 10upx;
			font-size: $font-sm;
			color: $font-base;
			padding-right: 10upx;
		}
		.progress-box{
			flex: 1;
			border-radius: 10px;
			overflow: hidden;
			margin-right: 8upx;
		}
	}
	/* 分类推荐楼层 */
	.hot-floor{
		width: 100%;
		overflow: hidden;
		margin-bottom: 20upx;
		.floor-img-box{
			width: 100%;
			height:320upx;
			position:relative;
			&:after{
				content: '';
				position:absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				background: linear-gradient(rgba(255,255,255,.06) 30%, #f8f8f8);
			}
		}
		.floor-img{
			width: 100%;
			height: 100%;
		}
		.floor-list{
			white-space: nowrap;
			padding: 20upx;
			padding-right: 50upx;
			border-radius: 6upx;
			margin-top:-140upx;
			margin-left: 30upx;
			background: #fff;
			box-shadow: 1px 1px 5px rgba(0,0,0,.2);
			position: relative;
			z-index: 1;
		}
		.scoll-wrapper{
			display:flex;
			align-items: flex-start;
		}
		.floor-item{
			width: 180upx;
			margin-right: 20upx;
			font-size: $font-sm+2upx;
			color: $font-color-dark;
			line-height: 1.8;
			image{
				width: 180upx;
				height: 180upx;
				border-radius: 6upx;
			}
			.price{
				color: $uni-color-primary;
			}
		}
		.more{
			display:flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			flex-shrink: 0;
			width: 180upx;
			height: 180upx;
			border-radius: 6upx;
			background: #f3f3f3;
			font-size: $font-base;
			color: $font-color-light;
			text:first-child{
				margin-bottom: 4upx;
			}
		}
	}
	/* 猜你喜欢 */
	.guess-section{
		display:flex;
		flex-wrap:wrap;
		padding: 0 30upx;
		background: #fff;
		.guess-item{
			display:flex;
			flex-direction: column;
			width: 48%;
			padding-bottom: 40upx;
			&:nth-child(2n+1){
				margin-right: 4%;
			}
		}
		.image-wrapper{
			width: 100%;
			height: 330upx;
			border-radius: 3px;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}
		.title{
			font-size: $font-lg;
			color: $font-color-dark;
			line-height: 80upx;
		}
		.price{
			font-size: $font-lg;
			color: $uni-color-primary;
			line-height: 1;
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
	

	
	.shuoming {
		font-size:1vw;
		-webkit-transform: scale(0.80);
		color: rgb(186, 186, 188);
		width: 100%;
		text-align: center;
	}
</style>
