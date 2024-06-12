import Vue from 'vue'

import Cookies from 'js-cookie'

/* 提供跨浏览器一致性，相较于reset */
import 'normalize.css/normalize.css'

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import 'font-awesome/css/font-awesome.min.css' // font-awesome

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control

import * as filters from './filters' // global filters

// js加密
// import JsEncrypt from 'jsencrypt/bin/jsencrypt'

// Vue.prototype.$jsEncrypt = JsEncrypt // 挂载JsEncrypt

// 阻止启动生产警告
Vue.config.productionTip = false

import { mockXHR } from '../mock'
// 开发环境/生产环境 mock——这里的mock也会发送http请求，但是请求被拦截
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
  mockXHR()
}

/**
 * 配置ElementUI界面与富文本编辑器
 */
Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// Vue.use(VueQuillEditor, {
//   'toolbar': [{
//     'font': [true, '宋体']
//   }]
// })

new Vue({
  el: '#app', /* 挂载点 */
  store,
  router,
  render: h => h(App) /* 2.0必须通过render方法来渲染 */
  // components: {App}, /* 引入组件 */
  // template: '<App/>' /* 模板，即要显示的html */
})
