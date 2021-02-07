function needDeepCopy(obj) {
  let type = obj.constructor.name.toLowerCase()
  return type === 'array' || type === 'object'
}

function deepCopy(obj) {
  if (!obj) {
    return obj
  }

  let type = obj.constructor.name.toLowerCase()

  if (type === 'date') {
    return new Date(obj.getTime())
  } else if (type === 'regexp') {
    // console.info(obj.source, ':' , obj.flags, new RegExp(obj.source, obj.flags))
    return new RegExp(obj.source, obj.flags)
  } else if (type === 'error') {
    return new Error(obj.message)
  } else if (type === 'symbol') {
    return Symbol(obj.description)
  } else if (needDeepCopy(obj)) {
    let cloneTmp = type === 'array' ? [] : {}
    for (let key in obj) {
      cloneTmp[key] = needDeepCopy(obj) ? deepCopy(obj[key]) : obj[key]
    }

    let symbolKeys = Object.getOwnPropertySymbols(obj)

    if (symbolKeys.length > 0) {
      symbolKeys.forEach(key => {
        cloneTmp[key] = needDeepCopy(obj) ? deepCopy(obj[key]) : obj[key]
      })
    }

    return cloneTmp
  } else {
    return obj
  }
}

module.exports = deepCopy
