<template>
  <div>
    <div class="app-container">
      <el-form ref="form" :model="form" :rules="formRules" label-width="120px">
        <el-form-item prop="typeId" label="广告类型">
          <el-select v-model="form.typeId" placeholder="请选择类型">
            <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item prop="title" label="广告标题">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item prop="sort" label="排序">
          <el-input v-model="form.sort" />
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
            <img v-if="form.picUrl" :src="imageServer+form.picUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label="广告内容" prop="content">
          <div id="app">
            <vue-editor
              id="editor"
              v-model="form.content"
              useCustomImageHandler
              @image-added="handleImageAdded"
            />
          </div>
        </el-form-item>
        <el-form-item prop="startTime" label="执行开始时间">
          <el-date-picker
            v-model="form.startTime"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="date"
          />
        </el-form-item>
        <el-form-item prop="endTime" label="执行结束时间">
          <el-date-picker
            v-model="form.endTime"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="date"
          />
        </el-form-item>
        <el-form-item prop="groupIdAttr" label="车组ID">
          <el-select
            v-model="groupIdAttr"
            clearable
            multiple
            class="filter-item"
            style="width: 130px"
            placeholder="车组"
          >
            <el-option label="请选择车组" :value="0" />
            <el-option v-for="item in groupTypeList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item prop="status" label="状态">
          <el-select v-model="form.status" placeholder="请选择类型">
            <el-option label="开启" :value="0" />
            <el-option label="关闭" :value="1" />
          </el-select>
        </el-form-item>
        <el-form-item prop="displayTime" label="播放秒数">
          <el-input v-model="form.displayTime" />
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
import { typeGetList, upload, advertAdd, advertUpdate } from '@/api/server'
import { imageServer, pageSize, uploadServer } from '@/utils/global'
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
      form: state => state.advert.advert,
      typeList: state => state.advert.advertType
    })
    // ...mapGetters([
    //   'advert',
    //   'advertType'
    // ])
  },
  data() {
    return {
      groupIdAttr: [],
      typeQuery: {
        pageNum: 1,
        pageSize: pageSize,
        parentId: 1
      },
      uploadData: {
        file_type: 'img'
      },
      uploadAction: uploadServer,
      imageServer: imageServer,
      formRules: {
        typeId: [{ required: true, trigger: 'blur', message: '请选择类型' }],
        title: [{ required: true, trigger: 'blur', message: '请输入标题' }],
        sort: [{ required: true, trigger: 'blur', message: '请输入排序' }],
        // picurl: [{required: true, trigger: 'blur', message: '请选择图片'}],
        content: [{ required: true, trigger: 'blur', message: '请输入广告类容' }]
      },
      loading: false,
      fullscreenLoading: false
    }
  },
  methods: {
    getTypeData() {
      if (this.form.id) {
        typeGetList(this.typeQuery)
          .then(res => {
            this.typeList = res.data
          })
      }
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
        // 封装axios上传
        // axios({
        //   url: this.uploadAction,
        //   method: 'POST',
        //   data: formData
        // }).then((result) => {
        //   let url = result.data.data // Get url from response
        //   Editor.insertEmbed(cursorLocation, 'image', this.imageServer + url)
        //   resetUploader()
        // }).catch((err) => {
        //   console.log(err)
        // })
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          let groupArr = ''
          if (this.groupIdAttr.length > 0) {
            groupArr = this.groupIdAttr.join(',')
            // this.groupIdAttr.forEach((item, index) => {
            //   groupArr = item + '@@'
            // })
          }
          const param = {
            groupArr: groupArr
          }
          if (this.form.id) {
            advertUpdate(this.form, param)
              .then(res => {
                this.loading = false
                this.$message.success('更新成功')
                this.$router.push({
                  path: '/advert/index'
                })
              })
          } else {
            advertAdd(this.form, param)
              .then(res => {
                this.loading = false
                this.$message.success('添加成功')
                this.$router.push({
                  path: '/advert/index'
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
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
