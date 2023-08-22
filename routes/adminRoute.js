let router = require("express").Router();
let resObj = {};

router.post("/Login", async (req, res) => {
  let obj = req.body;
  let collection = req.db.collection("Users");
  let user = await collection.findOne({
    email: obj.email,
    password: obj.password,
  });

  if (user) {
    console.log(obj, "after", user);

    if (user.password === obj.password) {
      resObj = {
        msg: "User exists and is admin",
        user,
      };
    }
  } else {
    resObj.msg = "user doesn't exist";
  }

  res.send(resObj);
  resObj = {}
});

module.exports = router;
