/**
 * 判断是否为dev环境：if (process.env.NODE_ENV === 'development')
 */
// 文件上传路径
export const uploadServer = process.env.VUE_APP_BASE_API + '/common/upload'
// 公共图片访问路径-使用minio映射
export const imageServer = 'http://127.0.0.1/upload'
// 公共图片访问路径-使用nginx映射
// export const imageServer = 'http://localhost:9000/upload'
// 公共图片访问路径-根据环境变量获取
// export const imageServer = process.env.FILE_SERVER
// 公共分页大小
export const pageSize = 10
// 最大分页
export const pageMaxSize = 999
