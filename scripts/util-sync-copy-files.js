const fs = require('fs')
const path = require('path')

function isExcludeFile(srcPath, options) {
  let res = false

  if (options) {
    const { ignore } = options

    if (typeof ignore === 'string') {
      if (srcPath.indexOf(ignore) >= 0) {
        res = true
      }
    }
  
    if (ignore instanceof RegExp) {
      if (ignore.test(srcPath)) {
        res = true
      }
    }
  }

  return res
}

function cpoyFile (srcPath, destPath, options) {
  const res = options ? isExcludeFile(srcPath, options) : false
  if (res === true) {
    return false
  }

  fs.copyFileSync(srcPath, destPath)
}

function readdir (srcPath) {
  let files = []

  files = fs.readdirSync(srcPath)

  return files
}

function copyFolder (srcPath, destPath, options) {
  let files = []
  const res = isExcludeFile(srcPath, options)

  if (res === true) {
    return false
  }

  if (fs.lstatSync(srcPath).isDirectory()) {
    if (!fs.existsSync(destPath)) {
      fs.mkdirSync(destPath)
    }
    files = readdir(srcPath)
  }

  if (files && files.length > 0) {
    files.forEach((file) => {
      let curSource = path.join(srcPath, file)
      let targetFolder = path.join(destPath, file)

      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolder(curSource, targetFolder, options)
      } else {
        cpoyFile(curSource, targetFolder, options)
      }
    })
  }
}

function checkDirIsOk (checkPath) {
  let paths
  let pathStr = ''

  // console.info('\n checkPath: ', checkPath, fs.existsSync(checkPath))

  if (fs.existsSync(checkPath) === true) {
    return
  }

  paths = typeof checkPath === 'string' ? checkPath.trim().split(/\\|\/|\//) : checkPath

  paths.forEach(pathKey => {
    if (pathKey) {
      pathStr += pathKey + '/'
      if (fs.existsSync(path.join(pathStr)) !== true) {
        fs.mkdirSync(path.join(pathStr))
      }
    }
  })
}

module.exports = {
  cpoyFile,
  readdir,
  copyFolder,
  checkDirIsOk
}
