function bold(text) {
  return "*" + text + "*";
}

function link(entity1, entity2) {
  var title = entity1.title;
  var link = entity1.links.html.href;

  if (entity2 && entity2.title) {
    title = entity2.title;
  } else if (entity2) {
    title = entity2;
  }

  title = title.replace(/(\[|\])/g, "\\$1");
  return "[" + title + "](" + link + ")";
}

function issueTitle(issue) {
  return "#" + issue.id + ": " + issue.title
}

function issueLink(issue) {
  return link(issue, issueTitle(issue));
}

module.exports = {
  bold: bold,
  link: link,
  issueTitle: issueTitle,
  issueLink: issueLink
}
