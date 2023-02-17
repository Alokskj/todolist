const router = require("./routes");

require("dotenv").config()
module.exports =  app.set("view engine", "ejs");
module.exports =  app.use(bodyParser.urlencoded({ extended: true }));
module.exports =  app.use(express.static("public"))
module.exports =  app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: false,
  })
);
module.exports =  app.use(passport.initialize());
module.exports =  app.use(passport.session());
module.exports =  app.use(router);
