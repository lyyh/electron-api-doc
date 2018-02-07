/**
 * @author liuyanhao
 * @date 2018-02-07
 * @Description:
 */
const BaseEntity = require('./baseEntity')
const apiDoc = require('../../models/apiDoc')
class apiDocEntity {
  constructor(){
    this.model = apiDoc
  }

  // create user group
  async create(data){
    return await BaseEntity.create(this.model,data)
  }

  // find api doc by key
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

module.exports = new apiDocEntity
