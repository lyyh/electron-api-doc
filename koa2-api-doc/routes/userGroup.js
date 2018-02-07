/**
 * @author liuyanhao
 * @date 2018-02-06
 * @Description:
 */
const router = require('koa-router')()
const {create,findByKey,update,addUser} = require('../app/controllers/userGroup')

router.prefix('/userGroups')

// router.get('/', function (ctx, next) {
//   ctx.body = 'this is a users response!'
// })
//
// router.get('/bar', function (ctx, next) {
//   ctx.body = 'this is a users/bar response'
// })

router.post('/',create)
router.get('/:key',findByKey)
router.put('/:key',update)
router.put('/:key/users',addUser)
module.exports = router
