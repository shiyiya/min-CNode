import { fetCatchFn } from '../../utils/wx-utils'
import { formatTime } from '../../utils/util'
import { validToken, fetchUserInfo } from '../../utils/api'
const app = getApp()

Page({
  data: {
    userInfo: {},
    id: 0,
    actionsMap: [
      {
        title: '发表帖子',
        url: '' /*/pages/create/create*/
      },
      {
        title: '我的贴子',
        url: `/pages/user/user?loginname=`
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
    const userInfo = wx.getStorageSync('userInfo')

    if (userInfo && userInfo.id) {
      this.setData({
        isLogin: true,
        userInfo,
        'actionsMap[1].url': `/pages/user/user?loginname=${userInfo.loginname}`
      })
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
  loginByToken(token) {
    return validToken(token /* 'abeec67b-1650-4541-abc9-c1aff19c8701' */).then(
      res => {
        this.setData({
          id: token
        })
        this.getUserInfo(res.loginname)
      }
    )
  },
  getUserInfo(name) {
    fetchUserInfo(name).then(res => {
      res.data.create_at = formatTime(new Date(res.data.create_at))
      this.setData({
        userInfo: res.data,
        isLogin: true
      })
      const { id, userInfo } = this.data
      wx.setStorageSync('userInfo', { id, ...userInfo })
      console.log(this.data)
    })
  }
})
