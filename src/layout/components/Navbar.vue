<template>
  <el-menu class="navbar">
    <hamburger id="hamburger-container" class="hamburger-container" :is-active="sidebar.opened" @toggleClick="toggleSideBar" />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">

      <template v-if="device!=='mobile'">

        <!--        <search id="header-search" class="right-menu-item"/>-->
        <!--        <error-log class="errLog-container right-menu-item" />-->
        <!--        <screenfull id="screenfull" class="right-menu-item hover-effect" />-->
        <el-tooltip content="Global Size" effect="dark" placement="bottom">
          <!--          <size-select id="size-select" class="right-menu-item hover-effect" />-->
        </el-tooltip>
      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <span class="user-name">{{name}}</span>
<!--          <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">-->
<!--          <img class="user-avatar" src="@/assets/icon/title_icon.jpg?imageView2/1/w/80/h/80">-->
          <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">
          <i class="el-icon-caret-bottom"></i>
        </div>

        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link class="inlineBlock" to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;" @click="loginOut">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script>
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
// import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
// import ErrorLog from '@/components/ErrorLog'
// import Screenfull from '@/components/Screenfull'
// import SizeSelect from '@/components/SizeSelect'
// import Search from '@/components/HeaderSearch'

import { getStore, removeStore } from '@/utils/local' // 验权
import { imageServer } from '@/utils/global'

export default {
  components: {
    Breadcrumb,
    Hamburger
    // ErrorLog,
    // Screenfull,
    // SizeSelect
    // Search
  },
  computed: {
    // ...mapGetters([
    //   'sidebar',
    //   'avatar',
    //   'device'
    // ])
    ...mapState({
      _sidebar: state => state.app.sidebar
    }),
    name() {
      return getStore('userInfo') ? JSON.parse(getStore('userInfo')).name : '暂无'
    },
    avatar() {
      // return 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
      // return '@/assets/icon/title_icon.jpg'
      return getStore('userInfo') ? imageServer + JSON.parse(getStore('userInfo')).avatar : 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
    },
    sidebar() {
      return this._sidebar
    },
    device() {
      return this._device
    }
  },
  methods: {
    ...mapActions(['logout']),
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    loginOut() {
      // store中清除user与menu信息
      this.logout()
      // 清除localStore中保存的token
      removeStore('token')
      removeStore('menu')
      removeStore('userInfo')
      this.$router.push({ path: '/login' })
      // this.$store.dispatch('LogOut').then(() => {
      //   location.reload() // 为了重新实例化vue-router对象 避免bug
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
  .navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);

    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background .3s;
      -webkit-tap-highlight-color:transparent;

      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }

    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background .3s;

          &:hover {
            background: rgba(0, 0, 0, .025)
          }
        }
      }

      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          margin-top: 5px;
          position: relative;

          .user-name {
            color: #97a8be;
            cursor: text;
            font-weight: 400 !important;
            font-size: 16px;
            line-height: 50px;
          }

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
