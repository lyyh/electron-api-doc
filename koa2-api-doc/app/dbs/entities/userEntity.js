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
        return await BaseEntity.find(this.model)
    }

    // find users by condition
    async findUsers(condition){
      return await BaseEntity.find(this.model,condition)
    }

    // find by key
    async findByKey(condition){
        return await BaseEntity.findUniqueOne(this.model,condition)
    }

    // insert user data
    async create(data){
        return await BaseEntity.create(this.model,data)
    }

    // find user by account
    async findByAccount(condition){
        return await BaseEntity.findUniqueOne(this.model,condition)
    }

    // find user group by key
    // async findUserGroupsByKey(condition){
    //     return await BaseEntity.find
    // }

    // update a userGroup
    async updateUserGroup(condition,data){
        return await BaseEntity.updateUniqueOne(this.model,condition,data)
    }

    // update a user
    async update(condition,data){
        return await BaseEntity.updateUniqueOne(this.model,condition,data)
    }
    // logout account
    async logout(key,accessToken){
        // return await BaseEntity
    }
}

module.exports = new UserEntity
