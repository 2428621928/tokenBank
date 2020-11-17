<template>
	<view class="dialog-box" v-if='show' >
	  <view class='toastbg' bindtap='clickMask'></view>
	  <view class='show-dialog'>
	    <view class="dialog-title">
	      燃烧 Token
	    </view>
	    <view style="background-color:#ffffff;height:120rpx;">

			<view class="input-view">
				<input class="laypig-input" type="number" style="border-top-left-radius: unset;border-top-right-radius: unset;" v-model="tokenNum" placeholder="燃烧数量" placeholder-class="laypig-input-placeholder" />
			</view>
	    </view>
		
	    <view class="dialog-buttons">
	      <view class='button1'>
	        <button class=" dialog-buttons-item" @tap="cancel" >取消</button>
	      </view>
	      <view class='button2'>
	        <button class=" dialog-buttons-item" @tap='confirm' style="color:yellowgreen;" >燃烧</button> 
	      </view>
	    </view>
	  
	  </view>
	  
	</view>
</template>

<script>
	export default {
		name:'confirm',
		data() {
			return {
				tokenNum: null
			};
		},
		onShow:function(){
			//清空
		
		},
		props: {

			show: { // 显示
				type: Boolean,
				default: false
			},
			height: { // 是否显示border，如果为false，showOutBorder无效
				type: String,
				default: '80%'
			}
		},
		methods: {
			clickMask() {
			
			    },
			    cancel() {
			
			      var myEventDetail = {
					  type: 'cancel'
				  } // detail对象，提供给事件监听函数
			      var myEventOption = {} // 触发事件的选项
				  this.$emit('cancel', myEventDetail, myEventOption)
				  this.tokenNum = null
				  
			      
			    },
			    confirm() {
					//需要校验数据是否合法
					if(null == this.tokenNum || !this.tokenNum || this.tokenNum <= 0) {
						
						uni.showModal({
							content:'数量不可用',
							showCancel: false
						})
						
						return false;
						
					}
					
					
					
					//校验数据后，发送数据到前端
					var myEventDetail = {
					  type: 'confirm',
					  tokenNum: this.tokenNum
					} // detail对象，提供给事件监听函数
					var myEventOption = {} // 触发事件的选项
					this.$emit('confirm', myEventDetail, myEventOption)

					this.targetAddress = null
					this.tokenNum = null

			    }
		}
	}
</script>

<style>
	
.laypig-input {
	background-color: #ffffff;
	width: 80%;
	margin: 0px 10%;
	-webkit-border-radius: 4px;
	border-radius: 8px;
	height: 45px;
	border:1px solid #efefef;
}
	
.dialog-box {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0px;
  left:0px;
  border-radius: 8px;
  border: 1px solid #f3f4f6;

}

.dialog-title {
  display: block;
  height:90rpx;
  line-height: 90rpx;
  color:#000000;
  text-align: center;
  background-color:white;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;

}

.dialog-buttons {
  height:120rpx;
  border-top: 1px solid #f3f4f6;
  display: flex;


}

.dialog-buttons-item {
  height: 120rpx;
  line-height: 120rpx;
  display: inline-block;
  background-color: white;
  border: 1px solid #f3f4f6;
  border-radius: 0px;
  padding:0;
  margin:0;
  font-size: inherit;

}

.dialog-box button:after {
  border: none;
}

.show-dialog {
  position: absolute;
  opacity: 1;
  width:80%;
  margin:40% 10%;
}

.toast-box {
    width: 100%;
    height: 100%;
    opacity: 1;
    position: fixed;
    top: 0px;
    left: 0px;
}
 
.toastbg {
    opacity: 0.2;
    background-color: black;
    position: absolute;
    width: 100%;
    min-height: 100vh;
}
 
.showToast {
    position: absolute;
    opacity: 1;
    width: 70%;
    margin-left: 15%;
    margin-top: 40%;
}
 
.toast-title {
    padding-left: 5%;
    background-color: #2196f3;
    color: white;
    padding-top: 2vh;
    padding-bottom: 2vh;
    border-top-right-radius: 16rpx;
    border-top-left-radius: 16rpx;
}
 
.toast-main {
    padding-top: 2vh;
    padding-bottom: 2vh;
    background-color: white;
    text-align: center;
}
 
.toast-input {
    margin-left: 5%;
    margin-right: 5%;
    border: 1px solid #ddd;
    padding-left: 2vh;
    padding-right: 2vh;
    padding-top: 1vh;
    padding-bottom: 1vh;
}
 
.toast-button {
    display: flex;
}
 
.button1 {
    width: 50%;
}
 
.button2 {
    width: 50%;
}
 
.button1 button {
    width: 100%;
    background-color: white;
    color: red;
    border-radius: 0px;
    border-bottom-left-radius: 16rpx;
}
 
.button2 button{
    width: 100%;
    background-color: white;
    color: black;
    border-radius: 0px;
    border-bottom-right-radius: 16rpx;
}
 
.picker {
    padding-top: 1vh;
    padding-bottom: 1vh;
}
</style>
