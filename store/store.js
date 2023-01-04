import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: () => ({
    musicList: [],
    isMusicPlay: false,  // 是否有音乐在播放
    musicId: '',  // 音乐ID
  }),
  
  mutations: {
    updateMusicList(state,arr) {
      state.musicList = arr
    },
    updateMusicState(state,{isPlay,musicId}) {
      state.isMusicPlay = isPlay
      state.musicId = musicId
    },
  },
  getters: {
    getMusicIndex(state) {
     return state.musicList.findIndex(item => item.id === state.musicId)
    }
  },
  modules: {
    
  }
})

export default store