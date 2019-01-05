import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/login'
import Home from '@/components/home'
import User from '@/components/user'
import Rights from '@/components/rights'
import Roles from '@/components/roles'

// 单独引入element组件
import {
    Message
} from 'element-ui';
Vue.use(Router)

const router= new Router({
  
    routes:[{
      name: 'home',
      path: '/',
      component: Home,
       children:[
           {
            path: '/users',
            name: 'users',
            component: User 
           },{
               path: '/rights',
               name: 'rights',
               component: Rights
           },{
               path: '/roles',
               name: 'roles',
               component: Roles
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
    //    路由守卫 加载路由之前经过  判断是否登陆 
 router.beforeEach((to,form,next)=>{
    //    如果是往login页面
     if(to.name==='login'){
        //  下一步
         next()
     }else{
        //   如果不是login页面 判断是否存在token
        const token = localStorage.getItem('token');
         if(!token){
            //  没有的话 提示登陆 跳转登陆页
             Message.warning('请先登陆')
             router.push({
                 name:'login'
             })
         }else{
             next()
         }
     }
 })


export default router;
