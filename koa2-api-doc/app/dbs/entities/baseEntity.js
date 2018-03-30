/**
 * @author liuyanhao
 * @date 2018-01-31
 * @Description:
 */
const {SUCCESS_STATUS,ERROR_STATUS,ERROR_EXISTED_STATUS} = require('../../configs/statusConfig')
// find all user
const find = (model,condition = {}) => {
    return new Promise((resolve,reject)=>{
      const query = model.find(condition);
      query.exec(function(err, doc) {
          if(err){
            resolve({
              ...ERROR_STATUS,
              err:{
                errors: err.message,
                message: ''
              }
            })
          }else if(!doc){
            resolve({
              ...ERROR_STATUS,
              err:{
                errors: '',
                message: `not found data by ${JSON.stringify(condition)}`
              }
            })
          }else {
            resolve({
              ...SUCCESS_STATUS,
              data: doc
            })
          }
        })
    })
}

// find one by condition of unique
const findUniqueOne = (model,condition) => {
  const query = model.findOne(condition)
  return new Promise((resolve,reject) => {
    query.exec((err,doc) => {
      if(err){
        resolve({
          ...ERROR_STATUS,
          err:{
            errors: err.message,
            message: ''
          }
        })
      }else if(!doc){
        resolve({
          ...ERROR_STATUS,
          err:{
            errors: '',
            message: `not found data by ${JSON.stringify(condition)}`
          }
        })
      }else {
        resolve({
          ...SUCCESS_STATUS,
          data: doc
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
          if(err){
            resolve({
              ...ERROR_STATUS,
              err:{
                errors: err.message,
                message: ''
              }
            })
          }else if(!doc){
            resolve({
              ...ERROR_STATUS,
              err:{
                errors: '',
                message: `not found data by ${JSON.stringify(condition)}`
              }
            })
          }else {
            resolve({
              ...SUCCESS_STATUS,
              data: doc
            })
          }
        })
    })
}

// insert user data
const create = async (model,data) => {
    return new Promise((resolve,reject) => {
        model.create(data,(err,doc) => {
          if(err){
            resolve({
              ...ERROR_STATUS,
              err:{
                errors: err.message,
                message: ''
              }
            })
          }else if(!doc){
            resolve({
              ...ERROR_STATUS,
              err:{
                errors: '',
                message: `invalid operation!`
              }
            })
          }else {
            resolve({
              ...SUCCESS_STATUS,
              data: doc
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
      if(err){
        resolve({
          ...ERROR_STATUS,
          err:{
            errors: err.message,
            message: ''
          }
        })
      }else if(!doc){
        resolve({
          ...ERROR_STATUS,
          err:{
            errors: '',
            message: `data is null by condition: ${JSON.stringify(condition)},please checking the key is correct or the database is not null `
          }
        })
      }else {
        resolve({
          ...SUCCESS_STATUS,
          data: doc
        })
      }
    })
  })
}

// update data with self-defining function
const updateUniqueOneWithFun = (model,condition,processDataFn,options = {new:true}) => {
  const query = model.findOne(condition)
  return new Promise((resolve,reject) => {
    query.exec((err,doc) => {
      if(err){
        resolve({
          ...ERROR_STATUS,
          err:{
            errors: err.message,
            message: ''
          }
        })
        return
      }else if(!doc){
        resolve({
          ...ERROR_STATUS,
          err:{
            errors: '',
            message: `data is null by condition: ${JSON.stringify(condition)},please checking the key is correct or the database is not null `
          }
        })
        return
      }

      // process data with self-defining function
      const flagOrStatus = processDataFn(doc)
      if(flagOrStatus){
        resolve(flagOrStatus)
        return
      }

      doc.save((err,doc)=>{
        if(err){
          resolve({
            ...ERROR_STATUS,
            err:{
              errors: err.message,
              message: ''
            }
          })
        }else if(!doc){
          resolve({
            ...ERROR_STATUS,
            err:{
              errors: '',
              message: `data is null by condition: ${JSON.stringify(condition)},please checking the key is correct or the database is not null `
            }
          })
        }else {
          resolve({
            ...SUCCESS_STATUS,
            data: doc
          })
        }
      })
    })
  })
}

// delete unique one
const deleteUniqueOne = (model,condition,options={new:true}) => {
  const query = model.deleteOne(condition)
  return new Promise((resolve,reject)=>{
    query.exec((err,doc)=>{
      if(err){
        resolve({
          ...ERROR_STATUS,
          err:{
            errors: err.message,
            message: ''
          }
        })
      }else if(!doc){
        resolve({
          ...ERROR_STATUS,
          err:{
            errors: '',
            message: `invalid operation!`
          }
        })
      }else{
        resolve({
          ...SUCCESS_STATUS,
          data: doc
        })
      }
    })
  })
}

class BaseEntity{
    constructor(){
        this.find = find
        this.create = create
        this.findByKey = findByKey
        this.findUniqueOne = findUniqueOne
        this.updateUniqueOne = updateUniqueOne
        this.updateUniqueOneWithFun = updateUniqueOneWithFun
        this.deleteUniqueOne = deleteUniqueOne
    }
}

module.exports = new BaseEntity
