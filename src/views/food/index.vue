<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        style="width: 200px;"
        class="filter-item"
        placeholder="名称"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="listQuery.type"
        clearable
        class="filter-item"
        style="width: 130px"
        placeholder="类型"
        @clear="clearType"
      >
        <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="add">添加
      </el-button>
    </div>

    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column prop="id" label="ID" align="center" width="95" />
      <el-table-column prop="typeName" label="类型" align="center" />
      <el-table-column prop="name" label="名称" align="center" />
      <el-table-column label="图片" align="center">
        <template slot-scope="scope">
          <img :src="imageServer+scope.row.picUrl" style="width:100%;height:100%">
        </template>
      </el-table-column>
      <el-table-column prop="price" label="价格" align="center" />
      <el-table-column prop="description" label="描述" align="center" />
<!--      <el-table-column prop="click" label="点击量" align="center" />-->
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
import { foodTypeGetList, foodGetList, foodDelete } from '@/api/server'
import waves from '@/directive/waves'
import { imageServer, pageSize } from '@/utils/global'
import { mapActions } from 'vuex'

export default {
  directives: {
    waves
  },
  data() {
    return {
      list: [],
      listLoading: true,
      total: 0,
      listQuery: {
        pageNum: 1,
        pageSize: pageSize,
        title: undefined,
        type: undefined
      },
      imageServer: imageServer,
      typeList: []
    }
  },
  created() {
    // this.getTypeData()
    this.getList()
  },
  methods: {
    ...mapActions(['saveAdvert', 'saveAdvertType', 'clearAdvert']),
    clearType() {
      this.listQuery.type = undefined
    },
    getTypeData() {
      foodTypeGetList()
        .then(res => {
          this.typeList = res.data
          this.saveAdvertType(this.typeList)
        })
    },
    getList() {
      this.listLoading = true
      foodGetList(this.listQuery)
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
        path: '/food/add'
      })
    },
    put(row) {
      this.saveAdvert(row)
      this.$router.push({
        path: '/food/add'
      })
    },
    del(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        foodDelete({ id })
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
