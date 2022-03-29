import Mock from 'mockjs'
import { param2Obj } from '../src/utils'

import user from './user'
import advert from './advert'
import ywzt from './ywzt'
import stats from './stats'

const mocks = [
  ...user,
  ...advert,
  ...ywzt,
  ...stats
]

// 用于前端模拟
// 请谨慎使用，它会重新定义 XMLHttpRequest，
// 这将导致您的许多第三方库失效（如进度事件）。
export function mockXHR() {
  // mock patch
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function() {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }

  /**
   * 请求体封装
   */
  function XHR2ExpressReqWrap(respond) {
    return function(options) {
      let result = null
      if (respond instanceof Function) {
        const { body, type, url } = options
        // https://expressjs.com/en/4x/api.html#req
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }

  /**
   * 遍历匹配请求，根据匹配到的数据模板生成数据
   */
  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
  }
}

// for mock server
const responseFake = (url, type, respond) => {
  return {
    url: new RegExp(`/mock${url}`),
    type: type || 'get',
    response(req, res) {
      res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond))
    }
  }
}

export default mocks.map(route => {
  return responseFake(route.url, route.type, route.response)
})
