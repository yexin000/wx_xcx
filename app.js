//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    this.loginSession();
  },
  globalData: {
    userInfo: null,
    thirdSession: '',
    openId: '',
    portUrl: 'https://mlhdkj.com/weixin/',
    indexUrl:'https://mlhdkj.com/weixin/foreground/html/lh/index.html'
  },

  loginSession : function() {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var sessionUrl = this.globalData.portUrl + "wxAuth/getSession.do?code=" + res.code;
        wx.request({
          url: sessionUrl,
          data: {
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log(res.data);
            getApp().globalData.thirdSession = res.data.thirdSession;
            // 获取用户信息
            wx.getSetting({
              success: settingsRes => {
                if (settingsRes.authSetting['scope.userInfo']) {
                  // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                  wx.getUserInfo({
                    success: userInfoRes => {

                      // 可以将 res 发送给后台解码出 unionId
                      getApp().globalData.userInfo = userInfoRes.userInfo

                      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                      // 所以此处加入 callback 以防止这种情况
                      if (getApp().userInfoReadyCallback) {
                        getApp().userInfoReadyCallback(userInfoRes)
                      }
                    },
                    fail: userInfoRes => {
                      console.log("拒绝授权");
                    }
                  })
                }
              }
            })
          }
        })
        console.log("登陆成功");
      }
    })
  }
})