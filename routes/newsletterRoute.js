let router = require("express").Router();
let resObj = {};

router.post("/", async (req, res) => {
  let obj = req.body;
  let NewsCollection = req.db.collection("newsletter");
  let UsersCollection = req.db.collection("Users");

  let newsDoc = await NewsCollection.findOne({ email: obj.email });
  let usersDoc = await UsersCollection.findOne({ email: obj.email });

  if (newsDoc || usersDoc) {
    console.log("user already exists");
    resObj.msg = "User already subscribed to the newsletter";
  } else {
    console.log("added user to newsletter successefully");
    NewsCollection.insertOne(obj, (err, result) => {
      if (err) throw err;
      console.log(result);
      resObj.msg = "added user to newsletter successefully";
    });

    res.send(resObj);
  }
});

module.exports = router;
