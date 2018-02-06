const router = require('koa-router')()
const {addUserGroup,deleteUserGroup} = require('../app/controllers/userController')

router.prefix('/users')

// router.get('/', function (ctx, next) {
//   ctx.body = 'this is a users response!'
// })
//
// router.get('/bar', function (ctx, next) {
//   ctx.body = 'this is a users/bar response'
// })

router.post('/:key/userGroup',addUserGroup)

router.delete('/:key/userGroup',deleteUserGroup)


module.exports = router
