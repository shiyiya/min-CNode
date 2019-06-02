import { _fetch, fetchTopics } from '../../utils/api'
import { howLongAge } from '../../utils/util'

const app = getApp()

Page({
  data: {
    navList: [
      { id: 'all', title: '全部' },
      { id: 'good', title: '精华' },
      { id: 'share', title: '分享' },
      { id: 'ask', title: '问答' },
      { id: 'job', title: '招聘' }
    ],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    topics: [],
    topicsParams: {
      tab: 'all',
      page: 1,
      limit: 15,
      mdrender: true
    }
  },
  fetchTopics(replace) {
    console.log('fet', this.data)
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 20000,
      mask: true
    })
    const { topics, topicsParams } = this.data
    return fetchTopics(topicsParams).then(res => {
      const r = res.data.map(topic => {
        topic.last_reply_at = howLongAge(new Date(topic.create_at))
        return topic
      })
      this.setData({
        topics: replace ? r : topics.concat(r)
      })
      wx.hideToast({})
      return r
    })
  },

  fetchNext() {
    const { topicsParams } = this.data
    this.setData({
      topicsParams: {
        ...topicsParams,
        page: (topicsParams.page += 1)
      }
    })
    this.fetchTopics()
  },
  toggleTab(e) {
    const { topicsParams } = this.data
    this.setData({
      topicsParams: {
        ...topicsParams,
        tab: e.target.id
      }
    })
    this.fetchTopics(true)
  },
  onLoad: function() {
    this.fetchTopics()

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
