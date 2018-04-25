/**
 * @author liuyanhao
 * @date 2018-02-01
 * @Description:
 */
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require("fs"));
const fsReadFile = Promise.promisify(fs.readFile)

async function main(){
  let contents
  try{
    contents = await fsReadFile("main.js", "utf8")
  }catch (e) {
    console.log(e.message)
  }
  console.log(contents)
}

main()
