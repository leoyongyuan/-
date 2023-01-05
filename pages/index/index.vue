<template>
  <view>
    <!-- 轮播图 -->
   	<swiper class="banners" :indicator-dots="true" indicator-color="ivory" indicator-active-color="#d43c33" :autoplay="true" :interval="3000" :duration="1000">
   	  <swiper-item v-for="(item,i) in bannerList" :key="item.bannerId">
        <image :src="item.pic" mode=""></image>
      </swiper-item>
    </swiper>
     <!-- 图表导航区域 -->
    <view class="navContainer">
      <view class="navItem" @click="toRecommendSong">
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
    <!-- 推荐歌曲区域 -->
     <NavHeader :item="{title: '推荐歌曲',nav: '为你精心推荐' }"></NavHeader>
     <scroll-view class="recommendScroll" enable-flex scroll-x>
      <view class="scrollItem" v-for="(item,i) in recommendList" :key="item.id">
         <image :src="item.picUrl"></image>
         <text>{{item.name}}</text>
       </view>
     </scroll-view>
     
     <!-- 排行榜区域 -->
    <NavHeader :item="{title: '排行榜', nav: '热歌风向标'}"></NavHeader>
    <swiper class="topListSwiper" next-margin="50rpx" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
      <swiper-item v-for="(item,i) in topList" :key="i">
        <view class="swiper-item">
          <view class="title">{{item.name}}</view>
          <view class="music-item" v-for="(music,j) in item.tracks" :key="music.id">
            <image :src="music.al.picUrl"></image>
            <text class="count">{{j}}</text>
            <text class="music-name">{{music.name}}</text>
          </view>
        </view>
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
	export default {
		data() {
			return {
        bannerList: [], 
        recommendList: [],
        topList: [],
			}
		},
    onLoad(options) {
      this.getBannerList()
      this.getRecommendList()
      this.getTopList()
    },
		methods: {
      // 跳转到每日推荐页面
      toRecommendSong() {
        uni.navigateTo({
          url: '/pages/recommendSong/recommendSong'
        })
      },
      async getBannerList() {
        const res = await uni.$http.get('/banner',{ type: 2 })
        this.bannerList = res.data.banners
      },
      
      async getRecommendList() {
        const res = await uni.$http.get('/personalized',{ limit: 10, })
        this.recommendList = res.data.result
      },
      
      async getTopList() {
        let resultArr = []
        for (let i = 0; i < 5; i ++ ) {
          let { data : res } = await uni.$http.get('/top/list',{ idx: i })
          let topListItem = {name: res.playlist.name, tracks: res.playlist.tracks.slice(0,3)}
          resultArr.push(topListItem)
          this.topList = resultArr  // 放在里面渲染，虽然渲染五次，但是可以减少白屏时间，提升用户体验
        }
      }
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

// 推荐内容区域
.recommendScroll {
    display: flex;
    height: 300rpx;
    .scrollItem {
      width: 200rpx;
      margin-right: 20rpx;
      text {
        font-size: 26rpx;
        // 单行文本溢出隐藏
        // display: block;
        // white-space: nowrap;
        // overflow: hidden;
        // text-overflow: ellipsis;
        
        // 多行文本溢出隐藏
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical; //设置对齐模式
        -webkit-line-clamp: 2; // 设置多行的行数
      }
      image {
        width: 200rpx;
        height: 200rpx;
        border-radius: 10rpx;
      }
    }
}

.topListSwiper {
  height: 400rpx;
}

.swiper-item {
  width: 90%;
  background-color: #fbfbfb;
  margin-left: 10rpx;
  .title {
    font-size: 30rpx;
    line-height: 80rpx;
  }
  .music-item {
    // 当一个元素设置为flex，其子元素自动变成block元素
    display: flex; 
    margin-bottom: 20rpx;
    image {
      width: 100rpx;
      height: 100rpx;
      border-radius: 6rpx;
    }
    .count {
      width: 100rpx; 
      height: 100rpx;
      text-align: center;
      line-height: 100rpx;
    }
    .music-name {
      height: 100rpx;
      line-height: 100rpx;
      max-width: 400rpx;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
