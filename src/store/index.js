import Vue from 'vue'
import Vuex from 'vuex'
import Login from './modules/login'
import app from './modules/app'
import advert from './modules/advert'
import Video from './modules/video'
import Book from './modules/book'
import settings from './modules/settings'
import tagsView from './modules/tagsView'
import user from './modules/user'
import getters from './getters'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
// const modulesFiles = require.context('./modules', true, /\.js$/)
//
// // you do not need `import app from './modules/app'`
// // it will auto require all vuex module from modules file
// const modules = modulesFiles.keys().reduce((modules, modulePath) => {
//   // set './app.js' => 'app'
//   const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
//   const value = modulesFiles(modulePath)
//   modules[moduleName] = value.default
//   return modules
// }, {})

const store = new Vuex.Store({
  // modules,
  // // 引入多模块
  modules: {
    Login,
    app,
    advert,
    Video,
    Book,
    settings,
    tagsView,
    user
  },
  getters
})

export default store
