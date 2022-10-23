<template>
<div>
     <!-- 根据id确认默认选中的 -->
    <el-tree
  :data="list"
  show-checkbox
  node-key="id"
  ref="tree"
  default-expand-all
  :default-checked-keys= "data"
  :props="defaultProps">
</el-tree>
</div>
</template>
<script>
export default{
data(){
    return{
        list:[],
        data:[],
        defaultProps: {
          children: 'children',
          label: 'title'
        },
        roleId:''
    }
},
created(){
    this.roleId = this.$route.query.roleId
    this.getRole()
    this.getRoleId()
},
methods:{
    getRole(){
        this.$api.rights.roleTree().then(res =>{
            this.list = res.data.data
        })
    },
    getRoleId(){
        this.$api.rights.roleId(this.roleId).then(res =>{
            var arr=[]
            res.data.data.forEach(item => {
                // 根据id确认默认选中的
                arr.push(item.id)
            });
            this.data = arr
        })
    }
}
}
</script>
<style lang="less">

</style>