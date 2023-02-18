const modules = require("./modules.js");
const router = new express.Router();

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
    return cb(null, User);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/secrets",
    },
    function (accessToken, refreshToken, profile, cb) {
      user.findOrCreate(
        {
          googleId: profile.id,
          name: profile._json.name,
          picture: profile._json.picture,
        },
        function (err, user) {
          return cb(err, user);
        }
      );
    }
  )
);

// todolist home routes

const greet = date.greet();
const workItems = [];
 //Defalt logo
let logo = "https://www.skjsmp.gq/media/avatar/millu.jpg"
router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/home");
  } else {
    res.render("register");
  }
});

router.get("/home", async function (req, res) {
  if (req.isAuthenticated()) {
    const day = date.getDate();



    user.find({_id : req.user.id}, (err, doc) => {
      if (doc[0].todo.length === 0) {
        const createItem = async () => {
          try {
            const item1 = {
              name: "Welcome to your todolist",
              catogory: "Global",
            };
            const item2 = {
              name: "Get your personal tasks here",
              catogory: "Personal",
            };
            const item3 = {
              name: "Get your Professional tasks here",
              catogory: "Professional",
            };

            const defaultItems = [item1, item2, item3];

            user.findOneAndUpdate(
              { _id: req.user.id },
              { $push: { todo: defaultItems } },
              function (error, success) {
                if (error) {
                  console.log(error);
                } else {
                  console.log(success);
                }
              }
            );

          } catch (error) {
            console.log(error.message);
          }
        };
        createItem();
        res.redirect("/home");
      } else {
        const readItem = async () => {
          try {
            const currentUser = await user.findById(req.user.id);
            const result =  currentUser.todo.length;

            //global match
            const allitems = doc[0].todo

           // catogory match
            let catogoryPersonal = allitems.filter((e)=>{
              return e.catogory === "personal"
            });
            catogoryPersonal = catogoryPersonal.sort((a, b) => {
              return b.time - a.time
            });
            
            let catogoryProfessional = allitems.filter((e)=>{
              return e.catogory === "professional"
            });
            catogoryProfessional = catogoryProfessional.sort((a, b) => {
              return b.time - a.time
            });

           if(currentUser.picture !== undefined){
            logo = currentUser.picture
           }else{
            logo = "https://www.skjsmp.gq/media/avatar/millu.jpg"
           }
           
            res.render("list", {
              listTitle: day,
              newListItems: allitems,
              count: result,
              greet: greet,
              name: currentUser.name,
              picture: logo,
              professional: catogoryProfessional,
              personal: catogoryPersonal,
            });
          } catch (error) {
            console.log(error.message);
          }
        };
        readItem();
      }
    });
  } else {
    res.redirect("/");
  }
});
router.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    res.render("login");
  }
});
router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

//google login

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);
router.get(
  "/auth/google/secrets",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect secret.
    res.redirect("/home");
  }
);

// end

router.post("/post", function (req, res) {
  const itemName = req.body.newTodoTitle;
  const itemdescription = req.body.newTodoDescription;
  
  
  let itemCatogory = "personal";
  if(req.body.catogory !== ''){
    itemCatogory = req.body.catogory
  }else{
        itemCatogory = "personal"
  }

  let itemdate = date.getDate();
  if(req.body.date !== ''){
   itemdate = req.body.date;}
  else{
    itemdate = date.getDate()
  }


  if (itemName.length !== 0) {
    const itemUser = {
      name: itemName,
      catogory: itemCatogory,
      date: itemdate,
      description: itemdescription,
    };
    user.findOneAndUpdate(
      { _id: req.user.id },
      { $push: { todo: itemUser } },
      function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log(success);
        }
      }
    );
    res.redirect("/home");
  } else {
    res.redirect("/home");
  }
});

router.post("/delete/:Id", async (req, res) => {
  try {
    let itemId = req.params.Id;
    console.log(itemId)
    user.updateOne(
      { _id: req.user.id },
      { $pull: { todo: {_id : itemId} } },
      function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log(success);
        }
      }
    );
    res.redirect("/home");
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/newtodo",async function (req, res) {
  const currentUser = await user.findById(req.user.id);

  if(currentUser.picture !== undefined){
    logo = currentUser.picture
   }else{
    logo = "https://www.skjsmp.gq/media/avatar/millu.jpg"
   }
  res.render("newtodo", {
    listTitle: "Work List",
    newListItems: workItems,
    greet: greet,
    name: currentUser.name,
    picture: logo,
  });
});

//   register routes

router.post("/register", async (req, res) => {
  user.register(
    { username: req.body.username, name: req.body.name },
    req.body.password,
    (err, user) => {
      if (err) {
        console.log(err);
        res.redirect("/login");
      } else {
        console.log(user.name);
        name = user.name;
        passport.authenticate("local")(req, res, () => {
          res.redirect("/home");
        });
      }
    }
  );
});

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/" }),
  function (req, res) {
    res.redirect("/home");
  }
);

module.exports = router;
