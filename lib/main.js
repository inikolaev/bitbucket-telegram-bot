var restify = require("restify");
var { sendMessage } = require("./telegram");
var { bitbucketHook, BitBucketWebHook } = require("./bitbucket");
var config = require("./config");

var bitBucketWebHook = new BitBucketWebHook(sendMessage);

var server = restify.createServer();
server.use(restify.plugins.fullResponse())
  .use(restify.plugins.bodyParser())
  .use(restify.plugins.queryParser())
  .post("/bitbucket", function(req, res, next) {
    if (req.query && req.query.key === config.BOT_API_KEY) {
      var event = req.header("x-event-key");
      var response = bitBucketWebHook.handle(event, req.body);
      res.status(response.status);
      res.end();
    } else {
      console.log("Invalid request");
      res.status(400);
      res.end();
    }
  });

server.listen(config.PORT, function (err) {
  if (err)
    console.error(err)
  else
    console.log('Bot in running on port ' + config.PORT)
});

