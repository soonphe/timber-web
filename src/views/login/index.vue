<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      class="login-form"
      auto-complete="on"
      :model="loginForm"
      :rules="loginRules"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <i class="sidebar-icon fa fa-user" />
          <!--<svg-icon icon-class="user"></svg-icon>-->
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          name="username"
          type="text"
          auto-complete="on"
          placeholder="请输入用户名"
          tabindex="1"
        />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="大写锁定已开启" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <i class="sidebar-icon fa fa-key" />
          <!--<svg-icon icon-class="password"></svg-icon>-->
          </span>
          <el-input
            ref="password"
            v-model="loginForm.password"
            name="password"
            :type="passwordType"
            auto-complete="on"
            placeholder="请输入密码"
            tabindex="2"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
          />
          <span class="show-pwd" @click="showPwd">
            <i :class="passwordType === 'password' ? 'sidebar-icon fa fa-eye-slash' : 'sidebar-icon fa fa-eye'" />
<!--            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />-->
          </span>
        </el-form-item>
      </el-tooltip>

      <el-form-item prop="checkCode">
        <span class="svg-container">
          <i class="sidebar-icon fa fa-contao" />
          <!--<svg-icon icon-class="password"></svg-icon>-->
        </span>
        <el-input
          v-model="loginForm.checkCode"
          type="text"
          placeholder="请输入验证码"
          style="width:50%"
          tabindex="3"
          @keyup.enter.native="handleLogin"
        />
        <div class="show_canvas" @click="createCode">
          <canvas class="code" />
        </div>
      </el-form-item>

      <el-form-item class="re">
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login, sysMenuGetMenuListByRoleId } from '@/api/server'
import { mapActions } from 'vuex'
import { setStore, getStore, rasPublic } from '@/utils/local'
import { isvalidUsername } from '@/utils/validate'
import { menuItems } from '@/utils/module'

export default {
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (!value || value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }],
        checkCode: [{ required: true, trigger: 'blur', message: '请输入验证码' }]
      },
      loading: false,
      passwordType: 'password',
      capsTooltip: false,
      check_code: '',
      checkCode: '',
      remember: true,
      roleId: 1
    }
  },
  created() {
    this.loginForm.username = getStore('username')
    this.loginForm.password = getStore('password')
    this.remember = getStore('remember')
  },
  mounted() {
    this.createCode()
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  methods: {
    // 分发Actions
    // this.$store.dispatch('xxx')
    // 这里使用辅助函数分发
    ...mapActions(['saveLogin', 'saveMenus']),
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          const username = this.loginForm.username
          const password = this.loginForm.password
          // 加载公钥，公钥加密密码，简单的可以使用md5或SSH加密，还可以放到后台加密
          // let jse = new this.$jsEncrypt.JSEncrypt()
          // jse.setPublicKey(rasPublic)
          // let pwd = self.ruleForm.password
          // let password = jse.encrypt(md5(pwd).toLowerCase())
          const code1 = this.check_code
          const code2 = this.loginForm.checkCode
          if (code1.toLowerCase() !== code2.toLowerCase()) {
            this.loading = false
            this.$message.error('验证码输入错误，请重新输入')
            this.createCode()
            return
          }
          login({ username, password })
            .then(res => {
              // 保存基础信息到localstorage
              setStore('userInfo', res.data)
              setStore('token', res.data.token)
              if (this.remember) {
                setStore('password', password)
                setStore('remember', this.remember)
              }
              this.saveLogin(res.data)
              const roleId = res.data.roleId
              // 本地json固定菜单配置
              // console.log('default menu:{}', menuItems)
              // setStore('menu', menuItems)
              // this.saveMenus(menuItems)
              // 根据角色ID获取动态菜单（1.网络请求 2.mock方式 3.本地json）
              sysMenuGetMenuListByRoleId({ roleId })
                .then(res => {
                  const arr = res.data
                  // localStorage中保存用户菜单
                  setStore('menu', arr)
                  this.saveMenus(arr)
                }).catch(err => {
                  console.log(err)
                })
              this.loading = false
              this.$router.push({ path: '/dashboard' })
            }).catch(() => {
              this.loading = false
            })
        } else {
          this.createCode()
          console.log('param error submit!!')
          return false
        }
      })
    },
    createCode() {
      var code = []
      code.length = 4
      const random = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
      for (let i = 0; i < 4; i++) {
        const index = Math.floor(Math.random() * 34)
        code.push(random[index])
      }
      this.check_code = code.join('')
      this.draw_check(this.check_code)
    },
    draw_check(code) {
      const canvas = document.querySelector('.code')
      const ctx = canvas.getContext('2d')
      // canvas元素的width和height属性来重置画布大小。这样做会清除画布上的所有内容
      canvas.height = canvas.height
      ctx.font = '94px Arial'
      ctx.fillStyle = this.randomColor(180, 230)
      ctx.fillText(code, 0, canvas.height)
    },
    randomColor(min, max) {
      const r = this.randomNum(min, max)
      const g = this.randomNum(min, max)
      const b = this.randomNum(min, max)
      return `rgb(${r},${g},${b})`
    },
    randomNum(min, max) {
      return parseInt(Math.random() * (max - min) + min)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss">
  $bg: #2d3a4b;
  $light_gray: #eee;

  /* reset element-ui css */
  .login-container {

    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: #fff !important;
        }
      }
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }

</style>

<style rel="stylesheet/scss" type="text/scss" lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;
  .login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: $bg;
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 380px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }

  .show_canvas {
    float: right;
    height: 47px;
    text-align: center;
  }

  .code {
    height: 47px;
  }

</style>
