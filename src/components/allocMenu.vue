<template>
<div class="alloMain">
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
<div class="btn">
    <el-button type="primary">保存</el-button>
    <el-button @click="clear">清空</el-button>
</div>
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
    },
    clear(){
        this.data = []
        this.getRole()
    },
}
}
</script>
<style lang="less">
.alloMain{
    margin: 20px 0 0 80px;
    width: 830px;
    border: 1px solid rgb(226, 226, 226);
    .btn{
        margin: 30px 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>