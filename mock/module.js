/**
 * 本地系统Mock菜单1
 */
const menuItems = [
  {
    'id': 5,
    'name': '首页',
    'url': 'portal/dashboard',
    'icon': 'fa-tachometer',
    'subs': null
  },
  {
    'id': 1011,
    'name': '会员管理',
    'url': 'portal/wallet/index',
    'icon': 'fa-arrows-h',
    'subs': null
  },
  {
    'id': 1012,
    'name': '财务明细',
    'url': 'portal/finance/index',
    'icon': 'fa-window-restore',
    'subs': null
  },
  {
    'id': 1013,
    'name': '基础管理',
    'url': 'portal/base/index',
    'icon': 'fa-window-restore',
    'subs': null
  },
  {
    'id': 10000,
    'name': '游戏对局',
    'url': 'portal/statsGame/index',
    'icon': 'fa-arrows-h',
    'subs': null
  },
  {
    'id': 10010,
    'name': '货币统计',
    'url': 'portal/statsCurrency/index',
    'icon': 'fa-arrows-h',
    'subs': null
  },
  {
    'id': 10020,
    'name': '矿池释放统计',
    'url': 'portal/statsOre/index',
    'icon': 'fa-arrows-h',
    'subs': null
  },
  {
    'id': 10030,
    'name': '沉淀统计',
    'url': 'portal/statsDeposition/index',
    'icon': 'fa-arrows-h',
    'subs': null
  },
  {
    'id': 10040,
    'name': '中奖统计',
    'url': 'portal/statsWin/index',
    'icon': 'fa-arrows-h',
    'subs': null
  },
  {
    'id': 10050,
    'name': '门票统计',
    'url': 'portal/statsTicket/index',
    'icon': 'fa-arrows-h',
    'subs': null
  },

  {
    'id': 10060,
    'name': '矿工费统计',
    'url': 'portal/statsMiner/index',
    'icon': 'fa-arrows-h',
    'subs': null
  },
  {
    'id': 10070,
    'name': '锁仓统计',
    'url': 'portal/statsLock/index',
    'icon': 'fa-arrows-h',
    'subs': null
  },
  {
    'id': 10080,
    'name': '奖励统计',
    'url': 'portal/statsReward/index',
    'icon': 'fa-arrows-h',
    'subs': null
  },
  {
    'id': 10090,
    'name': '交易管理',
    'url': 'portal/trade/index',
    'icon': 'fa-arrows-h',
    'subs': [
      {
        'id': 10091,
        'name': '当前委托',
        'url': 'portal/trade/tradeIndex',
        'icon': 'fa-bar-chart',
        'subs': null
      },
      {
        'id': 10092,
        'name': '交易记录',
        'url': 'portal/trade/index',
        'icon': 'fa-bar-chart',
        'subs': null
      },
      {
        'id': 10093,
        'name': '交易统计',
        'url': 'portal/statsTrade/index',
        'icon': 'fa-bar-chart',
        'subs': null
      }
    ]
  },
  {
    'id': 100010,
    'name': '销毁统计',
    'url': 'portal/destory/index',
    'icon': 'fa-arrows-h',
    'subs': null
  },
  {
    'id': 100020,
    'name': '转账记录',
    'url': 'portal/transfer/index',
    'icon': 'fa-arrows-h',
    'subs': [
      {
        'id': 100021,
        'name': '转账记录',
        'url': 'portal/transfer/index',
        'icon': 'fa-bar-chart',
        'subs': null
      },
      {
        'id': 100022,
        'name': '充值记录',
        'url': 'portal/transfer/recharge',
        'icon': 'fa-bar-chart',
        'subs': null
      },
      {
        'id': 100023,
        'name': '提现管理',
        'url': 'portal/transfer/withdrawal',
        'icon': 'fa-bar-chart',
        'subs': null
      }
    ]
  },
  {
    'id': 100030,
    'name': '版本管理',
    'url': 'portal/version/index',
    'icon': 'fa-arrows-h',
    'subs': null
  },
  // {
  //   'id': 100030,
  //   'name': '游戏时间',
  //   'url': 'portal/gametime/index',
  //   'icon': 'fa-arrows-h',
  //   'subs': null
  // },
  {
    'id': 1015,
    'name': '合约管理',
    'url': 'portal/contract/index',
    'icon': 'fa-arrows-h',
    'subs': [
      {
        'id': 100021,
        'name': '合约管理',
        'url': 'portal/contract/index',
        'icon': 'fa-bar-chart',
        'subs': null
      },
      {
        'id': 100022,
        'name': '合约订单',
        'url': 'portal/contract/history',
        'icon': 'fa-bar-chart',
        'subs': null
      }
    ]
  },
  {
    'id': 1016,
    'name': '增益包管理',
    'url': 'portal/gainpacket/index',
    'icon': 'fa-user',
    'subs': [
      {
        'id': 100021,
        'name': '增益包管理',
        'url': 'portal/gainpacket/index',
        'icon': 'fa-bar-chart',
        'subs': null
      },
      {
        'id': 100022,
        'name': '增益包订单',
        'url': 'portal/gainpacket/history',
        'icon': 'fa-bar-chart',
        'subs': null
      }
    ]
  },
  {
    'id': 1024,
    'name': '消息管理',
    'url': 'portal/news/index',
    'icon': 'fa-location-arrow',
    'subs': null
  },
  {
    'id': 1044,
    'name': '关于我们',
    'url': 'portal/aboutus/index',
    'icon': 'fa-bar-chart',
    'subs': null
  }
  // {
  //   'id': 1044,
  //   'name': '关于我们',
  //   'url': 'portal/aboutus/index',
  //   'icon': 'fa-bar-chart',
  //   'subs': [
  //     {
  //       'id': 10023,
  //       'name': '平板用户统计',
  //       'url': 'portal/padUser/index',
  //       'icon': 'fa-bar-chart',
  //       'subs': null
  //     },
  //     {
  //       'id': 1045,
  //       'name': '解锁统计',
  //       'url': 'portal/stats/unlock',
  //       'icon': 'fa-bar-chart',
  //       'subs': null
  //     },
  //     {
  //       'id': 1046,
  //       'name': '板块停留时长',
  //       'url': 'portal/stats/stay',
  //       'icon': 'fa-bar-chart',
  //       'subs': null
  //     },
  //     {
  //       'id': 1047,
  //       'name': '模块点击次数',
  //       'url': 'portal/stats/click',
  //       'icon': 'fa-bar-chart',
  //       'subs': null
  //     },
  //     {
  //       'id': 1048,
  //       'name': '新增用户统计',
  //       'url': 'portal/stats/open',
  //       'icon': 'fa-bar-chart',
  //       'subs': null
  //     }
  //   ]
  // }
]

module.exports = [
  // user login
  {
    url: '/sysMenu/getMenuListByRoleId-local',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: menuItems
      }
    }
  }
]
