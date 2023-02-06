// pages/test/test.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';

Page({

    /**
     * 页面的初始数据
     */
    data: {
      word: "hello world",
      n: {
         a: 0,
         b: "hi",
         
      },
      i: 1,
      ary123: [1,2,3],
      currentDate: new Date().getTime(),
      minDate: new Date().getTime(),
      formatter(type, value) {
         if (type === 'year') {
         return `${value}年`;
         }
         if (type === 'month') {
         return `${value}月`;
         }
         return value;
      },
      show: false,
      dialog_show: false
   },
 
   showPopup() {
     this.setData({ show: true });
   },
 
   onClose() {
     this.setData({ show: false });
   },

   onInput(event) {
      this.setData({
         currentDate: event.detail,
      });
   },

    plus(e){
       var i = this.data.i, app = getApp()
       var bill = {
          a: `${i}`,
          b: 2.2,
          c: "CCC"
       }
       var _ary123 = this.data.ary123
       _ary123.push(this.data.n)
       console.log("_ary123", _ary123)
        this.setData({
            [`n.a`]: this.data.n.a + e.target.dataset.num,
            ary123: _ary123,
            i: this.data.i + 1
        }),
        console.log("this.data.ary123", this.data.ary123)
        wx.showToast({
          title: '+1',
          icon: "success"
        })
    },
    showValue(){
      var n = JSON.parse(JSON.stringify(this.data.n))
      console.log(n)
      this.setData({ [`n.a`]: 3})
      console.log(n)
      console.log(this.data.n)
    },
    Vant(){
       console.log("work")
      Dialog.confirm({
         selector: '#van-dialog',
         title: '标题',
         message: '弹窗内容',
       }).then(() => {
           // on confirm
         })
         .catch(() => {
           // on cancel
         });
    },
    
    

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.request({
         url: 'https://www.youtube.com/watch?v=O-beMM-iE6s',
         method: "GET",
         data: {
            test: "hi"
         },
         success:(res) => {
            console.log(res)
         }
       })
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
      this.setData({
         n: 0
     })
     wx.stopPullDownRefresh()
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