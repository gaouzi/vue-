
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入element-ui插件 同时样式文件要单独引入
import Elementui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入样式初始化文件
import '@/assets/style.css'

//  把改变好的axios的插件引入进来
import http from '@/assets/http.js'
Vue.use(http)
Vue.config.productionTip = false
Vue.use(Elementui)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
