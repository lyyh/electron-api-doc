/**
 * @author liuyanhao
 * @date 2018-02-07
 * @Description:
 */
const {ERROR_STATUS,SUCCESS_STATUS} = require( "../configs/statusConfig");
const apiDocEntity = require('../dbs/entities/apiDocEntity')

// find a apidoc by key
exports.findByKey = async (ctx,next) => {
  const {key} = ctx.params
  const result = await apiDocEntity.findByKey({key})
  ctx.body = result
  if(!result.success) return next
  await next()
}

// get all apidocs
exports.getApiDocs = async (ctx,next) => {
  const {userGroupKey} = ctx.params
  const result = await apiDocEntity.find({userGroupKey})
  ctx.body = result
  if(!result.success)return next
  await next()
}

// verify permission
exports.verifyPermission = async(ctx,next)=>{
  const {key} = ctx.params
  const {userKey} = ctx.body.request
  const result = await apiDocEntity.findByKey({key})
  if(!result.success){
    ctx.body = {
      ...ERROR_STATUS,
      err: {
        errors: '',
        message: '名称存在'
      }
    }
    return next
  }
}

// create a apidoc
exports.createApiDoc = async (ctx,next) => {
  const requestData = ctx.request.body
  const insertData = {
    // ...requestData,
    name: requestData.name,
    key: requestData.name,
    description: requestData.description,
    owners: [requestData.owner],
    userGroupKey: requestData.userGroupKey
  }
  const result = await apiDocEntity.create(insertData)
  ctx.body = result
  if(!result.success)return next
  await next()
}

// add owner
exports.addOwners = async(ctx,next) => {
  const {key} = ctx.params
  const reqData = ctx.request.body
  const owners = JSON.parse(reqData.owners)
  const processDataFn = doc => {
    return doc.owners = [...doc.owners,...owners]
  }
  const result = await apiDocEntity.updateWithFun({key},processDataFn)
  ctx.body = result
  if(!result.success)return next
  await next()
}

// delete owner
exports.deleteOwners = async(ctx,next)=>{
  const {key} = ctx.params
  const reqData = ctx.request.body
  const owners = JSON.parse(reqData.owners)
  const processDataFn = doc => {
    return doc.owners = doc.owners.filter(ele => !(owners.indexOf(ele.key) >= 0))
  }
  const result = await apiDocEntity.updateWithFun({key},processDataFn)
  ctx.body = result
  if(!result.success)return next
  await next()
}

// add apis
exports.addApis = async(ctx,next) => {
  const {key} = ctx.params
  const apis = ctx.request.body
  const processDataFn = doc => {
    doc.apis = [...doc.apis,...[apis]]
  }
  const result = await apiDocEntity.updateWithFun({key},processDataFn)
  ctx.body = result
  if(!result.success)return next
  await next()
}

// delete apis
exports.deleteApis = async(ctx,next)=>{
  const {key} = ctx.params
  const apis = ctx.request.body
  const processDataFn = doc => {
    return doc.apis = doc.apis.filter(ele => !(apis.indexOf(ele.key) >= 0))
  }
  const result = await apiDocEntity.updateWithFun({key},processDataFn)
  ctx.body = result
  if(!result.success)return next
  await next()
}

// delete api doc
exports.deleteApiDoc = async (ctx,next)=>{
  const {key} = ctx.params
  const result = await apiDocEntity.deleteOne({key})
  ctx.body = result
  if(!result.success)return next
  await next()
}

// delete api docs batchly
exports.deleteApiDocsWithBatch = async (ctx,next) => {
  const keys = Array.isArray(ctx.query['keys[]'])?ctx.query['keys[]']:Array.of(ctx.query['keys[]'])
  let regArray = []
  for(let el of keys){
    regArray.push(el)
  }
  const regStr = regArray.join('|')
  const regInstance = new RegExp(regStr,'g')
  const result = await apiDocEntity.deleteBatch({key:regInstance},keys)
  ctx.body = result
  if(!result.success)return next
  await next()
}

// modify apis
// only supporting to modify single data
exports.modifyApis = async(ctx,next) => {
  const {key} = ctx.params
  const apis = ctx.request.body
  const processDataFn = doc => {
    doc.apis = doc.apis.map(ele => {
      if(ele.key == apis.key)return apis
      return ele
    })
  }
  const result = await apiDocEntity.updateWithFun({key},processDataFn)
  ctx.body = result
  if(!result.success)return next
  await next()
}

// modify owners
// only supporting to modify single data
exports.modifyOwners = async(ctx,next) => {
  const {key} = ctx.params
  const reqData = ctx.request.body
  const owner = JSON.parse(reqData.owner)
  const processDataFn = doc => {
    return doc.owners = doc.owners.map(ele => {
      if(ele.key == owner.key)return owner
      return ele
    })
  }
  const result = await apiDocEntity.updateWithFun({key},processDataFn)
  ctx.body = result
  if(!result.success)return next
  await next()
}
