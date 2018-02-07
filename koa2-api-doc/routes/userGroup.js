/**
 * @author liuyanhao
 * @date 2018-02-06
 * @Description:
 */
const router = require('koa-router')()
const {create,findByKey,update,addUser,deleteUser} = require('../app/controllers/userGroup')

router.prefix('/userGroups')

// user group
router.post('/',create)
router.get('/:key',findByKey)
router.put('/:key',update)

// users
router.put('/:key/users',addUser)
router.delete('/:key/users',deleteUser)

module.exports = router
