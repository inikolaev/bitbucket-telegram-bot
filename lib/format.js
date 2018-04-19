module.exports = {
  bold: function bold(text) {
    return "*" + text + "*";
  },

  link: function link(entity1, entity2) {
    var title = entity1.title;
    var link = entity1.links.html.href;

    if (entity2 && entity2.title) {
      title = entity2.title;
    } else if (entity2) {
      title = entity2;
    }

    return "[" + title + "](" + link + ")";
  }
}
