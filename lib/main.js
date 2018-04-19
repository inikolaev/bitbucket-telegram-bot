var restify = require("restify");
var querystring = require("querystring");
var handlers = require("./handlers");
var sendMessage = require("./telegram").sendMessage;

var BOT_API_KEY = process.env.BOT_API_KEY;
var TELEGRAM_API_KEY = process.env.TELEGRAM_API_KEY;
var TELEGRAM_API_URL = "https://api.telegram.org";
var TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

var server = restify.createServer();
server
    .use(restify.plugins.fullResponse())
    .use(restify.plugins.bodyParser())
    .use(restify.plugins.queryParser())
    .post("/bitbucket", bitbucketHook);

var port = process.env.PORT || 5000;
server.listen(port, function (err) {
    if (err)
        console.error(err)
    else
        console.log('App is ready at : ' + port)
});

var bitbucketEventHandlers = {
  "repo:push"     : handlers.handleRepoPush,
  "issue:created" : handlers.handleIssueCreated,
  "issue:updated" : handlers.handleIssueUpdated,
  "issue:comment_created": handlers.handleIssueCommentCreated,
  "pullrequest:approved": handlers.handlePullRequestApproved,
  "pullrequest:created": handlers.handlePullRequestCreated,
  "pullrequest:updated": handlers.handlePullRequestUpdated,
  "pullrequest:comment_created": handlers.handlePullRequestCommentCreated,
  "pullrequest:comment_updated": handlers.handlePullRequestCommentUpdated,
  "pullrequest:fulfilled": handlers.handlePullRequestMerged
};

function bitbucketHook(req, res, next) {
    if (req.query && req.query.key == BOT_API_KEY) {
        var event = req.header("x-event-key");
        console.log("Received BitBucker event: " + event);
        console.log("BitBucket event body: " + JSON.stringify(req.body));
        var handler = bitbucketEventHandlers[event];

        if (handler) {
          console.log("Handler for " + event + " event exist");
          try {
            var message = handler(req, res);

            if (message) {
              sendMessage(message);
            }
          } catch(e) {
            console.error("Failed to handle event: " + e);
          }
        } else {
          console.log("No event handler found for " + event + " event");
        }

        res.status(200);
        res.end();
    } else {
        console.log("Received invalid request");
        res.status(400);
        res.json({
            type: true,
            data: "Received invalid request"
        });
    }
}

