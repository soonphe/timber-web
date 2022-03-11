<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        style="width: 200px;"
        class="filter-item"
        placeholder="名称"
        @keyup.enter.native="handleFilter"
      />
      <el-select v-model="listQuery.status" placeholder="请选择状态类型" class="filter-item" clearable @clear="clearStatus">
        <el-option label="全部" :value="-1" />
        <el-option label="有效" :value="0" />
        <el-option label="无效" :value="1" />
      </el-select>
      <el-select v-model="listQuery.roleId" placeholder="请选择类型" class="filter-item" clearable @clear="clearType">
        <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="add">添加</el-button>
    </div>

    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column prop="id" label="ID" align="center" />
      <el-table-column prop="name" label="名称" align="center" width="95" />
      <el-table-column prop="userName" label="用户名" align="center" />
      <el-table-column prop="roleName" label="角色" align="center" />
      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">
            <span v-if="scope.row.status == 0">有效</span>
            <span v-else-if="scope.row.status == 1">无效</span>
            <span v-else>封禁</span>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="delFlag" label="删除标记" :formatter="delTypeFormat" align="center" />
      <el-table-column prop="createTime" label="创建时间" align="center" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" @click="put(scope.row)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination
        background
        :current-page="listQuery.pageNum"
        :page-sizes="[10,20,30,50]"
        :page-size="listQuery.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { sysUserGetList, sysUserDelete, sysRoleGetList } from '@/api/server'
import waves from '@/directive/waves'
import { imageServer, pageSize } from '@/utils/global'
import { mapActions } from 'vuex'

export default {
  // 定义局部指令:水波纹指令
  directives: {
    waves
  },
  filters: {
    // 定义状态匹配Filter
    statusFilter(status) {
      const statusMap = {
        0: 'success',
        1: 'gray',
        2: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: [],
      listLoading: true,
      total: 0,
      listSearchQuery: {
        pageNum: 1,
        pageSize: pageSize,
        name: undefined
      },
      listQuery: {
        pageNum: 1,
        pageSize: pageSize,
        name: undefined,
        roleId: undefined,
        status: undefined
      },
      imageServer: imageServer,
      typeList: []
    }
  },
  created() {
    this.getTypeData()
    this.getList()
  },
  methods: {
    ...mapActions(['saveVideo', 'saveVideoType', 'clearVideo']),
    delTypeFormat(row, column) {
      if (row.delFlag === 0) {
        return '未删除'
      } else if (row.delFlag === 1) {
        return '已删除'
      } else {
        return '未知'
      }
    },
    clearStatus() {
      this.listQuery.status = undefined
    },
    clearType() {
      this.listQuery.type = undefined
    },
    getTypeData() {
      sysRoleGetList(this.listSearchQuery)
        .then(res => {
          this.typeList = res.data
          this.$store.dispatch('user/saveRole', this.typeList)
        })
    },
    getList() {
      this.listLoading = true
      sysUserGetList(this.listQuery)
        .then(res => {
          this.list = res.data
          this.total = parseInt(res.ext)
          // 延迟进度条1.5秒
          setTimeout(() => {
            this.listLoading = false
          }, 0.5 * 1000)
        })
    },
    handleFilter() {
      this.listQuery.pageNum = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val
      this.getList()
    },
    add() {
      this.$store.dispatch('user/clearUser')
      // this.clearVideo()
      this.$router.push({
        /**
           * 页面间传值 ①使用路由带参数 ②使用vuex
           */
        path: '/sysUser/add'
        // 由于动态路由也是传递params的，所以在 this.$router.push() 方法中 path不能和params一起使用，否则params将无效。需要用name来指定页面
        // path: ({path: '/advert/add', params: {typeList: this.typeList}}) 错误
        // 通过路由名称跳转，携带参数（已成功）
        // name: 'advertAdd', params: {typeList: this.typeList}
      })
    },
    put(row) {
      this.$store.dispatch('user/saveUser', row)
      // this.saveVideo(row)
      this.$router.push({
        path: '/sysUser/add'
      })
    },
    del(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        sysUserDelete({ id })
          .then(res => {
            this.$message.success('删除成功')
            // 两种message写法
            // this.$message({
            //   info: 'success',
            //   message: '删除成功!'
            // });
            this.list = this.list.filter(i => {
              return i.id !== id
            })
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

