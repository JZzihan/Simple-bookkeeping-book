// Page({
  // /**
  //  * 页面的初始数据
  //  */
  // data: {
  //   nickName: '',
  //   noLogin:true
  // },
  // //账号密码登录
  // AccountLogin: function(event){
  //   wx.navigateTo({
  //     url: '/pages/accountlogin/accountlogin',
  //   })
  // },
  
  // // 登录
  // login(){
  //       wx.getUserProfile({
  //         desc: '授权登录使用',
  //         success: res=> {
  //           console.log('授权成功',res.userInfo)
  //           
  //           //其他页面也可以使用用户的信息
  //           app.globalData.userInfo = res.userInfo

  //           this.setData({
  //             nickName: res.userInfo.nickName,
  //             avatar: res.userInfo.avatarUrl,
  //             noLogin: false
  //           })
  //         },
  //         fail: res=> {
  //           console.log('授权失败',res)
  //         }
  //       })
    //java php 云开发 用户数据表
    // wx.cloud.database().collection('login_users').add({
    //   data: {
    //     avatarUrl: res.userInfo.avatarUrl,
    //     nickName: res.userInfo.nickName
    //   },
    //   success(res){
    //     console.log(res)
    //     wx.showToast({
    //       title:'登陆成功',
    //     })
    //   }
    // })

  //   wx.request({
  //     url:'url',//传入后台的接口地址
  //       data: {
  //       avatarUrl: res.userInfo.avatarUrl,
  //       nickName: res.userInfo.nickName
  //     },
  //     success: res=>{
  //       console.log(res)
  //       wx.showToast({
  //         title:'登陆成功',
  //       })
  //     }
  //   })
    
  // },
// })

Page({

  /**
   * 页面的初始数据
   */
  data: {
    account:'',
    password:'',
    noLogin:true
  },

  // 获取输入的账号
  getAccount(event) {
    console.log(event.detail);
    this.setData({
      account:event.detail
    })
  },

  // 获取输入的密码
  getPassword(event) {
    console.log(event.detail);
    this.setData({
      password:event.detail
    })
  },

  // 点击登录
  login() {
  let account = this.data.account
  let password = this.data.password
  console.log('账号',account,'密码',password)

  //校对密码
  wx.request({
    url:'https://www.escook.cn/api/get', //请求的接口地址
    data:{  
       account:account,
       password:password
    },
    method:'GET',  
    dataType:'JSON',  
    responseType:'text', 
    success(res){
        console.log("获取数据成功",res.data);
        if(password==user.password){
          console.log('登陆成功')
          wx.showToast({
            title: '登陆成功',
          })
          noLogin:false
          //登录成功之后跳转页面
          // wx.navigateTo({
          //   url:"pages/mine/mine",
          // })
        }
        else{
          console.log('登陆失败')
          wx.showToast({
            icon:'none',
            title: '账号或密码不正确',
          })
        }
    },
    fail(){  
        console.log("获取数据失败",res)
    },
    complete(){   
         console.log('complete')   
    },
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