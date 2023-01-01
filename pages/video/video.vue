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
      <scroll-view scroll-x class="navScroll" enable-flex>
        <view class="navItem" v-for="(item,i) in videoGroupList" :key="item.id">
          <view :class="[navContent,navId === item.id ? 'active' : '']" 
            @click="this.navId = item.id">
            {{item.name}}
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
  }

}
</style>
