const download = require('download-git-repo');
const ora = require('ora');
const fs = require('fs');

const getTemplate = (projectName) => {
  const spinner = ora('正在下载项目模板').start();
  return new Promise((resolve,reject) => {
    download('direct:http://opensource.cnsuning.com/bee/chart-template.git', projectName, {
      clone: true
    }, function (err) {
      if(!err){
        resolve('success')
        // updatePackageInfo()
      } else {
        reject(err)
      }
      spinner.stop()
    })
  }) 
}
const updatePackageInfo = ({projectName,author}, callback) => {
  fs.readFile(`${process.cwd()}/${projectName}/package.json`, (err, data) => {
    if (err) throw err;
    let _data = JSON.parse(data.toString())
    const originName = _data.name
    _data.name = projectName
    _data.version = '1.0.0'
    _data.author = author
    let str = JSON.stringify(_data, null, 4);
    const reg = new RegExp(originName,'gim')
    str = str.replace(reg, projectName)
    fs.writeFile(`${process.cwd()}/${projectName}/package.json`, str, function (err) {
      if (err) throw err;
      callback()
    })
  });
}
const installModules = (projectName) => {
  var exec = require('child_process').exec;
  const spinner = ora('安装依赖中').start();
  exec('npm install',{cwd: projectName},(error, stdout, stderr) => {
    if(error) {
      console.log('\n安装失败 :>> ', error);
    } else {
      console.log('\n安装成功 :>> ', stdout);
    }
    console.log(stderr);
    spinner.stop()
  })
}
module.exports = {
  getTemplate,
  updatePackageInfo,
  installModules
}