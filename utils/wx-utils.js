import { stringifyQS } from './util'
import { HOST } from './api'

export const _fetch = {
  get(url, params = '') {
    if (typeof params === 'object' && Object.keys(params).length) {
      params = stringifyQS(params)
    }

    return new Promise((resolve, reject) => {
      wx.request({
        url: HOST + url + params,
        success(res) {
          if (
            (res.statusCode >= 200 && res.statusCode < 300) ||
            res.statusCode === 304
          ) {
            resolve(res.data)
          }
          reject(res)
        },
        fail: reject
      })
    })
  },
  post(url, params, ...options) {
    return new Promise((resolve, reject) => {
      wx.request({
        method: 'POST',
        header: { 'Content-Type': 'application/json' },
        url: HOST + url,
        data: params,
        ...options,
        success: resolve,
        fail: reject
      })
    })
  }
}

export const login = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success: ({ code }) => {
        resolve(code)
      },
      fail: error => {
        reject(error)
      }
    })
  })
}

const getStore = key =>
  new Promise((resolve, reject) => {
    wx.getStorage({
      key,
      success: res => {
        resolve(res.data)
      },
      fail: error => {
        reject(error)
      }
    })
  })

const removeStore = key =>
  new Promise(resolve => {
    wx.removeStorage({
      key,
      success: res => {
        resolve(res)
      }
    })
  })