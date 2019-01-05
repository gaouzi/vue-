<template>
     <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{live1}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{live2}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {

    name:'cus-bread',
      props:["live1","live2"]
}
</script>

<style>

</style>
