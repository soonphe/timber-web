import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/compon ents'

export const constantRoutes = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },
  { path: '/401', component: () => import('@/views/errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    meta: { title: '控制台', icon: 'el-icon-type' },
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index')
      }
    ]
  },
  {
    path: '/sysMenu',
    component: Layout,
    redirect: '/sysMenu/index',
    name: 'sysMenu',
    meta: { title: '系统管理', icon: 'el-icon-goods' },
    children: [
      {
        path: 'index',
        name: 'sysMenuIndex',
        component: () => import('@/views/sys/menu/index'),
        meta: { title: '模块管理', icon: 'el-icon-picture-outline' }
      },
      {
        path: 'add',
        name: 'sysMenuAdd',
        component: () => import('@/views/sys/menu/add'),
        meta: { title: '添加模块', icon: 'el-icon-picture-outline' }
      }
    ]
  },
  {
    path: '/sysRole',
    component: Layout,
    redirect: '/sysRole/index',
    name: 'sysRole',
    meta: { title: '系统管理', icon: 'el-icon-goods' },
    children: [
      {
        path: 'index',
        name: 'sysRoleIndex',
        component: () => import('@/views/sys/role/index'),
        meta: { title: '角色管理', icon: 'el-icon-picture-outline' }
      },
      {
        path: 'add',
        name: 'sysRoleAdd',
        component: () => import('@/views/sys/role/add'),
        meta: { title: '添加角色', icon: 'el-icon-picture-outline' }
      }
    ]
  },
  {
    path: '/sysUser',
    component: Layout,
    redirect: '/sysUser/index',
    name: 'sysUser',
    meta: { title: '系统管理', icon: 'el-icon-goods' },
    children: [
      {
        path: 'index',
        name: 'sysUserIndex',
        component: () => import('@/views/sys/user/index'),
        meta: { title: '用户管理', icon: 'el-icon-picture-outline' }
      },
      {
        path: 'add',
        name: 'sysUserAdd',
        component: () => import('@/views/sys/user/add'),
        meta: { title: '添加系统用户', icon: 'el-icon-picture-outline' }
      }
    ]
  },
  {
    path: '/version',
    component: Layout,
    redirect: '/version/index',
    name: 'version',
    meta: { title: '版本管理', icon: 'el-icon-goods' },
    children: [
      {
        path: 'index',
        name: 'versionIndex',
        component: () => import('@/views/version/index'),
        meta: { title: '版本', icon: 'el-icon-picture-outline' }
      },
      {
        path: 'add',
        name: 'versionAdd',
        component: () => import('@/views/version/add'),
        meta: { title: '添加版本', icon: 'el-icon-picture-outline' }
      }
    ]
  },
  {
    path: '/advert',
    component: Layout,
    redirect: '/advert/index',
    name: 'advert',
    meta: { title: '广告管理', icon: 'el-icon-goods' },
    children: [
      {
        path: 'index',
        name: 'advertIndex',
        component: () => import('@/views/advert/index'),
        meta: { title: '广告', icon: 'el-icon-picture-outline' }
      },
      {
        path: 'add',
        name: 'advertAdd',
        component: () => import('@/views/advert/add'),
        meta: { title: '添加广告', icon: 'el-icon-picture-outline' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    name: 'user',
    meta: { title: '用户管理', icon: 'el-icon-type' },
    children: [{
      path: 'index',
      component: () => import('@/views/user/index')
    }]
  },
  {
    path: '/movie',
    component: Layout,
    redirect: '/movie/index',
    name: 'movie',
    meta: { title: '电影管理', icon: 'el-icon-goods' },
    children: [
      {
        path: 'index',
        name: 'movieIndex',
        component: () => import('@/views/movie/index'),
        meta: { title: '电影', icon: 'el-icon-picture-outline' }
      }
    ]
  },
  {
    path: '/video',
    component: Layout,
    redirect: '/video/index',
    name: 'video',
    meta: { title: '视频管理', icon: 'el-icon-goods' },
    children: [
      {
        path: 'index',
        name: 'videoIndex',
        component: () => import('@/views/video/index'),
        meta: { title: '视频', icon: 'el-icon-picture-outline' }
      },
      {
        path: 'add',
        name: 'videoAdd',
        component: () => import('@/views/video/add'),
        meta: { title: '添加视频', icon: 'el-icon-picture-outline' }
      }
    ]
  },
  {
    path: '/book',
    component: Layout,
    redirect: '/book/index',
    name: 'book',
    meta: { title: '书吧管理', icon: 'el-icon-goods' },
    children: [
      {
        path: 'index',
        name: 'bookIndex',
        component: () => import('@/views/book/index'),
        meta: { title: '书吧', icon: 'el-icon-picture-outline' }
      },
      {
        path: 'add',
        name: 'bookAdd',
        component: () => import('@/views/book/add'),
        meta: { title: '添加书籍', icon: 'el-icon-picture-outline' }
      }
    ]
  },
  {
    path: '/music',
    component: Layout,
    redirect: '/music/index',
    name: 'music',
    meta: { title: '音乐管理', icon: 'el-icon-goods' },
    children: [
      {
        path: 'index',
        name: 'musicIndex',
        component: () => import('@/views/music/index'),
        meta: { title: '音乐', icon: 'el-icon-picture-outline' }
      },
      {
        path: 'add',
        name: 'musicAdd',
        component: () => import('@/views/music/add'),
        meta: { title: '添加音乐', icon: 'el-icon-picture-outline' }
      }
    ]
  },
  {
    path: '/game',
    component: Layout,
    redirect: '/game/index',
    name: 'game',
    meta: { title: '游戏管理', icon: 'el-icon-goods' },
    children: [
      {
        path: 'index',
        name: 'gameIndex',
        component: () => import('@/views/game/index'),
        meta: { title: '游戏', icon: 'el-icon-picture-outline' }
      },
      {
        path: 'add',
        name: 'gameAdd',
        component: () => import('@/views/game/add'),
        meta: { title: '添加游戏', icon: 'el-icon-picture-outline' }
      }
    ]
  },
  {
    path: '/food',
    component: Layout,
    redirect: '/food/index',
    name: 'food',
    meta: { title: '餐饮管理', icon: 'el-icon-goods' },
    children: [
      {
        path: 'index',
        name: 'foodIndex',
        component: () => import('@/views/food/index'),
        meta: { title: '餐饮', icon: 'el-icon-picture-outline' }
      },
      {
        path: 'add',
        name: 'foodAdd',
        component: () => import('@/views/food/add'),
        meta: { title: '添加餐饮', icon: 'el-icon-picture-outline' }
      }
    ]
  },
  {
    path: '/city',
    component: Layout,
    redirect: '/city/index',
    name: 'city',
    meta: { title: '城市管理', icon: 'el-icon-type' },
    children: [
      {
        path: 'index',
        name: 'cityIndex',
        component: () => import('@/views/city/index')
      },
      {
        path: 'add',
        name: 'cityAdd',
        component: () => import('@/views/city/add'),
        meta: { title: '添加城市', icon: 'el-icon-picture-outline' }
      }
    ]
  },
  {
    path: '/article',
    component: Layout,
    redirect: '/article/index',
    name: 'article',
    meta: { title: '文章管理', icon: 'el-icon-goods' },
    children: [
      {
        path: 'index',
        name: 'articleIndex',
        component: () => import('@/views/article/index'),
        meta: { title: '文章', icon: 'el-icon-picture-outline' }
      },
      {
        path: 'add',
        name: 'articleAdd',
        component: () => import('@/views/article/add'),
        meta: { title: '添加文章', icon: 'el-icon-picture-outline' }
      }
    ]
  },
  {
    path: '/type',
    component: Layout,
    redirect: '/type/index',
    name: 'type',
    meta: { title: '分类管理', icon: 'el-icon-goods' },
    children: [
      {
        path: 'index',
        name: 'typeIndex',
        component: () => import('@/views/type/index'),
        meta: { title: '分类', icon: 'el-icon-picture-outline' }
      },
      {
        path: 'add',
        name: 'typeAdd',
        component: () => import('@/views/type/add'),
        meta: { title: '添加分类', icon: 'el-icon-picture-outline' }
      }
    ]
  },
  {
    path: '/config',
    component: Layout,
    redirect: '/config/index',
    name: 'config',
    meta: { title: '配置管理', icon: 'el-icon-goods' },
    children: [
      {
        path: 'index',
        name: 'configIndex',
        component: () => import('@/views/config/index'),
        meta: { title: '配置', icon: 'el-icon-picture-outline' }
      },
      {
        path: 'add',
        name: 'configAdd',
        component: () => import('@/views/config/add'),
        meta: { title: '添加配置', icon: 'el-icon-picture-outline' }
      }
    ]
  },
  {
    path: '/stats',
    component: Layout,
    redirect: '/stats/index',
    name: 'stats',
    meta: { title: '统计管理', icon: 'el-icon-goods' },
    children: [
      {
        path: 'index',
        name: 'click',
        component: () => import('@/views/stats/click'),
        meta: { title: '模块点击次数', icon: 'el-icon-picture-outline' }
      },
      {
        path: 'stay',
        name: 'stay',
        component: () => import('@/views/stats/stay'),
        meta: { title: '板块停留时长', icon: 'el-icon-picture-outline' }
      }
    ]
  },
  {
    path: '/push',
    component: Layout,
    redirect: '/push/index',
    name: 'push',
    meta: { title: '推送管理', icon: 'el-icon-type' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/push/index')
      },
      {
        path: 'add',
        name: 'pushAdd',
        component: () => import('@/views/push/add'),
        meta: { title: '添加推送', icon: 'el-icon-picture-outline' }
      }]
  },
  { path: '*', redirect: '/404', hidden: true }

]

const createRouter = () => new Router({
  // 定义基础路径，例如，如果整个单页应用服务在 /app/ 下，然后 config 就应该设为 "/app/"
  base: '/',
  // 后端支持可开，可选值："hash"(浏览器环境) | "history" | "abstract"(Node.js 环境)
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export default router
