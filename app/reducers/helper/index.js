/**
 * @author liuyanhao
 * @date 2018-03-30
 * @Description:
 */
import Immutable from 'immutable'

export const deleteArrayElement = (dataSource,element) => {
  const $$ds = Immutable.fromJS(dataSource)
  for(let i=0;i<$$ds.size;i++){
    if($$ds.get(i).get('key')==element){
      return $$ds.delete(i).toJS()
    }
  }
}
