
const list = [
  {
    id: '1',
    sort: 1,
    icon: 'group_4',
    title: 'API聚合',
    link: 'http://api.menu.com'
  },
  {
    id: '2',
    sort: 2,
    icon: 'group_7',
    title: 'jenkins自动构建',
    link: 'http://jenkins.menu.com'
  },
  {
    id: '3',
    sort: 3,
    icon: 'group_14',
    title: 'ElasticSearch监控',
    link: 'http://cerebro.menu.com'
  },
  {
    id: '4',
    sort: 4,
    icon: 'group_13',
    title: 'skywalking调用链',
    link: 'http://skywalking.menu.com'
  },
  {
    id: '11',
    sort: 11,
    icon: 'group_4',
    title: 'grafana数据可视化',
    link: 'http://grafana.menu.com'
  },
  {
    id: '5',
    sort: 5,
    icon: 'group_5',
    title: 'job分布式定时任务',
    link: 'http://job.menu.com'
  },
  {
    id: '6',
    sort: 6,
    icon: 'group_8',
    title: 'prometheus监控',
    link: 'http://prometheus.menu.com'
  },
  {
    id: '7',
    sort: 7,
    icon: 'group_11',
    title: 'nacos服务发现',
    link: 'http://nacos.menu.com'
  },
  {
    id: '8',
    sort: 8,
    icon: 'group_14',
    title: '管理系统',
    link: 'http://manage.menu.com'
  },
  {
    id: '9',
    sort: 9,
    icon: 'group_6',
    title: '权限系统',
    link: 'http://auth.menu.com'
  },
  {
    id: '10',
    sort: 10,
    icon: 'group_9',
    title: '权限系统',
    link: 'http://auth.menu.com'
  },
  {
    id: '12',
    sort: 12,
    icon: 'group_12',
    title: '监控平台',
    link: 'http://monitor.menu.com'
  }
]

const commonList = [
  {
    id: '1',
    sort: 1,
    icon: 'group_15',
    title: '堡垒机',
    link: 'https://jumpserver.menu.com'
  },
  {
    id: '2',
    sort: 2,
    icon: 'group_16',
    title: '日志',
    link: 'http://log.menu.com'
  },
  {
    id: '3',
    sort: 3,
    icon: 'group_17',
    title: 'gitlab',
    link: 'http://gitlab.menu.com'
  },
  {
    id: '4',
    sort: 4,
    icon: 'group_18',
    title: 'gitlab',
    link: 'http://gitlab.menu.com'
  },
  {
    id: '5',
    sort: 5,
    icon: 'group_19',
    title: 'gitlab',
    link: 'http://gitlab.menu.com'
  },
  {
    id: '6',
    sort: 6,
    icon: 'group_20',
    title: 'gitlab',
    link: 'http://gitlab.menu.com'
  },
  {
    id: '7',
    sort: 7,
    icon: 'group_21',
    title: 'gitlab',
    link: 'http://gitlab.menu.com'
  },
  {
    id: '8',
    sort: 9,
    icon: 'group_21',
    title: 'gitlab',
    link: 'http://gitlab.menu.com'
  }
]

module.exports = [
  // user login
  {
    url: '/menu/list',
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
