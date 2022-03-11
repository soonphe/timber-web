# timber-web

## 项目介绍（Project Introduction）
项目取名timber——`木材`，来源人类从刀耕火种逐渐进化的源头。

项目所有技术文档都在 [0-1Learning](http://github.com/soonphe/0-1Learning) 中有完整介绍。


### 设备支持（Equipment support）
设备支持：web管理后台、android（平板和phone）、ios
- web管理后台：[timber-vue](http://github.com/soonphe/timber-web)
- android端：[timber-android](http://github.com/soonphe/timber-android)
- ios端：[timber-ios](http://github.com/soonphe/timber-ios)


### 业务支持（Business Support）
- 广告业务：支持广告智能投放，自动上架与下架，广告覆盖有效统计
- 电影业务：对接xx电影网
- 视频业务：小视频点播
- 音乐：音乐播放、下载
- 小说：文件上传和爬虫抓取
- 新闻业务：定期抓取
- 游戏业务：html游戏
- 城市特色业务：城市介绍，衣食住行、景点、广告引流


### 业务功能模块（functional module）
```
├── 系统模块
    ├── 用户统一管理后台系统UUM，用户、登录
    └── 权限系统模块
├── 业务模块
    ├── 广告模块
    ├── 电影模块
    ├── 视频模块
    ├── 小说模块
    ├── 新闻模块
    ├── 游戏模块
    └── 视频模块
├── 搜索模块
├── 三方功能模块
└── 数据模块
    ├── 埋点模块
    └── 统计模块
```


### 高可用分布式系统架构（Highly available distributed system architecture）
![高可用分布式系统架构](document/static/architecture/highly_available_architecture.png "高可用分布式系统架构")


### 系统技术栈（System Technology Stack）
![系统技术栈](document/static/architecture/system_technology_stack.png "系统技术栈")


### 项目结构（Project structure）
```
timber-web
├── build: 编译支持
├── mock: mock API模块
    ├── ...js：mock请求API
    ├── index.js：mock API聚合
├── public:
    ├── api：真实请求API模块 *
    ├── assets：静态文件模块
    ├── components：自定义控件组件 *（大部分组件都在这里编写、复用，如：面包屑，github，左部菜单控件，全屏控件，错误日志。。。）
    ├── directive：自定义指令模块 *
    ├── filters：过滤器模块
    ├── icons：图标模块(主要支持svg)
    ├── lang：国际化模块
    ├── layout：界面基础布局模块
    ├── router：路由模块*
    ├── store：vuex模块*
    ├── styles：css模块
    ├── utils：自定义工具模块（一些小工具，就是怎么方便怎么来）
    ├── vendor：excel操作模块
    └── views：业务界面模块 *（主要界面都在这里编写）
├── src: 基础环境模块
├── .env...: 环境变量
├── packgae.json: npm依赖配置
├── vue.config.js: 项目配置
└── README.md -- 说明

备注：标 * 的为重点模块
```

### 技术关键词说明
1.Base framework
+ 技术选型：vue
+ 路由管理：router
+ 网络请求：axios
+ 状态管理：vuex
+ 国际化：vue-i18n
+ 代码检查：eslint
+ UI框架：element-ui
+ cookie管理：js-cookie
+ 加密工具：js-md5
+ CSS：
  + less：客户端渲染
  + sass：服务端渲染，缺点就是容易npm安装失败，头疼
+ 图表：
  + echarts：
+ 富文本：
  + vue-editor2：这个对图片上传的支持度不错，界面也比较友好
  + vue-quill-editor：老牌，稳定
+ 图标：
  + font-awesome(推荐，主要是方便，直接引库就行，缺点数量有限，不过也够用了)，
  + svg（麻烦一点，需要自己找图作图，好处是矢量图标不失真）
+ 换肤：chalk

## 公众号

`0-1Learning`项目全套学习教程连载中，关注公众号「**罗晓胜**」第一时间获取。

加微信群交流，公众号后台回复「**加群**」即可。

![公众号图片](static/common/luoxiaosheng_wechat_common.jpg)




