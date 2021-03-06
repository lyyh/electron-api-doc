/**
 * @author liuyanhao
 * @date 2018-03-30
 * @Description:
 */
const request = require('supertest')
const expect = require('chai').expect
const global = require('../global-test')

describe('api test',()=>{
  it('post api request',(done)=> {
    request(global.homeUrl)
      .post('/api')
      .send({
        url: 'http://127.0.0.1:3000/signup',
        params: {
          name: 'test',
          account: 'admin',
          password: '1'
        },
        method: 'post'
      })
      .expect(200)
      .end((err,res)=>{
        if(err)throw err
        console.log(res.body)
        // expect(res.body).to.be.an('object')
        done()
      })
  })
})
