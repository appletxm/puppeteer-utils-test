const spawn = require('child_process').spawn
const path = require('path')
const chalk = require('chalk')
const { entrance, params } = require('../.projectrc.js')

let childPs = null

function processRestart() {
  if (childPs) {
    childPs.stdin.pause()
    childPs.kill()
  }

  childPs = spawn(process.argv[0], [path.resolve(entrance), ...params], {
    // env: { process_restarting: 1 },
    detached: true,
    stdio: 'pipe'
  })
  childPs.unref()

  childPs.stdout.on('data', (data) => {
    console.log(`${chalk.keyword('cyan')(`[child process]: ${data}`)}`)
  })
  
  // childPs.stderr.on('data', (data) => {
  //   console.error(`stderr: ${data}`);
  // })
  
  childPs.on('close', () => {
    // console.log(`child process exited with code ${code}`);
    childPs = null
  })
}

module.exports = {
  processRestart,
  childPs
}
