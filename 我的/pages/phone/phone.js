// pages/phone/phone.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    code: '',
    codebtn:'发送验证码',
    disabled:false,
  },

  // 获取输入账号 
  phone: function (e) {
    let phone = e.detail.value;
    this.setData({
      phone: e.detail.value
    })
  },
  //发送验证码
  sendcode:function(){
    let that=this;
    let phone =this.data.phone;
    console.log(phone)
    wx.request({
      url: '', //接口地址未填
      data: {
         phone
      },
      method:"GET",
     
      success (res) {
        console.log(res.data)
        that.setData({
          code:res.data
        })
      }
    })
  },

  // 登录处理
  login: function (evt) {
    // console.log(evt);
    var that = this;
    console.log(this.data.code)
      wx.request({
        url: '', // 接口地址未填
        method: 'get',
        data: {
          phone: that.data.phone,
         code:that.data.code
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success(res) {
          console.log(res);
          if (res.data.code == "10000") {
          wx.setStorageSync('token',res.data.data)
            wx.switchTab({
              url: '/pages/mine/mine',
            })
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})