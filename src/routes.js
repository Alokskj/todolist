const UserLog = require("./modals.js");
const modules = require("./modules.js")
const router = new express.Router();

let name = "User"; 

// New Strategy  

passport.use(user.createStrategy());
  
// serialize and deserialize

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, {
      id: user.id,
      username: user.username,
      picture: user.picture,
    });
  });
});

passport.deserializeUser(function (User, cb) {
  process.nextTick(async function () {
   
     const result = await user.findById(User.id)
     name = result.name
    return cb(null, User);
  });
});

// todolist home routes 

const greet = date.greet()
const workItems = [];

router.get("/", (req, res)=>{
    if(req.isAuthenticated()){
        res.redirect("/home")
    }else{
    res.render("register")}
})

router.get("/home",async function (req, res) {

    if (req.isAuthenticated()) {
        
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
        res.redirect("/home");
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
              name : name,
              professional : catogoryProfessional,
              personal : catogoryPersonal,
            });
          } catch (error) {
            console.log(error.message);
          }
        };
        readItem();
      }
    });}
    else{
        res.redirect("/")
    }
  });
  router.get("/login", (req, res)=>{
    if(req.isAuthenticated()){
      res.redirect("/")
    }else{
    
    res.render("login")
    }
  })
  router.get("/logout", function (req, res, next) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  });
  
  router.post("/post", function (req, res) {
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
      res.redirect("/home");
    } else {
      res.redirect("/home");
    }
  });
  
  router.post("/delete/:id", async (req, res) => {
    try {
      let itemId = req.params.id;
  
      const result = await tdl.findByIdAndDelete(itemId);
      
      res.redirect("/home");
    } catch (error) {
      console.log(error.message);
    }
  });
  
  router.get("/newtodo", function (req, res) {
    res.render("newtodo", { listTitle: "Work List", newListItems: workItems , greet: greet, name : name,});
  });

//   register routes

router.post("/register", async (req, res) => {
    user.register(
      { username: req.body.username, name : req.body.name },
      req.body.password,
      (err, user) => {
        if (err) {
          console.log(err);
          res.redirect("/login");
        } else {
          console.log(user.name)
          name = user.name
          passport.authenticate("local")(req, res, () => {
            res.redirect("/home");
          });
        }
      }
    );
  });

  router.post('/login', 
  passport.authenticate('local', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/home');
  });

  module.exports = router
  