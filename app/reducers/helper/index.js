/**
 * @author liuyanhao
 * @date 2018-03-30
 * @Description:
 */
import Immutable from 'immutable'

// support delete element for single or batch
export const deleteArrayElement = (dataSource,element) => {
  let elements = []
  if(!Array.isArray(element)){
    elements = Array.of(element)
  }else{
    elements = element
  }
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
