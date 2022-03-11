<template>
  <div>
    <div class="app-container">
      <el-form ref="form" :model="form" :rules="formRules" label-width="120px">
        <el-form-item prop="name" label="名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item prop="versionCode" label="版本编号">
          <el-input v-model="form.versionCode" />
        </el-form-item>
        <el-form-item prop="content" label="版本说明">
          <el-input v-model="form.content" />
        </el-form-item>
        <el-form-item prop="forceUpdate" label="是否强制更新">
          <el-select v-model="form.forceUpdate" placeholder="是否强制更新">
            <el-option label="否" :value="0" />
            <el-option label="是" :value="1" />
          </el-select>
        </el-form-item>
        <el-form-item prop="filepath" label="下载路径">
          <el-input v-model="form.filepath" />
        </el-form-item>
        <el-form-item prop="filePath" label="APK文件">
          <el-upload
            v-loading.fullscreen.lock="fullscreenLoading"
            class="upload-demo"
            :action="uploadAction"
            :data="uploadData"
            name="file"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :limit="1"
            :on-exceed="handleExceed"
            :before-remove="beforeRemove"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传apk文件，且不超过100MB</div>
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
import { versionAdd } from '@/api/server'
import { imageServer, uploadServer } from '@/utils/global'

export default {
  data() {
    return {
      uploadData: {
        file_type: 'apk'
      },
      uploadAction: uploadServer,
      imageServer: imageServer,
      form: {
        versioncode: '',
        name: '',
        content: '',
        filepath: ''
      },
      formRules: {
        vcode: [{ required: true, trigger: 'blur', message: '请填写版本编号' }],
        vcontent: [{ required: true, trigger: 'blur', message: '请输入版本说明' }],
        state: [{ required: true, trigger: 'blur', message: '请填写版本状态' }],
        filepath: [{ required: true, trigger: 'blur', message: '请选择文件' }]
      },
      loading: false,
      fullscreenLoading: false
    }
  },
  created() {

  },
  methods: {
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'application/vnd.android.package-archive'
      const isLt2M = file.size / 1024 / 1024 < 100
      if (!isJPG) {
        this.$message.error('上传文件只能是 apk 文件!')
      }
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 100MB!')
      }
      // this.fullscreenLoading = true
      return isJPG && isLt2M
    },
    handleAvatarSuccess(res) {
      this.form.filepath = res.data
      // this.fullscreenLoading = false
    },
    handleRemove(file, fileList) {
      this.form.filepath = null
      console.log('移除' + file, fileList)
      console.log(this.form.filepath)
    },
    handlePreview(file) {
      console.log(this.form.filepath)
      console.log('点击' + file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制只能选择1 个文件`)
    },
    beforeRemove(file, fileList) {
      if (this.form.filepath) {
        return this.$confirm(`确定移除 ${file.name}？`)
      }
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          versionAdd(this.form)
            .then(res => {
              this.loading = false
              this.$message.success('添加成功')
              this.$router.push({
                path: '/version/index'
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
      this.$message({
        message: '取消添加!',
        type: 'warning'
      })
    }
  }
}
</script>
