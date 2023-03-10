// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:'',
    paw:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 获取用户输入的手机号
  getUser(e){
    console.log(e.detail.value)
    this.setData({
      user:e.detail.value
    });
  },

  // 获取用户输入的密码
  getPaw(e){
    console.log(e.detail.value)
    this.setData({
      paw:e.detail.value
    });
  },

  // 跳转到注册页面
  goRegister(){
    wx.navigateTo({
      url:"../zuce/zuce"
    });
  },

  // 登录
  login(){
    if(this.data.user&&this.data.paw){
      wx.showLoading({
        title: '加载中',
      })
      wx.request({
        url: 'http://127.0.0.1:5000/signIn', // 登录
        data: {
          tel: this.data.user,
          paw: this.data.paw
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
          // console.log(res.data)
          wx.hideLoading()
          if(res.data.code==500){
            wx.showModal({
              title: '提示',
              content: "密码错误",
              showCancel:false,
              success () {
              }
            })
          }
          if(res.data.code==0){
            wx.showModal({
              title: '提示',
              content: "该用户没有注册",
              showCancel:false,
              success () {
              }
            })
          }
          if(res.data.code==200){
            console.log(res.data.data)
            wx.showModal({
              title: '提示',
              content: "登录成功",
              showCancel:false,
              success:(res2)=> {
                var app = getApp()
                app.globalData.currentUser = res.data.data.tel
                wx.setStorageSync('tel', res.data.data.tel)
                wx.setStorageSync('info', res.data.data)
                if (res2.confirm) {
                  if(wx.getStorageSync("userInfo")){
                    wx.switchTab({
                      url: '../index/index',
                    })
                  }else{   // 如果没有授权就跳转到授权页面
                    wx.navigateTo({
                      url:"../shouquan/shouquan"
                    });
                  }
                }
              }
            })
          }
        }
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '请把信息输入完整',
        showCancel:false,
        success (res) {
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

 
})