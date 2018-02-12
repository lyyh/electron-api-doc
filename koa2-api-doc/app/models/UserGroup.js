/**
 * @author liuyanhao
 * @date 2018-02-07
 * @Description:
 */
const mongoose = require('mongoose')
const UserGroupSchema = require('./schemas/UserGroupSchema')

// Defines a pre hook for the document.
UserGroupSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  }
  else {
    this.meta.updateAt = Date.now()
  }
  next()
})

UserGroupSchema.pre('update',(next) => {
  this.meta.updateAt = Date.now()
  next()
})

/**
 * 定义模型User
 * 模型用来实现我们定义的模式，调用mongoose.model来编译Schema得到Model
 * @type {[type]}
 */
// 参数User 数据库中的集合名称, 不存在会创建.
const User = mongoose.model('userGroup', UserGroupSchema)

module.exports = User
