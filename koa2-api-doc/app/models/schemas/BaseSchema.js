/**
 * @author liuyanhao
 * @date 2018-02-05
 * @Description:
 */
module.exports = {
  key: {
    unique: true,
    type: String,
    require: true
  },
  name: {
    unique: true,
    type: String,
    require: true
  },
  info: {
    type: String,
    default: ''
  },
  meta: {
    createAt: {
      type: Date,
      dafault: Date.now()
    },
    updateAt: {
      type: Date,
      dafault: Date.now()
    }
  }
}
