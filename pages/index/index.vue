<template>
  <view>
    <!-- 轮播图 -->
    	<swiper class="banners" :indicator-dots="true" indicator-color="ivory" indicator-active-color="#d43c33" :autoplay="true" :interval="3000" :duration="1000">
    	  <swiper-item>
    	    <image src="/static/images//nvsheng.jpg" mode=""></image>
    	  </swiper-item>
       <swiper-item>
         <image src="/static/images//nvsheng.jpg" mode=""></image>
       </swiper-item>
       <swiper-item>
         <image src="/static/images//nvsheng.jpg" mode=""></image>
       </swiper-item>
    	</swiper>
     <!-- 图表导航区域 -->
    <view class="navContainer">
       <view class="navItem">
         <text class="iconfont icon-tuijian"></text>
         <text >每日推荐</text>
       </view>
       <view class="navItem">
         <text class="iconfont icon-bofanggedan"></text>
         <text>歌单</text>
       </view>
       <view class="navItem">
         <text class="iconfont icon-paixingbang"></text>
         <text>排行榜</text>
       </view>
       <view class="navItem">
         <text class="iconfont icon-diantai"></text>
         <text>电台</text>
       </view>
       <view class="navItem">
         <text class="iconfont icon-zhibo"></text>
         <text>直播</text>
       </view>
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

		}
	}
</script>

<style lang="scss">
/* 轮播图区域 */
.banners {
  width: 100%;
  height: 300rpx;
  image {
    width: 100%;
    height: 100%;
  }
}

/* 图标导航区域 */
.navContainer {
  display: flex;
  .navItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 20%;
    
    text {
      font-size: 26rpx;
    }
    
    .iconfont {
      width: 100rpx;
      height: 100rpx;
      border-radius: 50%;
      text-align: center;
      line-height:100rpx;
      background-color: rgb(240,19,19);
      font-size: 50rpx; 
      color: #fff;
      margin: 20rpx 0;
    }
  }
}

</style>
