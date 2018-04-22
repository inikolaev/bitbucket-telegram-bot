var restify = require("restify");
var querystring = require("querystring");
var bitbucketHook = require("./bitbucket").bitbucketHook;
var port = require("./config").PORT;

var server = restify.createServer();
server.use(restify.plugins.fullResponse())
  .use(restify.plugins.bodyParser())
  .use(restify.plugins.queryParser())
  .post("/bitbucket", bitbucketHook);

server.listen(port, function (err) {
    if (err)
      console.error(err)
    else
      console.log('Bot in running on port ' + port)
  });

