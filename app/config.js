/**
 * @author liuyanhao
 * @date 2018-02-07
 * @Description:
 */
const devBaseURL = 'http://127.0.0.1:3000'
const prodBaseURL = ''
export default {
  baseURL: process.env.NODE_ENV !== 'production'? devBaseURL:prodBaseURL,
}
