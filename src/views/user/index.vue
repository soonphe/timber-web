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
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
    </div>

    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column prop="id" label="ID" align="center" width="95" />
      <el-table-column prop="userCode" label="用户编号" align="center" width="95" />
      <el-table-column prop="userType" label="用户类型" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.userType.toString()">
            <span v-if="scope.row.userType == 1">普通用户</span>
            <span v-else-if="scope.row.userType == 2">企业成员</span>
            <span v-else-if="scope.row.userType == 3">不记名用户</span>
            <span v-else-if="scope.row.userType == 4">企业用户</span>
            <span v-else-if="scope.row.userType == 5">社会商户</span>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="手机号" align="center" width="110" />
      <el-table-column prop="userName" label="用户名" align="center" />
      <el-table-column prop="email" label="邮箱" align="center" />
      <el-table-column prop="realName" label="姓名" align="center" />
      <el-table-column prop="nickName" label="昵称" align="center" />
      <el-table-column prop="sex" label="性别" :formatter="sexTypeFormat" align="center" />
      <el-table-column prop="age" label="年龄" :formatter="ageTypeFormat" align="center" />
      <el-table-column prop="regChannel" label="注册渠道" align="center" />
      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status.toString() | statusFilter">
            <span v-if="scope.row.status == 0">有效</span>
            <span v-else-if="scope.row.status == 1">冻结</span>
            <span v-else-if="scope.row.status == 2">销户</span>
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="remark" label="备注" align="center" />
      <el-table-column prop="createTime" label="创建时间" align="center" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.createTime }}</span>
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
import { userGetList } from '@/api/server'
import waves from '@/directive/waves'
import { imageServer, pageSize } from '@/utils/global'
import { mapActions } from 'vuex'

export default {
  directives: {
    waves
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: [],
      listLoading: true,
      total: 0,
      listQuery: {
        pageNum: 1,
        pageSize: pageSize,
        name: undefined
      },
      imageServer: imageServer,
      typeList: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    ...mapActions(['saveAdvert', 'saveAdvertType', 'clearAdvert']),
    sexTypeFormat(row, column) {
      if (row.sex === 0) {
        return '未知'
      } else if (row.sex === 1) {
        return '男'
      } else {
        return '女'
      }
    },
    ageTypeFormat(row, column) {
      if (row.age > 0 && row.age <= 20) {
        return '0-20岁'
      } else if (row.age > 20 && row.age <= 40) {
        return '20-40岁'
      } else if (row.age > 40 && row.age <= 60) {
        return '40-60岁'
      } else {
        return '60岁以上'
      }
    },
    getList() {
      this.listLoading = true
      userGetList(this.listQuery)
        .then(res => {
          this.list = res.data
          this.total = parseInt(res.ext)
          this.listLoading = false
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
      this.clearAdvert()
      this.$router.push({
        path: '/advert/add'
      })
    },
    put(row) {
      this.saveAdvert(row)
      this.$router.push({
        path: '/advert/add'
      })
    },
    del(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // advertDelete({ id })
        //   .then(res => {
        //     this.$message.success('删除成功')
        //     this.getList()
        //   })
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

