/**
 * @author liuyanhao
 * @date 2018-03-25
 * @Description:
 */

// TODO: unit testing
exports.initUrlAndParams = (url,params) => {
  let reg = null
  let filteredParams = {}
  let tmpUrl = ''

  for(let [prop,value] of Object.entries(params)){
    reg = new RegExp("\\${"+prop+"}","g")
    tmpUrl = url.replace(reg,value)
    if(url == tmpUrl){
      filteredParams[prop] = value
    }else{
      url = tmpUrl
    }
  }

  return {
    uri: url,
    params: filteredParams
  }
}
