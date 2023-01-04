
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from '@/store/store.js'
import request from 'common/request.js'

uni.$http = request
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
    store
})

uni.$showMsg = function(title = '数据请求失败！', duration = 1500 ) {
  uni.showToast({
    title,
    duration,
    icon: 'none'
  })
}

app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app,
        store
  }
}
// #endif