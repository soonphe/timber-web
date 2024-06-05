import axios from 'axios'
import qs from 'qs'
import store from '../store'
import { Message, MessageBox } from 'element-ui'
import { setStore, getStore, rasPublic } from '@/utils/local'

const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // timeout: 5000,
  timeout: 120000,
  // 保证请求携带cookie信息
  withCredentials: true
  /* 配置请求头，axios默认为json */
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  // }
})

// request interceptor
http.interceptors.request.use(
  req => {
    // 判断是否存在token
    if (store.state.Login.user.token) {
      // config.headers.Authorization = store.state.Login.token
      req.headers.common['X-Authorization'] = `Bearer ${store.state.Login.user.token}`
      req.headers.common['X-Requester'] = 'pc'
    }
    req.headers.common['Authorization'] = getStore('token')
    return req
  },
  error => {
    console.log(error) // for debug
    Message({
      showClose: true,
      message: 'token invalid',
      type: 'error.data.error.message'
    })
    return Promise.reject(error)
  }
)

// response interceptor
http.interceptors.response.use(
  res => {
    /* 如果返回码不等于200，则弹出对应的错误信息 */
    if (!res.resultCode === '200') {
      Message({
        //  饿了么的消息弹窗组件,类似toast
        showClose: true,
        message: res.message ? res.message : '系统异常',
        type: 'error'
      })
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.resultCode === 50008 || res.resultCode === 50012 || res.resultCode === 50014) {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject(res.message)
    } else {
      /* res结构：{data: {…}, status: 200, statusText: 'OK', headers: {…}, config: {…},…}  data结构: {code: 20000, data: Array(12)} */
      return res.data // 这里也可以直接返回res
    }
  },
  /* 常规请求错误码 */
  err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '请求错误'
          break
        case 404:
          err.message = `请求地址出错 `
          break
        case 500:
          err.message = '服务器内部错误'
          break
        default:
      }
    }
    Message({
      showClose: true,
      message: err.message,
      type: 'error'
    })
    return Promise.reject(err)
  }
)

/**
 * Axios请求常用方法封装
 * @param method
 * @param url
 * @param data
 * @param params
 * @returns {Promise<unknown>}
 */
function apiAxios(method, url, data, params) {
  return new Promise((resolve, reject) => {
    let options
    // 上传form-data数据
    if (method === 'POST') {
      options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        // 上传文件这里使用multipart类型
        // headers: {'content-info': 'multipart/form-data'},
        // 只有一种情况需要qs序列化，那就是type为application/x-www-form-urlencoded
        // qs.stringify格式化之后才是每一个字段对象，id: 1 name: 锁屏广告1
        // 序列化name=hehe&age=10，
        // JSON.stringify序列化结果"{"a":"hehe","age":10}"
        data: qs.stringify(data),
        params: params,
        url
      }
    } else if (method === 'POSTJSON') {
      options = {
        method: 'POST',
        data: data,
        params: params,
        url
      }
      // else quest
    } else {
      options = {
        method: method,
        data: data,
        params: params,
        url
      }
    }
    http(options).then(res => resolve(res),
      err => reject(err)
    )
  })
}

export default {
  get: function(url, params) {
    return apiAxios('GET', url, null, params)
  },
  post: function(url, data, params) {
    return apiAxios('POST', url, data, params)
  },
  postjson: function(url, data, params) {
    return apiAxios('POSTJSON', url, data, params)
  },
  delete: function(url, params) {
    return apiAxios('DELETE', url, null, params)
  }
}
