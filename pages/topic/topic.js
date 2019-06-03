import { fetchTopic } from '../../utils/api'
import { howLongAge } from '../../utils/util'

const app = getApp()

Page({
  data: {
    rawTopic: {},
    topic: {}
  },
  onLoad: function(options) {
    fetchTopic(/* '5cefa26852ccb64168ba8f11' */ options.id)
      .then(result => {
        result.data.create_at = howLongAge(new Date(result.data.create_at))
        result.data.replies = result.data.replies.map(r => {
          r.create_at = howLongAge(new Date(r.create_at))
          r.content = app.towxml.toJson(r.content, 'markdown')
          return r
        })

        this.setData({
          rawTopic: result.data,
          topic: app.towxml.toJson(result.data.content, 'markdown')
        })
      })
      .catch(err => {
        console.log(err)
      })
  },

  onReady: function() {},

  onShow: function() {},

  onHide: function() {},

  onUnload: function() {},

  onPullDownRefresh: function() {},

  onReachBottom: function() {},

  onShareAppMessage: function() {}
})
