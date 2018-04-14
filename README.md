# BitBucket Telegram Bot

Bot which receives BitBucket events and retraslates them into Telegram chat. The following events are supported:

* `repo:push` 
* `issue:created`
* `issue:updated`
* `issue:comment_created`
* `pullrequest:created`
* `pullrequest:updated`
* `pullrequest:comment_created`
* `pullrequest:comment_updated`
* `pullrequest:fulfilled`

## Configuration


## Running the bot



## Deployment

### Deployment to Heroku

```bash
heroku login
heroku container:push --app <Heroku Application Name> web
```
