import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

wx.cloud.init({
  traceUser: true,
  env: 'mona-meng-4gtmrzid91290cf0'
})

const app = new Vue(App)
app.$mount()
