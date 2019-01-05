<template>
<!-- import { METHODS } from 'http'; -->
    <el-container class="container">
    <el-header class="header">
        <el-row>
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <img src="../assets/logo.png" alt="">
            </div>
          </el-col>
          <el-col :span="19" class="middle">
              <marquee behavior="alternate">
                <h2>电商后台管理系统</h2>
              </marquee>
          </el-col>
          <el-col :span="1">
              <a href="#"  class="loginout" @click="out()">退出</a>
          </el-col>
        </el-row>
    </el-header>

    <el-container class="container">
      <el-aside width="200px">
       <el-aside class="aside" width="200px">
        
        <el-menu default-active="2-1" class="menu" :unique-opened="true" :router="true">
        <!-- 用户管理-->
          <el-submenu :index="''+item.order" v-for="(item,i) in items" :key="item.id"> 
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{item.authName}}</span>
            </template>
          <el-menu-item :index="item2.path" v-for="(item2,i) in item.children" :key="item2.id">
              <i class="el-icon-location"></i>
            {{item2.authName}}
          </el-menu-item>
        </el-submenu>

        </el-menu>
      </el-aside>
      </el-aside>

      <el-main class="box">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
// 在Home页面验证是否已经登陆 没有跳转login
export default {
    data(){
        return{
           items:[]
        }
    },
      beforeCreate(){
     const token=localStorage.getItem('token')
    //  if(!token){
    //    this.$router.push({
    //       name: 'login'
    //    })
    //   this.$message.warning('先登录')
    //  }
      },
      created(){ 
        this.fn()
      },
    methods:{
      // 设置方法 页面加载动态渲染页面
      async fn(){
          const AUTH_TOKEN = localStorage.getItem("token");
            this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
            const res= await this.$http.get('menus')
            console.log(res)
            this.items=res.data.data;
      },

      //  点击退出
         out(){
          //  删除内存中的session
           localStorage.clear();
           this.$router.push({
             name: 'login'
           })
           this.$message.success('退出成功')
         }
    }
}
</script>

<style>
.container {
  height: 100%;
}

.header {
  background-color:pink;
}

.aside {
  background-color: #d3dce6;
}

.main {
  background-color: #e9eef3;
  height: 100%;
}
.header .middle{
    line-height: 60px;
    color:olivedrab;
    text-align: center;
  }
  .header .loginout{
    line-height: 60px;
    text-decoration: none;
  }
  .box{
    background:green;
    /* height:99%; */
  }
</style>
