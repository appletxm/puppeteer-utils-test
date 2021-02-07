const chokidar = require('chokidar')
const { doEslint } = require('./eslint')
// const createPromise = require('./util-promise')
const { processRestart } = require('./watcher-restart-process')
const { watchDir } = require('../.projectrc.js')

let watcherLoaded = false

function restartMainProcess() {
  processRestart()
}

function watchProcess() {
  // doEslint().then(res => {
  //   const {stdout} = res
  //   // console.log(chalk.cyan(`${stdout}`))
  //   restartMainProcess()
  // }).catch(err => {
  //   // console.log(chalk.keyword('red')(err.stdout))
  // })

  doEslint()
  restartMainProcess()
}

function start() {
  const watcher = chokidar.watch(watchDir, {
    ignored: /^(node_modules|.git)/, // ignore dotfiles
    persistent: true
  });
  
  const log = console.log.bind(console);
  watcher
    .on('add', path => {
      log(`File ${path} has been added`)
      if (watcherLoaded === true) {
        watchProcess()
      }
    })
    .on('change', path => {
      log(`File ${path} has been changed`)
      if (watcherLoaded === true) {
        watchProcess()
      }
    })
    .on('unlink', path => log(`File ${path} has been removed`));
  
  // More possible events.
  watcher
    .on('addDir', path => log(`Directory ${path} has been added`))
    .on('unlinkDir', path => log(`Directory ${path} has been removed`))
    .on('error', error => log(`Watcher error: ${error}`))
    .on('ready', () => {
      log('Initial scan complete. Ready for changes')
      watcherLoaded = true
      watchProcess()
    })
    // .on('raw', (event, path, details) => { // internal
    //   log('Raw event info:', event, path, details)
    // })
}

module.exports = {
  start
}

start()
