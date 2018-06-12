// pages/bid/bid.js
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bidMoney:'',
    itemName:'',
    beOveredUser:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      bidMoney: options.bidMoney,
      itemName: options.itemName,
      beOveredUser: options.beOveredUser
    })
  },

  pushMsg : function(e) {
    var fId = e.detail.formId;
    var fObj = e.detail.value;  
    var bidMoney = e.detail.value.bidMoney;
    var itemName = encodeURIComponent(e.detail.value.itemName);
    var beOveredUser = e.detail.value.beOveredUser;

    if (null != beOveredUser && beOveredUser != '') {
      var msgUrl = app.globalData.portUrl + "templateMsg/bidOverTemplateMsg.do";
      var that = this;
      wx.request({
        url: msgUrl,
        data: {
          formId: fId,
          bidMoney: bidMoney,
          itemName: itemName,
          beOveredUser: beOveredUser
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
        success: function (result) {
          wx.navigateBack({
            delta: -1
          })
        }
      })
    }
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