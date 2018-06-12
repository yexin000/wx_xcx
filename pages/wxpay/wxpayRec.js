Page({

  /** 
   * 页面的初始数据 
   */
  data: {

  },

  /** 
   * 生命周期函数--监听页面加载 
   */
  onLoad: function (options) {
    var that = this;
    //页面加载调取微信支付（原则上应该对options的携带的参数进行校验）    
    that.requestPayment(options);
  },
  //根据 obj 的参数请求wx 支付    
  requestPayment: function (obj) {
    //获取options的订单Id    
    var orderId = obj.orderId;
    var timeStamp = obj.timeStamp;
    var nonceStr = obj.nonceStr;
    var prepay_id = obj.prepay_id;
    var paySign = obj.paySign;
    //调起微信支付    
    wx.requestPayment({
      //相关支付参数    
      'timeStamp': timeStamp,
      'nonceStr': nonceStr,
      'package': 'prepay_id=' + prepay_id,
      'signType': 'MD5',
      'paySign': paySign,
      //小程序微信支付成功的回调通知    
      'success': function (res) {
        //定义小程序页面集合    
        var pages = getCurrentPages();
        wx.showToast({
          title: '支付成功',  //标题  
          icon: 'success',  //图标，支持"success"、"loading"  
          duration: 3000, //提示的延迟时间，单位毫秒，默认：1500  
          mask: false,  //是否显示透明蒙层，防止触摸穿透，默认：false  
          success: function () { }, //接口调用成功的回调函数  
          fail: function () { },  //接口调用失败的回调函数  
          complete: function () {
            //接口调用结束的回调函数  
            var prevPage = pages[pages.length - 2];
            prevPage.setData({
              mainViewUrl: "https://mlhdkj.com/weixin/foreground/html/lh/paySuccess.html"
            })
            wx.navigateBack();
          }
        });
      },
      //小程序支付失败的回调通知    
      'fail': function (res) {
        console.log("支付失败");
        console.log(res);
        var pages = getCurrentPages();
        wx.showToast({
          title: '支付失败',  //标题  
          icon: 'none',  //图标，支持"success"、"loading"  
          duration: 3000, //提示的延迟时间，单位毫秒，默认：1500  
          success: function () { }, //接口调用成功的回调函数  
          fail: function () { },  //接口调用失败的回调函数  
          complete: function () {
            //接口调用结束的回调函数  
            wx.navigateBack();
          }
        });
      }
    })
  },

  /** 
   * 生命周期函数--监听页面初次渲染完成 
   */
  onReady: function () {

  },

  /** 
   * 生命周期函数--监听页面显示 
   */
  onShow: function () {

  },

  /** 
   * 生命周期函数--监听页面隐藏 
   */
  onHide: function () {

  },

  /** 
   * 生命周期函数--监听页面卸载 
   */
  onUnload: function () {

  },

  /** 
   * 页面相关事件处理函数--监听用户下拉动作 
   */
  onPullDownRefresh: function () {

  },

  /** 
   * 页面上拉触底事件的处理函数 
   */
  onReachBottom: function () {

  },

  /** 
   * 用户点击右上角分享 
   */
  onShareAppMessage: function () {

  }
})  