let router = require("express").Router();
let resObj = {}

// LOGIN ROUTE POST REQUEST
router.post("/", async (req, res, next) => {
  let obj = req.body;
  let collection = req.db.collection("Users");
  let doc = await collection.findOne(obj);
  resObj.found = doc ? true : false;
  resObj.user = doc;

  console.log(resObj.found);
  res.send(resObj);
});


module.exports = router;