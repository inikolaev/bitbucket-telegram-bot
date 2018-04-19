var {sendMessage} = require("./telegram");
var {bold, link} = require("./format");

module.exports = {
  handleRepoPush: function handleRepoPush(req, res) {
    var event = req.body;

    // TODO: Don't remember what did I want to do with this
    //  var changes = event.push && event.push.changes ? event.push.changes : [];
    //  changes.forEach(function(change) {
    //    var commits = change.commits || [];
    //  });

    // BitBucket is sending two messages with repo:push event, but we only want to handle one
    if (event.push && event.push.changes && event.push.changes.length == 1 && !event.push.changes[0].new) {
      console.log("No new changes present in the event, skipping");
      return null;
    }

    return bold(event.actor.display_name)
                + " pushed changes into "
                + event.push.changes[0].new.type + " "
                + link(event.push.changes[0].new, event.push.changes[0].new.name)
                + " in repository " + link(event.repository);
  },

  handleIssueCreated: function handleIssueCreated(req, res) {
    var event = req.body;
    return bold(event.actor.display_name) + " created a new issue " + link(event.issue);
  },

  handleIssueUpdated: function handleIssueUpdated(req, res) {
    var event = req.body;

    if (event.changes && event.changes.status && event.changes.status.new === "resolved") {
      return bold(event.actor.display_name) + " resolved issue " + link(event.issue);
    } else {
      return bold(event.actor.display_name) + " updated issue " + link(event.issue);
    }
  },

  handleIssueCommentCreated: function handleIssueCommentCreated(req, res) {
    var event = req.body;
    return bold(event.actor.display_name) + " added a new comment to the issue " + link(event.comment, event.issue); 
  },

  handlePullRequestApproved: function handlePullRequestApproved(req, res) {
    var event = req.body;
    return bold(event.actor.display_name) + " approved pull request " + link(event.pullrequest);
  },

  handlePullRequestCreated: function handlePullRequestCreated(req, res) {
    var event = req.body;
    return bold(event.actor.display_name) + " created a new pull request " + link(event.pullrequest);
  },

  handlePullRequestUpdated: function handlePullRequestUpdated(req, res) {
    var event = req.body;
    return bold(event.actor.display_name) + " updated pull request " + link(event.pullrequest);
  },

  handlePullRequestCommentCreated: function handlePullRequestCommentCreated(req, res) {
    var event = req.body;
    return bold(event.actor.display_name) + " commented on a pull request " + link(event.comment, event.pullrequest);
  },

  handlePullRequestCommentUpdated: function handlePullRequestCommentUpdated(req, res) {
    var event = req.body;
    return bold(event.actor.display_name) + " updated comment on a pull request " + link(event.comment, event.pullrequest);
  },

  handlePullRequestMerged: function handlePullRequestMerged(req, res) {
    var event = req.body;
    return bold(event.actor.display_name) + " merged pull request " + link(event.pullrequest);
  }
}
