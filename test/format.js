var expect = require('chai').expect;
var { bold, link, issueLink } = require('../lib/format');

describe('format.js', function () {
  it('should format text as bold', function () {
    expect(bold("text")).to.be.equal("*text*");
  });

  it('should format entity as a link', function () {
    var entity = {
      title: "Entity title",
      links: {
        html: {
          href: "http://example.com"
        }
      }
    };

    expect(link(entity)).to.be.equal("[Entity title](http://example.com)");
  });

  it('should take url from one entity and title from another', function () {
    var entity1 = {
      title: "Entity1 title",
      links: {
        html: {
          href: "http://entity1.com"
        }
      }
    };

    var entity2 = {
      title: "Entity2 title",
      links: {
        html: {
          href: "http://entity2.com"
        }
      }
    };

    expect(link(entity1, entity2)).to.be.equal("[Entity2 title](http://entity1.com)");
  });

  it('should take url from entity and title from second argument', function () {
    var entity = {
      title: "Entity title",
      links: {
        html: {
          href: "http://example.com"
        }
      }
    };

    expect(link(entity, "Custom title")).to.be.equal("[Custom title](http://example.com)");
  });

  it('should escape special characters in link', function () {
    var entity = {
      title: "Entity title with [square] brackets",
      links: {
        html: {
          href: "http://example.com"
        }
      }
    };

    expect(link(entity)).to.be.equal("[Entity title with \\[square\\] brackets](http://example.com)");
  });

  it('should format issue link', function() {
    var issue = {
      id: 1,
      title: "Issue title",
      links: {
        html: {
          href: "http://example.com/issues/1"
        }
      }
    };

    expect(issueLink(issue)).to.be.equal("[#1: Issue title](http://example.com/issues/1)");
  });
});
