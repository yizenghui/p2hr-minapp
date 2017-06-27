var url = "https://apis.juhe.cn/szbusline/bus";
//为了您的密钥安全，建议使用服务端代码中转请求，事例代码可参考 https://code.juhe.cn/ ，该key仅为测试使用
var apiKey = "yourKey";

Page({
  data: {
    stationCode: [],
    condition: false
  },
  onLoad:function(params){
    var that = this;
    wx.showToast({
      title: '加载中。。。',
      icon: 'loading',
      duration: 10000
    });

    wx.request({
      url: url + "?key=" + apiKey + "&stationCode=" + params.stationCode,
      data: {},
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {

        var data = res.data;
        // console.log(data.result.length);

        //替换字符，小程序不能识别 &gt; &nbsp; 等
        for(var i=0; i<data.result.length; i++){
          if( data.result[i].FromTo.indexOf("&gt;") > 0 ){
            data.result[i].FromTo = data.result[i].FromTo.replace(/&gt;/g,'>');
          }
        }

        that.setData({
          stationCode: data.result,
          condition: true
        });
        wx.hideToast();
      }

    })
    
  }
})

