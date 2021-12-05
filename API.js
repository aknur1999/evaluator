function API(link) {
  var https = require('https');
  var querystring = require('querystring');

  var data = querystring.stringify({
    url: link,
    key: "de643a433026d8373e146a8a3a6ce89d",
    level: "A"
  });

  var options = {
    host: 'tenon.io',
    port: 443,
    path: '/api/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(data)
    }
  };
  var resData = ''
  var score = 0;
  var req = https.request(options, function (res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      resData += chunk;
    });
    res.on('end', function () {
      var obj = JSON.parse(resData);
      score = (1 - (obj.resultSummary.issuesByLevel.A.count / obj.resultSummary.issuesByLevel.A.pct)) * 100;
    });
  });

  req.write(data);
  req.end();
  return score.toFixed(0);
}
