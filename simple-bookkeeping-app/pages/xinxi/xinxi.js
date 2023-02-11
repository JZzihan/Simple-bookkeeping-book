// pages/lx/lx.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"",  // 姓名
    radio:"",   // 性别
    paw:"",     // 密码
    tel:"",     // 手机号
    wx:"",      // 微信名
    img:""     // 微信头像
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      wx:wx.getStorageSync("userInfo").nickName||"",
      img:wx.getStorageSync("userInfo").avatarUrl||"",
    });
  },

  onShow: function () {
    this.getUserInfo();
  },

  // 获取个人信息
  getUserInfo(){
    wx.showLoading({
      title: '请稍后...',
    })
    wx.request({ 
      url: 'http://127.0.0.1:5000/getUserInfo', 
      data: {
        id:wx.getStorageSync('info').id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:(res)=> {
        console.log(res.data)
        if(res.data.code==200){
          this.setData({
            name:res.data.list[0].name,
            radio:res.data.list[0].xingbie,
            paw:res.data.list[0].paw,
            tel:res.data.list[0].tel,
            leixing:res.data.list[0].leixing,
          });
          wx.setStorageSync('info',res.data.list[0])
          wx.hideLoading()
        }else{
         
        }
      }
    })
  },

  // 修改
  updateUser(){
    wx.showLoading({
      title: '请稍后...',
    })
    wx.request({ 
      url: 'http://127.0.0.1:5000/updateUser', 
      data: {
        name:this.data.name,
        xingbie:this.data.radio,
        paw:this.data.paw,
        id:wx.getStorageSync('info').id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:(res)=> {
        console.log(res.data)
        wx.hideLoading()
        this.getUserInfo();
        if(res.data.code==200){
          wx.hideLoading()
          wx.showModal({
            title: '提示',
            content: "修改成功！",
            showCancel:false,
            success:()=> {
              wx.switchTab({
                url: '../my/my',
              })
            }
          })
        }else{
          wx.showModal({
            title: '提示',
            content: "修改失败！",
            showCancel:false,
            success () {
              wx.navigateBack({
                delta:1
              })
            }
          })
        }
      }
    })
  },

  // 性别
  onChangeRadio(event) {
    console.log(event.detail)
    this.setData({
      radio: event.detail,
    });
  },

  // 获取姓名
  getNama(e){
    console.log(e.detail.value)
    this.setData({
      name:e.detail.value
    });
  },

  // 获取密码
  getPaw(e){
    console.log(e.detail.value)
    this.setData({
      paw:e.detail.value
    });
  },

})