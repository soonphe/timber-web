<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" @click="addType" type="primary" icon="el-icon-edit">添加</el-button>
    </div>
    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <!--<el-table-column label='类型' align="center" width="95">-->
        <!--<template slot-scope="scope">-->
          <!--{{scope.$index}}-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column prop="id" label="ID" align="center" width="95"></el-table-column>
      <el-table-column prop="name" label="名称" align="center"></el-table-column>
      <el-table-column prop="createtime" label="创建时间" align="center" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.createtime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" @click="put(scope.row)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {advertTypeGetList,advertTypeDelete} from '@/api/server'
  import {mapActions} from 'vuex'

  export default {
    data() {
      return {
        list: [],
        listLoading: true
      }
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
    created() {
      this.getList()
    },
    methods: {
      ...mapActions([ 'saveAdvert', 'clearAdvert']),
      getList() {
        this.listLoading = true
        advertTypeGetList()
          .then(res => {
            this.list = res.data
            this.listLoading = false
          })
      },
      addType() {
        this.$router.push({
          path: '/advertType/add'
        })
      },
      put(row) {
        this.saveAdvert(row)
        this.$router.push({
          path: '/advertType/add'
        })
      },
      del(id) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          advertTypeDelete({id})
            .then(res => {
              this.$message.success('删除成功')
              // 两种message写法
              // this.$message({
              //   info: 'success',
              //   message: '删除成功!'
              // });
              //删除本地数据
              this.list=this.list.filter(i => {
                return i.id != id
              })
              //重新请求数据
              // this.getList()
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '删除异常'
          });
        });
      }
    }
  }
</script>
