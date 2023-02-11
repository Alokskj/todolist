//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require("./src/date.js");
const tdl = require("./src/work.js");
const mongoose = require("mongoose");
const app = express();
const path = require('path');

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname))


mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb+srv://vercel-admin-user:M4zoQK9SxvK4K6TY@cluster0.s2kgswl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
  .then(console.log("connected to mongodb"))
  .catch((err) => {
    console.log(err);
  });

const workItems = []; 
const greet = date.greet()

// tdl.createItem();
// tdl.readItem();
// tdl.updateItem("63e3b48bd4fbb0480e152bf3", 'hello goodmorning Alok');
// tdl.deleteItem('Welcome to your todolist')

app.get("/", function (req, res) {
  const day = date.getDate();
  tdl.find({}, (err, doc) => {
    if (doc.length === 0) {
      const createItem = async () => {
        try {
          const item1 = new tdl({
            name: "Welcome to your todolist",
            catogory: "Global",
          });
          const item2 = new tdl({
            name: "Get your personal tasks here",
            catogory: "Personal",
          });
          const item3 = new tdl({
            name: "Get your personal tasks here",
            catogory: "Professional",
          });


          const defaultItems = [item1, item2, item3];
          const result = await tdl.insertMany(defaultItems);
          
        } catch (error) {
          console.log(error.message);
        }
      };
      createItem();
      res.redirect("/");
    } else {
      const readItem = async () => {
        try {
          const result = (await tdl.find()).length;
          const catogoryProfessional = await tdl.find({catogory: 'Professional'}).sort({date:1})
          const catogoryPersonal = await tdl.find({catogory: 'Personal'}).sort({date:1})
          
          res.render("list", {
            listTitle: day,
            newListItems: doc,
            count: result,
            greet: greet,
            professional : catogoryProfessional,
            personal : catogoryPersonal,
          });
        } catch (error) {
          console.log(error.message);
        }
      };
      readItem();
    }
  });
});

app.post("/post", function (req, res) {
  const itemName = req.body.newTodoTitle;
  const itemCatogory = req.body.catogory;
  const itemdate = req.body.date;
  const itemdescription = req.body.newTodoDescription;
  if (itemName.length !== 0) {
    const itemUser = new tdl({
      name: itemName,
      catogory: itemCatogory,
      date: itemdate,
      description: itemdescription,
    });
    itemUser.save();
    res.redirect("/");
  } else {
    res.redirect("/");
  }
});

app.post("/delete/:id", async (req, res) => {
  try {
    let itemId = req.params.id;

    const result = await tdl.findByIdAndDelete(itemId);
    
    res.redirect("/");
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/newtodo", function (req, res) {
  res.render("newtodo", { listTitle: "Work List", newListItems: workItems , greet: greet});
});

// app.get("/about", function(req, res){
//   res.render("about");
// });

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
