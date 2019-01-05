
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入element-ui插件 同时样式文件要单独引入
import Elementui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Bread from '@/components/cusbread.vue'
// 引入样式初始化文件
import '@/assets/style.css'
// 注册全局过滤器 设置时间格式
import moment from 'moment'
// 设置全局组件 面包屑 使用点nane属性 获取cusbread文件规定的自定义标签
Vue.component(Bread.name,Bread)
Vue.filter('fmtdate', (v) => {
  return moment(v).format('YYYY-MM-DD')
});

//  把改变好的axios的插件引入进来
import http from '@/plugins/http.js'
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
