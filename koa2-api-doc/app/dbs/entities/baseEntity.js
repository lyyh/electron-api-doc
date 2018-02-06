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
  const query = model.findOne(condition)
  return new Promise((resolve,reject) => {
    query.exec((err,doc) => {
      if(!err){
        console.log('find unique one by',JSON.stringify(condition))
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
const findByKey = async(model,condition) => {
    const query = model.findOne(condition)
    return new Promise((resolve,reject)=>{
        query.exec((err,doc) => {
            if(!err){
                console.log('find a user by key:',JSON.stringify(doc))
                resolve({
                  ...SUCCESS_STATUS,
                  data: doc
                })
            }else{
                resolve({
                  ...ERROR_STATUS,
                  err: {
                    errors: err.message,
                    message: ''
                  }
                })
            }
        })
    })
}

// insert user data
const create = async (model,data) => {
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

// update data
const updateUniqueOne = async (model,condition,data,options = {new:true}) => {
  const query = model.findOneAndUpdate(condition,data,options)
  return new Promise((resolve,reject) => {
    query.exec((err,doc) => {
      if(!err){
        console.log('update data by condition')
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

class BaseEntity{
    constructor(){
        this.findAll = findAll
        this.create = create
        this.findByKey = findByKey
        this.findUniqueOne = findUniqueOne
        this.updateUniqueOne = updateUniqueOne
    }
}

module.exports = new BaseEntity
