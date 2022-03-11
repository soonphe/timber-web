<template>
  <div>
    <div class="app-container">
      <el-form ref="form" :model="form" :rules="formRules" label-width="120px">
        <el-form-item prop="name" label="角色名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item prop="description" label="角色说明">
          <el-input v-model="form.description" />
        </el-form-item>
        <el-form-item prop="moduleArr" label="角色权限">
          <!--<el-input v-model="form.moduleArr"></el-input>-->
          <el-tree
            ref="tree"
            :data="typeList"
            :props="defaultProps"
            show-checkbox
            node-key="id"
            @node-click="handNodeClick"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click.native.prevent="onSubmit">提交</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import { sysRoleAdd, sysRoleUpdate, sysMenuGetMenuListByRoleId } from '@/api/server'
import { pageMaxSize } from '@/utils/global'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      typeList: [],
      ownerTypeList: [],
      subsList: [],
      checkedList: [],
      listQuery: {
        pageNum: 1,
        pageSize: pageMaxSize,
        roleId: -1,
        name: undefined,
        status: undefined
      },
      defaultProps: {
        label: 'name',
        children: 'subs'
      },
      formRules: {
        // moduleArr: [{ required: true, trigger: 'blur', message: '请填写选择模块' }],
        name: [{ required: true, trigger: 'blur', message: '请输入名称' }],
        description: [{ required: true, trigger: 'blur', message: '请输入描述' }]
      },
      arrString: [],
      loading: false,
      fullscreenLoading: false
    }
  },
  computed: {
    ...mapState({
      form: state => state.user.role
    })
  },
  created() {
    this.getTypeData()
    if (this.form.id) {
      this.getOwnerTypeData()
    }
  },
  methods: {
    // 树形节点点击事件
    handNodeClick(data, node) {
      // console.log(data)
      // console.log(data.name)
      // console.log(node.data.name)
    },
    getTypeData() {
      sysMenuGetMenuListByRoleId(this.listQuery)
        .then(res => {
          this.typeList = res.data
        })
    },
    getOwnerTypeData() {
      this.listQuery.roleId = this.form.id
      sysMenuGetMenuListByRoleId(this.listQuery)
        .then(res => {
          if (res.data.length > 0) {
            this.ownerTypeList = res.data
            this.ownerTypeList.forEach((item, index) => {
              this.checkedList.push(item.id)
              this.subsList = item.subs
              if (this.subsList) {
                this.subsList.forEach((item, index) => {
                  this.checkedList.push(item.id)
                })
              }
            })
            this.$refs.tree.setCheckedKeys(this.checkedList, true)
          }
        })
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          // 获取树形控件选中的元素的key数组
          // this.arrString = this.$refs.tree.getCheckedKeys()
          // 获取树形控件选中的元素的node数组,是否只是叶子节点，是否包含半选节点
          this.arrString = this.$refs.tree.getCheckedNodes(false, true)
          // 获取选中的节点数组取ID 转换为String
          const arr = this.arrString.map(item => {
            return item.id
          }).join(',')
          console.log(arr)
          const param = {
            moduleArr: arr
          }
          if (this.form.id) {
            sysRoleUpdate(this.form, param)
              .then(res => {
                this.loading = false
                this.$message.success('更新成功')
                this.$router.push({
                  path: '/sysRole/index'
                })
              })
          } else {
            sysRoleAdd(this.form, param)
              .then(res => {
                this.loading = false
                this.$message.success('添加成功')
                this.$router.push({
                  path: '/sysRole/index'
                })
              }).catch(() => {
                this.loading = false
                this.$message({
                  message: '添加失败!',
                  type: 'warning'
                })
              })
          }
        } else {
          this.loading = false
          this.$message.warning('请完善表单信息')
        }
      })
    },
    onCancel() {
      this.$message.info('取消添加')
      this.$router.push({
        path: '/sysRole/index'
      })
    }
  }
}
</script>
