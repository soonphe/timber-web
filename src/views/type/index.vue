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
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="add">添加</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      row-key="id"
      border
      fit
      highlight-current-row
      lazy
      :load="load"
      :tree-props="{children: 'children', hasChildren: 'hasChild'}"
    >
<!--      <el-table-column prop="id" label="ID " align="center" width="95" />-->
      <el-table-column prop="code" label="编码" align="center" />
      <el-table-column prop="name" label="名称" align="center" width="95" />
      <el-table-column prop="icon" label="图标" align="center">
        <template slot-scope="scope">
          <i class="sidebar-icon fa" :class="scope.row.icon" />
        </template>
      </el-table-column>
      <el-table-column prop="sortOrder" label="排序" align="center" />
      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">
            <span v-if="scope.row.status == 0">有效</span>
            <span v-else>无效</span>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="startTime" label="开始时间" align="center" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.startTime }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="endTime" label="结束时间" align="center" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.endTime }}</span>
        </template>
      </el-table-column>
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
import { typeGetList, typeDelete } from '@/api/server'
import waves from '@/directive/waves'
import { pageSize } from '@/utils/global'

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
        parentId: 0
      }
      // typeList: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    clearType() {
      this.listQuery.type = undefined
    },
    getList() {
      this.listLoading = true
      typeGetList(this.listQuery)
        .then(res => {
          this.list = res.data
          this.total = parseInt(res.ext)
          this.listLoading = false
        })
    },
    load(tree, treeNode, resolve) {
      this.listQuery.parentId = tree.id
      this.listLoading = true
      typeGetList(this.listQuery)
        .then(res => {
          // this.list = res.data
          resolve(res.data)
          // this.total = parseInt(res.ext)
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
      this.$store.dispatch('user/clearMenu')
      this.$router.push({
        path: '/type/add'
      })
    },
    put(row) {
      this.$store.dispatch('user/saveMenu', row)
      this.$router.push({
        path: '/type/add'
      })
    },
    del(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        typeDelete({ id })
          .then(res => {
            this.$message.success('删除成功')
            this.list = this.list.filter(i => {
              return i.id !== id
            })
          })
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    }
  }
}
</script>

