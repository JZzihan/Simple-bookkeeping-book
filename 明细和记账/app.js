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
    baseURL: "https://www.escook.cn/api/"
   },

   //normal
   APIaddbill(userid, bill){
      wx.request({
        url: this.globalData.baseURL + "addbill",
        method: "POST",
        data: {
           userid,
           bill
        },
        success:(res)=>{ console.log("normal", res) },
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
