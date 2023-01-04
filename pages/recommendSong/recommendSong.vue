<template>
  <view>
    <view class="recommendSongContainer">
      <!-- 头部区域-->
      <view class="header">
        <image src="/static/images/recommendSong/recommendSong.jpg" mode=""></image>
        <view class="date">
          <text class="day">{{day}} /</text>
          <text class="month"> {{mouth}}</text>
        </view>
      </view>
      <!-- 列表区域 -->
      <view class="ListContainer">
        <view class="listHeader">
          <text>播放全部</text>
          <text class="changeMore">多选</text>
        </view>
        <!-- 内容区 -->
        <scroll-view scroll-y class="listScroll" >
          <view class="scrollItem" v-for="(item,i) in recommendList" :key="item.id" 
          @click="toSongDetail(item.id)">
            <image :src="item.al.picUrl"></image>
            <view class="musicInfo">
              <text class="musicName">{{item.name}}</text>
            </view>
            <text class="iconfont icon-more"></text>
          </view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script>
  import { mapMutations } from 'vuex'
  export default {
    data() {
      return {
        day: new Date().getDate(),
        mouth: new Date().getMonth() + 1,
        recommendList: [], // 推荐列表数据
      };
    },
    onLoad(options) {
      let userInfo = uni.getStorageSync('userInfo')
      if (!userInfo) {
        uni.$showMsg('请先登录')
        uni.reLaunch({
          url: '/pages/login/login'
        })
      }
      this.getRecommendList()
    },
    methods: {
      ...mapMutations(['updateMusicList']),
      // 获取用户每日推荐的数据
      async getRecommendList() {
        const { data : res } = await uni.$http.get('/recommend/songs')
        this.recommendList = res.data.dailySongs
        this.updateMusicList(this.recommendList)
      },
      toSongDetail(songId) {
        uni.navigateTo({
          url: '/pages/songDetail/songDetail?songId=' + songId
        })
      },
    }
  }
</script>

<style lang="scss">
.recommendSongContainer {
  .header {
    position: relative;
    width: 100%;
    height: 300rpx;
    image {
      width: 100%;
      height: 100%;
    }
    
    .date {
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -150rpx;
      margin-top: -50rpx;
      
      width: 300rpx;
      height: 100rpx;
      color: #fff;
      text-align: center;
      line-height: 100rpx;
      
      .day {
        font-size: 38rpx;
      }
    }
  }
  //  列表区域
  .ListContainer {
    position: relative;
    top: -20rpx;
    padding: 0 20rpx;
    border-radius: 30rpx;
    background-color: #fff;
  }
  .listHeader {
    height: 80rpx;
    line-height: 80rpx;
    .changeMore {
      float: right;
    }
  }
  
  .listScroll {
    height: calc(100vh - 380rpx);
  }
  
  .scrollItem {
    position: relative;
    display: flex;
    margin-bottom: 20rpx;
    image {
      width: 80rpx;
      height: 80rpx;
      border-radius: 8rpx;
    }
    .musicInfo {
      display: flex;
      flex-direction: column;
      margin-left: 16rpx;
      text {
        height: 40rpx;
        line-height: 40rpx;
        font-size: 24rpx;
        max-width: 400rpx;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .iconfont {
      position: absolute;
      width: 80rpx;
      height: 80rpx;
      line-height: 80rpx;
      right: 0;
      text-align: center;
    }
  }
}
</style>
