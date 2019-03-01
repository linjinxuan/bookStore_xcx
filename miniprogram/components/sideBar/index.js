// components/sideBar/sideBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array    
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    status: 'Fiction'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tap(e) {
      const {name} = e.target.dataset;
      this.setData({
        status: name
      });
      this.triggerEvent('changeTab', { Type: name});
    }
  }
})
