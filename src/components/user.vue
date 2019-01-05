<template>
<!-- import { constants } from 'perf_hooks'; -->
    <el-card class="box-card">
    <!-- 面包屑 -->
  
     <cus-bread live1="用户管理" live2="用户列表"></cus-bread>
    <!-- 搜索框 -->
    <el-row class="searchArea" >
      <el-col >
           <el-input 
            @clear="kong()"
           class="searchInput"
            clearable 
            placeholder="请输入内容" 
            v-model="query">
            <el-button @click="search()" slot="append" icon="el-icon-search"></el-button>
           </el-input>
        <el-button type="success" @click="lop()">添加用户</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
       <el-table
      :data="list"
      style="width: 100%">
      <!-- 序号 -->
        <el-table-column
      type="index"
      width="50">
     </el-table-column>

      <el-table-column
        prop="username"
        label="姓名"
        width="200">
      </el-table-column>

      <el-table-column
        prop="email"
        label="邮箱"
        width="200">
      </el-table-column>

      <el-table-column
        prop="mobile"
        label="电话"
        width="150">
      </el-table-column>

      <el-table-column
        label="日期"
        width="200">
      <template slot-scope="scope">
         {{scope.row.create_time | fmtdate}}
      </template>
      </el-table-column>

       <el-table-column
        label="用户状态"
        width="200">
         <template slot-scope="scope">
            <!-- scope.row就是当前绑定的数据对象 -->
         <el-switch
            v-model="scope.row.mg_state"
            active-color="green"
            inactive-color="#ff4949"
            @change="zhuangtai(scope.row)"
            >
          </el-switch>
      </template>
      </el-table-column>

      <el-table-column
        prop="mg_state"
        label="操作"
        width="200">
         <template slot-scope="scope">
        <el-button plain size="mini" 
        type="primary" 
        icon="el-icon-edit" 
        circle
        @click="bianji(scope.row)"
        ></el-button>

        <el-button plain size="mini"
         type="danger" 
         icon="el-icon-delete" 
         circle @click="deleteuser(scope.row)">
         </el-button>

        <el-button plain size="mini" 
        type="success" 
        icon="el-icon-check" 
        circle
        @click="roleld(scope.row)"
        ></el-button>
      </template>
      </el-table-column>
    </el-table>

    <!-- 添加数据 -->
<el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2,4,6,8]"
      :page-size="2"
       layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>



  <!-- 编辑新用户 -->
<el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
       <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="editUser()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑用户 -->
<el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input disabled v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="bian()">确 定</el-button>
      </div>
    </el-dialog>


    
    <!-- 角色分配弹出层 -->
<el-dialog title="分配角色" :visible.sync="dialogFormVisibleNfc">
  <el-form :model="form">
    <el-form-item label="用户名" :label-width="formLabelWidth">{{userName}}</el-form-item>
    <el-form-item label="角色" :label-width="formLabelWidth">
      {{region}}
      <el-select v-model="region">
         
        <el-option label="请选择" :value="-1"></el-option>
        <!-- 便利 -->
        <el-option v-for="(v,i) in roles" 
        :key="i" 
        :label="v.roleName" 
        :value="v.id"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisibleNfc = false">取 消</el-button>
    <el-button type="primary" @click="juese()">确 定</el-button>
  </div>
</el-dialog>

  
  </el-card>
</template>

<script>
export default {
     data(){
         return{
             list:[],
             query: '',
             pagenum:1,
             pagesize:2,
             total:-1,
             form: {
             username: "",
             password: "",
             email: "",
             mobile: ""
            },
            formLabelWidth: "100px",
             dialogFormVisibleAdd: false,
             dialogFormVisibleEdit: false,
            dialogFormVisibleNfc:false,

            region:-1,
            roles:[],
            userName: '',
            userid:-1
         }
     },
     created(){
      this.load()
     },
     methods:{
        // 修改人物分配角色
       async juese(){
           const res=await this.$http.put(`users/${this.userid}/role`,{
            rid:this.region
           })
          
          const {meta:{msg,status}}=res.data
          this.dialogFormVisibleNfc=false
          this.$message.success(msg)
       },
      //  角色分配
       async roleld(user){
         const res=await this.$http.get('roles')
         this.userName=user.username
        this.roles=res.data.data
        this.userid=user.id
        // console.log(this.roles)

       const res2=await this.$http.get(`users/${user.id}`)
      //  console.log(res2)
      this.region=res2.data.data.rid
       this.dialogFormVisibleNfc=true

       },



      //  设置用户状态功能
       async zhuangtai(user){
        //  console.log(user)
         const res=await this.$http.put(`users/${user.id}/state/${user.mg_state}`)
        //  console.log(res)
        const {meta:{msg,status}}=res.data;
           if(status==200){
             this.$message.success(msg)
           }
       },
      //  编辑功能
        async bian(){
              const res=await this.$http.put(`users/${this.form.id}`,
              {
                email: this.form.email,
                mobile: this.form.mobile
              })
              // console.log(res)
                 this.dialogFormVisibleEdit=false;
                 this.load()
         },
            //   点击编辑按钮弹出编辑页
            bianji(user){
              // console.log(user)
              this.form=user;
             this.dialogFormVisibleEdit=true
            },

        //   搜索功能 
         search(){
           this.pagenum=1;
           this.load()
         },
         // 搜索功能-点击清空     重新加载页面 更好的用户体验
         kong(){
           this.load()
         },


        //  删除功能
         deleteuser(user){
         this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
         confirmButtonText: '确定',
           cancelButtonText: '取消',
          type: 'warning'
         })
         .then(async () => {
         const res=this.$http.delete(`users/${user.id}`)
         // console.log(res)
         const {
              meta: { msg, status }
          } = res.data;
          if (status === 200) {
            this.$message.success(msg);
            // this.pagenum = 1;
            this.load();
            // console.log(msg)
          }
         })
         .catch(() => {
          this.$message.warning('取消删除')
         })
         },
        //   创建新用户
        async editUser(){
            const res=await this.$http.post('users',this.form)
            // console.log(res)
            const {meta:{msg,status}}=res.data;
            if(status==201){
               this.$message.success(msg);
               this.dialogFormVisibleAdd=false;
               this.load()
            }else{
                this.$message.warning(msg)
            }
            
         },
        //  创建新用户-弹出层
          lop(){
           
          this.form = {};
          this.dialogFormVisibleAdd = true;
          },
        //  分页相关方法
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pagesize=val;
        this.pagenum=1;
        this.load()
      },
       handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.pagenum=val;
        this.load()
       },
    

        //  渲染表格
       async load(){
        //    设置请求头
           const AUTH_TOKEN = localStorage.getItem("token");
            this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
        //    const res = await this.$http.get('users',{
        //     //    验证页面中的token
        //        headers:{
        //           Authorization: window.sessionStorage.getItem('token')
        //        },
        //     //    传入后台的数据
        //        params: {
        //     pagenum: 1,
        //      pagesize: 10
        // }
        //    })
       const res = await this.$http.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      //  console.log(res)
       const {
        data: {
          data: { total, users },
          meta: { status, msg }
        }
        } = res;
         if(status==200){
            //  console.log(data)
            // 渲染表格
            //  const {data:{users}}=data;
             this.list=users;
             this.total=total
            //  console.log(this.total)
         }else{

         }
       }  
     }
}
</script>

<style>
.box-card{
  height: 99%;
}
.searchArea{
  margin-top: 10px;
  margin-bottom: 10px;
}
.searchArea .searchInput{
  width: 350px;
}
.input-with-select {
  margin-top: 20px;
  width: 350px;
}


</style>
