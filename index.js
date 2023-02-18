//jshint esversion:6
const modules = require("./src/modules.js")
const uses = require("./src/uses.js")

app.use('/public', express.static(path.join(process.cwd(), "public")))


app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});
