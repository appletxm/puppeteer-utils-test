const fs = require('fs')
const defaultRule = '(feat|fix|docs|style|refactor|perf|test|workflow|ci|chore|types)'

const commitRE = new RegExp(`^${defaultRule}:\\s.{8,50}$`, 'im')

console.info(commitRE)

function doCheck(rule, msg) {
  const reg = rule || commitRE
  if (!(reg).test(msg)) {
    console.log(`\n⚠️  Commit message not matched rule.`)
    console.log(`⚠️  Please according the format: ${reg.source}: xxxx\n`)
    process.exit(1)
  }
}

function checkCommitMsg(cfg) {
  const { rule } = cfg.commitMessage
  const gitPath = process.env.HUSKY_GIT_PARAMS
  
  if (gitPath && fs.existsSync(gitPath)) {
    const msg = require('fs').readFileSync(gitPath, 'utf-8')
    doCheck(rule, msg)
  }
}

module.exports = checkCommitMsg

