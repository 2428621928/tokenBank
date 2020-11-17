<template>
	<view class="dialog-box" v-if='show' >
	  <view class='toastbg' bindtap='clickMask'></view>
	  <view class='show-dialog'>
	    <view class="dialog-title">
	      需您授权后登录可用
	    </view>
	    <slot>
	    </slot>
	    <view class="dialog-buttons">
	      <view class='button1'>
	        <button class=" dialog-buttons-item" @tap="cancel" >取消 </button>
	      </view>
	      <view class='button2'>
	        <button class=" dialog-buttons-item" @tap='confirm' style="color:yellowgreen;" open-type="getUserInfo">授权</button> 
	      </view>
	    </view>
	  
	  </view>
	  
	</view>
</template>

<script>
	export default {
		name:'loginConfirm',
		data() {
			return {
			};
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
			      
			    },
			    confirm() {
			
			      var myEventDetail = {
					  type: 'confirm'
				  } // detail对象，提供给事件监听函数
			      var myEventOption = {} // 触发事件的选项
				  this.$emit('confirm', myEventDetail, myEventOption)

			    }
		}
	}
</script>

<style>
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
  height:180rpx;
  line-height: 180rpx;
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
