/**
 * @author liuyanhao
 * @date 2018-02-05
 * @Description:
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * 定义一个模式(相当于传统意义的表结构)
 * 每个模式映射mongoDB的一个集合，
 * 它定义（只是定义，不是实现）这个集合里面文档的结构，就是定义这个文档有什么字段，字段类型是什么，字段默认值是什么等。
 * 除了定义结构外，还定义文档的实例方法，静态模型方法，复合索引，中间件等
 * @type {mongoose}
 */
const baseSchema = require('./BaseSchema')

module.exports = new Schema({
  ...baseSchema,
  owners: [{
    key: {
      type: String,
      unique: true,
      required: true
    },
    permission: String
  }],
  apis: [{
    key: {
      type: String,
      required: true,
      unique: true
    },
    method: {
      type: String,
      required: true
    },
    url: {
      type:String,
      required: true
    },
    params: [{
      name: {
        type: String,
        required: true
      },
      isRequire: {
        type: String,
        required: true
      },
      fieldType: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      }
    }]
  }]
})
