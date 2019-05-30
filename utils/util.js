const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function stringifyQS(obj) {
  if (typeof obj !== 'object') {
    throw Error('invalid params')
  }
  let res = '?'
  for (const [key, value] of Object.entries(obj)) {
    res += `${key}=${value}&`
  }
  return res.slice(0, res.length - 1)
}

function parseQS(url) {
  if (typeof url !== 'string') {
    throw Error('invalid params')
  }
  return url
    .split('?')[1]
    .split('&')
    .reduce((pre, next) => {
      const [key, value] = next.split('=')
      return {
        ...pre,
        [key]: value
      }
    }, {})
}

export { formatTime, stringifyQS, parseQS }
