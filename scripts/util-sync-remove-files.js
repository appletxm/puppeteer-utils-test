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

function readdir (srcPath) {
  let files = []

  files = fs.readdirSync(srcPath)

  return files
}

function removeFiles(srcPath, options) {
  const res = isExcludeFile(srcPath, options)

  if (res === true) {
    return false
  }

  fs.unlinkSync(srcPath)
}

function removeFolder(srcPath, options) {
  let files = []
  const res = isExcludeFile(srcPath, options)

  if (res === true) {
    return false
  }

  if (fs.lstatSync(srcPath).isDirectory()) {
    files = readdir(srcPath)
    if (files.length > 0) {
      files.forEach((file) => {
        const curSource = path.join(srcPath, file)
        if (fs.lstatSync(curSource).isDirectory()) {
          removeFolder(curSource, options)
        } else {
          removeFiles(curSource, options)
        }
      })
    }

    fs.rmdirSync(srcPath)
  } else {
    const curSource = path.join(srcPath)
    try {
      fs.accessSync(srcPath, fs.constants.R_OK | fs.constants.W_OK)
      removeFiles(curSource, options)
    } catch (err) {
      console.error(`${curSource} no access!`);
    }
  }
}

module.exports = {
  removeFiles,
  removeFolder
}

