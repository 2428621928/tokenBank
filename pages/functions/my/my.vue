<template>

	
	<view class="container">
			   
	   <!-- 头部轮播 -->
	   <view class="carousel-section">
		<!-- 标题栏和状态栏占位符 -->
		<view class="titleNview-placing" style="color: white;text-align: center;font-size: 20px;">
			Token
		</view>
		
	   </view>

		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{ current: tabCurrentIndex === index }" @click="tabClick(index)">
				{{ item.text }}
			</view>
		</view>
		<!-- 显示区域 -->
		<view class="list" v-for="(item, index) in navList" :key="index" v-if="tabCurrentIndex === index">
			
			<view v-if="tabCurrentIndex == 0">
				<!-- <view class="laypig-cells">
					<label class="laypig-cell cell-tab" style="margin-right: 8px;">ERC721</label>
					<label class="laypig-cell cell-tab">ERC20</label>
					<label class="laypig-cell cell-tab tab-current">全部</label>
				</view> -->
				<scroll-view class="" style="height:500px;" scroll-y="true" @scrolltolower="loadMore">
				
				
				    <view class="weui-cells weui-cells_after-title token-box" :class="[item.showDetail ? 'token-box-active' : '']" v-for="(item, index) in collectionList" :key="index" >
				            <view class="laypig-cells">
								<view class="laypig-cell" style="float:left;">
									<view style="display:inline-block;"><label class="token-logo" @click="goDetailPage('tokenDetail', item.address)">{{item.firstLetter}}</label></view>
									<view class="token-name" @click="changeShowStatus(index)">{{item.name}}</view>
								</view>
								
								<view class="laypig-cell token-balance" @click="changeShowStatus(index)" >{{item.haveNum}}</view>
								
						
								
							</view>
							<view class="laypig-cells" v-show="item.showDetail" >
								<view class="" style="color:#bababc;width:50%;display:inline-block;" @click="changeShowStatus(index)">
									<view style="display:block;">
										<view style="display:inline-block;font-size:12px;min-width:59px;">总量:</view><text class="token-num">{{item.total}}</text>
									</view>
									<view style="display:block;">
										<view style="display:inline-block;font-size:12px;min-width:59px;">流通:</view><text class="token-num" >{{item.totalSupply}}</text>
									</view>
									<view style="display:block;">
										<view style="display:inline-block;font-size:12px;min-width:59px;">持有地址:</view><text class="token-num" >{{item.holderNum}}</text>
									</view>
											
								</view>
								
								<view style="color:#bababc;margin: 5px 0;display:inline-block;">
									<view style="display:block;">
										<view style="display:inline-block;font-size:12px;min-width:40px;">地址:</view>
										<text style="display:inline-block;color:#000000;font-size:12px;">{{item.token}}</text>
										<image :src="copySrc" class="copy2Icon copy2Address" mode="widthFix" :data-clipboard-text="item.address" data-clipboard-action="copy" @click="copyAddress()"></image>
									</view>
									<view style="display:block;margin: 5px 0;">
										<view style="display:inline-block;font-size:12px;min-width:40px;">owner:</view>
										<text style="display:inline-block;color:#000000;font-size:12px;">{{item.owner}}</text>
										<image :src="copySrc" class="copy2Icon copy2Owner" mode="widthFix" :data-clipboard-text="item.ownerAddress" data-clipboard-action="copy" @click="copyOwner()"></image>
									</view>
								</view>
							</view>
				                
								
				            
				
				            
				    </view>
				
				
				</scroll-view>
				
			</view>
			
			<view v-if="tabCurrentIndex == 1">
				<!-- <view class="laypig-cells">
					<label class="laypig-cell cell-tab" style="margin-right: 8px;">ERC721</label>
					<label class="laypig-cell cell-tab">ERC20</label>
					<label class="laypig-cell cell-tab tab-current">全部</label>
				</view> -->
				<scroll-view class="" style="height:500px;" scroll-y="true"  @scrolltoupper="refresh" @scrolltolower="loadMore">
				
				
				    <view class="weui-cells weui-cells_after-title token-box" :class="[item.showDetail ? 'token-box-active' : '']" v-for="(item, index) in myTokenList" :key="index" >
				            <view class="laypig-cells">
								<view class="laypig-cell" style="float:left;">
									<view style="display:inline-block;" ><label class="token-logo" @click="goDetailPage('tokenDetail', item.address)">{{item.firstLetter}}</label></view>
									<view class="token-name" @click="changeShowStatus(index)">{{item.name}}</view>
								</view>
								
								<view class="laypig-cell token-balance" @click="changeShowStatus(index)">{{item.haveNum}}</view>
								
						
								
							</view>
							<view class="laypig-cells" v-show="item.showDetail" >
								<view class="" style="color:#bababc;width:50%;display:inline-block;" @click="changeShowStatus(index)">
									<view style="display:block;">
										<view style="display:inline-block;font-size:12px;min-width:59px;">总量:</view><text class="token-num">{{item.total}}</text>
									</view>
									<view style="display:block;">
										<view style="display:inline-block;font-size:12px;min-width:59px;">流通:</view><text class="token-num" >{{item.totalSupply}}</text>
									</view>
									<view style="display:block;">
										<view style="display:inline-block;font-size:12px;min-width:59px;">持有地址:</view><text class="token-num" >{{item.holderNum}}</text>
									</view>
											
								</view>
								
								<view style="color:#bababc;margin: 5px 0;display:inline-block;">
									<view style="display:block;">
										<view style="display:inline-block;font-size:12px;min-width:40px;">地址:</view>
										<text style="display:inline-block;color:#000000;font-size:12px;">{{item.token}}</text>
										<image :src="copySrc" class="copy2Icon copy2Address" mode="widthFix" :data-clipboard-text="item.address" data-clipboard-action="copy" @click="copyAddress()"></image>
									</view>
									<view style="display:block;margin: 5px 0;">
										<view style="display:inline-block;font-size:12px;min-width:40px;">owner:</view>
										<text style="display:inline-block;color:#000000;font-size:12px;">{{item.owner}}</text>
										<image :src="copySrc" class="copy2Icon copy2Owner" mode="widthFix" :data-clipboard-text="item.ownerAddress" data-clipboard-action="copy" @click="copyOwner()"></image>
									</view>
								</view>
							</view>
				                
								
				            
				
				            
				    </view>
				
				
				</scroll-view>
				
			</view>
			
		</view>
	
			
			
			
			
			<confirm-install :show="linkInstallStatus" v-on:cancel="installConfluxPortal" v-on:confirm="installConfluxPortal"></confirm-install>
	
			
		
	</view>
	
	

