const router = require('koa-router')()
const {
  addUserGroup,
  deleteUserGroup,
  updateUser,
  findUsers,
  getUserGroups,
  getUserInfoWithUserGroup} = require('../app/controllers/user')

router.prefix('/users')

router.get('/',findUsers)

router.get('/:key',getUserInfoWithUserGroup)

router.get('/:key/userGroups',getUserGroups)

router.put('/:key',updateUser)

router.post('/:key/userGroup',addUserGroup)

router.delete('/:key/userGroup',deleteUserGroup)

module.exports = router
