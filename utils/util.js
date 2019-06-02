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

function howLongAge(dateTimeStamp) {
  let result = ''
  const minute = 1000 * 60
  const hour = minute * 60
  const day = hour * 24
  const halfamonth = day * 15
  const month = day * 30
  const diff = Date.now() - dateTimeStamp
  if (diff < 0) return
  const monthC = diff / month
  const weekC = diff / (7 * day)
  const dayC = diff / day
  const hourC = diff / hour
  const minC = diff / minute
  if (monthC >= 1) {
    result += `${~~monthC} 月前`
  } else if (weekC >= 1) {
    result += `${~~weekC} 周前`
  } else if (dayC >= 1) {
    result += `${~~dayC} 天前`
  } else if (hourC >= 1) {
    result += `${~~hourC} 小时前`
  } else if (minC >= 1) {
    result += `${~~minC} 分钟前`
  } else result = '刚刚'
  return result
}

export { formatTime, stringifyQS, parseQS, howLongAge }
