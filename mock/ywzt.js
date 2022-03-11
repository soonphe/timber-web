
const list = [
  {
    id: '1',
    sort: 1,
    icon: 'group_4',
    title: 'API聚合',
    link: 'http://api.ywzt.com/doc.html'
  },
  {
    id: '2',
    sort: 2,
    icon: 'group_7',
    title: 'jenkins自动构建',
    link: 'http://jenkins.ywzt.com'
  },
  {
    id: '3',
    sort: 3,
    icon: 'group_14',
    title: 'ElasticSearch监控',
    link: 'http://cerebro.ywzt.com'
  },
  {
    id: '4',
    sort: 4,
    icon: 'group_13',
    title: 'skywalking调用链',
    link: 'http://skywalking.ywzt.com'
  },
  {
    id: '11',
    sort: 11,
    icon: 'group_4',
    title: 'grafana数据可视化',
    link: 'http://192.168.161.168:3000/'
  },
  {
    id: '5',
    sort: 5,
    icon: 'group_5',
    title: 'job分布式定时任务',
    link: 'http://job.ywzt.com'
  },
  {
    id: '6',
    sort: 6,
    icon: 'group_8',
    title: 'prometheus监控',
    link: 'http://prometheus.ywzt.com'
  },
  {
    id: '7',
    sort: 7,
    icon: 'group_11',
    title: 'nacos服务发现',
    link: 'http://192.168.161.237:8848/nacos'
  },
  {
    id: '8',
    sort: 8,
    icon: 'group_14',
    title: '工单管理系统',
    link: 'http://10.10.18.36:8008/'
  },
  {
    id: '9',
    sort: 9,
    icon: 'group_6',
    title: '订单权限系统',
    link: 'http://10.10.18.36:8009/'
  },
  {
    id: '10',
    sort: 10,
    icon: 'group_9',
    title: '用户权限系统',
    link: 'http://10.10.18.143:8081/'
  },
  {
    id: '12',
    sort: 12,
    icon: 'group_12',
    title: '监控平台',
    link: 'http://10.10.18.36:8010/'
  }
]

const commonList = [
  {
    id: '1',
    sort: 1,
    icon: 'group_15',
    title: '堡垒机',
    link: 'https://203.156.244.68:64430/index.php/'
  },
  {
    id: '2',
    sort: 2,
    icon: 'group_16',
    title: '云智慧',
    link: 'http://140.207.47.36:30814/#/dola/analysis'
  },
  {
    id: '3',
    sort: 3,
    icon: 'group_17',
    title: 'edas',
    link: 'http://edas.console.sgcc.com/#/home'
  },
  {
    id: '4',
    sort: 4,
    icon: 'group_18',
    title: '云效',
    link: 'http://yunxiao.evs.sgcc.com/aton/index.htm'
  },
  {
    id: '5',
    sort: 5,
    icon: 'group_19',
    title: 'gitlab',
    link: 'http://192.168.102.34/'
  },
  {
    id: '6',
    sort: 6,
    icon: 'group_20',
    title: 'mq控制台',
    link: 'http://mq.console.sgcc.com/'
  },
  {
    id: '7',
    sort: 7,
    icon: 'group_21',
    title: '商户平台',
    link: 'http://10.10.18.176:8080/'
  },
  {
    id: '8',
    sort: 9,
    icon: 'group_21',
    title: '管理平台',
    link: 'http://10.10.18.176:8080/'
  }
]

module.exports = [
  // user login
  {
    url: '/ywzt/list',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: list
      }
    }
  },
  {
    url: '/common-component/list',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: commonList
      }
    }
  }
]
