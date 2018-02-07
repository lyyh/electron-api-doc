/**
 * @author liuyanhao
 * @date 2018-02-07
 * @Description:
 */
const mongoose = require('mongoose')
const ApiDocSchema = require('./schemas/ApiDocSchema')

// Defines a pre hook for the document.
ApiDocSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }
  next()
})

/**
 * 定义模型ApiDoc
 * 模型用来实现我们定义的模式，调用mongoose.model来编译Schema得到Model
 * @type {[type]}
 */
// 参数ApiDoc数据库中的集合名称, 不存在会创建.
const ApiDoc = mongoose.model('apiDoc', ApiDocSchema)

module.exports = ApiDoc
