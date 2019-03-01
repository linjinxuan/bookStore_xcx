// miniprogram/pages/sort/sort.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    ctx: {},
    type: '',
    curList: []
  },

  getList() {
    app.db.collection('books')
    .get()
    .then(res => {
      this.setData({
        list: res.data.reduce((acc, cur) => {
          acc.indexOf(cur.Type) === -1 && acc.push(cur.Type);
          return acc;
        }, [])
      }, () => {
        const type = this.data.list[0]
        this.setData({ type });
        this.getCtx(type);
      })
    })
  },

  changeTab(e) {
    const {Type} = e.detail;
    const cur = this.data.ctx[Type];
    if (cur) {
      this.setData({
        curList: cur
      })
    } else {
      this.getCtx(Type);
    }
    
    this.setData({
      type: Type
    });
  },

  getCtx(Type) {
    app.db.collection('books').where({ Type })
    .get()
    .then(res => {
      this.data.ctx[Type] = res.data;
      this.setData({
        curList: res.data
      })  
    })
    .catch(err => {
      wx.showToast({
        title: '获取数据失败！',
        icon: 'none'
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList();
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