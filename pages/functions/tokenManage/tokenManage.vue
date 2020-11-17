<template>
	<view class="page">
	    <view class="page__bd page__bd_spacing">
	       
	        <view class="weui-flex">
	            <view class="weui-flex__item">
	              <!-- <view class="placeholder placeholder_box" bindtap='studyVocabulary'>单词记忆</view> -->
	              <view class="weui-flex-box" @click='studyVocabulary'>
	                <view class="placeholder placeholder_box">单词记忆</view>
	                  <!-- <text class="iconfont icon-studying" style="color:#71AB27;"></text>
	                  <text class="iconfont-text">单词记忆</text> -->
	                
	              </view>
	            </view>
	            <view class="weui-flex__item">
	              <view class="weui-flex-box" @click='fiftyAlphabet'>
					  <view class="placeholder placeholder_box">极限五十音</view>
<!-- 	                  <text class="iconfont icon-studying" style="color:#71AB27;"></text>
	                  <text class="iconfont-text">极限五十音</text> -->
	              </view>
	            </view>
	        </view>
	        
	
	
	        
	    </view>
	
	    <view class="weui-footer weui-footer_fixed-bottom">
	        <view class="weui-footer__text">Copyright © www.confluxnetwork.org</view>
	    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			fiftyAlphabet: function() {
				uni.navigateTo({
					url: '/pages/functions/jaGame/fiftyAlphabet'
				})
			},
			studyVocabulary: function() {
				uni.navigateTo({
					url: '/pages/functions/jaUnit/jaUnit'
				})
			}
		}
	}
</script>

<style>
	.placeholder_box {
		border-radius: 10px;
		/* background-image: linear-gradient(45deg,#e040fb, #4fc3f7); */
		background-image: linear-gradient(45deg,#4f7cf7, #4fc3f7);
		
		color: #FFF;
	}
</style>
