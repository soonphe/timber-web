<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.key"
        style="width: 200px;"
        class="filter-item"
        placeholder="key名称"
        @keyup.enter.native="handleFilter"
      />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="add">添加</el-button>
    </div>

    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column prop="id" label="ID" align="center" width="95" />

      <el-table-column prop="transferState" label="是否开启转账" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.transferState == 0">开启</span>
          <span v-else-if="scope.row.transferState == 1">关闭</span>
        </template>
      </el-table-column>
      <el-table-column prop="pricePublic" label="发行价" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.pricePublic}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="winSpeed" label="中奖释放速度" align="center">
        <template slot-scope="scope">
          <span>{{toPercent(scope.row.winSpeed)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="direct" label="直推" align="center" >
        <template slot-scope="scope">
          <span>{{toPercent(scope.row.direct)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="indirect" label="间推"  align="center" >
        <template slot-scope="scope">
          <span>{{toPercent(scope.row.indirect)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="infinite" label="无限" align="center" >
        <template slot-scope="scope">
          <span>{{toPercent(scope.row.infinite)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" @click="put(scope.row)">编辑</el-button>
          <!--<el-button type="danger" @click="del(scope.row.id)">删除</el-button>-->
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
import { configGetList, configDelete } from '@/api/server'
import waves from '@/directive/waves'
import { imageServer, pageSize } from '@/utils/global'
import { mapActions } from 'vuex'
import { mapState } from 'vuex'

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
        code: 2,
        key: '',
        value: '',
        time: undefined
      },
      imageServer: imageServer,
      typeList: []
    }
  },
  created() {
    this.getList()
  },
  computed: {
    ...mapState({
      form1: state => state.advert.advert
      // typeList: state => state.Advert.advertType
    })
  },
  methods: {
    ...mapActions(['saveAdvert', 'saveAdvertType', 'clearAdvert']),
    toPercent(value, column) {
      return `${((value || 0) * 100).toFixed(2 || 2)}%`
    },
    clearType() {
      this.listQuery.type = undefined
    },
    getList() {
      this.listLoading = true
      configGetList(this.listQuery)
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
        path: '/gainpacketReward/add'
      })
    },
    put(row) {
      // this.saveAdvert(row)
      this.$store.dispatch('advert/saveAdvert', row)
      console.log('dayin:' + this.form1.miner)
      this.$router.push({
        path: '/config/add'
      })
    },
    del(id) {
      this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        configDelete({ id })
          .then(res => {
            this.$message.success('删除成功')
            this.list = this.list.filter(i => {
              return i.id !== id
            })
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '删除异常'
        })
      })
    }
  }
}
</script>
