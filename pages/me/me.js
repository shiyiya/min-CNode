import { fetCatchFn } from '../../utils/wx-utils'
import { formatTime } from '../../utils/util'
import { validToken, fetchUserInfo } from '../../utils/api'
const app = getApp()

Page({
  data: {
    userInfo: {},
    actionsMap: [
      {
        title: '发表帖子',
        url: ''
      },
      {
        title: '我的贴子',
        url: ''
      },
      {
        title: '消息中心',
        url: ''
      },
      {
        title: '关于 Min-CNode',
        url: ''
      }
    ],
    isLogin: false
  },
  onLoad: function() {
    const userInfo = app.globalData.userInfo
    if (userInfo && userInfo.id) {
      this.setData({ isLogin: true })
    }
  },
  loginByQR() {
    wx.scanCode({
      success: res => {
        console.log(res.result)
        this.loginByToken(res.result)
      },
      fail(err) {
        console.log(err)
        fetCatchFn(err)
      }
    })
  },
  loginByToken() {
    return validToken('abeec67b-1650-4541-abc9-c1aff19c8701').then(res => {
      console.log(res)
      this.getUserInfo(res.loginname)
    })
  },
  getUserInfo(name) {
    fetchUserInfo(name).then(res => {
      console.log(res)
      res.data.create_at = formatTime(new Date(res.data.create_at))
      app.globalData.userInfo = res.data
      this.setData({
        userInfo: res.data,
        isLogin: true
      })
      console.log(this.data)
    })
  }
})
