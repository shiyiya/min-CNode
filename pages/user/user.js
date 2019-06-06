import { fetchUserInfo, fetchUserCollectTopic } from '../../utils/api'
import { formatTime } from '../../utils/util'

Page({
  data: {
    userInfo: {},
    userCollectTopic: []
  },
  onLoad: function(options) {
    console.log(options)
    wx.setNavigationBarTitle({
      title: options.loginname || 'User Info'
    })

    Promise.all([
      fetchUserInfo(options.loginname),
      fetchUserCollectTopic(options.loginname)
    ]).then(([userInfo, userCollectTopic]) => {
      userInfo.data.create_at = formatTime(new Date(userInfo.data.create_at))
      this.setData({
        userInfo: userInfo.data,
        userCollectTopic: userCollectTopic.data
      })
    })
  }
})
