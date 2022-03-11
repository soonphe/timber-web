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
        v-model="listQuery.typeId"
        clearable
        class="filter-item"
        style="width: 130px"
        placeholder="类型"
        @clear="clearType"
      >
        <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="add">添加</el-button>
    </div>

    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column prop="id" label="ID" align="center" width="95" />
      <el-table-column prop="typeId" label="类型" :formatter="typeFormat" align="center" />
      <el-table-column prop="title" label="标题" align="center" />
      <el-table-column label="图片" align="center">
        <template slot-scope="scope">
          <img :src="imageServer+scope.row.picUrl" style="width:100%;height:100%">
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序" align="center" />
      <el-table-column prop="createTime" label="创建时间" align="center" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="startTime" label="开始时间" align="center" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.startTime }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="endTime" label="结束时间" align="center" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.endTime }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="displayTime" label="播放秒数" align="center" />
      <el-table-column prop="status" label="状态" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">
            <span v-if="scope.row.status == 0">未审核</span>
            <span v-else-if="scope.row.status == 1">审核未通过</span>
            <span v-else-if="scope.row.status == 2">审核通过</span>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="500" class-name="small-padding fixed-width">
        <template slot-scope="scope" popper-class="primary">
          <el-popover placement="top-start" width="200" trigger="click">
            <el-card class="box-card" type="primary">
              <div>
                {{ '总停留时长 ' + scope.row.staytime }}
              </div>
              <div>
                {{ '总点击量 ' + scope.row.click }}
              </div>
              <div>
                {{ '总轮播次数 ' + scope.row.carouselcount }}
              </div>
              <div>
                {{ '总曝光次数 ' + scope.row.exposure }}
              </div>
            </el-card>
            <el-button slot="reference">总体数据</el-button>
          </el-popover>
          <el-button type="primary" @click="verifyFail(scope.row)">不通过</el-button>
          <el-button type="primary" @click="verifySuccess(scope.row)">通过</el-button>
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
import { typeGetList, advertGetList, advertDelete, advertUpdate } from '@/api/server'
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
      typeQuery: {
        pageNum: 1,
        pageSize: pageSize,
        parentId: 1
      },
      listQuery: {
        pageNum: 1,
        pageSize: pageSize,
        title: undefined,
        typeId: undefined,
        state: undefined
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
    ...mapActions(['saveAdvert', 'saveAdvertType', 'clearAdvert']),
    typeFormat(row, column) {
      for (var i = 0; i < this.typeList.length; i++) {
        if (row.typeId === this.typeList[i].id) {
          return this.typeList[i].name
        }
      }
      return '无'
    },
    clearType() {
      this.listQuery.type = undefined
    },
    getTypeData() {
      typeGetList(this.typeQuery)
        .then(res => {
          this.typeList = res.data
          this.$store.dispatch('advert/saveAdvertType', this.typeList)
        })
    },
    getList() {
      this.listLoading = true
      advertGetList(this.listQuery)
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
      // 清除store中存储的advert数据
      this.$store.dispatch('advert/clearAdvert')
      // this.clearAdvert()
      this.$router.push({
        /**
           * 页面间传值 ①使用路由带参数 ②使用vuex
           */
        path: '/advert/add'
        // 由于动态路由也是传递params的，所以在 this.$router.push() 方法中 path不能和params一起使用，否则params将无效。需要用name来指定页面
        // path: ({path: '/advert/add', params: {typeList: this.typeList}}) 错误
        // 通过路由名称跳转，携带参数（已成功）
        // name: 'advertAdd', params: {typeList: this.typeList}
      })
    },
    put(row) {
      this.$store.dispatch('advert/saveAdvert', row)
      // this.saveAdvert(row)
      this.$router.push({
        path: '/advert/add'
      })
    },
    del(id) {
      this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        advertDelete({ id })
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
    },
    verifyFail(row) {
      this.$prompt('请填写审核失败原因?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
        // type: 'warning'
      }).then(({ value }) => {
        row.state = 1
        row.remark = value
        advertUpdate(row)
          .then(res => {
            this.$message.success('操作成功')
            // 重新请求数据
            this.getList()
          })
      })
    },
    verifySuccess(row) {
      this.$confirm('确定要审核通过?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        row.state = 2
        advertUpdate(row)
          .then(res => {
            this.$message.success('操作成功')
            // 重新请求数据
            this.getList()
          })
      })
    }
  }
}
</script>
