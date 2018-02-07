/**
 * @author liuyanhao
 * @date 2018-02-07
 * @Description:
 */
const router = require('koa-router')()
const {create,findByKey,addOwner,addApis,deleteOwner,deleteApis} = require('../app/controllers/apiDoc')

router.prefix('/apiDocs')

// api docs
router.post('/',create)
router.get('/:key',findByKey)
// router.put('/:key',update)

// owners
router.post('/:key/owners',addOwner)
router.delete('/:key/owners',deleteOwner)
// router.post('/:key/users',addUser)
// router.delete('/:key/users',deleteUser)

// apis
router.post('/:key/apis',addApis)
router.delete('/:key/apis',deleteApis)
// router.delete('/:key/apidocs',deleteApiDoc)

module.exports = router
