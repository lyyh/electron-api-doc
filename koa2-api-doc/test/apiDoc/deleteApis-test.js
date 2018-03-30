/**
 * @author liuyanhao
 * @date 2018-03-29
 * @Description:
 */
const request = require('supertest')
const expect = require('chai').expect
const global = require('../global-test')

describe('api',()=>{
  it('delete one api doc',(done)=>{
    request(global.homeUrl)
      .delete('/apiDocs/34234')
      .expect(200)
      .end((err,res)=>{
        if(err)throw err
        console.log(res)
        expect(res).to.be.an('object')
        done()
      })
  })
})
