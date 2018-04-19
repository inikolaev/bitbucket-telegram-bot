var restify = require("restify");
var clients = require("restify-clients")
var querystring = require("querystring");
var {bold, link} = require("./format");

var BOT_API_KEY = process.env.BOT_API_KEY;
var TELEGRAM_API_KEY = process.env.TELEGRAM_API_KEY;
var TELEGRAM_API_URL = "https://api.telegram.org";
var TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

var client = clients.createJsonClient({url: TELEGRAM_API_URL});

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
  "repo:push"     : handleRepoPush,
  "issue:created" : handleIssueCreated,
  "issue:updated" : handleIssueUpdated,
  "issue:comment_created": handleIssueCommentCreated,
  "pullrequest:approved": handlePullRequestApproved,
  "pullrequest:created": handlePullRequestCreated,
  "pullrequest:updated": handlePullRequestUpdated,
  "pullrequest:comment_created": handlePullRequestCommentCreated,
  "pullrequest:comment_updated": handlePullRequestCommentUpdated,
  "pullrequest:fulfilled": handlePullRequestMerged
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
            handler(req, res);
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

function handleRepoPush(req, res) {
  var event = req.body;

  // TODO: Don't remember what did I want to do with this
  //  var changes = event.push && event.push.changes ? event.push.changes : [];
  //  changes.forEach(function(change) {
  //    var commits = change.commits || [];
  //  });

  // BitBucket is sending two messages with repo:push event, but we only want to handle one
  if (event.push && event.push.changes && event.push.changes.length == 1 && !event.push.changes[0].new) {
    console.log("No new changes present in the event, skipping");
    return;
  }

  var message = bold(event.actor.display_name)
              + " pushed changes into "
              + event.push.changes[0].new.type
              + link(event.push.changes[0].new.name, event.push.changes[0].new)
              + " in repository " + link(event.repository.name, event.repository.links);

  sendMessage(message);
}

function handleIssueCreated(req, res) {
  var event = req.body;
  var message = bold(event.actor.display_name) + " created a new issue " + link(event.issue);

  sendMessage(message);
}

function handleIssueUpdated(req, res) {
  var event = req.body;

  if (event.changes && event.changes.status && event.changes.status.new === "resolved") {
    var message = bold(event.actor.display_name) + " resolved issue " + link(event.issue);
  } else {
    var message = bold(event.actor.display_name) + " updated issue " + link(event.issue);
  }

  sendMessage(message);
}

function handleIssueCommentCreated(req, res) {
  var event = req.body;
  var message = bold(event.actor.display_name) + " added a new comment to the issue " + link(event.comment, event.issue); 

  sendMessage(message);  
}

function handlePullRequestApproved(req, res) {
  var event = req.body;
  var message = bold(event.actor.display_name) + " approved pull request " + link(event.pullrequest);

  sendMessage(message);
}

function handlePullRequestCreated(req, res) {
  var event = req.body;
  var message = bold(event.actor.display_name) + " created a new pull request " + link(event.pullrequest);

  sendMessage(message);
}

function handlePullRequestUpdated(req, res) {
  var event = req.body;
  var message = bold(event.actor.display_name) + " updated pull request " + link(event.pullrequest);

  sendMessage(message);
}

function handlePullRequestCommentCreated(req, res) {
  var event = req.body;
  var message = bold(event.actor.display_name) + " commented on a pull request " + link(event.comment, event.pullrequest);

  sendMessage(message);
}

function handlePullRequestCommentUpdated(req, res) {
  var event = req.body;
  var message = bold(event.actor.display_name) + " updated comment on a pull request " + link(event.comment, event.pullrequest);

  sendMessage(message);
}

function handlePullRequestMerged(req, res) {
  var event = req.body;
  var message = bold(event.actor.display_name) + " merged pull request " + link(event.pullrequest);

  sendMessage(message);
}

function sendMessage(text) {
  console.log("Message to be set: " + text);

  var client = clients.createClient({url: TELEGRAM_API_URL, headers: {"Content-Type": "application/x-www-form-urlencoded"}});
  client.post("/bot" + TELEGRAM_API_KEY + "/sendMessage", function(err, req) {
    req.on('result', function(err, res) {
      res.body = '';
      //res.setEncoding('utf8');
      res.on('data', function(chunk) {
        res.body += chunk;
      });

      res.on('end', function() {
        console.log(res.body);
      });
    });

    response = querystring.stringify({chat_id: TELEGRAM_CHAT_ID, text: text, parse_mode: "Markdown"});
    console.log(response);
    req.write(response);
    req.end();
  });
}
