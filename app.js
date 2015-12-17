var profile = require("./profile.js");
var usernames = process.argv.slice(2);
usernames.forEach(profile.get);
