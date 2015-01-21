(function () {
  var appId = getMetaContent('meta[name="appId"]');
  var timestamp = parseInt(getMetaContent('meta[name="timestamp"]'));
  var nonceStr = getMetaContent('meta[name="nonceStr"]');
  var signature = getMetaContent('meta[name="signature"]');

  function getMetaContent(name) {
    return document.querySelector(name).getAttribute('content');
  }

  wx.config({
      debug: true,
      appId: appId,
      timestamp: timestamp,
      nonceStr: nonceStr,
      signature: signature,
      jsApiList: [
        'checkJsApi',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'hideMenuItems',
        'showMenuItems',
        'hideAllNonBaseMenuItem',
        'showAllNonBaseMenuItem',
        'translateVoice',
        'startRecord',
        'stopRecord',
        'onRecordEnd',
        'playVoice',
        'pauseVoice',
        'stopVoice',
        'uploadVoice',
        'downloadVoice',
        'chooseImage',
        'previewImage',
        'uploadImage',
        'downloadImage',
        'getNetworkType',
        'openLocation',
        'getLocation',
        'hideOptionMenu',
        'showOptionMenu',
        'closeWindow',
        'scanQRCode',
        'chooseWXPay',
        'openProductSpecificView',
        'addCard',
        'chooseCard',
        'openCard'
      ]
  });
})();
