<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <template v-if="!item.subs">
      <!--      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">-->
<!--      如果需要嵌套路由，可以使用basePath.substring(6)拼接当前组件路径item.url -->
<!--      <el-menu-item :index="basePath.substring(6) + '/index'" :class="{'submenu-title-noDropdown':!isNest}">-->
      <el-menu-item :index="item.url.substring(6) + '/index'" :class="{'submenu-title-noDropdown':!isNest}">
        <i class="sidebar-icon fa" :class="item.icon" />
        <span slot="title">{{ item.name }}</span>
      </el-menu-item>
      <!--      </app-link>-->
    </template>

    <template v-else>
      <el-submenu ref="subMenu" :index="item.url" popper-append-to-body>
        <template slot="title">
          <i class="sidebar-icon fa" :class="item.icon" />
          <span slot="title">{{ item.name }}</span>
        </template>
        <!-- 处理多级子菜单,使用:item="child"递归组件 -->
        <sidebar-item
          v-for="child in item.subs"
          :key="child.id"
          :is-nest="true"
          :item="child"
          :base-path="resolvePath(child.url)"
          class="nest-menu"
        />
<!--处理二级子菜单-->
<!--        <template v-for="child in item.subs">-->
<!--          <el-menu-item :key="child.id" :index="child.url.substring(6) + '/index'">-->
<!--            <i class="sidebar-icon fa" :class="child.icon" />-->
<!--            <span slot="title">{{ child.name }}</span>-->
<!--          </el-menu-item>-->
<!--        </template>-->
      </el-submenu>
    </template>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
// import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  components: { AppLink },
  mixins: [FixiOSBug],
  props: {
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    this.onlyOneChild = null
    return {}
  },
  methods: {
    // 截取路径中的图标
    icons(url) {
      const icon = this.$route.filter(item => {
        if (item.path === url.substring(url.indexOf('/') + 1, url.lastIndexOf('/'))) {
          return item.meta.icon
        }
      }
      )
    },
    hasOneShowingChild(children) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // temp set(will be used if only has one showing child )
          this.onlyOneChild = item
          return true
        }
      })
      if (showingChildren.length === 1) {
        return true
      }
      return false
    },
    resolvePath(...paths) {
      // 判断是否为外部链接
      if (isExternal(paths)) {
        return paths
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      // 嵌套base-path和当前路径
      // console.log('sout:' + this.basePath + '++++' + paths)
      // sout:portal/type++++portal/testMenu
      // sout:/portal/type/portal/testMenu++++portal/advert
      // sout:/portal/type/portal/testMenu/portal/advert++++portal/advert
      return path.resolve(this.basePath, ...paths)
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar-icon {
  margin-right: 5px;
  width: 18px;
  text-align: center;
  font-size: 18px;
  vertical-align: middle;
}

</style>
