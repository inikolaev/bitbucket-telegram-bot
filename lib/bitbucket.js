var config = require("./config");
var handlers = require("./handlers");
var sendMessage = require("./telegram").sendMessage;

var BITBUCKET_EVENT_HANDLERS = {
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

module.exports = {
  bitbucketHook: function bitbucketHook(req, res, next) {
    if (req.query && req.query.key == config.BOT_API_KEY) {
        var event = req.header("x-event-key");
        console.log("Received BitBucker event: " + event);
        console.log("BitBucket event body: " + JSON.stringify(req.body));
        var handler = BITBUCKET_EVENT_HANDLERS[event];

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
};

