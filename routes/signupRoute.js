let router = require("express").Router();
let resObj = {}


function addUserProperties(user) {
  return {
    ...user, cart: [], itemsBought: [], loyaltyPts: 0
  }
}

// SIGNUP ROUTE POST REQUEST
router.post("/", async (req, res, next) => {
  let user = req.body;
  user = addUserProperties(user);
  let collection = req.db.collection("Users");
  let doc = await collection.findOne({ email: user.email });
  if (!doc) {
    console.log("makaaaynch an ajoutiwh f db");
    let insertRes = await collection.insertOne(user);
      console.log(insertRes);
      resObj.msg = "added user to db";
      resObj.created = true;
      resObj.user = {
        fullName: user.fullName,
        email: user.email,
        adresse: user.adresse,
        phoneNumber: user.phoneNumber
      };
  } else {
    resObj.msg = "user already exists";
    console.log("already kayn");
  }
  res.send(resObj);
});

module.exports = router;