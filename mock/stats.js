import Mock from 'mockjs'

/**
 * 纯数据返回
 */
const click = Mock.mock({
  'items|10-50': [{
    id: '@id',
    createTime: '@datetime',
    movies: '@sentence(10, 20)',
    'game|1-100': 1,
    'book|+1': 1,
    'city|+1': 1,
    'article|100-1000.1-4': 1,
    food: '@integer(300, 5000)',
    vogue: '@integer(0, 100)',
    'status|1': [0, 1],
    'delFlag|1': ['true', 'false']
  }]
})

/**
 * 数据+结构体
 */
const stay = Mock.mock({
  'items': {
    code: '200',
    message: 'Success',
    'data|20': [{
      id: '@id',
      createTime: '@datetime',
      movies: '@sentence(10, 20)',
      'game|1-100': 1,
      'book|+1': 1,
      'city|+1': 1,
      'article|100-1000.1-4': 1,
      food: '@integer(300, 5000)',
      vogue: '@integer(0, 100)',
      'status|1': [0, 1],
      'delFlag|1': ['true', 'false']
    }],
    ext: '20'
  }
})

// 导出的请求路径
export default [
  {
    url: '/stats/getClick',
    type: 'get',
    response: config => {
      // return data.items
      const items = click.items
      return {
        code: '200',
        message: 'Success',
        data: items,
        ext: items.length
      }
    }
  },
  {
    url: '/stats/getStay',
    type: 'get',
    response: config => {
      return stay.items
    }
  }
]
