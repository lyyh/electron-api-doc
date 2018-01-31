/**
 * @author liuyanhao
 * @date 2018-01-31
 * @Description:
 */
const dbConfig = require('../../configs/dbConfig')
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
exports.connect = async (req,res) => {
    await mongoose.connect(dbConfig.serverUrl,err => {
        if(!err)console.log('database connection success!')
    })
    // console.log(dbConnection)
    // dbConnection.on('open',callback => {
    //     console.log('connection success!')
    // })
    // dbConnection.on('error',error => {
    //     console.error(error)
    // })
}
