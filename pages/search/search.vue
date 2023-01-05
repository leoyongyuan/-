<template>
  <view>
    <view class="searchContainer">
      <!-- 头部搜索区 -->
      <view class="header">
        <view class="searchInput">
          <text class="iconfont icon-search searchIcon"></text>
          <input type="text" :placeholder="placeholderContent"  placeholder-class="placeholder" />
        </view>
        <text class="cancel">取消</text>
      </view>
      
      <!-- 热搜版 -->
      <view class="hotContainer">
        <view class="title">热搜榜</view>
          <!-- 热搜列表 -->
          <view class="hotList">
            <view class="hotItem" v-for="(item,i) in hotList" :key="item.searchWord">
              <text class="order">{{i + 1}}</text>
              <text class="order">{{item.searchWord}}</text>
              <image class="iconImg" v-if="item.iconUrl" :src="item.iconUrl"></image>
            </view>
          </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        placeholderContent: '', // 默认内容
        hotList: [], //热搜版数据
      };
    },
    onLoad() {
      this.getInitData()
    },
    methods: {
      async getInitData() {
        let { data : res } = await uni.$http.get('/search/default')
        let { data : hotList } = await uni.$http.get('/search/hot/detail')
        this.placeholderContent = res.data.styleKeyword.keyWord
        this.hotList = hotList.data
        console.log(this.hotList)
      }
    }
  }
</script>

<style lang="scss">
/* pages/search/search.wxss */
.searchContainer {
  padding: 0 20rpx;
}
.header {
  display: flex;
  height: 60rpx;
  line-height: 60rpx;
  padding: 10rpx 0;
}

.searchInput {
  position: relative;
  flex: 1;
  background: rgba(237, 237, 237, 0.3);
  border-radius: 30rpx;
}

.clear {
  position: absolute;
  right: 30rpx;
  z-index: 10;
  top: 0;
  font-size: 30rpx;

}
.cancel {
  width: 100rpx;
  text-align: center;
}


.searchIcon {
  position: absolute;
  left: 15rpx;
}
.searchInput input {
  margin-left: 50rpx;
  height: 60rpx
}
.placeholder{
  /*color: #d43c33;*/
  font-size: 28rpx;
}


/* 热搜榜 */
.hotContainer {
  margin-top: 30rpx;

}
.hotContainer .title {
  font-size: 28rpx;
  height: 80rpx;
  line-height: 80rpx;
  border-bottom: 1rpx solid #eee;
}

.hotList {
  display: flex;
  flex-wrap: wrap;
}

.hotItem {
  width: 50%;
  height: 80rpx;
  line-height: 80rpx;
  font-size: 26rpx;
}

.hotItem .order {
  margin: 0 10rpx;
}


.hotItem .iconImg {
  width: 35rpx;
  height: 20rpx;
  margin-left: 10rpx;
}



/* 搜索内容展示 */
.searchContent {
  color: #d43c33;
  height: 80rpx;
  line-height: 80rpx;
  font-size: 24rpx;
  border-bottom: 1rpx solid #d43c33;

}

.searchItem {
  height: 80rpx;
  line-height: 80rpx;
  display: flex;
}


.searchItem .content {
  flex: 1;
  margin-left: 20rpx;
  border-bottom: 1rpx solid #eee;
  font-size: 26rpx;
}


/* 搜索历史 */
.history {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  line-height:  50rpx;
  margin: 20rpx 0;
}


.history .title {
  font-size: 28rpx;
  height: 50rpx;

}

.history .historyItem {
  height: 50rpx;
  font-size: 26rpx;
  background: #ededed;
  margin-left: 20rpx;
  padding: 0 30rpx;
  border-radius: 20rpx;
  margin-bottom: 20rpx;
}

.history .delete {
  position: absolute;
  bottom: 10rpx;
  right: 15rpx;
  font-size: 36rpx;
}
</style>
