const { exec, execSync } = require('child_process')

const { eslintRagne } = require('../.projectrc.js')

function doEslintProcess() {
  let resolveCb = null
  let rejectCb = null
  const cmd = 'npm run lint'
  const promise = new Promise((resolve, reject) => {
    resolveCb = resolve
    rejectCb = reject
  })

  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      rejectCb({error, stdout, stderr})
    } else {
      resolveCb({
        stdout,
        stderr
      })
    }
  })

  return promise
}

function doEslintProcessSync() {
  const cmd = 'npm run lint'
  execSync(cmd, {
    stdio: 'inherit'
  })
}

function doEslint() {
  const { ESLint } = require("eslint");

  (async function main() {
    const eslint = new ESLint();
    const results = await eslint.lintFiles([...eslintRagne]);
    const formatter = await eslint.loadFormatter('stylish');
    const resultText = formatter.format(results);
    console.log(resultText);
  })().catch((error) => {
    process.exitCode = 1;
    console.error(error);
  })
}

module.exports = {
  doEslint,
  doEslintProcess,
  doEslintProcessSync
}
