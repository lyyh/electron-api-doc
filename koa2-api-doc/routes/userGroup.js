/**
 * @author liuyanhao
 * @date 2018-02-06
 * @Description:
 */
const router = require('koa-router')()
const {create,findByKey,findByNameWithCreate,update,addUser,deleteUser,addApiDoc,deleteApiDoc} = require('../app/controllers/userGroup')

router.prefix('/userGroups')

// user group
router.post('/',findByNameWithCreate,create)
router.get('/:key',findByKey)
router.put('/:key',update)

// users
router.post('/:key/users',addUser)
router.delete('/:key/users',deleteUser)

// apidocs
router.post('/:key/apidocs',addApiDoc)
router.delete('/:key/apidocs',deleteApiDoc)

module.exports = router
