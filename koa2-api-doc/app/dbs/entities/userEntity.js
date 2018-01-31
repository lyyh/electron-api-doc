/**
 * @author liuyanhao
 * @date 2018-01-31
 * @Description:
 */
const BaseEntity = require('./baseEntity')
const User = require('../../models/User')
class UserEntity {
    constructor(){
        this.model = User
    }

    // find all Users
    async findAllUsers(){
        return await BaseEntity.findAll(this.model)
    }

    // find by key
    async findByKey(key){
        return await BaseEntity.findByKey(this.model,key)
    }

    // insert user data
    async insert(data){
        return await BaseEntity.insert(this.model,data)
    }

}

module.exports = new UserEntity
