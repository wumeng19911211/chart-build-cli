#! /usr/bin/env node
const {getTemplate, updatePackageInfo, installModules} = require('./utils')
const program = require('commander');
// const download = require('download-git-repo');
const chalk = require('chalk');
// const ora = require('ora');
const inquirer = require('inquirer')
const fs = require('fs');

const version = require('../package.json').version
program
  .version(version)
  .option('-i, --init [name]', '初始化chart-build项目')
  .parse(process.argv);
const projectName = program.init

inquirer.prompt([
  {
    type:'input',
    name:'author',
    message:'your name'
  },
  {
    type: 'input',
    name: 'age',
    message: 'your age'
  }
]).then(answer => {
  const author = answer.author
  const dirlist = fs.readdirSync('./')
  if (program.init) {
    if(dirlist.length !== 0 && dirlist.includes(program.init)) return console.log('项目名称已存在')
    getTemplate(projectName).then(data => {
      console.info(chalk.blueBright('下载成功'));
      updatePackageInfo({projectName, author}, () => {
        installModules(projectName)
      })
    }).catch(err => {
      console.log(err);
    })
  }
})

