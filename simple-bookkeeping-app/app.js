// app.js
import {promisifyAll} from 'miniprogram-api-promise'
const wxp = wx.p = {}
promisifyAll(wx, wxp)

App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    bills: [],
    currentUser: '',
    baseURL: "http://127.0.0.1:5000/"
  },
  
   //normal
   APIupdatebill(userid){
     var bills = this.globalData.bills
      wx.request({
        url: this.globalData.baseURL + "updatebill",
        data: {
           userid,
           bills
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success:(res)=>{ console.log("normal", res) },
        fail:(res)=>{ console.log(res) }
      })
   },
   APIgetbill(userid){
     var that = this
     wx.request({
       url: this.globalData.baseURL + "getbill",
       data: {
          userid
       },
       header: {
         'content-type': 'application/json' // 默认值
       },
       success:(res)=>{
         this.globalData.bills = res.data
         console.log("BILLS ", that.globalData.bills)
        },
       fail:(res)=>{ console.log(res) }
     })
  },
   //promise
   async promiseAPIaddbill(userid, bill){
      const res = await wx.p.request({
         url: this.globalData.baseURL + "get",
         method: "GET",
         data: {
            userid,
            bill
         },
      })
      console.log("promise", res)
   }
})
