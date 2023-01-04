<template>
  <view class="container">
    <view class="songDeatilContainer">
     <view class="author">{{song.name}}</view>
      <view class="circle"></view>
     <image src="/static/images/song/needle.png"
      :class="['needle', isPlay && 'needleRotate']"></image>
      <view class="discContainer">
        <image src="/static/images/song/disc.png" class="disc"></image>
        <image :src="song.al.picUrl" mode=""
        :class="['musicImg',isPlay && 'discAnimation']"></image>
      </view>
      <!-- 底部控制器 -->
      <view class="musicControl">
        <text class="iconfont icon-suijibofang"></text>
        <text class="iconfont icon-icon-1" @click="handleSwitch('pre')"></text>
        <text :class="['iconfont',isPlay ?'icon-zanting' :'icon-kaishi','big']"
        @click="handleMusicPlay"></text>
        <text class="iconfont icon-icon-" @click="handleSwitch('next')"></text>
        <text class="iconfont icon-playlistplay"></text>
      </view>
    </view>
  </view>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  export default {
    data() {
      return {
        isPlay: false, // 音乐是否播放
        songId: '',
        song: {},
        backGroundAudioManager: uni.getBackgroundAudioManager()
      };
    },
    computed: {
      ...mapState(['musicList','isMusicPlay','musicId']),
    },
    onLoad(options) {
      this.songId = options.songId
      this.getMusicInfo(this.songId)
      
      // 判断当前页面是否在播放
      if (this.isMusicPlay && this.musicId === this.songId) {
        this.isPlay = true
      }
      
      /*
       * 使操作系统音乐播放/暂停和isPlay同步
       * */
       this.backGroundAudioManager.onPlay(() => {
          this.isPlay = true
          
          // 修改全局音乐状态
          this.$store.commit('updateMusicState', { isPlay: true, musicId: this.songId })
       })
       this.backGroundAudioManager.onPause(() => {
          this.isPlay = false
          
          // 修改全局音乐状态
         this.$store.commit('updateMusicState', { isPlay: false, musicId: this.songId })
       })
       this.backGroundAudioManager.onStop(() => {
          this.isPlay = false
          
          // 修改全局音乐状态
          this.$store.commit('updateMusicState', { isPlay: false, musicId: this.songId })
       })
    },
    methods: {
      // 点击播放/暂停
      handleMusicPlay() {
        this.isPlay = !this.isPlay
        this.musicControl()
      },
      //获取音乐详情
       async getMusicInfo(songId) {
         this.songId = songId
         const { data : res } = await uni.$http.get('/song/detail',{ ids: songId })
         const arr = res.songs
         this.song = arr[0]
         this.$store.commit('updateMusicState', { isPlay: true, musicId: this.songId })
         this.musicControl()
       },
       
      // 控制音乐播放的功能
      async musicControl() {
        if (this.isPlay) {
          // 创建音频实例
          const songId = this.songId
          const { data : res } = await uni.$http.get('/song/url', { id: songId  })
          const arr = res.data
          const musicUrl = arr[0].url
          this.backGroundAudioManager.src = musicUrl
          this.backGroundAudioManager.title = this.song.name
        } else {
          this.backGroundAudioManager.pause()
        }
      },
      
      // 切换歌曲
      handleSwitch(type) {
        const n = this.musicList.length
        let idx = this.musicList.findIndex(item => item.id === this.songId)
        if (type === 'pre') {
          idx = ((idx - 1) % n + n) % n
        } else {
          idx = ((idx + 1) % n + n) % n
        } 
        this.getMusicInfo(this.musicList[idx].id)
      }
    }
  }
</script>

<style lang="scss">
page {
  background-color: rgba(0,0,0,0.5);
}
  
.songDeatilContainer {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  // 底座
  .circle {
    position: relative;
    z-index: 100;
    width: 60rpx;
    height: 60rpx;
    border-radius: 50%;
    background-color: #fff;
    margin: 10rpx 0;
  }
  
  // 摇杆
  .needle {
    position: relative;
    z-index: 99;
    top: -40rpx;
    left: 60rpx;  
    width: 192rpx;
    height: 274rpx;
    transform: rotate(-20deg);
    transform-origin: 40rpx 0;
    transition: transform 1s;
  }
  
  .needleRotate {
    transform: rotate(0deg);
  }
  
  // 磁盘
  .discContainer {
    position: relative;
    top: -170rpx;
    width: 598rpx;
    height: 598rpx;
    
    .discAnimation {
      animation: disc 4s linear infinite;
      animation-delay: 1s;
    }
    
    /**
     * @keyframes 设置动画帧
     * 1) from to 使用简单的动画,只有起始帧和结束帧
     * 2) 百分比 多用于复杂动画,动画不止两帧
    */
    @keyframes disc {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
    
    .disc {
      width: 598rpx;
      height: 598rpx;
    }
    
    .musicImg {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      margin: auto;
      width: 370rpx;
      height: 370rpx;
      border-radius: 50%;
    }
  }
}

// 底部控制区
.musicControl {
  position: absolute;
  bottom: 40rpx;
  left: 0;
  border-top: 1rpx solid #eee;
  width: 100%;
  display: flex;
  text {
    width: 20%;
    height: 120rpx;
    line-height: 120rpx;
    text-align: center;
    color: #fff;
    font-size: 50rpx;
  }
  .big {
    font-size: 80rpx;
  }
}
</style>
