/**
 * @author liuyanhao
 * @date 2018-01-31
 * @Description:
 */
const {SUCCESS_STATUS,ERROR_STATUS} = require('../../configs/statusConfig')
// find all user
const findAll = (model) => {
    return new Promise((resolve,reject)=>{
      const query = model.find({});
      query.exec(function(err, docs) {
            if(!err) {
                console.log('findAllUsers completion!')
                resolve(docs)
            }else{
                resolve(err.message)
            }
        })
    })
}

// find one by condition of unique
const findUniqueOne = (model,condition) => {
  return new Promise((resolve,reject) => {
    const query = model.findOne(condition)
    query.exec((err,doc) => {
      if(!err){
        console.log('find unique one by',condition.toString())
        resolve({
          ...SUCCESS_STATUS,
          data: doc
        })
      }else{
        resolve({
          ...ERROR_STATUS,
          err:{
            errors: err.message,
            message: ''
          }
        })
      }
    })
  })
}

// find user by key
const findByKey = async(model,key) => {
    const query = model.findByKey(key)
    return new Promise((resolve,reject)=>{
        query.exec((err,doc) => {
            if(!err){
                console.log('find a user')
                resolve(doc)
            }else{
                resolve(err.message)
            }
        })
    })
}

// insert user data
const insert = async (model,data) => {
    return new Promise((resolve,reject) => {
        model.create(data,(err,doc) => {
            if(!err){
                console.log('insert completion:',doc)
                resolve(SUCCESS_STATUS)
            }else{
                console.log('insert exception!')
                resolve({
                  ...ERROR_STATUS,
                  err:{
                    errors: err.message,
                    message: ''
                  }
                })
            }
        })
    })
}

class BaseEntity{
    constructor(){
        this.findAll = findAll
        this.insert = insert
        this.findByKey = findByKey
        this.findUniqueOne = findUniqueOne
    }
}

module.exports = new BaseEntity
