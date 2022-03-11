// 这里可以理解为store的计算属性，访问：store.getters.getItems
const getters = {
  // 接收state作为其第一个参数
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,
  form: state => state.advert.advert,
  advertType: state => state.advert.advertType
}
export default getters
