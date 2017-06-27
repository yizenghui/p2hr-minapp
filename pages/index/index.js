//index.js
var url = "https://127.0.0.1:1323";
//为了您的密钥安全，建议使用服务端代码中转请求，事例代码可参考 https://code.juhe.cn/ ，该key仅为测试使用
var apiKey = "yourKey";    //输入自己的key

Page({
  data: {
    scrollTop: 0,
    queryContent:"",
    hasUserInfo: false,
    inputShowed: false,
    inputValue: '',
    jobs: [],
    condition: true,
    limit:10,
    offset:0,
    lat: 23.169929,
    lng: 113.41264360,
    distance: 5000,
    noMoreLoad:false, // 提醒已经不能加载更多内容了
    showLoadMore:false,// 显示加载更多内容

    distanceSelect: ['驾车', '自行车', '步行', '巴士'],
    distanceIndex: 0,
    distanceText: '出行方式',
    queryDistanceSelect: [10000, 5000, 1000, 20000],
    queryDistanceIndex: 10000,// 办工地点与搜索位置距离
    paySelect: ['待遇不限', '1k以下', '1k-2k', '2k-3k', '3k-5k', '5k-8k', '8k-12k', '12k-20k', '20k-25k', '25k以上', '面议'],
    queryPaySelect: ['0,0', '0,1000', '1000,2000', '2000,3000', '3000,5000', '5000,8000', '8000,12000', '12000,20000', '20000,25000', '25000,0', '-1,-1'],
    payIndex: 0,
    queryPayIndex: '0,0',// 
    payText: '待遇不限',
    eduSelect: ['学历不限', '高中', '技校', '中专', '大专', '本科', '硕士', '博士'],
    queryEduSelect: ['0', '201', '202', '203', '204', '205', '206', '207'],
    eduIndex: 0,
    eduText: '学历不限',
    expSelect: ['经验不限', '1年以下', '1-2年', '3-5年', '6-7年', '8-10年', '10年以上'],
    expIndex: 0,
    expText: '经验不限',

    cateSelect: [
      "类别不限",
      "经营管理类",
      "公关/市场营销类",
      "贸易/销售/业务类",
      "财务类",
      "行政/人力资源管理类",
      "文职类",
      "客户服务类",
      "工厂类",
      "计算机/互联网类",
      "电子/通讯类",
      "机械类",
      "规划/建筑/建材类",
      "房地产/物业管理类",
      "金融/经济",
      "设计类",
      "法律类",
      "酒店/餐饮类",
      "物流/交通运输类",
      "商场类",
      "电气/电力类",
      "咨询/顾问类",
      "化工/生物类",
      "文化/教育/体育/艺术类",
      "医疗卫生/护理/保健类",
      "新闻/出版/传媒类",
      "公众服务类",
      "印刷/染织类",
      "技工类",
      "其他专业类"
      ],
    queryCateSelect: ['0', '101', '102', '103', '104', '105', '106', '107', '108', '109', '110', '111', '112', '113', '114', '115', '116', '117', '118', '119', '120', '121', '122', '123', '124', '125', '126', '127', '128', '129'],
    cateIndex: 0,
    cateText: '类别不限',
    queryCateIndex: '',


    tagSelect: [
      '不限',
      "五险一金",
      "包住",
      "包吃",
      "年底双薪",
      "周末双休",
      "交通补助",
      "加班补助",
      "饭补",
      "话补",
      "房补",
    ],
    queryTagIndex: '',
    queryTagSelect: ['', '401', '402', '403', '404', '405', '406', '407', '408', '409', '410'],
    tagIndex: 0,
    tagText: '福利',


   
  },

  onLoad: function (options) {
    // Do some initialize when page load.
    this.search()
  },
  updateSearchContent: function (e) {
    this.setData({
      queryContent: e.detail.value,
      inputVal: e.detail.value,
      inputShowed: false
    });
    this.search()
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  bindPickerDistanceChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      distanceIndex: e.detail.value,
      distanceText: this.data.distanceSelect[e.detail.value],
      queryDistanceIndex: this.data.queryDistanceSelect[e.detail.value],
    })
    this.search()
  },
  bindPickerPayChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    // TODO
    this.setData({
      payIndex: e.detail.value,
      payText: this.data.paySelect[e.detail.value],
      queryPayIndex: this.data.queryPaySelect[e.detail.value],
    })
    this.search()
  }, 
  bindPickerEduChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      eduIndex: e.detail.value,
      eduText: this.data.eduSelect[e.detail.value],
    })
    this.search()
  }, 
  bindPickerExpChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      expIndex: e.detail.value,
      expText: this.data.expSelect[e.detail.value],
    })
    this.search()
  }, 
  bindPickerTagChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      tagIndex: e.detail.value,
      tagText: this.data.tagSelect[e.detail.value],
      queryTagIndex: this.data.queryTagSelect[e.detail.value],
    })
    this.search()
  },
  bindPickerCateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      cateIndex: e.detail.value,
      cateText: this.data.cateSelect[e.detail.value],
      queryCateIndex: this.data.queryCateSelect[e.detail.value],
    })
    this.search()
  },
  hideInput: function () {

    this.setData({
      inputVal: this.data.queryContent,
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  //设置输入框的值
  bindInput: function(e) {
    var that = this;
    that.setData({
      inputValue: e.detail.value
    });
  },
  infoShowTap: function (e) {
    // 获取索引值
    var idx = e.currentTarget.dataset.idx;
    //console.log(idx)
    var that = this;
    //获取数据
    var temArray = that.data.jobs;
    //console.log(that.data.jobs)
    //修改数据


    temArray[idx].showinfo = !temArray[idx].showinfo;

    console.log(temArray[idx].showinfo)
    // temArray[idx].distance = "";
    // 绑定数据
    that.setData({
      jobs: temArray
    });
  },
//点击搜索按钮调用的函数
  search:function(e){
    var that = this;

    //数据加载完成之前，显示加载中提示框
    wx.showToast({
      title: '加载中。。。',
      icon: 'loading',
      duration: 10000
    });

    // //输入框没有输入的判断
    // if(that.data.inputValue == ''){
    //     wx.hideToast();
    //     return;
    // }

    // that.data.queryPayIndex,
    var pay = that.data.queryPayIndex.split(',')
    var min_pay = pay[0]
    var max_pay = pay[1]

    var self = this 
    //发起请求，注意 wx.request发起的是 HTTPS 请求
    wx.request({
      url: url + "/jobs?q=" + that.data.inputValue + "&openid=" + apiKey,
      data: {
        lat: that.data.lat ,
        lng: that.data.lng,
        distance: that.data.queryDistanceIndex,
        tag: that.data.queryTagIndex,
        min_pay: min_pay,
        max_pay: max_pay,
        category: that.data.queryCateIndex,
         limit: that.data.limit,
         offset: 0,
         query: that.data.queryContent,

      },
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        var data = res.data;
        //将数据从逻辑层发送到视图层，同时改变对应的 this.data 的值
        that.setData({
          jobs: res.data,
          condition: false,
          noMoreLoad: false,
          showLoadMore: false
        });
        console.log(self.data.jobs)
        //数据加载成功后隐藏加载中弹框
        wx.hideToast();
      }
    })

  },
 

  // 发出一个请求
  pushJobs: function () {

    var self = this

    self.setData({
      showLoadMore: true
    })

    var pay = self.data.queryPayIndex.split(',')
    var min_pay = pay[0]
    var max_pay = pay[1]
    wx.request({
      url: url + "/jobs?q=" + self.data.inputValue + "&openid=" + apiKey,
      data: {
        lat: self.data.lat,
        lng: self.data.lng,
        distance: self.data.queryDistanceIndex,
        tag: self.data.queryTagIndex, 
        min_pay: min_pay,
        max_pay: max_pay,
        category: self.data.queryCateIndex,
        limit: self.data.limit,
        offset: self.data.offset,
        query: self.data.queryContent

      },
      success: function (result) {

        if (result.data != undefined){
          var thisDataList = self.data.jobs
          for (var i = 0; i < result.data.length; i++) {
            thisDataList.push(result.data[i])
          }

          console.log('当前的职位', self.data.jobs)
          self.setData({
            jobs: thisDataList,

            showLoadMore: false
          })
          console.log('request success', result)
        } else {
            
          self.setData({
            noMoreLoad: true,
            showLoadMore: false,// 显示加载更多内容
          })

        }
      
      },

      fail: function ({errMsg}) {
        console.log('request fail', errMsg)

      }
    })

  },

  // 上拉加载回调接口
  onReachBottom: function () {
    // 我们用total和count来控制分页，total代表已请求数据的总数，count代表每次请求的个数。
    // 上拉时需把total在原来的基础上加上count，代表从count条后的数据开始请求。
    // total += count;
    // return false
    this.data.offset = this.data.jobs.length
    if (this.data.offset>500){
      this.setData({
        noMoreLoad: true
      })
    }else{
      // 网络请求
      this.pushJobs();
    }
    console.log('offset', this.data.jobs.length )
  },
  goTop: function (e) {
    this.setData({
      scrollTop: 0
    })
  },
  scroll: function (e, res) {
    // 容器滚动时将此时的滚动距离赋值给 this.data.scrollTop
    if (e.detail.scrollTop > 500) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },
})
