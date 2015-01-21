(function () {

  wx.ready(function () {
    wx.checkJsApi({
      jsApiList: ['chooseImage'],
      success: function(res) {
        alert(res);
      },
      fail: function () {
        console.log(arguments);
      }
    });

    wx.onMenuShareTimeline({
      title: '我的分享', // 分享标题
      link: 'http://baidu.com', // 分享链接
      imgUrl: 'http://aaa', // 分享图标
      success: function () { 
        alert(111);
      },
      cancel: function () { 
        alert(222);
      }
    });

    wx.chooseImage({
      success: function (res) {
        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
      }
    });
  });

  wx.error(function (err) {
    console.error(err);
  });

})();
