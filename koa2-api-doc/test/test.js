/**
 * @author liuyanhao
 * @date 2018-01-31
 * @Description:
 */
const dbServer = require('../app/dbs/dbServer')
dbServer.connect()
const insertData = {
    key: 'k123333',
    name: 'name',
    nickname: 'nickname',
    auth: {
        account: '1',
        password: '123',
        accessToken: '123'
    }
}

const userEntity = require('../app/dbs/entities/userEntity')
// userEntity.insert(insertData)
console.log('123',userEntity.findAllUsers())
// console.log(userEntity.findByKey('k123'))
