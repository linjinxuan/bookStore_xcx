// miniprogram/pages/detail/index.js
const app = getApp();
const {format} = require('../../utils/date-formal.js');
const _ = app.db.command;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    status: {
      canCart: true
    }
  },

  getDetail(id) {
    app.db.collection('books').doc(id).get().then(res => {
      res.data.PublishDate = format(res.data.PublishDate);
      this.setData({
        info: Object.assign({}, this.data.info, res.data)
      });
    })
  },
  getPrice(id) {
    app.db.collection('sale').doc(id).get().then(res => {
      this.setData({
        'info.price': res.data.Price,
        'info.remaining': res.data.Remaining
      }, () => {
        !res.data.Remaining && this.setStatus()
      });      
    })
  },

  // @TODO 小程序端无法改写数据库，不知道为什么 
  tapCart() {
    if (!this.data.info.remaining) {
      this.data.status.canCart && (this.data.status.canCart = false);
      return;
    }

    app.db.collection('sale').doc(this.data.info._id).update({
      data: {
        // 表示指示数据库将字段自增 -1
        Remaining: _.inc(-1)
      },
      success(res) {
        this.setData({
          'info.remaining': res.data.Remaining
        });      
        wx.showToast({
          title: 'add into cart successfully',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },

  setStatus() {
    this.data.status.canCart && (this.setData({ 'status.canCart': false }));
  },

  // 调用云函数方法改写数据库
  cart() {
    const { _id, BookName, price, avatar } = this.data.info;
    const data = { _id, BookName, price, avatar };
    wx.cloud.callFunction({
      name: 'insert',
      data: {
        data
      }
    }).then(res => {
      this.setData({
        'info.remaining':this.data.info.remaining - 1
      }, () => {
        wx.showToast({
          title: 'add into cart',
          icon: 'success',
          duration: 2000
        });
        !this.data.info.remaining && this.setStatus();
      });
    }).catch(err => {
      // handle error
      console.log('call error', err);
    });    
  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!wx.cloud) {
      return
    }

    this.getDetail(options._id);
    this.getPrice(options._id);    
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