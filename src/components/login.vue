<template>
<!-- 登陆页面 -->
 <div class="back">
   <el-form label-position="top" label-width="80px" :model="formData" class="biaodan">
     <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formData.password"></el-input>
      </el-form-item>
      <el-button type="primary" class="btn" @click="fn()">登陆</el-button>
    </el-form>
 </div>
        
</template>

<script>
export default {
     data(){
       return{
         formData:{
           username: '',
           password: ''
         }
       }
     },
     methods:{
       //  常规发送请求方法
      //  fn(){
      //     this.$http
      //     .post('login',this.formData)
      //     .then((res)=>{
      //       console.log(res)
      //     })
      //  }



//       // 使用async和await发送请求  实现登陆功能

      async fn(){
           const res = await this.$http.post('login',this.formData);
           const data=res.data;
          //  console.log(data)
          const {meta:{status,msg}}=data;
          
          if(status===200){
            const token=data.data.token;
            sessionStorage.setItem('token', token);
          this.$message.success(msg)
          }else{
            this.$message.error(msg)
          }
           
             
            }
      }
}
</script>

<style>
.back{
  width:100%;
  height: 100%;
  background: green;
  display: flex;
  justify-content: center;
  align-items: center;
}
.biaodan{
  width:500px;
  height: 400px;
  background:#fff;
  border-radius: 5px;
  padding:20px;
}
.btn{
  margin-top: 20px;
  width:100%;
}
</style>
