/**
 * @author liuyanhao
 * @date 2018-02-07
 * @Description:
 */
const router = require('koa-router')()
const {createApiDoc,findByKey,getApiDocs,addOwners,addApis,deleteOwners,deleteApis,modifyApis,modifyOwners} = require('../app/controllers/apiDoc')

router.prefix('/apiDocs')

// api docs
// router.get('/',getAllApiDocs)
router.post('/',createApiDoc)
router.get('/:key',findByKey)
router.get('/userGroup/:userGroupKey',getApiDocs)
// router.put('/:key',update)

// owners
router.post('/:key/owners',addOwners)
router.delete('/:key/owners',deleteOwners)
router.put('/:key/owners',modifyOwners)

// apis
router.post('/:key/apis',addApis)
router.delete('/:key/apis',deleteApis)
router.put('/:key/apis',modifyApis)

module.exports = router
