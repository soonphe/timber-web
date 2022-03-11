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
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="add">添加
      </el-button>
    </div>
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column prop="id" label="ID" align="center" width="95" />
      <el-table-column prop="versionCode" label="编码" align="center" width="95" />
      <el-table-column prop="name" label="名称" align="center" />
      <el-table-column prop="content" label="版本说明" align="center" />
      <el-table-column prop="forceUpdate" label="是否强制更新" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.forceUpdate | statusFilter">
            <span v-if="scope.row.forceUpdate == 0">不强制</span>
            <span v-else-if="scope.row.forceUpdate == 1">强制</span>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">
            <span v-if="scope.row.status == 0">有效</span>
            <span v-else-if="scope.row.status == 1">无效</span>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="filePath" label="文件路径" align="center" />
      <el-table-column prop="createTime" label="创建时间" align="center" width="200" />
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
import { versionGetList, versionDelete } from '@/api/server'
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
        pageNum: 0,
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
    getList() {
      this.listLoading = true
      versionGetList(this.listQuery)
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
      this.$router.push({
        path: '/version/add'
      })
    },
    del(id) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        versionDelete({ id })
          .then(res => {
            this.$message.success('删除成功')
            this.getList()
          })
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    }
  }
}
</script>

