<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.assetNumber"
        style="width: 200px;"
        class="filter-item"
        :placeholder="('table.assetNumber')"
        @keyup.enter.native="handleFilter"
      />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <!--<el-button class="filter-item" style="margin-left: 10px;" @click="add" info="primary" icon="el-icon-edit">添加</el-button>-->
    </div>

    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column prop="id" label="ID" align="center" width="95" />
      <el-table-column prop="imcode" label="IM码" align="center" />
      <el-table-column prop="assetnumber" label="资产编码" align="center" />
      <el-table-column prop="groupid" label="车组ID" align="center" />
      <el-table-column prop="remark" label="备注" align="center" />
      <el-table-column prop="createtime" label="创建时间" align="center" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.createtime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="300" class-name="small-padding fixed-width">
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
import { devicesGetList, devicesDelete } from '@/api/server'
import waves from '@/directive/waves' // 水波纹指令
import { imageServer, pageSize } from '@/utils/global'
import { mapActions } from 'vuex'

export default {
  // 定义局部指令
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
        imCode: undefined,
        assetNumber: undefined
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
    typeFormat(row, column) {
      // this.typeList.forEach((item,index)=>{
      //   console.log(row.info+'___'+item.id);
      //   if (row.info === item.id) {
      //     console.log('equals___'+item.name);
      //     return item.name
      //   }
      // })
    },
    getList() {
      this.listLoading = true
      devicesGetList(this.listQuery)
        .then(res => {
          this.list = res.data
          this.total = parseInt(res.ext)
          this.listLoading = false
          // 延迟进度条1.5秒
          // setTimeout(() => {
          //   this.listLoading = false
          // }, 1.5 * 1000)
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
        /**
           * 页面间传值 ①使用路由带参数 ②使用vuex
           */
        path: '/devices/add'
        // 由于动态路由也是传递params的，所以在 this.$router.push() 方法中 path不能和params一起使用，否则params将无效。需要用name来指定页面
        // path: ({path: '/advert/add', params: {typeList: this.typeList}}) 错误
        // 通过路由名称跳转，携带参数（已成功）
        // name: 'advertAdd', params: {typeList: this.typeList}
      })
    },
    detail(row) {
      this.saveAdvertType(row)
      this.$router.push({
        path: '/cityArticle/index'
      })
    },
    put(row) {
      this.saveAdvert(row)
      this.$router.push({
        path: '/devices/add'
      })
    },
    del(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        devicesDelete({ id })
          .then(res => {
            this.$message.success('删除成功')
            this.list = this.list.filter(i => {
              return i.id != id
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
