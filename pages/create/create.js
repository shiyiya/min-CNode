import { newTopic, TABS } from '../../utils/api'

Page({
  data: {
    tabList: TABS,
    typo: {
      tab: '',
      title: '',
      content: ''
    }
  },
  onLoad: function() {
    const accesstoken = wx.getStorageSync('userInfo').id

    accesstoken && this.setData({ accesstoken })
  },
  type(e) {
    console.log(e)
    this.setData({
      [`typo.${e.currentTarget.id}`]: e.detail.value
    })
  },
  poi() {
    newTopic(this.data.typo).then(res => {
      wx.navigateTo(`/pages/topic/topic?id=${res.topic_id}`)
    })
  },
  formReset() {
    this.setData({
      typo: {}
    })
  }
})
