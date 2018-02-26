/**
 * @author liuyanhao
 * @date 2018-02-01
 * @Description:
 */
console.log('require B module')
var b = 1
var a = 1
module.exports = {
  b: b,
  foo: function(){
    console.log(a)
    a++
  }
}
