<template>
  <div>
    <div class="app-container">
      <el-form ref="form" :model="form" :rules="formRules" label-width="120px">
        <el-form-item prop="typeId" label="游戏类型">
          <el-select v-model="form.typeId" placeholder="请选择类型">
            <el-option v-for="item in advertType" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item prop="name" label="游戏名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item prop="picUrl" label="封面图">
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
        <el-form-item prop="filepath" label="游戏zip包">
          <el-input v-model="form.filepath" />
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
import { upload, gameAdd, gameUpdate } from '@/api/server'
import { imageServer, uploadServer } from '@/utils/global'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      form: state => state.advert.advert,
      advertType: state => state.advert.advertType
    })
  },
  data() {
    return {
      uploadData: {
        file_type: 'img'
      },
      uploadAction: uploadServer,
      imageServer: imageServer,
      formRules: {
        type: [{ required: true, trigger: 'blur', message: '请选择类型' }],
        title: [{ required: true, trigger: 'blur', message: '请输入标题' }],
        sort: [{ required: true, trigger: 'blur', message: '请输入排序' }],
        picurl: [{ required: true, trigger: 'blur', message: '请选择图片' }],
        content: [{ required: true, trigger: 'blur', message: '请输入广告类容' }]
      },
      loading: false,
      fullscreenLoading: false
    }
  },
  methods: {
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 100
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 100MB!')
      }
      this.fullscreenLoading = true
      return isJPG && isLt2M
    },
    handleAvatarSuccess(res) {
      this.form.picUrl = res.data
      this.fullscreenLoading = false
    },
    handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
      var formData = new FormData()
      formData.append('file', file)
      formData.append('file_type', 'img')
      upload(formData)
        .then(res => {
          const url = res.data // Get url from response
          Editor.insertEmbed(cursorLocation, 'image', this.imageServer + url)
          resetUploader()
        }).catch((err) => {
          console.log(err)
        })
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          if (this.form.id) {
            gameUpdate(this.form)
              .then(res => {
                this.loading = false
                this.$message.success('更新成功')
                this.$router.push({
                  path: '/game/index'
                })
              })
          } else {
            gameAdd(this.form)
              .then(res => {
                this.loading = false
                this.$message.success('添加成功')
                this.$router.push({
                  path: '/game/index'
                })
              })
          }
        } else {
          this.loading = false
          this.$message.warning('请完善表单信息!')
        }
      })
    },
    onCancel() {
      this.$message.warning('取消添加!')
    }
  }
}
</script>

<style scoped>
  .line {
    text-align: center;
  }

  .avatar-uploader {
    width: 430px;
    height: 320px;
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
