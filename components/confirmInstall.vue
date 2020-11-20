<template>
	<view class="dialog-box" v-if='show' >
	  <view class='toastbg' bindtap='clickMask'></view>
	  <view class='show-dialog'>
	    <view class="dialog-title">
	      请下载安装 ConfluxPortal
	    </view>
	    <view style="background-color:#ffffff;height:120rpx;">

			<view class="input-view" >
				<!-- <span style="display:block;text-align: left;">还不了解 Conflux?</span> -->
				<a class="link_install" style="display:block;text-align: center;" target="_blank" rel="noopener noreferrer" href="https://portal.conflux-chain.org/">
					<img style="width:40px;height:40px;" src="data:image/png;base64,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" alt="Icon"/>
				</a>
			</view>
	    </view>
		
	    <view class="dialog-buttons">
	      <view class='button1'>
	        <button class=" dialog-buttons-item" @tap="cancel" >取消</button>
	      </view>
	      <view class='button2'>
			<a class="link_install" target="_blank" rel="noopener noreferrer" href="https://portal.conflux-chain.org/">
				<button class=" dialog-buttons-item" @tap='confirm' style="color:yellowgreen;" >下载</button> 
			</a>
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

				  
			      
			    },
			    confirm() {
					
					//校验数据后，发送数据到前端
					var myEventDetail = {
					  type: 'confirm'
					} // detail对象，提供给事件监听函数
					var myEventOption = {} // 触发事件的选项
					this.$emit('confirm', myEventDetail, myEventOption)
					return false

			    }
		}
	}
</script>

<style>
	
	.link_install {
		text-decoration: none;
		cursor: pointer;
		color: blue;
		font-weight: 500;
	}
	
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
