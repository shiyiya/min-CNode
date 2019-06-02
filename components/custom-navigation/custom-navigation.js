Component({
  data: {
    height: null,
    back: true,
    home: false
  },

  properties: {
    title: {
      type: String,
      value: ''
    }
  },

  ready: function() {
    var _this = this
    wx.getSystemInfo({
      success(res) {
        _this.setData({
          height: res.statusBarHeight + 46
        })
      }
    })
  },

  methods: {
    navigationBack: function() {
      wx.navigateBack()
    },
    navigation2Home: function() {
      wx.reLaunch({
        url: '/pages/index/index'
      })
    }
  }
})
