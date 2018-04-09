/**
 * @author liuyanhao
 * @date 2018-02-06
 * @Description:
 */
const router = require('koa-router')()
const {create,findByKey,getUsers,verifyName,update,addUser,deleteUser,addApiDoc,deleteApiDoc} = require('../app/controllers/userGroup')
const {createUserGroup,preCreateUserGroup,updateUserGroupInUser} = require('../app/controllers/user')
router.prefix('/userGroups')

// user group
router.post('/',verifyName,getUsers,create,preCreateUserGroup,createUserGroup)
router.get('/:key',findByKey)
router.put('/:key',update)

// users
router.post('/:key/users',addUser,updateUserGroupInUser)
router.delete('/:key/users',deleteUser)

// apidocs
router.post('/:key/apidocs',addApiDoc)
router.delete('/:key/apidocs',deleteApiDoc)

module.exports = router
