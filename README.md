# BitBucket Telegram Bot
![Build Status](https://travis-ci.com/inikolaev/bitbucket-telegram-bot.svg?branch=master)
![Code Coverage](https://codecov.io/gh/inikolaev/bitbucket-telegram-bot/branch/master/graph/badge.svg)

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

### Running locally with `npm`

```
# Install dependencies, but skip optional ones
npm install --no-optional

# Start bot 
# Note: set environment variables mentioned above in order to test integration with Telegram
npm start

# Here's how you can set environment variables to test integration, `BOT_API_KEY` is optional
TELEGRAM_API_KEY=<Your Auth Token> TELEGRAM_CHAT_ID=<Your Chat ID> npm start
```

### Running locally with Docker

```
# First build Docker image
docker build -t bitbucket-telegram-bot .

# Start bot
# Note: set environment variables mentioned above in order to test integration with Telegram
docker run -it -p 5000:5000 bitbucket-telegram-bot

# Here's how you can set environment variables to test integration, `BOT_API_KEY` is optional
docker run -it \
           -p 5000:5000 \
           -e TELEGRAM_API_KEY=<Your Auth Token> \
           -e TELEGRAM_CHAT_ID=<Your Chat ID> \
           bitbucket-telegram-bot
```

## Deployment

### Deployment to Heroku

```bash
# Log into Heroku
heroku login

# Log into Heroku container registry
heroku container:login

# Build Docker image and push it into Heroku contaienr registry
heroku container:push --app <Heroku Application Name> web
```
