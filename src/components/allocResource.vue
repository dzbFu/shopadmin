<template>
  <div class="resoureMain">
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
export default {
    data(){
        return{
            list:[],
            data:[],
            defaultProps: {
          children: 'children',
          label: 'name'
        },
        roleId:''
        }
    },
    created(){
        this.roleId = this.$route.query.roleId
        this.getListAll()
    },
    methods:{
        getListAll(){
            this.$api.rights.listAll().then(res =>{
                console.log(res.data.data);
                this.list = res.data.data
            })
        }
    }
}
</script>

<style lang="less">
.resoureMain{
    margin: 20px 0 0 80px;
    width: 830px;
    border: 1px solid rgb(226, 226, 226);
}
</style>