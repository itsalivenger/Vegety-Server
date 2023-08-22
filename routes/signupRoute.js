let router = require("express").Router();
let resObj = {}

// SIGNUP ROUTE POST REQUEST
router.post("/", async (req, res, next) => {
  let obj = req.body;
  let collection = req.db.collection("Users");
  let doc = await collection.findOne({ email: obj.email });
  if (!doc) {
    console.log("makaaaynch an ajoutiwh f db");
    collection.insertOne(obj, (err, insertRes) => {
      if (err) throw err;
      console.log(insertRes);
      resObj.msg = "added user to db";
    });
  } else {
    resObj.msg = "user already exists";
    console.log("already kayn");
  }
  res.send(resObj);
});

module.exports = router;