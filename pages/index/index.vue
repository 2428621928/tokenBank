<!-- @author：君莫 @date: 2020年11月23日-->
<template>

	
	<view class="container">
			   
			   <!-- 头部轮播 -->
		   <view class="carousel-section">
			<!-- 标题栏和状态栏占位符 -->
			<view class="titleNview-placing">
				<view class="laypig-cells">
					<view class="laypig-cell" style="float:left;width:20%;">
						<label v-show="null == account" class="laypig-label" style="text-align:center;" @click="login()">登录</label>
						<image v-show="null != account" :src="avatarSrc" class="avatarIcon" mode="widthFix"></image>
					</view>
					<view class="laypig-cell" style="width:50%;" v-show="null != account">
						<label style="text-align: center;font-size:16px;color:#FFFFFF;">总计CFX：{{hideBalanceStatus? hideStr : cfxBalance}}</label>
					</view>
					<view class="laypig-cell" style="width:10%;" v-show="null != account">
						<image v-show="!hideBalanceStatus" :src="canViewSrc" class="eyeIcon" mode="widthFix" @click="hiddenBalance()"></image>
						<image v-show="hideBalanceStatus" :src="canNotViewSrc" class="eyeIcon" mode="widthFix" @click="hiddenBalance()"></image>
						
					</view>
					
					<view class="laypig-cell" style="float:right;width:20%;">
						<image :src="searchSrc" class="searchIcon" mode="widthFix" @click="goDetailPage('tokenSearch')"></image>
					</view>
				</view>
				
			</view>
			<!-- 背景色区域 -->
			<!-- <view class="titleNview-background" :style="{backgroundColor:titleNViewBackground}"></view> -->
			<swiper class="carousel" circular @change="swiperChange" style="height:124px;">
				<swiper-item style="height:353upx;" v-for="(item, index) in carouselList" :key="index" class="carousel-item" @click="navToDetailPage({title: '轮播广告'})">
					<image :src="item.src" mode="aspectFill" />
				</swiper-item>
			</swiper>
			<!-- 自定义swiper指示器 -->
			<view class="swiper-dots">
				<text class="num">{{swiperCurrent+1}}</text>
				<text class="sign">/</text>
				<text class="num">{{swiperLength}}</text>
			</view>
		   </view>

	
			<view class="weui-flex">
				
	
				<view class="weui-flex__item" v-for="(item, index) in topTokenList" :key="index">
				  <view class="iconfont-container">
					  
					<view :class="[index == 1?'coin-box-left':'coin-box-right']">
						<view class="row">
							<image :src="changeSrc" class="changeIcon" mode="widthFix"></image>
							<image :src="listSrc" class="listIcon" mode="widthFix" @click="goDetailPage('tokenDetail', item.address)"></image>
							<!-- <image :src="favoriteSrc" class="favoriteIcon" mode="widthFix"></image> -->
							
							
							
						</view>
						<view class="uni-row">
							<text class="token-text">{{item.name}}</text>
						</view>
						<view class="uni-row">
							<text class="info1">地址：</text>
							<text class="info2">{{item.token}}</text>
							<image :src="copySrc" class="copyIcon copy2Address" mode="widthFix" :data-clipboard-text="item.address" data-clipboard-action="copy" @click="copyAddress()"></image>
						</view>
						<view class="uni-row">
							<text class="info1">owner：</text>
							<text class="info2">{{item.owner}}</text>
							<image :src="copySrc" class="copyIcon" mode="widthFix" :data-clipboard-text="item.ownerAddress" data-clipboard-action="copy" @click="copyOwner()"></image>
						</view>
						<view class="uni-row">
							<text class="info1">总量：</text>
							<text class="info2">{{item.total}}</text>
							
						</view>
						<view class="uni-row">
							<text class="info1">流通：</text>
							<text class="info2">{{item.totalSupply}}</text>
							
						</view>
						<view class="uni-row">
							<text class="info3">持有地址：</text>
							<text class="info2">{{item.holderNum}}</text>
							
						</view>
					</view>
					  
					
				  </view>
				</view>
	
	
					
			</view>
			
			<view>
				<scroll-view class="" style="height:220px;" scroll-y="true"  @scrolltolower="loadMore" lower-threshold="0" >
				
				
				    <view class="weui-cells weui-cells_after-title" v-for="(item, index) in grids" :key="index">
				            <view class="weui-cell">
								<view style="display:inline-block;" @click="goDetailPage('tokenDetail', item.address)" ><label class="token-logo">{{item.firstLetter}}</label></view>
								<!-- <image :src="item.src" class="logoIcon" mode="widthFix"></image> -->
				                <view class="" style="color:white;font-size:15px;width:60px;">{{item.name}}</view>
				
				                <view class="" style="color:#bababc;width:100px;">
									<view style="display:block;">
										<view style="display:inline-block;font-size:12px;min-width:30px;">总量:</view><text style="font-size:12px;display:inline-block;color:white;">{{item.total}}</text>
									</view>
									<view style="display:block;">
										<view style="display:inline-block;font-size:12px;min-width:30px;">流通:</view><text style="font-size:12px;display:inline-block;color:white;">{{item.totalSupply}}</text>
									</view>
									<view style="display:block;">
										<view style="display:inline-block;font-size:12px;min-width:59px;">持有地址:</view><text style="font-size:12px;display:inline-block;color:white;">{{item.holderNum}}</text>
									</view>

								</view>
				                
				                <view style="color:#bababc;margin: 5px 0;">
									<view style="display:block;">
										<view style="display:inline-block;font-size:12px;min-width:40px;">地址:</view>
										<text style="display:inline-block;color:white;font-size:12px;">{{item.token}}</text>
										<image :src="copySrc" class="copy2Icon copy2Address" mode="widthFix" :data-clipboard-text="item.address" data-clipboard-action="copy" @click="copyAddress()"></image>
									</view>
									<view style="display:block;margin: 5px 0;">
										<view style="display:inline-block;font-size:12px;min-width:40px;">owner:</view>
										<text style="display:inline-block;color:white;font-size:12px;">{{item.owner}}</text>
										<image :src="copySrc" class="copy2Icon copy2Owner" mode="widthFix" :data-clipboard-text="item.ownerAddress" data-clipboard-action="copy" @click="copyOwner()"></image>
									</view>
								</view>
								
				            </view>
				
				            
				    </view>
				
				
				</scroll-view>
				
			</view>
	
			<confirm-install :show="linkInstallStatus" v-on:cancel="installConfluxPortal" v-on:confirm="installConfluxPortal"></confirm-install>
		
	</view>
	
	
	

