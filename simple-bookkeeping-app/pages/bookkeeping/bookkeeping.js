// pages/bookkeeping/bookkeeping.js
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';

Page({
   /**
    * 页面的初始数据
    */
   data: {
      dot: false,
      info: "",
      bill: {
         type: "交通",
         icon: "../../images/1.png",
         income: "(238, 97, 97)", //"(238, 97, 97)"=red=expend, "(166, 241, 52)"=green=income
         money: 0,
         notes: "",
         date:{
            year: 2023,
            month: 1,
            day: 31,
            hour: 12,
            mintue: 30
         }
      },
      icons: {
         a: {
            "交通" : "../../images/9.png",
            "工作" : "../../images/2.png",
            "饮食" : "../../images/3.png",
            "购物" : "../../images/4.png"
         },
         b: {
            "水电" :"../../images/5.png",
            "转账" :"../../images/6.png",
            "娱乐" :"../../images/7.png",
            "其他" :"../../images/8.png"
         }
      },
      conculator: {
         a:{
            "7" : "cnum",
            "8" : "cnum",
            "9" : "cnum",
            "日期" : "cdate"
         },
         b:{
            "4" : "cnum",
            "5" : "cnum",
            "6" : "cnum",
            "-" : "cplusminus"
         },
         c:{
            "1" : "cnum",
            "2" : "cnum",
            "3" : "cnum",
            "+" : "cplusminus"
         },
         d:{
            '.' : "cdot",
            " 0 " : "cnum",
            "C" : "cclear",
            "记账" : "cdone"
         },
      },
      show: false,
      currentDate: new Date().getTime()
   },

   cdate() {
      this.setData({ show: true });
    },
    onClose() {
      this.setData({ show: false });
    },
    onConfirm(e) {
      var arraydate = this.formatDate(e.detail)
      this.setData({
         show: false,
         [`bill.date.year`]: `${arraydate[0]}`,
         [`bill.date.month`]: `${arraydate[1]}`,
         [`bill.date.day`]: `${arraydate[2]}`,
         [`bill.date.hour`]: `${arraydate[3]}`,
         [`bill.date.mintue`]: `${arraydate[4]}`,
       });
      wx.showToast({
         title: `已选择
         ${arraydate[0]}年${arraydate[1]}月${arraydate[2]}日${arraydate[3]}时${arraydate[4]}分`,
         icon: "none",
         duration: 1000
       })
    },
    formatDate(date) {
      date = new Date(date);
      //1year = 31536000000
      //1day = 86400000
      var mintues =  Math.floor(((date.getTime()%86400000)/60000)-960)
      if (mintues < 0) mintues += 1440 //7hour = 420, 8hour = -960, 23hour = -60
      var hours = Math.floor(mintues/60)
      mintues %= 60
      var year = 2013 + Math.floor((date.getTime()-1359129600000)/31536000000);
      var arraydate = [`${year}`,`${date.getMonth() + 1}`,`${date.getDate()}`,`${hours}`,`${mintues}`]
      return arraydate;
    },

    onInput(event) {
      this.setData({
        currentDate: event.detail,
      });
    },

   in(){
      this.setData({
         [`bill.income`]: "(166, 241, 52)"
      })
   },
   out(){
      this.setData({
         [`bill.income`]: "(238, 97, 97)"
      })
   },
   iconclick(e){
      var type = e.target.dataset.type;
      var i=1, path
      for (var item in this.data.icons.a){ //first 4
         path = "icons.a." + item
         if (type == item){ //selected one
            this.setData({
               [`${path}`]: `../../images/${i+8}.png`, //turn to green icon
               [`bill.icon`]: `../../images/${i}.png`,
               [`bill.type`]: item
            })
         }else{
            this.setData({
               [`${path}`]: `../../images/${i}.png`, //turn to normal icon
            })
         }
         i++
      }
      for (var item in this.data.icons.b){ //second 4
         path = "icons.b." + item
         if (type == item){
            this.setData({
               [`${path}`]: `../../images/${i+8}.png`,
               [`bill.icon`]: `../../images/${i}.png`,
               [`bill.type`]: item
            })
         }else{
            this.setData({
               [`${path}`]: `../../images/${i}.png`
            })
         }
         i++
      }
   },
   textinput(e){
			this.setData({     
            text: e.detail.value,
            [`bill.notes`]: e.detail.value
			})
   },
   cnum(e){
      var num;
      if (e.target.dataset.input == " 0 "){
         num = 0;
      }else num = e.target.dataset.input
      if (this.data.bill.money === 0){
         this.setData({
            [`bill.money`]: num
         })
      }else{
         this.setData({
            [`bill.money`]: this.data.bill.money + num
         })
      }
   },
   cclear(){
      this.setData({
         [`bill.money`]: 0,
         dot: false
      })
   },
   cdot(){
      if (!this.data.dot){
         this.setData({
            [`bill.money`]: this.data.bill.money + ".",
            dot: true
         })
      }else{
         wx.showToast({
            title: "已有小数点",
            icon: "error",
            duration: 800
          })
      }
   },
   cplusminus(e){
      var str = this.data.bill.money
      if (str == 0) return
      if (str[str.length-1] == "+" || str[str.length-1] == "-"){ //like 123+ or 342.23-
         wx.showToast({
            title: "加或减号重叠了",
            icon: "error",
            duration: 800
          })
      }else{
        var result = 0
         if (str.includes('+')){
            var nums = str.split('+')
            result = parseFloat(nums[0])+parseFloat(nums[1])
            result = Math.round(result*100)/100 //小数点2位
            this.setData({
               [`bill.money`]: `${result}`
            })
         }else if (str.includes('-')){
            var nums = str.split('-')
            result = nums[0]-nums[1]
            result = Math.round(result*100)/100
            if (result < 0){
               result = Math.abs(result) 
               if (this.data.bill.income == "(238, 97, 97)"){ //turn to opposite color
                  this.setData({ [`bill.income`]: "(166, 241, 52)" })
               }else this.setData({  [`bill.income`]: "(238, 97, 97)" })
            }
            this.setData({
               [`bill.money`]: `${result}`
            })
         }
         this.setData({
            dot: false,
            [`bill.money`]: this.data.bill.money + e.target.dataset.input //add "+" or "-"
         })
      }
   },
   reset(){
     var currentDate = new Date().getTime()
      var arraydate = this.formatDate(currentDate)
      this.setData({
        currentDate: currentDate,
         [`bill.date.year`]: `${arraydate[0]}`,
         [`bill.date.month`]: `${arraydate[1]}`,
         [`bill.date.day`]: `${arraydate[2]}`,
         [`bill.date.hour`]: `${arraydate[3]}`,
         [`bill.date.mintue`]: `${arraydate[4]}`,
         [`bill.money`]: 0,
         [`bill.income`]: "(238, 97, 97)",
         [`bill.notes`]: '',
         dot: false,
         text: ''
      });
   },
   cdone(){
      var bill = JSON.parse(JSON.stringify(this.data.bill))
      console.log("current bill", bill)
      var datetext, income="支出"
      if (bill.money == 0){
         wx.showToast({
           title: '钱款不能为0',
           icon: "error",
           duration: 1000
         })
         return
      }
      // money
      var str = bill.money
      if (str[str.length-1] == "+" || str[str.length-1] == "-" || str[str.length-1] == "."){
         str = str.substr(0,str.length-1)
         bill.money = str
      }
      if (str.includes('+')){
         var nums = str.split('+')
         bill.money = parseFloat(nums[0])+parseFloat(nums[1])
      }else if (str.includes('-')){
         var nums = str.split('-')
         var result = nums[0]-nums[1]
         if (result < 0){
            result = Math.abs(result)
            if (bill.income == "(238, 97, 97)"){
              bill.income = "(166, 241, 52)"
            }else bill.income = "(238, 97, 97)"
         }
         bill.money = result
      }
      bill.money = Math.round(bill.money*100)/100 //小数点2位
      // money
      if (bill.income=="(166, 241, 52)") income = "收入" //income?
      datetext = `${bill.date.year}年${bill.date.month}月${bill.date.day}日${bill.date.hour}时${bill.date.mintue}分`
      Dialog.confirm({
         selector: '#van-dialog',
         context: this,
         title: '账单',
         message: `种类：${bill.type}
         收入/支出：${income}
         钱款：${bill.money}
         时间：${datetext}
         备注：${bill.notes}`,
       }).then(() => {
           // on confirm
           const app = getApp()
             app.globalData.bills.push(bill)
            //  app.APIaddbill(139183289, bill)
            //  app.promiseAPIaddbill(139183289, bill)
             this.reset()
             console.log('用户点击确定')
         })
         .catch(() => {
           // on cancel
           console.log('用户点击取消')
         });
      
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
      this.reset()
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