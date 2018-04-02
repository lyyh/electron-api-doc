/**
 * @author liuyanhao
 * @date 2018-03-30
 * @Description:
 */
import Immutable from 'immutable'

// support delete element for single or batch
export const removeArrayElement = (dataSource,target) => {
  let elements = !Array.isArray(target)?Array.of(target):target
  let $$ds = Immutable.fromJS(dataSource)
  const size = $$ds.size
  for(let el of elements){
    for(let i=0;i<size;i++){
      if($$ds.get(i).get('key')==el){
        $$ds = $$ds.delete(i)
      }
    }
  }
  return $$ds.toJS()
}

// push elements to array
export const pushArrayElement = (dataSource,target) => {
  let elements = !Array.isArray(target)?Array.of(target):target
  let $$ds = Immutable.fromJS(dataSource)
  let $$el = Immutable.fromJS(elements)
  return $$ds.concat($$el).toJS()
}
