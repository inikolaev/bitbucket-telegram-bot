var { BitBucketWebHook } = require("../lib/bitbucket");
var sinon = require("sinon");
var expect = require('chai').expect;

describe('butbucket.js', function () {
  it('should call sendMessage with correct message', function () {
    var event = "repo:push";
    var payload = {
      push: {
        changes: [{
          old: {
            type: "branch",
            name: "master",
            links: {
              html: {
                href: "http://repository1.com/master"
              }
            }
          },
          new: {
            type: "branch",
            name: "master",
            links: {
              html: {
                href: "http://repository1.com/master"
              }
            }
          }
        }]
      },
      repository: {
        title: "Repository 1",
        links: {
          html: {
            href: "http://repository1.com"
          }
        }
      },
      actor: {
        display_name: "John Dow"
      }
    };

    var sendMessage = sinon.stub();
    var bitbucket = new BitBucketWebHook(sendMessage);
    var response = bitbucket.handle(event, payload);
    expect(response.status).to.equal(200);
    sinon.assert.calledWith(sendMessage, "*John Dow* pushed changes into branch [master](http://repository1.com/master) in repository [Repository 1](http://repository1.com)");
  });

  it('should not call sendMessage for duplicate repo:push event', function () {
    var event = "repo:push";
    var payload = {
      push: {
        changes: [{
          old: {
            type: "branch",
            name: "master",
            links: {
              html: {
                href: "http://repository1.com/master"
              }
            }
          }
        }]
      },
      repository: {
        title: "Repository 1",
        links: {
          html: {
            href: "http://repository1.com"
          }
        }
      },
      actor: {
        display_name: "John Dow"
      }
    };

    var sendMessage = sinon.stub();
    var bitbucket = new BitBucketWebHook(sendMessage);
    var response = bitbucket.handle(event, payload);
    expect(response.status).to.equal(200);
    sinon.assert.notCalled(sendMessage);
  });

  it('should not call sendMessage when unknown event is processed', function () {
    var event = "unknown";
    var sendMessage = sinon.stub();
    var bitbucket = new BitBucketWebHook(sendMessage);
    var response = bitbucket.handle(event, {});
    expect(response.status).to.equal(200);
    sinon.assert.notCalled(sendMessage);
  });

  it('should not call sendMessage when empty event payload is processed', function () {
    var event = "repo:push";
    var sendMessage = sinon.stub();
    var bitbucket = new BitBucketWebHook(sendMessage);
    var response = bitbucket.handle(event, {});
    expect(response.status).to.equal(200);
    sinon.assert.notCalled(sendMessage);
  });
});
