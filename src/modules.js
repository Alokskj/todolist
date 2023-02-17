module.exports =  express = require("express");
module.exports =  bodyParser = require("body-parser");
module.exports =  date = require("./date.js");
module.exports =  tdl = require("./work.js");
module.exports =  mongoose = require("mongoose");
module.exports =  app = express();
module.exports =  path = require('path');
module.exports =  session = require("express-session");
module.exports =  passport = require("passport");
module.exports =  passportLocalMongoose = require("passport-local-mongoose");
module.exports =  GoogleStrategy = require('passport-google-oauth20').Strategy;
module.exports =  findOrCreate = require("mongoose-findorcreate")
module.exports =  user = require("./modals.js");
module.exports =  port = process.env.PORT || 3000;
