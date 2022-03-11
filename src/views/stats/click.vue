<template>
  <div class="app-container">
    <div class="filter-container">
      <el-date-picker
        v-model="searchTime"
        value-format="yyyy-MM-dd"
        type="daterange"
        class="filter-item"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="exportExcel">导出</el-button>
    </div>
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="movies" label="电影" align="center" />
      <el-table-column prop="game" label="电玩" align="center" />
      <el-table-column prop="book" label="书吧" align="center" />
      <el-table-column prop="city" label="城市" align="center" />
      <el-table-column prop="article" label="文章" align="center" />
      <el-table-column prop="food" label="点餐" align="center" />
      <el-table-column prop="vogue" label="时尚" align="center" />
      <el-table-column prop="status" label="状态" align="center" />
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="delFlag" label="删除标识" align="center" />
      <el-table-column prop="clickSum" label="总计" align="center" />
      <!--<el-table-column label="操作" align="center" width="300" class-name="small-padding fixed-width">-->
      <!--<template slot-scope="scope">-->
      <!--<el-button info="primary" @click="put(scope.row)">查看详情</el-button>-->
      <!--</template>-->
      <!--</el-table-column>-->
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
import { statsGetClick } from '@/api/server'
import waves from '@/directive/waves'
import { imageServer, pageSize } from '@/utils/global'
import { mapActions } from 'vuex'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'success',
        1: 'gray',
        2: 'danger'
      }
      return statusMap[status]
    }
  },
  directives: {
    waves
  },
  data() {
    return {
      list: [],
      listLoading: true,
      total: 0,
      searchTime: '',
      listQuery: {
        pageNum: 1,
        pageSize: pageSize,
        startDate: '',
        endDate: ''
      },
      imageServer: imageServer,
      typeList: [],
      filename: '模块点击统计',
      autoWidth: true,
      bookType: 'xlsx'
    }
  },
  created() {
    this.getList()
  },
  methods: {
    ...mapActions(['saveAdvert', 'saveAdvertType', 'clearAdvert']),
    getList() {
      this.listLoading = true
      const time = this.searchTime
      if (time.length) {
        this.listQuery.startDate = time[0]
        this.listQuery.endDate = time[1]
      }
      statsGetClick(this.listQuery)
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
    exportExcel() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['创建时间', '电影', '电玩', '书吧', '城市', '城铁', '点餐', '总计']
        const filterVal = ['createTime', 'movies', 'game', 'book', 'city', 'subway', 'food', 'clickSum']
        const list = this.list
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      // 提取list中的数据，并转化为数组
      return jsonData.map(v => filterVal.map(j => {
        // if (j === 'timestamp') {
        //   return parseTime(v[j])
        // } else {
        console.log(v[j])
        return v[j]
        // }
      }))
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
        path: '/city/add'
      })
    },
    del(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

      })
    }
  }
}
</script>
