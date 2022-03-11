<template>
  <div>
    <div class="app-container">
      <el-form ref="form" :model="form" :rules="formRules" label-width="120px">
        <el-form-item prop="name" label="用户名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item prop="userName" label="账户名">
          <el-input v-model="form.userName" />
        </el-form-item>
        <el-form-item prop="roleId" label="角色">
          <el-select v-model="form.roleId" placeholder="请选择类型">
            <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
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
        <el-form-item>
          <el-button type="primary" :loading="loading" @click.native.prevent="onSubmit">提交</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>

import { sysUserAdd, sysRoleGetList } from '@/api/server'
import { imageServer, uploadServer, pageSize } from '@/utils/global'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      uploadData: {
        file_type: 'img'
      },
      uploadAction: uploadServer,
      imageServer: imageServer,
      typeList: [],
      listQuery: {
        pageNum: 1,
        pageSize: pageSize,
        parentId: -1,
        roleId: -1
      },
      formRules: {
        name: [{ required: true, trigger: 'blur', message: '请输入名称' }],
        userName: [{ required: true, trigger: 'blur', message: '请填写用户名' }],
        roleId: [{ required: true, trigger: 'blur', message: '请选择角色' }]
      },
      loading: false,
      fullscreenLoading: false
    }
  },
  computed: {
    ...mapState({
      form: state => state.user.user,
      advertType: state => state.user.role
    })
    // ...mapGetters([
    //   'advert',
    //   'advertType'
    // ])
  },
  created() {
    this.getTypeData()
    // 判断是否为新增
    // if (!this.form.id) {
  },
  methods: {
    getTypeData() {
      sysRoleGetList(this.listQuery)
        .then(res => {
          this.typeList = res.data
        })
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpeg'
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!')
      // }
      const isLt2M = file.size / 1024 / 1024 < 100
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 100MB!')
      }
      this.fullscreenLoading = true
      return isLt2M
    },
    handleAvatarSuccess(res) {
      this.form.avatar = res.data
      this.fullscreenLoading = false
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          const param = {
            roleId: this.form.roleId
          }
          // 同时传递json和form-data数据
          sysUserAdd(this.form, param)
            .then(res => {
              this.loading = false
              this.$message.success('添加成功')
              this.$router.push({
                path: '/sysUser/index'
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
        path: '/sysUser/index'
      })
    }
  }
}
</script>

<style scoped>
  .line {
    text-align: center;
  }

  .avatar-uploader {
    width: 200px;
    height: 200px;
    border: 1px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .avatar {
    width: 430px;
    height: 320px;
    display: block;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 140px;
    line-height: 140px;
    text-align: center;
  }
</style>
