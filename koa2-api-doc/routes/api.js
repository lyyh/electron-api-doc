/**
 * @author liuyanhao
 * @date 2018-03-23
 * @Description:
 */
const router = require('koa-router')()
const {apiRequest,processUrlParam} = require('../app/controllers/api')
// router.prefix('/api/')
router.post('/',processUrlParam,apiRequest)
