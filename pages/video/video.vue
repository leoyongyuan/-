<template>
  <view>
    <view class="videoContainer">
      <!-- 头部区域 -->
      <view class="header">
        <image src="/static/images/video/video.jpg"></image>
        <view class="search">
          搜索商品
        </view>
        <image src="/static/images/logo.png"></image>
      </view>
      <!-- 导航区域 -->
      <scroll-view 
        :scroll-into-view="'scroll'+ navId" 
        scroll-x class="navScroll" enable-flex scroll-with-animation>
        <view class="navItem" v-for="(item,i) in videoGroupList" :key="item.id" 
          :id="'scroll' + item.id">
          <view :class="[navContent,navId === item.id ? 'active' : '']" 
            @click="changeNav(item.id)">
            {{item.name}}
          </view>
        </view>
      </scroll-view>
      
      <!-- 视频列表区域 -->
      <scroll-view 
        scroll-y 
        class="videoScroll" 
        refresher-enabled
        :refresher-triggered="isTriggered"
        @refresherrefresh="handleRefresher">
        <view class="videoItem" v-for="(item,i) in videoList" :key="i">
          <video :src="item.data.urlInfo" 
          @play="handlePlay(item.data.vid)" 
          :poster="item.data.coverUrl"
          objectFit="fill"
          v-if="videoId === item.data.vid"></video>
          <!-- 性能优化：用image代替video -->
          <image v-else @click="handlePlay(item.data.vid)" :src="item.data.coverUrl"></image>
          
          <view class="content">{{item.data.title}}</view>
          <view class="footer">
            <image class="avatar" :src="item.data.creator.avatarUrl"></image>
            <text class="nickName">{{item.data.creator.nickname}}</text>
            <view class="comments_praised">
              <text class="item">
                <text class="iconfont icon-aixin"></text>
                <text class="count">{{item.data.praisedCount}}</text>
              </text>
              <text class="item">
                <text class="iconfont icon-pinglun"></text>
                <text class="count">{{item.data.commentCount}}</text>
              </text>
              <button open-type="share" class="item btn">
                <text class="iconfont icon-gengduo"></text>
              </button>
            </view>
          </view>
        </view>
      </scroll-view>
      
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        videoGroupList: [],
        navId: '', // 导航标识
        videoList: [],
        videoContext: '',
        vid: '',
        videoId: '',
        isTriggered: false, // 标识下拉刷新是否被触发
      };
    },
    onLoad() {
      // 获取导航数据
      this.getVideoGroupList()
    },
    methods: {
      async getVideoGroupList() {
        let { data : res } = await uni.$http.get('/video/group/list')
        this.videoGroupList = res.data.slice(0,14)
        this.navId = this.videoGroupList[0].id
        this.getVideoList(this.navId)
      },
      async getVideoList(id) {
        const cookie = uni.getStorageSync('cookie').find(item => item.indexOf('MUSIC_U') !== -1)
        let { data : res } = await uni.$http.get('/video/group', { id }, { header: { cookie } })
        this.videoList = res.datas
      },
      changeNav(id) {
        this.navId = id
        this.videoList = []
        this.getVideoList(id)
      },
      // 点击播放/继续播放的回调
      handlePlay(vid) {
        /* 创建控制video标签的实例对象*/
        this.vid !== vid && this.videoContext && this.videoContext.stop()
        this.vid = this.videoId = vid
        this.videoContext = uni.createVideoContext(vid)
        this.videoContext.play()
      },
      // 自定义下拉刷新
      handleRefresher() {
        if (!this.isTriggered) {
          this.isTriggered = true
          this.getVideoList(this.navId)
          setTimeout(() => {
            this.isTriggered = false
          },1000)
        }
      },
    }
  }
</script>

<style lang="scss">
.videoContainer {
  .header {
    display: flex;
    padding: 10rpx;
    image {
      width: 60rpx;
      height: 60rpx;
    }
    .search {
      // flex-grow 可拉伸 flex-shrink 可压缩 flex-basis 当前元素的宽度
      // flex: 默认值 flex-grow: 0, flex-shrink: 0, flex-basis: auto
      // flex: 1     flex-grow: 1, flex-shrink: 1, flex-basis: 0%
      // flex: auto  flex-grow: 1, flex-shrink: 1, flex-basis: auto
      flex: 1;
      border: 1rpx solid #eee;
      margin: 0 20rpx;
      font-size: 26rpx;
      text-align: center;
      line-height: 60rpx;
      color: #d43c33;
    }
  }
  .navScroll {
    height: 60rpx;
    display: flex;
    white-space: nowrap;
    .navItem {
      padding: 0 30rpx;
      font-size: 28rpx;
      height: 60rpx;
      line-height: 60rpx;
      .active {
        border-bottom: 1rpx solid #d43c33;
      }
    }
    .navContent {
      box-sizing: border-box;
    }
  }
  .videoScroll {
    margin-top: 10rpx;
    // calc 可以动态计算css的高度 运算符左右两侧必须加空格，否则计算会失效
    height: calc(100vh - 152rpx);
  }
  
  .videoItem {
    padding: 0 3%;
    video {
      width: 100%;
      height: 360rpx;
      border-radius: 10rpx;
    }
    image {
      width: 100%;
      height: 360rpx;
      border-radius: 10rpx;
    }
  }
  .videoItem .content {
    font-size: 26rpx;
    height:80rpx;
    line-height: 80rpx;
    max-width: 500rpx;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* footer */
  .footer {
    border-top: 1rpx solid #eee;
    padding: 20rpx 0;
  }
  .footer .avatar {
    width: 60rpx;
    height: 60rpx;
    border-radius: 50%;
    vertical-align: middle;
  }

  .footer  .nickName {
    font-size: 26rpx;
    vertical-align: middle;
    margin-left: 20rpx;
  }

  .footer .comments_praised {
    float: right;
  }

  .comments_praised .btn {
    display: inline;
    padding: 0;
    background-color: transparent;
    border-color: transparent;
  }

  .comments_praised .btn:after {
    border: none;
  }

  .comments_praised .item {
    margin-left: 50rpx;
    position: relative;
  }

  .comments_praised .item .count {
    position: absolute;
    top: -20rpx;
    font-size: 20rpx;
  }
}
</style>
