<template>
  <div>
    <div class="app-container">
      <el-form ref="form" :model="form" :rules="formRules" label-width="120px">
        <el-form-item prop="uid" label="广告商uid">
          <el-input v-model="form.uid" />
        </el-form-item>
        <el-form-item prop="companyname" label="公司名称">
          <el-input v-model="form.companyname" />
        </el-form-item>
        <el-form-item prop="position" label="职位">
          <el-input v-model="form.position" />
        </el-form-item>
        <el-form-item prop="name" label="名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item prop="phone" label="联系方式">
          <el-input v-model="form.phone" />
        </el-form-item>
        <el-form-item prop="state" label="状态">
          <el-select v-model="form.state" placeholder="请选择类型">
            <el-option label="开启" :value="0" />
            <el-option label="关闭" :value="1" />
          </el-select>
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
import { VueEditor, Quill } from 'vue2-editor'
import { upload, advertiserGetList, advertiserAdd, advertiserUpdate } from '@/api/server'
import { imageServer, uploadServer } from '@/utils/global'
import { mapState } from 'vuex'

export default {
  components: {
    VueEditor
  },
  created() {
    this.getTypeData()
  },
  computed: {
    ...mapState({
      form: state => state.Advert.advert,
      typeList: state => state.Advert.advertType
    })
  },
  data() {
    return {
      // typeList: [],
      uploadData: {
        file_type: 'img'
      },
      uploadAction: uploadServer,
      imageServer: imageServer,
      // form: {
      //   info: '',
      //   title: '',
      //   picurl: '',
      //   sort: '',
      //   content: ''
      // },
      formRules: {
        name: [{ required: true, trigger: 'blur', message: '请输入名称' }],
        phone: [{ required: true, trigger: 'blur', message: '请输入联系方式' }],
        contact: [{ required: true, trigger: 'blur', message: '请选择联系人' }]
      },
      loading: false,
      fullscreenLoading: false
    }
  },
  methods: {
    // 这里是网络请求广告商列表
    getTypeData() {
      advertiserGetList()
        .then(res => {
          // typeList = res.data
        })
    },
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
            advertiserUpdate(this.form)
              .then(res => {
                this.loading = false
                this.$message.success('更新成功')
                this.$router.push({
                  path: '/advertiser/index'
                })
              })
          } else {
            advertiserAdd(this.form)
              .then(res => {
                this.loading = false
                this.$message.success('添加成功')
                this.$router.push({
                  path: '/advertiser/index'
                })
              })
          }
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
