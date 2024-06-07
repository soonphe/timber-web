import api from './index'

/**
 * 公共——图片上传
 * ①：element中使用路径直接上传
 * ②：quill中使用axios单独上传
 */
export const upload = params => api.postjson('/common/upload', params)
/**
 * mock
 */
export const indexGetList = params => api.get('/menu/list?a=111&b=222', params)
export const indexCommonGetList = params => api.get('/common-component/list', params)
/* ----------------------------------- sys ------------------------------------- */
/**
 * 用户
 */
export const login = params => api.post('/sysUser/login', params)
export const logout = params => api.get('/sysUser/logout', params)
export const sysUserGetList = params => api.postjson('/sysUser/getList', params)
export const sysUserAdd = (data, params) => api.postjson('/sysUser/add', data, params)
export const sysUserDelete = params => api.get('/sysUser/delete', params)
export const sysUserUpdate = data => api.post('/sysUser/update', data)
/**
 * 角色
 */
export const sysRoleGetList = params => api.postjson('/sysRole/getList', params)
export const sysRoleAdd = (data, params) => api.postjson('/sysRole/add', data, params)
export const sysRoleDelete = params => api.get('/sysRole/delete', params)
export const sysRoleUpdate = (data, params) => api.postjson('/sysRole/update', data, params)
/**
 * 模块
 */
export const sysMenuGetMenuListByRoleId = params => api.get('/sysMenu/getMenuListByRoleId', params)
export const sysMenuGetList = params => api.get('/sysMenu/getList', params)
export const sysMenuAdd = params => api.postjson('/sysMenu/add', params)
export const sysMenuDelete = params => api.get('/sysMenu/delete', params)
export const sysMenuUpdate = params => api.post('/sysMenu/update', params)

// /**
//  * 用户
//  */
// export const login = params => api.post('/sys-user/login', params)
// export const logout = params => api.get('/sys-user/logout', params)
// export const sysUserGetList = params => api.postjson('/sys-user/getSysUserList', params)
// export const sysUserAdd = (data, params) => api.postjson('/sys-user/addSysUser', data, params)
// export const sysUserDelete = params => api.get('/sys-user/deleteUser', params)
// export const sysUserUpdate = data => api.post('/sys-user/addSysUser', data)
// export const sysUserUpdatePassword = data => api.post('/sys-user/updatePassword', data)
// /**
//  * 角色
//  */
// export const sysRoleGetList = params => api.postjson('/sys-user/getRoleList', params)
// export const sysRoleAdd = (data, params) => api.postjson('/sys-user/addRole', data, params)
// export const sysRoleDelete = params => api.get('/sys-user/deleteRole', params)
// export const sysRoleUpdate = (data, params) => api.postjson('/sys-user/updateRole', data, params)
// /**
//  * 模块
//  */
// export const sysMenuGetMenuListByRoleId = params => api.get('/sys-user/getMenuListByRoleId', params)
// export const sysMenuGetList = params => api.get('/sys-user/getMenuList', params)
// export const sysMenuAdd = params => api.postjson('/sys-user/addMenu', params)
// export const sysMenuDelete = params => api.get('/sys-user/deleteMenu', params)
// export const sysMenuUpdate = params => api.post('/sys-user/updateMenu', params)
/**
 * 配置
 */
export const configAdd = (data, params) => api.postjson('/config/add', data, params)
export const configGetList = (data, params) => api.postjson('/config/getList', data, params)
export const configDelete = (data, params) => api.postjson('/config/delete', data, params)

/* ----------------------------------- biz ------------------------------------- */
/**
 * 版本管理
 */
export const versionGetList = (data, params) => api.postjson('/version/getList', data, params)
export const versionAdd = params => api.postjson('/version/add', params)
export const versionDelete = params => api.get('/version/delete', params)
/**
 * 广告
 */
export const advertGetList = (data, params) => api.postjson('/advert/getList', data, params)
export const advertAdd = (data, params) => api.postjson('/advert/add', data, params)
export const advertDelete = params => api.get('/advert/delete', params)
export const advertUpdate = (data, params) => api.postjson('/advert/update', data, params)
/**
 * 用户
 */
export const userGetList = (data, params) => api.postjson('/user/getList', data, params)
export const userAdd = params => api.postjson('/user/add', params)
export const userDelete = params => api.get('/user/delete', params)
export const userGetUserCount = params => api.get('/user/getUserCount', params)
/**
 * 电影
 */
