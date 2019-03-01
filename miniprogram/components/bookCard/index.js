// components/bookCard/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    avatar: {
      type: String,
      value: ''
    },
    name: {
      type: String,
      value: ''
    },
    id:{
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    linkToDetail: function() {
      wx.navigateTo({
        url: `/pages/detail/index?_id=${this.id}`
      });
    }
  }
})
