var handlers = require("./handlers");

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

class BitBucketWebHook {
  constructor(sendMessage) {
    this.sendMessage = sendMessage;
  }

  handle(event, payload) {
    console.log("Received BitBucker event: " + event);
    console.log("BitBucket event body: " + JSON.stringify(payload));
    var handler = BITBUCKET_EVENT_HANDLERS[event];

    if (handler) {
      console.log("Handler for " + event + " event exist");
      try {
        var message = handler(payload);

        if (message) {
          this.sendMessage(message);
        }
      } catch(e) {
        console.error("Failed to handle event: " + e);
      }
    } else {
      console.log("No event handler found for " + event + " event");
    }

    return { status: 200 };
  }
}

module.exports = {
  BitBucketWebHook: BitBucketWebHook
};

