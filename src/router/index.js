import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/login'
import Home from '@/components/home'
import User from '@/components/user'
Vue.use(Router)

export default new Router({
  
    routes:[{
      name: 'home',
      path: '/',
      component: Home,
       children:[
           {
            path: '/user',
            name: 'user',
            component: User 
           }
       ]
  },
  {
      name: 'login',
      path: '/login',
      component: Login
  }
]
})
