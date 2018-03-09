/**
 * @author liuyanhao
 * @date 2018-01-31
 * @Description:
 */
const SINGUP_SUCCESS_TEXT = '注册成功!'
const SINGIN_SUCCESS_TEXT = '登录成功!'
const SINGUP_ERROR_TEXT = '注册失败!用户已存在'
const SINGIN_ERROR_TEXT = '登录失败！密码或者账号错误'


module.exports = {
  SUCCESS_STATUS: {
    success: true,
    statusCode: 1
  },
  ERROR_STATUS: {
    success: false,
    statusCode: 2
  },
  ERROR_EXISTED_STATUS:{
    success: false,
    statusCode: 3
  }
}
