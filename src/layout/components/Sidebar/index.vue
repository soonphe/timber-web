<template>
  <!--<div :class="{'has-logo':showLogo}">-->
  <!--<logo v-if="showLogo" :collapse="isCollapse" />-->
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
        <el-menu-item index="/dashboard" class="submenu-title-noDropdown">
          <!-- 三种图标方案 -->
          <i class="el-icon-info" style="margin-left: -3px" />
<!--          <svg-icon class-name="search-icon" icon-class="search"/>-->
<!--          <i class="sidebar-icon fa fa-tachometer" />-->
          <span slot="title">首页</span>
        </el-menu-item>
      </template>
      <sidebar-item v-for="route in routes" :key="route.id" :item="route" :base-path="route.url" />
    </el-menu>
  </el-scrollbar>
  <!--</div>-->
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

