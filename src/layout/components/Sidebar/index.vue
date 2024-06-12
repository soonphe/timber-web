<template>
  <div :class="{'has-logo':showLogo}">
  <logo v-if="showLogo" :collapse="isCollapse" />
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :default-active="onRoutes"
      :collapse="isCollapse"
      :show-timeout="200"
      background-color="#304156"
      text-color="#bfcbd9"
      :unique-opened="false"
      active-text-color="#409EFF"
      :collapse-transition="false"
      router
      mode="vertical"
    >
      <template>
<!--        el-menu中 router属性：是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转	-->
        <el-menu-item index="/dashboard" class="submenu-title-noDropdown">
          <!-- 三种图标方案 -->
<!--          方案一：使用el自带图标，class=el-icon-xxx  -->
          <i class="el-icon-info" style="margin-left: -3px" />
          <span slot="title">首页</span>
<!--          方案二：使用svg组件  -->
<!--          <svg-icon class-name="search-icon" icon-class="search"/>-->
<!--          方案三：使用font-awesome图标库，main中引入font-awesome  -->
<!--          <i class="sidebar-icon fa fa-tachometer" />-->
        </el-menu-item>
      </template>
<!--      base-path="" 可以解决路由嵌套问题，父组件传入基础路径，子组件组装，如果已集成完整路径则不需要-->
      <sidebar-item v-for="route in routes" :key="route.id" :item="route" :base-path="route.url" />
    </el-menu>
  </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import { getStore } from '@/utils/local.js'
import { mapState } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem, Logo },
  computed: {
    // ...mapGetters([
    //   'permission_routes',
    //   'sidebar'
    // ]),
    onRoutes() {
      //        return this.$route.path.replace('/', '');
      return this.$route.path
    },
    ...mapState({
      menu_: state => state.Login.menu,
      _sidebar: state => state.app.sidebar
    }),
    routes() {
      if (this.menu_.length > 0) {
        return this.menu_
      } else {
        return JSON.parse(getStore('menu'))
      }
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    isCollapse() {
      return !this._sidebar.opened
    }
  }
}
</script>

