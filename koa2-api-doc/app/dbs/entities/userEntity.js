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
    async findByKey(condition){
        return await BaseEntity.findByKey(this.model,condition)
    }

    // insert user data
    async create(data){
        return await BaseEntity.create(this.model,data)
    }

    // find user by account
    async findByAccount(condition){
        return await BaseEntity.findUniqueOne(this.model,condition)
    }

    // update a userGroup
    async updateUserGroup(condition,data){
      return await BaseEntity.update(this.model,condition,data)
    }

    // logout account
    async logout(key,accessToken){
        // return await BaseEntity
    }
}

module.exports = new UserEntity