export const movieGetList = (data, params) => api.postjson('/movie/getList', data, params)
export const movieAdd = params => api.postjson('/movie/add', params)
export const movieDelete = params => api.get('/movie/delete', params)
export const movieUpdate = params => api.postjson('/movie/update', params)
/**
 * 视频
 */
export const videoGetList = (data, params) => api.postjson('/video/getList', data, params)
export const videoAdd = params => api.postjson('/video/add', params)
export const videoDelete = params => api.get('/video/delete', params)
export const videoUpdate = params => api.postjson('/video/update', params)
export const videoTypeGetList = params => api.get('/video/videoTypeGetList', params)
/**
 * 书吧
 */
export const bookGetList = (data, params) => api.postjson('/book/getList', data, params)
export const bookAdd = params => api.postjson('/book/add', params)
export const bookDelete = params => api.get('/book/delete', params)
export const bookUpdate = params => api.postjson('/book/update', params)
export const bookTypeGetList = params => api.get('/book/bookTypeGetList', params)
/**
 * 音乐
 */
export const musicGetList = (data, params) => api.postjson('/music/getList', data, params)
export const musicAdd = params => api.postjson('/music/add', params)
export const musicDelete = params => api.get('/music/delete', params)
export const musicUpdate = params => api.postjson('/music/update', params)
/**
 * 游戏
 */
export const gameGetList = (data, params) => api.postjson('/game/getList', data, params)
export const gameAdd = params => api.postjson('/game/add', params)
export const gameDelete = params => api.get('/game/delete', params)
export const gameUpdate = params => api.postjson('/game/update', params)
export const gameTypeGetList = params => api.get('/game/gameTypeGetList', params)
/**
 * 餐饮
 */
export const foodGetList = (data, params) => api.postjson('/food/getList', data, params)
export const foodAdd = params => api.postjson('/food/add', params)
export const foodDelete = params => api.get('/food/delete', params)
export const foodUpdate = params => api.postjson('/food/update', params)
export const foodTypeGetList = params => api.get('/food/foodTypeGetList', params)
/**
 * 城市
 */
export const cityGetList = (data, params) => api.postjson('/city/getList', data, params)
export const cityAdd = params => api.postjson('/city/add', params)
export const cityDelete = params => api.get('/city/delete', params)
export const cityUpdate = params => api.postjson('/city/update', params)
/**
 * 城市文章
 */
export const cityArticleGetList = (data, params) => api.postjson('/cityArticle/getList', data, params)
export const cityArticleAdd = params => api.postjson('/cityArticle/add', params)
export const cityArticleDelete = params => api.get('/cityArticle/delete', params)
export const cityArticleUpdate = params => api.postjson('/cityArticle/update', params)
/**
 * 设备管理
 */
export const devicesGetList = (data, params) => api.postjson('/devices/getList', data, params)
export const devicesUpdate = params => api.postjson('/devices/update', params)
export const devicesDelete = params => api.get('/devices/delete', params)
export const devicesGetStateCount = params => api.get('/devices/getStateCount', params)
/**
 * 推送管理
 */
export const pushGetList = params => api.get('/push/getList', params)
export const pushAdd = params => api.postjson('/push/add', params)
/**
 * 文章
 */
export const articleGetList = (data, params) => api.postjson('/article/getList', data, params)
export const articleAdd = params => api.postjson('/article/add', params)
export const articleDelete = params => api.get('/article/delete', params)
export const articleUpdate = params => api.postjson('/article/update', params)
export const articleTypeGetList = params => api.get('/cityArticle/articleTypeGetList', params)
/**
 * 分类管理
 */
export const typeGetList = (data, params) => api.postjson('/type/getList', data, params)
export const typeAdd = params => api.postjson('/type/add', params)
export const typeDelete = params => api.get('/type/delete', params)
export const typeUpdate = params => api.postjson('/type/update', params)

/* ------------------------------------------------------------------------ */
/**
 * 统计管理
 */
export const statsGetClick = params => api.get('/stats/getClick', params)
export const statsGetStay = params => api.get('/stats/getStay', params)
// 状态统计
export const groupGetStateCount = params => api.get('/stats/groupGetStateCount', params)
export const statsGetUserDistributeStats = params => api.get('/stats/statsGetUserDistributeStats', params)
export const statsUserGetList = params => api.get('/stats/statsUserGetList', params)
