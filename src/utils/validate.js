/**
 * 通用校验工具类
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 校验用户名参数
 * @param {string} str
 * @returns {Boolean}
 */
export function isvalidUsername(str) {
  return str.length >= 4 && str.length <= 20
  // const valid_map = ['admin', 'duben']
  // return valid_map.indexOf(str.trim()) >= 0
}
