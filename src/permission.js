import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { getStore } from '@/utils/local'

const whiteList = ['/login'] // 不重定向白名单
/**
 * 钩子函数：在跳转之前执行
 * 判断用户是否登录——是否跳转登录界面
 */
router.beforeEach((to, from, next) => {
  NProgress.start()
  // 本地token验证
  if (getStore('token')) {
    if (to.path === '/login') {
      next({ path: '/' })
      // if current page is dashboard will not trigger afterEach hook, so manually handle it
      NProgress.done()
    } else {
      // store中user验证，可以进行鉴权操作
      if (store.state.Login.user) {
        next()
      } else {
        console.log('store中token已过期')
        next()
        // 跳转权限错误页面
        // next({
        //   path: '/401',
        //   replace: true,
        //   query: { noGoBack: true }
        // })
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
