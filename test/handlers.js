var expect = require('chai').expect;
var telegram = require('../lib/telegram');
var handlers = require('../lib/handlers');

describe('handlers.js', function() {
  it('should return pushed changes to repository message', function () {
    var request = {
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
          name: "Repository 1",
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
    var message = handlers.handleRepoPush(request);
    expect(message).to.be.equal("*John Dow* pushed changes into branch [master](http://repository1.com/master) in repository [Repository 1](http://repository1.com)");
  });

  it('should return no message for duplicated repo:push event', function () {
    var request = {
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
          name: "Repository 1",
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
    var message = handlers.handleRepoPush(request);
    expect(message).to.be.null;
  });

  it('should return issue created message', function () {
    var request = {
        issue: {
          id: 1,
          title: "Issue 1",
          links: {
            html: {
              href: "http://repository1.com/issues/1"
            }
          }
        },
        actor: {
          display_name: "John Dow"
        }
    };
    var message = handlers.handleIssueCreated(request);
    expect(message).to.be.equal("*John Dow* created a new issue [Issue 1](http://repository1.com/issues/1)");
  });

  it('should return issue updated message', function () {
    var request = {
        issue: {
          id: 1,
          title: "Issue 1",
          links: {
            html: {
              href: "http://repository1.com/issues/1"
            }
          }
        },
        actor: {
          display_name: "John Dow"
        }
    };
    var message = handlers.handleIssueUpdated(request);
    expect(message).to.be.equal("*John Dow* updated issue [Issue 1](http://repository1.com/issues/1)");
  });

  it('should return issue resolved message', function () {
    var request = {
        issue: {
          id: 1,
          title: "Issue 1",
          links: {
            html: {
              href: "http://repository1.com/issues/1"
            }
          }
        },
        changes: {
          status: {
            new: "resolved"
          }
        },
        actor: {
          display_name: "John Dow"
        }
    };
    var message = handlers.handleIssueUpdated(request);
    expect(message).to.be.equal("*John Dow* resolved issue [Issue 1](http://repository1.com/issues/1)");
  });

  it('should return issue comment created message', function () {
    var request = {
        issue: {
          id: 1,
          title: "Issue 1",
          links: {
            html: {
              href: "http://repository1.com/issues/1"
            }
          }
        },
        comment: {
          title: "Comment 1",
          links: {
            html: {
              href: "http://repository1.com/issues/1#comment-1"
            }
          }
        },
        actor: {
          display_name: "John Dow"
        }
    };
    var message = handlers.handleIssueCommentCreated(request);
    expect(message).to.be.equal("*John Dow* added a new comment to the issue [Issue 1](http://repository1.com/issues/1#comment-1)");
  });

  it('should return pull request approved message', function () {
    var request = {
        pullrequest: {
          id: 1,
          title: "Pull Request 1",
          links: {
            html: {
              href: "http://repository1.com/pull-requests/1"
            }
          }
        },
        actor: {
          display_name: "John Dow"
        }
    };
    var message = handlers.handlePullRequestApproved(request);
    expect(message).to.be.equal("*John Dow* approved pull request [Pull Request 1](http://repository1.com/pull-requests/1)");
  });

  it('should return pull request created message', function () {
    var request = {
        pullrequest: {
          id: 1,
          title: "Pull Request 1",
          links: {
            html: {
              href: "http://repository1.com/pull-requests/1"
            }
          }
        },
        actor: {
          display_name: "John Dow"
        }
    };
    var message = handlers.handlePullRequestCreated(request);
    expect(message).to.be.equal("*John Dow* created a new pull request [Pull Request 1](http://repository1.com/pull-requests/1)");
  });

  it('should return pull request updated message', function () {
    var request = {
        pullrequest: {
          id: 1,
          title: "Pull Request 1",
          links: {
            html: {
              href: "http://repository1.com/pull-requests/1"
            }
          }
        },
        actor: {
          display_name: "John Dow"
        }
    };
    var message = handlers.handlePullRequestUpdated(request);
    expect(message).to.be.equal("*John Dow* updated pull request [Pull Request 1](http://repository1.com/pull-requests/1)");
  });

  it('should return pull request comment created message', function () {
    var request = {
        pullrequest: {
          id: 1,
          title: "Pull Request 1",
          links: {
            html: {
              href: "http://repository1.com/pull-requests/1"
            }
          }
        },
        comment: {
          title: "Comment 1",
          links: {
            html: {
              href: "http://repository1.com/pull-requests/1#comment-1"
            }
          }
        },
        actor: {
          display_name: "John Dow"
        }
    };
    var message = handlers.handlePullRequestCommentCreated(request);
    expect(message).to.be.equal("*John Dow* commented on a pull request [Pull Request 1](http://repository1.com/pull-requests/1#comment-1)");
  });

  it('should return pull request comment updated message', function () {
    var request = {
        pullrequest: {
          id: 1,
          title: "Pull Request 1",
          links: {
            html: {
              href: "http://repository1.com/pull-requests/1"
            }
          }
        },
        comment: {
          title: "Comment 1",
          links: {
            html: {
              href: "http://repository1.com/pull-requests/1#comment-1"
            }
          }
        },
        actor: {
          display_name: "John Dow"
        }
    };
    var message = handlers.handlePullRequestCommentUpdated(request);
    expect(message).to.be.equal("*John Dow* updated comment on a pull request [Pull Request 1](http://repository1.com/pull-requests/1#comment-1)");
  });

  it('should return pull request merged message', function () {
    var request = {
        pullrequest: {
          id: 1,
          title: "Pull Request 1",
          links: {
            html: {
              href: "http://repository1.com/pull-requests/1"
            }
          }
        },
        comment: {
          title: "Comment 1",
          links: {
            html: {
              href: "http://repository1.com/pull-requests/1#comment-1"
            }
          }
        },
        actor: {
          display_name: "John Dow"
        }
    };
    var message = handlers.handlePullRequestMerged(request);
    expect(message).to.be.equal("*John Dow* merged pull request [Pull Request 1](http://repository1.com/pull-requests/1)");
  });
});
