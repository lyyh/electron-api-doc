/**
 * @author liuyanhao
 * @date 2018-02-07
 * @Description:
 */
import axios from 'axios'
import config from '../config'
const token = '123'
export default axios.create({
  baseURL: config.baseURL,
  Authorization: `Bearer ${token}`
})
