<template>
  <div>
    <div class="app-container">
      <el-form ref="form" :model="form" :rules="formRules" label-width="120px">
        <!--<el-form-item prop="id" label="id" >-->
          <!--<el-input v-model="form.id" />-->
        <!--</el-form-item>-->
        <!--<el-form-item prop="miner" label="矿工费">-->
          <!--<el-input v-model="form.miner" />-->
        <!--</el-form-item>-->
        <!--<el-form-item prop="noWin" label="未中奖金额">-->
          <!--<el-input v-model="form.noWin" />-->
        <!--</el-form-item>-->
        <el-form-item prop="transferState" label="状态">
          <el-select v-model="form.transferState" placeholder="请选择类型">
            <el-option label="开启" :value="0"></el-option>
            <el-option label="关闭" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="pricePublic" label="中奖释放速度">
          <el-input v-model="form.pricePublic" />
        </el-form-item>
        <el-form-item prop="winSpeed" label="中奖释放速度">
          <el-input v-model="form.winSpeed" />
        </el-form-item>
        <!--<el-form-item prop="newUserGiveNum" label="新用户赠送金额">-->
          <!--<el-input v-model="form.newUserGiveNum" />-->
        <!--</el-form-item>-->
        <el-form-item prop="direct" label="直推">
          <el-input v-model="form.direct" />
        </el-form-item>
        <el-form-item prop="indirect" label="间推">
          <el-input v-model="form.indirect" />
        </el-form-item>
        <el-form-item prop="infinite" label="无限">
          <el-input v-model="form.infinite" />
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
import { upload, configAdd } from '@/api/server'
import { imageServer, uploadServer } from '@/utils/global'
import { mapState, mapGetters } from 'vuex'

export default {
  components: {
    VueEditor
  },
  created() {
    // this.getTypeData()
  },
  computed: {
    // ...mapState({
    //   form: state => state.advert.advert
    //   // typeList: state => state.Advert.advertType
    // }),
    ...mapGetters([
      'form'
    ])
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
            configAdd(this.form)
              .then(res => {
                this.loading = false
                this.$message.success('更新成功')
                this.$router.push({
                  path: '/config/index'
                })
              })
          } else {
            configAdd(this.form)
              .then(res => {
                this.loading = false
                this.$message.success('添加成功')
                this.$router.push({
                  path: '/config/index'
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
