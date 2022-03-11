<template>
  <div>
    <div class="app-container">
      <el-form ref="form" :model="form" :rules="formRules" label-width="120px">

        <el-form-item prop="name" label="类型名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item prop="code" label="类型编码">
          <el-input v-model="form.code" />
        </el-form-item>
        <el-form-item prop="parentId" label="上级节点">
          <el-select v-model="form.parentId" placeholder="请选择类型">
            <el-option label="无上级" :value="0" />
            <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
<!--        <el-form-item prop="icon" label="图标">-->
<!--          <el-input v-model="form.icon" />-->
<!--        </el-form-item>-->
        <el-form-item prop="avatar" label="头像">
          <el-upload
            v-loading.fullscreen.lock="fullscreenLoading"
            class="avatar-uploader"
            :action="uploadAction"
            :data="uploadData"
            name="file"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.picurl" :src="imageServer+form.picurl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item prop="status" label="状态">
          <el-input v-model="form.status" />
        </el-form-item>
        <el-form-item prop="sortOrder" label="排序">
          <el-input v-model="form.sortOrder" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click.native.prevent="onSubmit">提交</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import { typeGetList, typeAdd } from '@/api/server'
import { imageServer, uploadServer, pageMaxSize } from '@/utils/global'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      uploadAction: uploadServer,
      imageServer: imageServer,
      typeList: [],
      listQuery: {
        pageNum: 1,
        pageSize: pageMaxSize,
        parentId: 0
      },
      formRules: {
        name: [{ required: true, trigger: 'blur', message: '请输入名称' }],
        content: [{ required: true, trigger: 'blur', message: '请填写版本编号' }]
      },
      loading: false,
      fullscreenLoading: false
    }
  },
  computed: {
    ...mapState({
      form: state => state.user.menu
    })
  },
  created() {
    this.getTypeData()
  },
  methods: {
    getTypeData() {
      typeGetList(this.listQuery)
        .then(res => {
          this.typeList = res.data
        })
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 100
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 100MB!')
      }
      this.fullscreenLoading = true
      return isLt2M
    },
    handleAvatarSuccess(res) {
      this.form.icon = res.data
      this.fullscreenLoading = false
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          typeAdd(this.form)
            .then(res => {
              this.loading = false
              this.$message.success('添加成功')
              this.$router.push({
                path: '/type/index'
              })
            }).catch(() => {
              this.loading = false
              this.$message({
                message: '添加失败!',
                type: 'warning'
              })
            })
        } else {
          this.loading = false
          this.$message({
            message: '请完善表单信息!',
            type: 'warning'
          })
        }
      })
    },
    onCancel() {
      this.$message.info('取消添加')
      this.$router.push({
        path: '/type/index'
      })
    }
  }
}
</script>
