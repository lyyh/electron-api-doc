/**
 * @author liuyanhao
 * @date 2018-01-31
 * @Description:
 */
/**
 * @author liuyanhao
 * @date 2018-01-31
 * @Description:
 */
const mongoose = require('mongoose')
const UserSchema = require('./schemas/UserSchema')

// Defines UserSchema static method
UserSchema.statics = {
    findByKey(key,cb){
        return this.findOne({key:key})
            .sort('meta.createAt')
    }
}

// Defines a pre hook for the document.
UserSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    }
    else {
        this.meta.updateAt = Date.now()
    }
    next()
})

UserSchema.pre('update',(next) => {
    console.log(123)
    this.meta.updateAt = Date.now()
    next()
})

/**
 * 定义模型User
 * 模型用来实现我们定义的模式，调用mongoose.model来编译Schema得到Model
 * @type {[type]}
 */
// 参数User 数据库中的集合名称, 不存在会创建.
const User = mongoose.model('user', UserSchema)

module.exports = User
