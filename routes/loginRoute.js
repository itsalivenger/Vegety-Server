let router = require("express").Router();
let resObj = {}

// LOGIN ROUTE POST REQUEST
router.post("/", async (req, res, next) => {
  let obj = req.body;
  let collection = req.db.collection("Users");
  let doc = await collection.findOne(obj);
  if (!doc) {
    resObj.msg = "couldn't find user";
  } else {
    resObj.msg = "found user";
  }

  console.log(resObj.msg);
  res.send(resObj);
});


module.exports = router;