<template>
  <div>
    <div class="app-container">
      <el-form ref="form" :model="form" :rules="formRules" label-width="120px">
        <el-form-item prop="type" label="文章类型">
          <el-select v-model="form.typeid" placeholder="请选择类型">
            <el-option v-for="item in advertType" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item prop="title" label="标题">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item prop="picurl" label="封面图">
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
            <img v-if="form.picUrl" :src="imageServer+form.picUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item prop="classify" label="栏目">
          <!--<el-select class="filter-item" v-model="form.classify" style="width: 130px">-->
          <!--<el-option label="图文" value="0"></el-option>-->
          <!--<el-option label="视频" value="1"></el-option>-->
          <!--</el-select>-->
          <el-select v-model="form.classify" class="filter-item" style="width: 130px" placeholder="请选择">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <div id="app">
            <vue-editor
              id="editor"
              v-model="form.content"
              useCustomImageHandler
              @image-added="handleImageAdded"
            />
          </div>
        </el-form-item>
        <el-form-item prop="pathFile" label="视频文件路径">
          <el-input v-model="form.pathFile" />
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
import { VueEditor } from 'vue2-editor'
import { upload, articleAdd, articleUpdate } from '@/api/server'
import { imageServer, uploadServer } from '@/utils/global'
import { mapState } from 'vuex'

export default {
  components: {
    VueEditor
  },
  computed: {
    ...mapState({
      form: state => state.advert.advert,
      advertType: state => state.advert.advertType
    })
  },
  data() {
    return {
      options: [{
        id: 0,
        name: '图文'
      }, {
        id: 1,
        name: '视频'
      }],
      uploadData: {
        file_type: 'img'
      },
      uploadAction: uploadServer,
      imageServer: imageServer,
      formRules: {
        typeid: [{ required: true, trigger: 'blur', message: '请选择类型' }],
        title: [{ required: true, trigger: 'blur', message: '请输入标题' }],
        classify: [{ required: true, trigger: 'blur', message: '请选择栏目' }],
        // picurl: [{ required: true, trigger: 'blur', message: '请选择图片' }],
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
      this.form.picurl = res.data
      this.fullscreenLoading = false
    },
    // 处理富文本图片上传
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
            articleUpdate(this.form)
              .then(res => {
                this.loading = false
                this.$message.success('修改成功')
                this.$router.push({
                  path: '/article/index'
                })
              })
          } else {
            articleAdd(this.form)
              .then(res => {
                this.loading = false
                this.$message.success('添加成功')
                this.$router.push({
                  path: '/article/index'
                })
              })
          }
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
