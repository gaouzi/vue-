<template>
   <el-card class="box-card">
    <cus-bread live1="权限管理" live2="权限列表"></cus-bread>
      

      <el-table height="480px" class="table" :data="rights" border>
      <el-table-column type="index" label="#" width="80"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径"></el-table-column>
      <el-table-column label="层级">
        <template slot-scope="scope">
          <span v-if="scope.row.level==='0'">一级</span>
          <span v-if="scope.row.level==='1'">二级</span>
          <span v-if="scope.row.level==='2'">三级</span>
        </template>
      </el-table-column>
      </el-table>
   </el-card>
</template>

<script>
export default {
     data(){
         return{
             rights:[]
         }
     },
    created(){
        this.fn()
    },
    methods:{
        async fn(){
            const AUTH_TOKEN = localStorage.getItem("token");
            this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
             const res=await this.$http.get(`rights/list`)
            //  console.log(res)
           const {meta:{msg,status},data}=res.data;
           if(status==200){
               this.rights=data
           }
        }
    }
}
</script>

<style>
.box-card{
    height:99%
}
.table{
    margin-top: 20px;
}
</style>
