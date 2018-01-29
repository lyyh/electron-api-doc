/**
 * @author liuyanhao
 * @date 2018-01-28
 * @Description:
 */
const createHashHisLocation = ({pathname,params}) =>{
  return ''
}

const createMemoryHisLocation = ({pathname,params}) => {
  return {
    pathname: pathname,
    state: params
  }
}

export {
  createHashHisLocation,
  createMemoryHisLocation
}
