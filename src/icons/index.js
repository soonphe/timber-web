import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

// require.context
// 有三个参数：directory：说明需要检索的目录,useSubdirectories：是否检索子目录，regExp: 匹配文件的正则表达式
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
