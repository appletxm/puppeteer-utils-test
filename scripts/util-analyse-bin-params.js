const pkg = require('../package.json')

function doAnalyse() {
  const action = process.argv[2]
  const rawCfg = {}

  //   if (!action) {
  //     throw new Error('Please check parameter format is match with [release --basePath "../" --ignorePath "(data-portal-web-release|data-portal-web)]')
  //   }

  if (!action || action === '--version' || action === '-v' || (/^-+.+/).test(action)) {
    console.info(`Current version is ${pkg.version}`)
    return {
      action: 'checkVersion',
      rawCfg
    }
  }

  rawCfg[action] = {}

  const cmds = process.argv.slice(3)
  // console.info(cmds)

  let i = 0
  while (i < cmds.length) {
    const key = cmds[i].replace(/-/g, '')
    const value = cmds[i + 1]

    rawCfg[action][key] = value
    
    i = i + 2
  }

  return {
    action,
    rawCfg
  }
}

module.exports = doAnalyse
