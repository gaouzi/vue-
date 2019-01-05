<template>
     <el-card class="box-card">
     <cus-bread live1="权限管理" live2="角色列表"></cus-bread>
      <el-button type="success" class="btn">添加角色</el-button>


 <el-table
      :data="list"
      style="width: 100%">
       <el-table-column type="expand">
      <template slot-scope="scope">
        6666
         </template>
       </el-table-column>
      <!-- 序号 -->
      <el-table-column
      type="index"
      width="50">
     </el-table-column>

      <el-table-column
        prop="roleName"
        label="角色名称"
        width="300">
      </el-table-column>

      <el-table-column
        prop="roleDesc"
        label="角色描述"
        width="300">
      </el-table-column>

     

      

       
      <el-table-column
       class="table"
        prop="mg_state"
        label="操作"
        width="300">
         <template slot-scope="scope">
        <el-button plain size="mini" 
        type="primary" 
        icon="el-icon-edit" 
        circle
       
        ></el-button>

        <el-button plain size="mini"
         type="danger" 
         icon="el-icon-delete" 
         >
         </el-button>

        <el-button plain size="mini" 
        type="success" 
        icon="el-icon-check" 
        circle
        @click="out(scope.row)"
        ></el-button>

      </template>
      </el-table-column>
     
    </el-table>
     
      
      <el-dialog title="分配权限" :visible.sync="dialogFormVisibleAdd" width="50%">
     
      <el-tree
        ref="tree"
        :data="lop"
        show-checkbox
        node-key="id"
         default-expand-all
        :default-checked-keys="checkid"
        :props="defaultProps"
      ></el-tree>
      
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="setroles()">确 定</el-button>
      </span>
    </el-dialog>
     </el-card>
</template>

<script>
export default {
      data(){
          return{
              list:[],
              lop:[],
              dialogFormVisibleAdd:false,
              defaultProps:{
               label: "authName",
              children: "children"
              },
              checkid: [],
              roleid:-1
          }
      },
      created(){
        this.fn()
      },
      methods:{
     async setroles(){
          //  全选的节点 用refs在vue中操作dom的方法
        const arr1=this.$refs.tree.getCheckedKeys();
        // console.log(arr1)
        // 半选的节点
        const arr2=this.$refs.tree.getHalfCheckedKeys();
        // 展开操做运算符 得到arr1+arr2的结果
        const arr=[...arr1,...arr2]
        // console.log(arr)



        const res= await this.$http.post(`roles/${this.roleid}/rights`,{
          rids:arr.join(',')
        })
        // console.log(res)
        this.dialogFormVisibleAdd=false;
        const {meta:{msg,status}}=res.data;
        this.$message.success(msg)
        // console.log(msg)
      },
        // 点击对号展开弹出框
       async out(user){
            const res=await this.$http.get(`rights/tree`)
              this.roleid=user.id;
              // console.log(this.roleid)
              this.dialogFormVisibleAdd=true;
              
               this.lop=res.data.data;
                 const tem=[]
                  // 设置默认选中
                    user.children.forEach((item1)=>{
                    //  tem.push(item1.id)
                     item1.children.forEach((item2)=>{
                      //  tem.push(item2.id)
                        item2.children.forEach((item3)=>{
                          tem.push(item3.id)
                        })
                     })
                 })
                //  console.log(tem)
                 this.checkid=tem
                 

             
              // this.checkid=res.data.data.id;
              // console.log(this.checkid)
        },
        // 动态获取表格数据
          async fn(){
              const AUTH_TOKEN = localStorage.getItem("token");
            this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
          const res=await this.$http.get('roles')
        //   console.log(res)
        
         this.list=res.data.data
          }
      }
}
</script>

<style>
.box-card{
    height:99%;
}
.btn{
    margin-top: 10px;
}

</style>
