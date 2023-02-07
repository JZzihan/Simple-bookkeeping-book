// pages/ledger/ledger.js
Page({
   "enablePullDownRefresh": true,
   /**
    * 页面的初始数据
    */
   data: {
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
      var year = 2013 + Math.floor((date.getTime()-1359129600000)/31536000000);
      var arrayDate = [year, date.getMonth() + 1, date.getDate()]
      return arrayDate;
    },
    onConfirm(event) {
      this.setData({
        show: false,
        date: this.formatDate(event.detail),
      });
      this.filter("日")
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
               this.filter("日")
               console.log("delete global.bills", app.globalData.bills)
               console.log("delete ledger.showbills", this.data.showbills)
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
      //range = "年" / "月" / "日"
      this.setData({
         showbills: {} //empty
      })
      var date = this.data.date
      for (var item in this.data.bills){
         var index = this.data.bills[item]
         if (index.date.year == date[0]){ //year check
            if (index.date.month == date[1] || range == "年"){ //month check
               if (index.date.day == date[2] || range != "日") this.setData({ [`showbills.${item}`]: index })
               //all passed, then add
            }
         }
      }
      console.log("result", this.data.showbills)
    },
    filter(e){
       var range
       if (typeof(e) == 'string'){
          range = e
       }else range = e.target.dataset.range
       var date = this.data.date
       if (range == "年"){
          this.setData({ showDate: date[0]})
       }else if (range == "月"){
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
         if (range == "年"){
            this.setData({ [`showbills.${item}.timetext`]: index.date.month + "月" +index.date.day + "日"})
         }else if (range == "月"){
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
      this.setData({
         bills: app.globalData.bills,
         showbills: app.globalData.bills,
      })
      if (this.data.date == ''){
        this.setData({ date: this.formatDate(this.data.currentDate) })
      }
      this.filter("日")
      console.log("bills", this.data.bills)
      console.log("showbills", this.data.showbills)
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