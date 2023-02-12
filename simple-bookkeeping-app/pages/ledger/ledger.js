// pages/ledger/ledger.js
Page({
   "enablePullDownRefresh": true,
   /**
    * 页面的初始数据
    */
   data: {
      range: "day",
      date: '',
      showDate: '',
      total_in: 0,
      total_out: 0,
      total: 0,
      show: false,
      minDate: new Date(2020, 0, 1).getTime(),
      maxDate: new Date(2030, 0, 31).getTime(),
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
      bills:[],
      showbills: [],
    },
    onInput(event) {
      this.setData({
        currentDate: event.detail,
      });
    },
    onDisplay() {
      this.setData({ show: true });
    },
    onClose() {
      this.setData({ show: false });
    },
    formatDate(date) {
      date = new Date(date);
      return [date.getFullYear() ,date.getMonth() + 1 ,date.getDate()];
    },
    onConfirm(event) {
      this.setData({
        show: false,
        date: this.formatDate(event.detail),
      });
      this.filter(this.data.range)
    },
    edit(e){
      var index = e.target.dataset.index
      wx.showModal({
         title: '删除记录',
         content: '确认要删除记录吗？',
         confirmText: '确认',
         confirmColor: "#ff0000",
         success: (res) =>{
           if (res.confirm) {
              var app = getApp()
               app.globalData.bills.splice(index,1)
               this.setData({
                  bills: app.globalData.bills,
               })
               app.APIupdatebill(app.globalData.currentUser)
               this.filter(this.data.range)
               console.log("after delete global.bills", app.globalData.bills)
             console.log('用户点击确认')
           } else if (res.cancel) {
             console.log('用户点击取消')
           }
         }
       })
    },
    resetmoney(){
      var income=0, expend=0
      var showbills = this.data.showbills
      for (var item in showbills){
         var index = showbills[item]
         if (index.income == "(238, 97, 97)"){
            expend += parseFloat(index.money)
         }else income += parseFloat(index.money)
      }
      this.setData({
         total_in: income,
         total_out: expend,
         total: Math.round((income - expend)*100)/100
      })
    },
    checkdate(range){
      //range = "year" / "month" / "day"
      this.setData({
         showbills: {} //empty
      })
      var date = this.data.date
      for (var item in this.data.bills){
         var index = this.data.bills[item]
         if (index.date.year == date[0]){ //year check
            if (index.date.month == date[1] || range == "year"){ //month check
               if (index.date.day == date[2] || range != "day") this.setData({ [`showbills.${item}`]: index })
               //all passed, then add
            }
         }
      }
      console.log("checkdate showbills", this.data.showbills)
    },
    filter(e){
       var range
       if (typeof(e) == 'string'){ //被调用
          range = e 
       }else{
         //按钮触发
         range = e.target.dataset.range
         this.setData({ range: e.target.dataset.range})
       }
       var date = this.data.date
       if (range == "year"){
          this.setData({ showDate: date[0]})
       }else if (range == "month"){
         this.setData({ showDate: date[0] + '/' + date[1]})
       }else 
         this.setData({ showDate: date[0] + '/' + date[1] + '/' + date[2]})
      this.checkdate(range)
      this.timetext(range)
      this.resetmoney()
    },
    timetext(range){
      for (var item in this.data.showbills){
         var index = this.data.showbills[item]
         if (range == "year"){
            this.setData({ [`showbills.${item}.timetext`]: index.date.month + "月" +index.date.day + "日"})
         }else if (range == "month"){
           this.setData({ [`showbills.${item}.timetext`]: index.date.day + "日"})
         }else{
            var mintuetext = index.date.mintue
            if (mintuetext < 10) mintuetext = "0" + mintuetext
           this.setData({ [`showbills.${item}.timetext`]: index.date.hour + ":" + mintuetext})
         }
      }
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
      var app = getApp()
      app.APIgetbill(app.globalData.currentUser)
      this.setData({
         bills: app.globalData.bills,
         showbills: app.globalData.bills,
      })
      if (this.data.date == ''){
        console.log("first")
        this.setData({ date: this.formatDate(this.data.currentDate) })
      }
      console.log(this.data.range)
      this.filter(this.data.range)
      console.log("onShow bills", this.data.bills)
      console.log("onShow showbills", this.data.showbills)
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