var https = require("https");
var http = require("http");

var username = "robbob";

function printMessage(username, badgeCount, points) {
  var message = username + " has " + badgeCount + " total badge(s) and " + points + " points in JavaScript";
  console.log(message);
}

function printError(error) {
  console.error(error.message);
}

var request = https.get("https://teamtreehouse.com/" + username + ".json", function(response) {
  var body = "";
  response.on("data", function(chunk) {
    body += chunk;
  });

  response.on("end", function() {
    if (response.statusCode === 200) {
      try {
        var profile = JSON.parse(body);
        printMessage(username, profile.badges.length, profile.points.JavaScript);
      } catch(error) {
        //parsing error
        printError(error);
      }
    } else {
      //username does not exist error
      printError({message: "There was a problem getting a profile for username " + username + ". (" + response.statusCode + ": " + http.STATUS_CODES[response.statusCode] + ")"});
    }
  });

  //connection error
  request.on("error", printError);
});

