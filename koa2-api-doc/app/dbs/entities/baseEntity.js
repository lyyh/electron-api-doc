/**
 * @author liuyanhao
 * @date 2018-01-31
 * @Description:
 */

// find all user
const findAll = (model) => {
    const query = model.find({});
    return new Promise((resolve,reject)=>{
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
                resolve(doc)
            }else{
                console.log('exception!')
                resolve(err.message)
            }
        })
    })
}

class BaseEntity{
    constructor(){
        this.findAll = findAll
        this.insert = insert
        this.findByKey = findByKey
    }
}

module.exports = new BaseEntity
