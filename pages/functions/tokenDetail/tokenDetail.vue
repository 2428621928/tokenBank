<template>

	
	<view class="container">
			   
			<!-- 头部轮播 -->
			
			<view class="carousel-section" style="background-color:rgb(46, 54, 142);">
				<view class="laypig-cells" style="margin:0 0;height:44px;"></view>
				<!-- 标题栏和状态栏占位符 -->
				<view class="titleNview-placing" style="color: white;text-align: center;font-size: 20px;">
					<view class="laypig-cell" style="float:left;width:20%;line-height:28px;height:28px;">
						<image :src="backSrc" class="backIcon" mode="widthFix" style="margin-top:7px;" @click="navigateBack"></image>
					</view>
					<view class="laypig-cell" style="width:60%;"><label style="text-align: center;font-size:16px;">详情</label></view>
					
				</view>
			</view>
			
			<view class="laypig-form">
				<view style="width:50%;float:left;display:inline-block;">
					<view class="laypig-cells" style="margin-top:30px;">
						<view class="laypig-cell"><label class="laypig-label" style="color:#f79123;font-size:20px;text-align:center;">{{coinObj.name}}</label></view>
						<image :src="sczt? favoriteBlueSrc : favoriteSrc" @click="collectionToken" class="favoriteIcon" mode="widthFix"></image>
					</view>
					<view class="laypig-cells" >
						<view class="laypig-cell "><label class="laypig-label" style="text-align:center;"> 余额：</label></view>
						<view class="laypig-cell "><label class="laypig-label" style="text-align:center;">{{coinObj.haveNum}}</label></view>
					</view>
					<view class="laypig-cells" >
						<view class="laypig-cell "><label class="laypig-label" style="text-align:center;">总量：</label></view>
						<view class="laypig-cell "><label class="laypig-label" style="text-align:center;">{{coinObj.total}}</label></view>
					</view>
					<view class="laypig-cells" >
						<view class="laypig-cell "><label class="laypig-label" style="text-align:center;">流通：</label></view>
						<view class="laypig-cell "><label class="laypig-label" style="text-align:center;">{{coinObj.totalSupply}}</label></view>
					</view>
					<view class="laypig-cells" >
						<view class="laypig-cell "><label class="laypig-label" style="text-align:center;">持有地址：</label></view>
						<view class="laypig-cell "><label class="laypig-label" style="text-align:center;">{{coinObj.holderNum}}</label></view>
					</view>
					<view class="laypig-cells" >
						<view class="laypig-cell "><label class="laypig-label" style="text-align:center;">地址：</label></view>
						<view class="laypig-cell "><label class="laypig-label" style="text-align:center;">{{coinObj.token}}</label></view>
						<image :src="copySrc" class="copy2Icon copy2Address" mode="widthFix" :data-clipboard-text="coinObj.address" data-clipboard-action="copy" @click="copyAddress()" style="float:unset;"></image>
					</view>
					<view class="laypig-cells" >
						<view class="laypig-cell "><label class="laypig-label" style="text-align:center;">owner：</label></view>
						<view class="laypig-cell "><label class="laypig-label" style="text-align:center;">{{coinObj.owner}}</label></view>
						<image :src="copySrc" class="copy2Icon copy2Owner" mode="widthFix" :data-clipboard-text="coinObj.ownerAddress" data-clipboard-action="copy" @click="copyOwner()" style="float:unset;"></image>
						 
					</view>
					<view class="laypig-cells" >
						<view class="laypig-cell "><label class="laypig-label" style="text-align:center;">是否可燃烧：</label></view>
						<view class="laypig-cell "><label class="laypig-label" style="text-align:center;">{{coinObj.burning ? '是' : '否'}}</label></view>
					</view>
					<view class="laypig-cells" >
						<view class="laypig-cell "><label class="laypig-label" style="text-align:center;">是否可增发：</label></view>
						<view class="laypig-cell "><label class="laypig-label" style="text-align:center;">{{coinObj.increase ? '是' : '否'}}</label></view>
					</view>
				</view>
				<view style="width:50%;float:right;display:inline-block;">
					<view class="laypig-cells" style="height:312upx;">
					</view>
					<view class="laypig-cells">
						<button class="btn green" @click="showSendToken()">发送</button>	
					</view>
					<view class="laypig-cells">
						<button v-if="coinObj.ownerAddress == account && coinObj.burning" class="btn orange" @click="showBurnToken()">燃烧</button>
						<button v-else class="btn gray">燃烧</button>
					</view>
					<view class="laypig-cells">
						<button v-if="coinObj.ownerAddress == account" class="btn blue"  @click="showIncreaseToken()">空投</button>
						<button v-else class="btn gray">空投</button>
					</view>
				</view>
				
				<view class="laypig-cells" >
					<view class="laypig-cell "><label class="laypig-label" style="text-align:center;">介绍：</label></view>
					<view class="laypig-cell "><label class="laypig-label" style="text-align:left;">{{coinObj.note}}</label></view>
				</view>
				
				
				<!-- <t-table @change="change">
					<t-tr font-size="12" color="#5d6f61" align="right" v-for="item in tableList" :key="item.id">
						<t-td align="left">{{ item.name }}</t-td>
						<t-td align="left">{{ item.age }}</t-td>
					</t-tr>
				</t-table> -->
				
				
				
			</view>
	
				
			<confirm-send :show="sendStatus" v-on:cancel="sendToken" v-on:confirm="sendToken"></confirm-send>
			
			<confirm-burn :show="burnStatus" v-on:cancel="burnToken" v-on:confirm="burnToken"></confirm-burn>
			
			<confirm-increase :show="increaseStatus" v-on:cancel="increaseToken" v-on:confirm="increaseToken"></confirm-increase>
	</view>
	
	

