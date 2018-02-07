const router = require('koa-router')()
const {addUserGroup,deleteUserGroup,updateUser} = require('../app/controllers/userController')

router.prefix('/users')

router.put('/:key',updateUser)

router.post('/:key/userGroup',addUserGroup)

router.delete('/:key/userGroup',deleteUserGroup)

module.exports = router
