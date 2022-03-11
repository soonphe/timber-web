<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.uid"
        style="width: 200px;"
        class="filter-item"
        placeholder="钱包ID"
        @keyup.enter.native="handleFilter"
      />
      <el-input
        v-model="listQuery.trxAddress"
        style="width: 200px;"
        class="filter-item"
        placeholder="钱包地址"
        @keyup.enter.native="handleFilter"
      />
      <el-select v-model="listQuery.level" placeholder="请选择增益包等级" class="filter-item">
        <el-option label="全部增益包等级" :value="0" />
        <el-option label="增益包等级一" :value="1" />
        <el-option label="增益包等级二" :value="2" />
        <el-option label="增益包等级三" :value="3" />
      </el-select>
      <el-select v-model="listQuery.teamNum" placeholder="请选择社群等级" class="filter-item">
        <el-option label="全部社群等级" :value="0" />
        <el-option label="社群等级一" :value="1" />
        <el-option label="社群等级二" :value="2" />
        <el-option label="社群等级三" :value="3" />
        <el-option label="社群等级四" :value="4" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <!--<el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="add">添加</el-button>-->
    </div>

    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column prop="id" label="ID" align="center" width="95" fixed />
      <el-table-column prop="name" label="名称" align="center" fixed />
      <!--<el-table-column prop="privateKey" label="私钥地址" align="center"  width="180" />-->
      <el-table-column prop="wordKey" label="助记词" align="center"  width="250" />
      <el-table-column prop="trxAddress" label="USDT地址" align="center" width="180" />
      <el-table-column prop="trxAmount" label="USDT数量" align="center" />
      <el-table-column prop="ftAmount" label="MALL数量" align="center" />
      <el-table-column prop="cnyAmount" label="cny数量" align="center" />
      <el-table-column prop="recommendCode" label="推荐码" align="center" />

      <el-table-column prop="recommendId" label="直推ID" align="center" >
        <template slot-scope="scope">
          <span v-if="scope.row.recommendId!=null">{{ scope.row.recommendId.substring(scope.row.recommendId.lastIndexOf(',')+1)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="recommendValidCount" label="直推总数" align="center" />
      <el-table-column prop="teamValidNum" label="团队总数" align="center" />
      <el-table-column prop="contractLeve" label="合约等级" align="center" />

      <el-table-column prop="winFt" label="矿池数量" align="center" />
      <el-table-column prop="releaseTotal" label="累计释放" align="center" />

      <el-table-column prop="gainpacketFtAmount" label="增益包分红MAL" align="center" />
      <el-table-column prop="gainpacketCnyAmount" label="增益包分红CNY" align="center" />
      <el-table-column prop="recommendFtAmount" label="游戏分红MALL" align="center" />
      <el-table-column prop="recommendCnyAmount" label="游戏分红CNY" align="center" />
      <el-table-column prop="teamFtAmount" label="社群分红MALL" align="center" />
      <el-table-column prop="teamCnyAmount" label="社群分红CNY" align="center" />
      <el-table-column prop="recommendCount" label="社群等级" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.recommendCount >= 40&&scope.row.teamNum >= 2700">S4</span>
          <span v-else-if="scope.row.recommendCount >= 30&&scope.row.teamNum >= 900">S3</span>
          <span v-else-if="scope.row.recommendCount >= 20&&scope.row.teamNum >= 300">S2</span>
          <span v-else-if="scope.row.recommendCount >= 10&&scope.row.teamNum >= 100">S1</span>
          <span v-else>S0</span>
        </template>
      </el-table-column>
      <el-table-column prop="gainpackLevel" label="增益包等级" align="center" />
      <el-table-column prop="recharge" label="USDT充值" align="center" />
      <el-table-column prop="withdrawal" label="USDT提现" align="center" />
      <el-table-column prop="createTime" label="创建时间" align="center" width="200" />
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" @click="getSecret(scope.row.id)">查看密钥</el-button>
          <el-button type="primary" @click="put(scope.row)">游戏详情</el-button>
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
import { smsStatsGetWalletList, smsGetWalletSecretStats, advertiserDelete } from '@/api/server'
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
        pageNum: 0,
        pageSize: pageSize,
        uid: '',
        trxAddress: '',
        level: 0,
        teamNum: 0,
        sid: 1
      },
      query: {
        uid: 6528,
        secret: 'vP4FcUGoB7',
        sid: 1
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
      for (var i = 0; i < this.list.length; i++) {
        if (row.parentid === 0) {
          return '无'
        } else if (row.parentid === this.list[i].id) {
          return this.list[i].name
        }
      }
      /* foreach 无法通过正常流程停止 */
      // this.list2.forEach((item, index) => {
      //   console.log(row.parentid + '___' + item.id)
      //   if (row.parentid === item.id) {
      //     console.log('equals___' + item.name)
      //     return item.name
      //   }
      // })
    },
    clearType() {
      this.listQuery.type = undefined
    },
    getList() {
      this.listLoading = true
      smsStatsGetWalletList(this.listQuery)
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
      // 清除store中存储的advert数据
      this.clearAdvert()
      this.$router.push({
        /**
           * 页面间传值 ①使用路由带参数 ②使用vuex
           */
        path: '/advertiser/add'
        // 由于动态路由也是传递params的，所以在 this.$router.push() 方法中 path不能和params一起使用，否则params将无效。需要用name来指定页面
        // path: ({path: '/advert/add', params: {typeList: this.typeList}}) 错误
        // 通过路由名称跳转，携带参数（已成功）
        // name: 'advertAdd', params: {typeList: this.typeList}
      })
    },
    put(row) {
      this.$store.dispatch('advert/saveAdvert', row)
      this.$router.push({
        path: '/mygame/index'
      })
    },
    getSecret(uid) {
      this.$prompt('请输入密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.query.uid = uid
        smsGetWalletSecretStats(this.query)
          .then(res => {
            this.$alert(res.data, '密钥', {
              confirmButtonText: '确定'
            })
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '验证异常'
        })
      })
    },
    del(id) {
      this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        advertiserDelete({ id })
          .then(res => {
            this.$message.success('删除成功')
            // 两种message写法
            // this.$message({
            //   info: 'success',
            //   message: '删除成功!'
            // });
            // 删除本地数据
            this.list = this.list.filter(i => {
              return i.id !== id
            })
            // 重新请求数据
            // this.getList()
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
