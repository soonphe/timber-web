import Mock from 'mockjs'

// 自定义json返回格式
const data = Mock.mock({
  'items': {
    resultCode: '200',
    message: 'Success',
    'data|20': [{
      id: '@id',
      typeid: '@sentence(10, 20)',
      title: '@sentence(2, 6)',
      picurl: '/img/20190802/1564717417.jpg',
      content: '@sentence(10, 20)',
      'sort|1-100': 1,
      createtime: '@datetime',
      updatetime: '@datetime',
      'delflag|1': ['true', 'false'],
      'sponsorid|1-10': 1,
      starttime: '@datetime',
      endtime: '@datetime',
      remark: '@sentence(0, 10)',
      'state|1': ['0', '1'],
      'displaytime|1-100': 1,
      'click|1-100': 1,
      'staytime|1-100': 1,
      carouselcount: '@integer(300, 5000)',
      exposure: '@integer(0, 100)',
      typename: '@sentence(0, 10)'
    }],
    ext: 'Success'
  }
})

// 导出的请求路径
export default [
  {
    url: '/advert/getList',
    type: 'get',
    response: config => {
      const items = data.items
      return items
      // resultCode: 200,
      // data: [items.data]
    }
  }
]
