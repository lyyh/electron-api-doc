/**
 * @author liuyanhao
 * @date 2018-03-25
 * @Description:
 */
const {filterUrlAndParams} = require('../../utils/url')
const should = require('should')


describe('module',()=>{
  it('url format success',()=>{
    const target = filterUrlAndParams('/apiDocs/${key}',{key:123})
    target.should.have.property('uri')
  })
})
