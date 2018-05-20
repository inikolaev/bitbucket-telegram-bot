var config = require("./config");
var clients = require("restify-clients");

module.export = {
  sendMessage: function sendMessage(text) {
    console.log("Message to be set: " + text);

    var client = clients.createClient({url: config.TELEGRAM_API_URL, headers: {"Content-Type": "application/x-www-form-urlencoded"}});
    client.post("/bot" + config.TELEGRAM_API_KEY + "/sendMessage", function(err, req) {
      req.on('result', function(err, res) {
        res.body = '';
        //res.setEncoding('utf8');
        res.on('data', function(chunk) {
          res.body += chunk;
        });

        res.on('end', function() {
          console.log(res.body);
        });
      });

      response = querystring.stringify({chat_id: config.TELEGRAM_CHAT_ID, text: text, parse_mode: "Markdown"});
      console.log(response);
      req.write(response);
      req.end();
    });
  }
}
