var url = "https://127.0.0.1:1323";
//为了您的密钥安全，建议使用服务端代码中转请求，事例代码可参考 https://code.juhe.cn/ ，该key仅为测试使用

var apiKey = "yourKey";

Page({
  data: {
    jobinfo: false,
      
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
      url: url + "/job/" + params.id + "?key=" + apiKey,
      data: {},
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        var data = res.data;
        if (data.education==""){
          data.education = "学历不限"
        }
        if (data.experience == "") {
          data.experience = "经验不限"
        }
        that.setData({
          jobinfo: res.data,
          condition: true
        });
        wx.hideToast();
      }
    })
    
  }
})

