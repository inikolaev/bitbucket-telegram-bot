# BitBucket Telegram Bot

Bot which receives BitBucket events and retraslates them into Telegram chat. The following events are supported:

* `repo:push` 
* `issue:created`
* `issue:updated`
* `issue:comment_created`
* `pullrequest:approved`
* `pullrequest:created`
* `pullrequest:updated`
* `pullrequest:comment_created`
* `pullrequest:comment_updated`
* `pullrequest:fulfilled`

## Configuration

Bot can be configured with the following environment variables:

* `BOT_API_KEY` - An API key of the bot to prevent unauthorized access
* `TELEGRAM_API_KEY` - Authentication token used to make requests to [Telegram Bot API](https://core.telegram.org/bots/api)
* `TELEGRAM_CHAT_ID` - The ID of a Telegram chat where bot should send messages to

## Running the bot



## Deployment

### Deployment to Heroku

```bash
heroku login
heroku container:push --app <Heroku Application Name> web
```