</template>

<script>
	// import tTable from '@/components/t-table/t-table.vue';
	// import tTh from '@/components/t-table/t-th.vue';
	// import tTr from '@/components/t-table/t-tr.vue';
	// import tTd from '@/components/t-table/t-td.vue';
	
	import confirmSend from '@/components/confirmSend.vue'
	import confirmBurn from '@/components/confirmBurn.vue'
	import confirmIncrease from '@/components/confirmIncrease.vue'
	
	const Big = require('big.js')
	
	const tokenBankAbi = require('../../../abi/tokenBank.json')
	const userTokenAbi = require('../../../abi/userToken.json')
	
	const app = getApp()
	
	export default {
		components: {
			confirmSend,
			confirmBurn,
			confirmIncrease
		},
		data() {
			return {
				tokenBankAbi: tokenBankAbi,
				tokenBankContract: null,
				userTokenAbi: userTokenAbi,
				userTokenContract: null,
				tokenAddress: null,
				erc20Contract: null,
				sczt: false,
				account: null,
				sendStatus: false,
				burnStatus: false,
				increaseStatus: false,
				titleNViewBackground: '',
				coinObj: {},
				admin: false,
				changeSrc: '',
				listSrc: '',
				favoriteSrc: '',
				favoriteBlueSrc: '',
				copySrc: '',
				backSrc: '',
				grids: null,
				divHeight: 240,
				inputValue: '',
				page: 1,
				rows: 20,
				tableList: []
				
			}
		},
		onLoad:function(option){
			this.tokenAddress = option.address
			
			this.loadData(this.tokenAddress);
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
			async loadData(address) {
				app.globalData.promise.showLoading("加载中...")
				
				const accounts = await conflux.enable()
				this.account = accounts[0]
				
				//初始化合约
				if(null == this.tokenBankContract) {
						
					this.tokenBankContract = confluxJS.Contract({
					  abi: app.globalData.tokenBankAbi,
					  address: app.globalData.tokenBankAddress
					});
					
				}
				
				if(null == this.userTokenContract) {
						
					this.userTokenContract = confluxJS.Contract({
					  abi: app.globalData.userTokenAbi,
					  address: app.globalData.userTokenAddress
					});
				}
				
				//获取 token Info
				let coinInfo = null
				
				if(null == this.account) {
					coinInfo = await this.tokenBankContract.getTokenInfo("0x0000000000000000000000000000000000000000", address)
					
				} else {
					coinInfo = await this.tokenBankContract.getTokenInfo(this.account, address)
				}
				
				this.coinObj = this.analyticalObject(coinInfo)
				
				let boxIcon = await this.$api.json('boxIcon')
				
				
				//获取收藏状态
				
				if(null == this.account) {
					app.globalData.promise.alert("还未登录不能收藏")
					
				} else {
					this.sczt = await this.userTokenContract.isCollection(this.account, address)
					
					this.favoriteBlueSrc = boxIcon.favoriteBlueSrc
					
					this.favoriteSrc = boxIcon.favoriteSrc
					
				}
				
				this.changeSrc = boxIcon.changeSrc
				this.listSrc = boxIcon.listSrc
				this.copySrc = boxIcon.copySrc
				this.backSrc = boxIcon.backSrc
				
				app.globalData.promise.hideLoading()

			},
			async collectionToken() {
				app.globalData.promise.showLoading("处理中...")
				
				if(this.sczt) {
					
					var result = await this.userTokenContract.collectionToken(this.tokenAddress, 1)
					.sendTransaction({ from: this.account })
					.confirmed()
					
					this.sczt = false
					
					
				} else {
					
					var result = await this.userTokenContract.collectionToken(this.tokenAddress, 2)
					.sendTransaction({ from: this.account })
					.confirmed()
					
					this.sczt = true
					
				}
				
				app.globalData.promise.hideLoading()
				
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
				
				coinObj['img'] = coinInfo[0][8]
				coinObj['burning'] = coinInfo[0][9]
				coinObj['increase'] = coinInfo[0][10]
				coinObj['decimals'] = coinInfo[0][11][0]
				coinObj['note'] = coinInfo[0][12]
				coinObj['attribute'] = coinInfo[0][13]
				coinObj['createTime'] = coinInfo[0][14][0]
				
				return coinObj;
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
			showSendToken: function() {
				this.sendStatus = true
			},
			showBurnToken: function() {
				this.burnStatus = true
			},
			showIncreaseToken: function() {
				this.increaseStatus = true
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
			async sendToken(e) {
				
				//隐藏授权框
				this.sendStatus = false
						
				if (e.type == 'confirm') {
					//判断余额是否充足
					console.log(e.tokenNum, this.coinObj.haveNum)
					if(e.tokenNum > this.coinObj.haveNum) {
						app.globalData.promise.showToast('余额不足', function() {
							
						}, 3500)
						
						return false;
					}
					
					app.globalData.promise.showLoading("加载中...")
					
					const accounts = await conflux.enable()
					this.account = accounts[0]
					
				  if(null == this.erc20Contract) {
				  		
				  	this.erc20Contract = confluxJS.Contract({
				  	  abi: app.globalData.erc20Abi,
				  	  address: this.tokenAddress
				  	});
				  }
				  
				  var result = await this.erc20Contract.transfer(e.targetAddress , e.tokenNum * (10 ** this.coinObj.decimals ))
				  .sendTransaction({ from: this.account })
				  .confirmed()
				  
				  app.globalData.promise.hideLoading()
				  
				} 
						
				
			},
			async burnToken(e) {
						
				//隐藏授权框
				this.burnStatus = false
				
				if (e.type == 'confirm') {
					
					console.log(e.tokenNum, this.coinObj.haveNum)
					if(e.tokenNum > this.coinObj.haveNum) {
						app.globalData.promise.showToast('余额不足', function() {
							
						}, 3500)
						
						return false;
					}
					
					app.globalData.promise.showLoading("加载中...")
					
					const accounts = await conflux.enable()
					this.account = accounts[0]
					
					if(null == this.erc20Contract) {
						
					this.erc20Contract = confluxJS.Contract({
					  abi: app.globalData.erc20Abi,
					  address: this.tokenAddress
					});
					}

					var result = await this.erc20Contract.burn( e.tokenNum * (10 ** this.coinObj.decimals ) )
					.sendTransaction({ from: this.account })
					.confirmed()

					console.log(result)
				  
				    app.globalData.promise.hideLoading()
				  
				} 
						
				
			},
			async increaseToken(e) {
				
				//隐藏授权框
				this.increaseStatus = false
				
				if (e.type == 'confirm') {
					
					console.log(e.tokenNum, this.coinObj.haveNum)
					if(e.tokenNum > this.coinObj.haveNum) {
						app.globalData.promise.showToast('余额不足', function() {
							
						}, 3500)
						
						return false;
					}
					
					app.globalData.promise.showLoading("加载中...")
					
					const accounts = await conflux.enable()
					this.account = accounts[0]
					
				  if(null == this.erc20Contract) {
				  		
				  	this.erc20Contract = confluxJS.Contract({
				  	  abi: app.globalData.erc20Abi,
				  	  address: this.tokenAddress
				  	});
				  }
				  
				  var result = await this.erc20Contract.airdrop(e.targetAddress , e.tokenNum * (10 ** this.coinObj.decimals ) )
				  .sendTransaction({ from: this.account })
				  .confirmed()
				  
				  app.globalData.promise.hideLoading()
				  
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
		background: #cff5f8;
	}
	.m-t{
		margin-top: 16upx;
	}
	/* 头部 轮播图 */
	.carousel-section {
		position: relative;
		padding-top: 0px;

		.titleNview-placing {
			height: 44px;
			box-sizing: content-box;
			background-color: rgb(46, 54, 142);
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
	
	
	.laypig-label {
		color: #000000;
	}
	
	.t-table {
		width: 90%;
		margin-left: 5%;
	}
</style>
