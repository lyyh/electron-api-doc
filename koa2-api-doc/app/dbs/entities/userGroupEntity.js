/**
 * @author liuyanhao
 * @date 2018-02-07
 * @Description:
 */
const BaseEntity = require('./baseEntity')
const userGroup = require('../../models/userGroup')
class UserGroupEntity {
  constructor(){
    this.model = userGroup
  }

  // create user group
  async create(data){
    return await BaseEntity.create(this.model,data)
  }

  // find user group by key
  async findByKey(condition){
    return await BaseEntity.findUniqueOne(this.model,condition)
  }

  // update user group with something data
  async update(condition,data){
    return await BaseEntity.updateUniqueOne(this.model,condition,data)
  }

  // update users with self-defining function
  async updateWithFun(condition,processDataFn){
    return await BaseEntity.updateUniqueOneWithFun(this.model,condition,processDataFn)
  }
}

module.exports = new UserGroupEntity
