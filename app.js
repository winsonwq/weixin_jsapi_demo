var sha1 = require('sha1');
var rndm = require('rndm');
var request = require('request');
var express = require('express');
var app = express();

var config = require('./config');

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
// just for demo
app.use(express.static('.'));

app.get('/entry', function(res, resp, next) {
  var query = res.query;
  var token = 'helloworld';
  var sha1Encoded = sha1([token, query.nonce, query.timestamp].sort().join(''));

  if (query.signature == sha1Encoded) {
    resp.status(200).end(query.echostr);
  } else {
    resp.end();
  }

});

app.post('/entry', function(res, resp, next) {
  console.log(res);
  resp.end();
});

app.get('/', function(res, resp) {
  var ticket = app.get('jsApiTicket');
  resp.render('index', { desc: ticket, appInfo: appInfo(config.appId, config.appsecret, ticket, 'http://' + res.headers.host + res.url) });
});

// TODO: refresh js api ticket
prepareBeforeStartServer(function () {
  app.listen(3000);
});

function prepareBeforeStartServer(cb) {
  getJSApiTicket(config.appId, config.appsecret, function (err, ticket) {
    app.set('jsApiTicket', ticket);
    cb && cb();
  });
}

function appInfo(appId, appsecret, jsapiTicket, currentUrl) {
  var timestamp = Date.now();
  timestamp = parseInt(timestamp.toString().substring(0, timestamp.toString().length - 3));
  var nonceStr = rndm(10);

  var signature = sha1Signature({
    "noncestr": nonceStr,
    "timestamp": timestamp,
    "jsapi_ticket": jsapiTicket,
    "url": currentUrl
  });

  return {
    appId: appId,
    appsecret: appsecret,
    timestamp: timestamp,
    nonceStr: nonceStr,
    signature: signature
  };
}

function sha1Signature(keyValuePairs) {
  var encodeStr = Object.keys(keyValuePairs).sort().map(function (key) {
    return key + '=' + keyValuePairs[key];
  }).join('&');

  console.log(encodeStr);
  return sha1(encodeStr);
}

function getJSApiTicket(appId, appsecret, cb) {
  var requestUrl = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + appId + "&secret=" + appsecret;
  request.get(requestUrl, { json: true }, function (err, resp, body) {
    var accessToken = body.access_token
    var jssdkRequestUrl = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=" + accessToken + "&type=jsapi";
    request.get(jssdkRequestUrl, { json: true }, function (err, resp, body) {
      cb && cb(err, body.ticket);
    });
  });
}
