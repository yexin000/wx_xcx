// pages/share/shareItem.js
const promisify = require('../libs/promisify')
const wxGetImageInfo = promisify(wx.getImageInfo)
const wxCanvasToTempFilePath = promisify(wx.canvasToTempFilePath)
const wxSaveImageToPhotosAlbum = promisify(wx.saveImageToPhotosAlbum)
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemUrl: '',
    itemText: '',
    itemId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '分享图片生成中',
    })
    this.setData({
      itemUrl: options.itemUrl,
      itemText: options.itemText,
      itemId: options.itemId
    })
    var shareUrl = decodeURIComponent(this.data.itemUrl);
    shareUrl = app.globalData.portUrl + shareUrl;
    var shareText = decodeURIComponent(this.data.itemText);
    var shareId = this.data.shareId;
    var getQrCodeUrl = app.globalData.portUrl + "qrCode/getItemQrCode.do?itemId=" + this.data.itemId;
    var qrCodeUrl = '';
    wx.request({
      url: getQrCodeUrl,
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (result) {
        if (result) {
          qrCodeUrl = result.data.codeUrl;
          qrCodeUrl = app.globalData.portUrl + "sdFile/" + qrCodeUrl;
          Promise.all([
            wxGetImageInfo({
              src: 'https://mlhdkj.com/weixin/sdFile/static/share-bg.jpg'
            }),
            wxGetImageInfo({
              src: shareUrl
            }),
            wxGetImageInfo({
              src: qrCodeUrl
            })
          ]).then(res => {
            const ctx = wx.createCanvasContext('shareCanvas')
            // 设备宽高
            var screenWidh = wx.getSystemInfoSync().windowWidth;
            var screenHeight = wx.getSystemInfoSync().windowHeight;
            // 底图
            ctx.drawImage(res[0].path, 0, 0, screenWidh, screenHeight * 0.9)

            // 商品名称
            ctx.setTextAlign('left') // 文字居中
            ctx.setFillStyle('#000000') // 文字颜色：黑色
            ctx.setFontSize(13) // 文字字号：13px
            ctx.fillText(shareText, 10, screenHeight / 2.2)

            // 商品图片
            if (res[1].height > screenHeight / 2.5) {
              ctx.drawImage(res[1].path, (screenWidh - screenHeight / 2.5 / res[1].height * res[1].width) / 2, 0, screenHeight / 2.5 / res[1].height * res[1].width, screenHeight / 2.5)
            } else {
              ctx.drawImage(res[1].path, 0, 0, screenWidh, screenWidh / res[1].width * res[1].height)
            }
            

            // 分享二维码
            ctx.drawImage(res[2].path, screenWidh-110, screenHeight * 0.60, 100, 100)
            ctx.setTextAlign('right') // 文字居中
            ctx.setFillStyle('#b1b1b3') // 文字颜色：黑色
            ctx.setFontSize(11) // 文字字号：11px
            ctx.fillText('长按识别二维码，把宝贝带回家', screenWidh - 10, screenHeight * 0.65 + 100)

            ctx.stroke()
            ctx.draw()
            wx.hideLoading()
          })
        }
      }
    })
  },

  pushMsg: function (e) {
    var fId = e.detail.formId;
    var openId = app.globalData.openId;
    if (null != openId && openId != '') {
      var msgUrl = app.globalData.portUrl + "templateMsg/bidOverTemplateMsg.do";
      var that = this;
      wx.request({
        url: msgUrl,
        data: {
          formId: fId,
          bidMoney: ' ',
          itemName: ' ',
          beOveredUser: ' ',
          wxid: openId
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
        success: function (result) {
        }
      })
    }

    this.sharePage();
  },

  sharePage: function() {
    wxCanvasToTempFilePath({
      canvasId: 'shareCanvas'
    }, this).then(res => {
      return wxSaveImageToPhotosAlbum({
        filePath: res.tempFilePath
      })
    }).then(res => {
      wx.showToast({
        title: '已保存到相册'
      })
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