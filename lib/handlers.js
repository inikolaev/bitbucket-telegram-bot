var { bold, link, issueTitle, issueLink } = require("./format");

module.exports = {
  handleRepoPush: function handleRepoPush(event) {
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
                + " in repository " + link(event.repository, event.repository.name);
  },

  handleIssueCreated: function handleIssueCreated(event) {
    return bold(event.actor.display_name) + " created a new issue " + issueLink(event.issue);
  },

  handleIssueUpdated: function handleIssueUpdated(event) {
    if (event.changes && event.changes.status && event.changes.status.new === "resolved") {
      return bold(event.actor.display_name) + " resolved issue " + issueLink(event.issue);
    } else {
      return bold(event.actor.display_name) + " updated issue " + issueLink(event.issue);
    }
  },

  handleIssueCommentCreated: function handleIssueCommentCreated(event) {
    return bold(event.actor.display_name) + " added a new comment to the issue " + link(event.comment, issueTitle(event.issue)); 
  },

  handlePullRequestApproved: function handlePullRequestApproved(event) {
    return bold(event.actor.display_name) + " approved pull request " + link(event.pullrequest);
  },

  handlePullRequestCreated: function handlePullRequestCreated(event) {
    return bold(event.actor.display_name) + " created a new pull request " + link(event.pullrequest);
  },

  handlePullRequestUpdated: function handlePullRequestUpdated(event) {
    return bold(event.actor.display_name) + " updated pull request " + link(event.pullrequest);
  },

  handlePullRequestCommentCreated: function handlePullRequestCommentCreated(event) {
    return bold(event.actor.display_name) + " commented on a pull request " + link(event.comment, event.pullrequest);
  },

  handlePullRequestCommentUpdated: function handlePullRequestCommentUpdated(event) {
    return bold(event.actor.display_name) + " updated comment on a pull request " + link(event.comment, event.pullrequest);
  },

  handlePullRequestMerged: function handlePullRequestMerged(event) {
    return bold(event.actor.display_name) + " merged pull request " + link(event.pullrequest);
  }
}