</template>

<script>
	import confirmInstall from '@/components/confirmInstall.vue'
	
	const tokenBankAbi = require('../../abi/tokenBank.json')
	
	const app = getApp()
	
	const Big = require('big.js')
	
	
	export default {
		components: {
			confirmInstall
		},
		data() {
			return {
				tokenBankAbi: tokenBankAbi,
				tokenBankContract: null,
				account: null,
				cfxBalance: null,
				titleNViewBackground: '',
				swiperCurrent: 0,
				swiperLength: 0,
				carouselList: [],
				goodsList: [],
				linkInstallStatus: false,
				hideBalanceStatus: false,
				hideStr: '******',
				admin: false,
				changeSrc: '',
				listSrc: '',
				favoriteSrc: '',
				copySrc: '',
				searchSrc: '',
				avatarSrc: '',
				canViewSrc: '',
				canNotViewSrc: '',
				topTokenList: [],
				grids: [],
				divHeight: 240,
				inputValue: '',
				page: 1,
				pageIndex: 0,
				rows: 10
			}
		},
		onLoad:function(){
			
			this.loadData();
			
			if(null == this.account) {
				if(typeof window.conflux !== 'undefined') {
					
					if(conflux.isConfluxPortal) {
						
						if(null != conflux.selectedAddress) {
							
							this.login()
														
						} 
					} 
				}
			}
			
			
		},
		onShareAppMessage() {
			return {
				title: 'Conflux一键发币平台',
				path: '/pages/index/index'
			}
		},
		onTabItemTap(index) {
			if(null != app.globalData.userInfo && null == this.account) {
				this.login()
			}
		},
		methods: {
			async login() {
				if(typeof window.conflux !== 'undefined') {
					
					if(conflux.isConfluxPortal) {
						
						if(null == conflux.selectedAddress) {
							
							try {
								const accounts = await conflux.enable()
								this.account = accounts[0]
								app.globalData.userInfo = this.account
																
							} catch (error) {
								console.log(error)
							}
							
							
						} else {
							this.account = conflux.selectedAddress
							app.globalData.userInfo = this.account
						}
						
						this.getBalance();
						
						
					} else {
						this.linkInstallStatus = true
					}
					
				} else {
					 this.linkInstallStatus = true
				}
			},
			/**
			 * 请求静态数据只是为了代码不那么乱
			 * 分次请求未作整合
			 */
			async loadData() {
				//异步请求获取 banner 列表
				
				let carouselList = await this.$api.json('carouselList')
				
				let boxIcon = await this.$api.json('boxIcon')
				
				this.changeSrc = boxIcon.changeSrc
				this.listSrc = boxIcon.listSrc
				this.favoriteSrc = boxIcon.favoriteSrc
				this.copySrc = boxIcon.copyWhiteSrc
				this.searchSrc = boxIcon.searchSrc
				this.avatarSrc = boxIcon.avatarSrc
				this.canViewSrc = boxIcon.canViewSrc
				this.canNotViewSrc = boxIcon.canNotViewSrc
				
				this.titleNViewBackground = carouselList[0].background;
				this.swiperLength = carouselList.length;
				this.carouselList = carouselList;
				
				if(typeof window.conflux !== 'undefined') {
					// app.globalData.promise.alert(conflux.networkVersion)
					// if(app.globalData.confluxNetwork != conflux.networkVersion) {
					// 	app.globalData.promise.alert('请切换到' + app.globalData.confluxNetworkStr)
						
					// 	return;
					// }
					
					this.loadTopToken()
					
					this.loadTokens()
					
				}
		

			},
			refresh: function () {
			  this.loadTokens()
			},
			loadMore: function() {
			  
			  this.loadTokens()
			  
			},
			hiddenBalance: function() {
				this.hideBalanceStatus = this.hideBalanceStatus ? false : true
					
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

				coinObj['background'] = "rgb(46, 54, 142)"
				
				return coinObj;
			},
			async loadTopToken() {
				
				//判断当前浏览器，是否包含 conflux portal
				if(typeof window.conflux !== 'undefined') {
					
					//初始化合约
					if(null == app.globalData.tokenBankContract) {
							
						app.globalData.tokenBankContract = confluxJS.Contract({
						  abi: app.globalData.tokenBankAbi,
						  address: app.globalData.tokenBankAddress
						});
						
					}
					
					//获取 top token list
					var topResult = await app.globalData.tokenBankContract.getTopToken(0, 2)
					
					this.topTokenList = []
					
					for(var i = 0 ; i < topResult[0].length; i++) {
						
						if("0x0000000000000000000000000000000000000000" == topResult[0][i]) {
							continue;
						} else {
							let coinInfo = null
							
							if(null == this.account) {
								
								coinInfo = await app.globalData.tokenBankContract.getTokenInfo("0x0000000000000000000000000000000000000000", topResult[0][i])
								
							} else {
								coinInfo = await app.globalData.tokenBankContract.getTokenInfo(this.account, topResult[0][i])
							}
							
							let coinObj = this.analyticalObject(coinInfo)
							//封装 coinInfo List 对象(
							this.topTokenList.push( coinObj)
							
						}
						
					}
				} else {
					//提示下载钱包
					this.linkInstallStatus = true
				}
				
				
			},
			async loadTokens() {
				
				if(typeof window.conflux !== 'undefined') {
					
					app.globalData.promise.showLoading("加载中...")
					
					//初始化合约
					if(null == app.globalData.tokenBankContract) {
							
						app.globalData.tokenBankContract = confluxJS.Contract({
						  abi: app.globalData.tokenBankAbi,
						  address: app.globalData.tokenBankAddress
						});
						
					}
					
					
					//获取 token List
					var result = await app.globalData.tokenBankContract.getHomeTokenList(this.pageIndex, this.rows);
					
					for(var j = 0 ; j < result[0].length; j++) {
						
						if("0x0000000000000000000000000000000000000000" == result[0][j]) {
							continue;
						} else {
							if(null == this.account) {
								let coinInfo = await app.globalData.tokenBankContract.getTokenInfo("0x0000000000000000000000000000000000000000", result[0][j])
								
								let coinObj = this.analyticalObject(coinInfo)
								//封装 coinInfo List 对象(
								this.grids.push( coinObj)
								
								//this.pageIndex = this.pageIndex > Big(result[1][j]).times(1).toFixed() ? this.pageIndex : Big(result[1][j]).times(1).toFixed()
								this.pageIndex = Big(result[1][j]).times(1).toFixed() 
								
							} else {
								var coinInfo = await app.globalData.tokenBankContract.getTokenInfo(this.account, result[0][j])
								
								let coinObj = this.analyticalObject(coinInfo)
								//封装 coinInfo List 对象(
								this.grids.push( coinObj)
								
								//this.pageIndex = this.pageIndex > Big(result[1][j]).times(1).toFixed() ? this.pageIndex : Big(result[1][j]).times(1).toFixed()
								this.pageIndex = Big(result[1][j]).times(1).toFixed() 
							}
							
							
							
						}
						
					}
					
					app.globalData.promise.hideLoading()
				} else {
					//提示下载钱包
					this.linkInstallStatus = true
				}
				
				
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
			//轮播图切换修改背景色
			swiperChange(e) {
				const index = e.detail.current;
				this.swiperCurrent = index;
				this.titleNViewBackground = this.carouselList[index].background;
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
			installConfluxPortal(e) {
				this.linkInstallStatus = false			
			},
			async getBalance() {
				const accounts = await conflux.enable()
				var account = accounts[0]
				
				
				const balance = await confluxJS.getBalance(account);
				this.cfxBalance = ConfluxJSSDK.util.unit.fromDripToCFX(balance)
				this.cfxBalance = Big(this.cfxBalance).times(1).toFixed(6)
				
					
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
		padding-left: 9px;
		text-align: left;
		min-width:44px;
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
		padding-left: 9px;
		text-align: left;
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
</style>
