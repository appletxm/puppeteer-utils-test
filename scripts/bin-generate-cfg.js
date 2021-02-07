const objectExtend = require('./util-object-extend')
const path = require('path')
const chalk = require('chalk')
const baseCfg = require('../config')

function generateCfg(cmdCfg) {
  let { config } = cmdCfg

  if(config) {
    delete cmdCfg.config
    const thireCfgPath = path.resolve(process.cwd(), config)

    console.info(chalk.keyword('orange')('**Generate config file**'))
    console.info(chalk.keyword('orange')(`base path: ${process.cwd()}`))
    console.info(chalk.keyword('orange')(`thid cfg path: ${thireCfgPath}`))
    console.info(chalk.keyword('orange')(`command path: ${__dirname}`))

    const configThird = require(thireCfgPath)
    cmdCfg = objectExtend(cmdCfg, configThird)
  }

  cmdCfg = objectExtend(baseCfg, cmdCfg)

  const keys = Object.keys(cmdCfg)
  
  keys.forEach(key => {
    const { rule } = cmdCfg[key]

    if (rule) {
      cmdCfg[key]['rule'] = typeof rule === 'string' ? new RegExp(rule, 'im') : rule
    }
  })

  // console.info('**********', cmdCfg)

  return cmdCfg
}

module.exports = generateCfg
