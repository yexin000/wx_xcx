//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    mainViewUrl: ''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.setData({
      mainViewUrl: ''
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })

        var decodeUrl = app.globalData.portUrl + "wxAuth/decodeUserInfo.do";
        var that = this;
        wx.request({
          url: decodeUrl,
          data: {
            encryptedData: res.encryptedData,
            iv: res.iv,
            thirdSession: app.globalData.thirdSession
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (result) {
            if(result) {
              var userObj = JSON.parse(result.data.userInfo);
              var timestamp = new Date().getTime();
              app.globalData.openId = userObj.openId;
              that.setData({
                mainViewUrl: app.globalData.indexUrl + "?openId=" + userObj.openId + "&time=" + timestamp
              })
            }
          }
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
    if(e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })

      app.loginSession();
    } else {
      wx.navigateBack({
        delta: -1
      })
    }
  }

})
