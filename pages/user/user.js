import { fetchUserInfo } from '../../utils/api'
import { formatTime } from '../../utils/util'

Page({
  data: {
    userInfo: {}
  },
  onLoad: function(options) {
    console.log(options)
    wx.setNavigationBarTitle({
      title: options.loginname || 'User Info'
    })
    fetchUserInfo(options.loginname).then(res => {
      res.data.create_at = formatTime(new Date(res.data.create_at))
      this.setData({
        userInfo: res.data
      })
    })
  }
})
