const modules = require("./modules.js")

// registeer
// mongoose Schema

const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    googleId: String,
  });
  
  // plugins for Schema
  
  userSchema.plugin(passportLocalMongoose);
  userSchema.plugin(findOrCreate);
  
  // model for Schema
  
  const user = mongoose.model("users", userSchema);
  module.exports = user
  
