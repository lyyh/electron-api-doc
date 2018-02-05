/**
 * @author liuyanhao
 * @date 2018-01-31
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
module.exports = new Schema({
    key: {
        unique: true,
        type: String,
        require: true
    },
    name: {
        unique: true,
        type: String,
        require: true
    },
    nickname: {
        type: String,
        default: ''
    },
    auth: {
        account: {
            unique: true,
            type: String,
            require: true
        },
        password: {
            type: String,
            require: true
        },
        accessToken: {
            type: String,
            default: ''
        }
    },
    info: {
        type: String,
        default: ''
    },
    userGroup: {
        type: [String],
        default: ''
    },
    age: {
        type: String,
        default: ''
    },
    avatar: {
        type: String,
        default: ''
    },
    meta: {
        createAt: {
            type: Date,
            dafault: Date.now()
        },
        updateAt: {
            type: Date,
            dafault: Date.now()
        }
    }
    // phoneNumber: {
    //     unique: true,
    //     type: String
    // },
    // areaCode: String,
    // verifyCode: String,
    // verified: {
    //     type: Boolean,
    //     default: false
    // },
    // accessToken: String,
    // nickname: String,
    // gender: String,
    // breed: String,
    // age: String,
    // avatar: String,
    // meta: {
    //     createAt: {
    //         type: Date,
    //         dafault: Date.now()
    //     },
    //     updateAt: {
    //         type: Date,
    //         dafault: Date.now()
    //     }
    // }
})