</template>

<script>
	
	import confirmInstall from '@/components/confirmInstall.vue'
	const app = getApp()
	const Big = require('big.js')
	
	export default {
		components: {
			confirmInstall
		},
		data() {
			return {
				changeSrc: '',
				listSrc: '',
				favoriteSrc: '',
				copySrc: '',
				grids: [],
				linkInstallStatus: false,
				collectionList: [],
				myTokenList: [],
				divHeight: 240,
				inputValue: '',
				page: 1,
				pageIndex0: 0,
				pageIndex1: 0,
				rows: 20,
				tabCurrentIndex: 0,
				navList: [
					{
						state: 0,
						text: ' 收藏的 Token',
						orderList: []
					},
					{
						state: 1,
						text: '创建的 Token',
						orderList: []
					}
				]
			}
		},
		onLoad:function(){
			
			// 页面显示是默认选中第一个
			this.tabCurrentIndex = 1;
			
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
			changeShowStatus(index) {
				if(0 == this.tabCurrentIndex) {
					this.collectionList[index]['showDetail'] = this.collectionList[index]['showDetail'] ? false : true
				} else {
					this.myTokenList[index]['showDetail'] = this.myTokenList[index]['showDetail'] ? false : true
				}
				
			},
			changeTab(e) {
				this.tabCurrentIndex = e.target.current;
			},
			tabClick(index) {
				this.tabCurrentIndex = index;
				
				this.loadTokens()
			},
			copyAddress: function() {
				
				let _this = this;
				let clipboard = new this.clipboard(".copy2Address");
			
				clipboard.on('success', function () {
					app.globalData.promise.showToast('复制成功')
				});
				clipboard.on('error', function () {
					app.globalData.promise.showToast('复制失败')
				});
			},
			copyOwner: function() {
				
				let _this = this;
				let clipboard = new this.clipboard(".copy2Owner");
			
				clipboard.on('success', function () {
					app.globalData.promise.showToast('复制成功')
				});
				clipboard.on('error', function () {
					app.globalData.promise.showToast('复制失败')
				});
			},
			goDetailPage(e, paramObj) {
				var that = this
				
				if (typeof e === 'string') {
					if(paramObj) {
						
						uni.navigateTo({
							url: '/pages/functions/' + e + '/' + e + "?address=" + paramObj
						})
					} else {
						uni.navigateTo({
							url: '/pages/functions/' + e + '/' + e 
						})
					}
					
				} else {
					uni.navigateTo({
						url: e.url
					})
				}
						
			},
			async loadData(index) {
				//异步请求获取 banner 列表
				
				let carouselList = await this.$api.json('carouselList')
				
				let boxIcon = await this.$api.json('boxIcon')
				
				this.changeSrc = boxIcon.changeSrc
				this.listSrc = boxIcon.listSrc
				this.favoriteSrc = boxIcon.favoriteSrc
				this.copySrc = boxIcon.copySrc
				
				this.loadTokens()

			},
			refresh: function () {
			  var that = this
			  that.loadTokens()
			},
			loadMore: function() {

			  this.loadTokens()
			  
			},
			installConfluxPortal(e) {
				this.linkInstallStatus = false			
			},
			analyticalObject(coinInfo) {
			
				let coinObj = {}
				coinObj['fullname'] = coinInfo[0][0]
				coinObj['firstLetter'] = coinInfo[0][1].substring(0,1)
				coinObj['name'] = coinInfo[0][1]
				coinObj['address'] = coinInfo[0][2]
				let tokenTemp = coinInfo[0][2].substring(0,6) + "***" + coinInfo[0][2].substring(coinInfo[0][2].length - 4, coinInfo[0][2].length )
				coinObj['token'] = tokenTemp
				let ownerTemp = coinInfo[0][3].substring(0,6) + "***" + coinInfo[0][3].substring(coinInfo[0][3].length - 4, coinInfo[0][3].length )
				coinObj['owner'] = ownerTemp
				coinObj['ownerAddress'] = coinInfo[0][3]
				
				let decimals = Big(coinInfo[0][11]).times(1).toFixed() 
				
				coinObj['total'] = Big(coinInfo[0][4]).times(10 ** (decimals * -1)).toFixed(0)
				coinObj['totalSupply'] = Big(coinInfo[0][5]).times(10 ** (decimals * -1)).toFixed(0)
				coinObj['holderNum'] = Big(coinInfo[0][6]).times(1).toFixed()
				coinObj['haveNum'] = Big(coinInfo[0][7]).times(10 ** (decimals * -1)).toFixed(4)
				coinObj['showDetail'] = false
				coinObj['background'] = "rgb(46, 54, 142)"
				
				return coinObj;
			},
			async loadTokens() {
				if(typeof window.conflux !== 'undefined') {
					app.globalData.promise.showLoading("加载中...")
					
					const accounts = await conflux.enable()
					var account = accounts[0]
					
					app.globalData.userInfo = account
					
					let index = this.tabCurrentIndex
					
					//初始化合约
					if(null == app.globalData.userTokenContract) {
							
						app.globalData.userTokenContract = confluxJS.Contract({
						  abi: app.globalData.userTokenAbi,
						  address: app.globalData.userTokenAddress
						});
						
					}
					
					//获取 top token list
					
					var tempList = await app.globalData.userTokenContract.getUserTokenList(index, account, 0 == index ? this.pageIndex0 : this.pageIndex1, this.rows)
					//暂时使用清空的方法
					
					for(var i = 0 ; i < tempList[0].length; i++) {
						
						if("0x0000000000000000000000000000000000000000" == tempList[0][i]) {
							continue;
						} else {
							let coinInfo = null
							
							if(null == account) {
								
								coinInfo = await app.globalData.tokenBankContract.getTokenInfo("0x0000000000000000000000000000000000000000", tempList[0][i])
								
							} else {
								
								coinInfo = await app.globalData.tokenBankContract.getTokenInfo(account, tempList[0][i])
							}
							
							//如果为空
							if("0x0000000000000000000000000000000000000000" == coinInfo[0][2]) {
								continue;
							}
							
							let coinObj = this.analyticalObject(coinInfo)
							
							//封装 coinInfo List 对象(
							if(0 == index) {
								this.collectionList.push( coinObj)
								
								this.pageIndex0 = Big(tempList[1][i]).times(1).toFixed() 
							} else {
								this.myTokenList.push( coinObj)
								this.pageIndex1 = Big(tempList[1][i]).times(1).toFixed() 
							}
							
							
							
						}
						
					}
					
					
					
					app.globalData.promise.hideLoading()
				} else {
					this.linkInstallStatus = true
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
			padding-top: 0px;
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

page,
.content {
	height: 100%;
}

.swiper-box {
	height: calc(100% - 40px);
}
.list-scroll-content {
	height: 100%;
}

.navbar {
	display: flex;
	height: 40px;
	padding: 0 5px;
	background: #2c2b71;
	box-shadow: 0 1px 5px rgba(0, 0, 0, 0.06);
	position: relative;
	z-index: 10;
	border-radius: 8px;
	margin: 2px 8px;
	.nav-item {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 32px;
		font-size: 15px;
		color: #bababc;
		position: relative;
		margin: 4px 1px;
		&.current {
			color: #FFFFFF;
			background-color: #4e49c1;
			border-radius: 8px;
			&:after {
				content: '';
				position: absolute;
				left: 50%;
				bottom: 0;
				transform: translateX(-50%);
				width: 44px;
				height: 0;
				border-bottom: 2px solid $base-color;
			}
		}
	}
}

.uni-swiper-item {
	height: auto;
}
.order-item {
	display: flex;
	flex-direction: column;
	padding-left: 30upx;
	background: #fff;
	margin-top: 16upx;
	.i-top {
		display: flex;
		align-items: center;
		height: 80upx;
		padding-right: 30upx;
		font-size: $font-base;
		color: $font-color-dark;
		position: relative;
		.time {
			flex: 1;
		}
		.state {
			color: $base-color;
		}
		.del-btn {
			padding: 10upx 0 10upx 36upx;
			font-size: $font-lg;
			color: $font-color-light;
			position: relative;
			&:after {
				content: '';
				width: 0;
				height: 30upx;
				border-left: 1px solid $border-color-dark;
				position: absolute;
				left: 20upx;
				top: 50%;
				transform: translateY(-50%);
			}
		}
	}
	/* 多条商品 */
	.goods-box {
		height: 160upx;
		padding: 20upx 0;
		white-space: nowrap;
		.goods-item {
			width: 120upx;
			height: 120upx;
			display: inline-block;
			margin-right: 24upx;
		}
		.goods-img {
			display: block;
			width: 100%;
			height: 100%;
		}
	}
	/* 单条商品 */
	.goods-box-single {
		display: flex;
		padding: 20upx 0;
		.goods-img {
			display: block;
			width: 120upx;
			height: 120upx;
		}
		.right {
			flex: 1;
			display: flex;
			flex-direction: column;
			padding: 0 30upx 0 24upx;
			overflow: hidden;
			.title {
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				line-height: 1;
			}
			.attr-box {
				font-size: $font-sm + 2upx;
				color: $font-color-light;
				padding: 10upx 12upx;
			}
			.price {
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				&:before {
					content: '￥';
					font-size: $font-sm;
					margin: 0 2upx 0 8upx;
				}
			}
		}
	}

	.price-box {
		display: flex;
		justify-content: flex-end;
		align-items: baseline;
		padding: 20upx 30upx;
		font-size: $font-sm + 2upx;
		color: $font-color-light;
		.num {
			margin: 0 8upx;
			color: $font-color-dark;
		}
		.price {
			font-size: $font-lg;
			color: $font-color-dark;
			&:before {
				content: '￥';
				font-size: $font-sm;
				margin: 0 2upx 0 8upx;
			}
		}
	}
	.action-box {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		height: 100upx;
		position: relative;
		padding-right: 30upx;
	}
	.action-btn {
		width: 160upx;
		height: 60upx;
		margin: 0;
		margin-left: 24upx;
		padding: 0;
		text-align: center;
		line-height: 60upx;
		font-size: $font-sm + 2upx;
		color: $font-color-dark;
		background: #fff;
		border-radius: 100px;
		&:after {
			border-radius: 100px;
		}
		&.recom {
			background: #fff9f9;
			color: $base-color;
			&:after {
				border-color: #f7bcc8;
			}
		}
	}
}
</style>