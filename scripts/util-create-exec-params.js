function getExecParams(modulePath) {
  return {
    cwd: modulePath,
    stdio: 'pipe',
    encoding: 'utf8',
    killSignal: 'SIGINT'
  }
}

module.exports = getExecParams
