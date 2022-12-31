<template>
  <view>
    <view class="recommendContainer">
      <view class="header">
        <text class="title">{{item.title}}</text>
        <view>
          <text>{{item.nav}}</text>
          <text class="more">查看更多</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"NavHeader",
    props: {
      item: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        
      };
    }
  }
</script>

<style lang="scss">
// 推荐歌曲
.recommendContainer {
  .header {
    padding-bottom: 20rpx;
    .title {
      font-size: 28rpx;
      line-height: 80rpx;
      color: #666;
    }
    .more {
      float: right;
      border: 1rpx solid #333;
      padding: 10rpx 20rpx;
      font-size: 24rpx;
      border-radius: 30rpx;
    }
  }
}
</style>