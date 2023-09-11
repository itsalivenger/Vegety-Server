let router = require("express").Router();
let { ObjectId } = require("mongodb");

function setItemsBought(arr) {
  arr.forEach(e=>{
    e.date = new Date().toString();
  })
}

router.post("/", async (req, res) => {
  let user = req.body;
  let arr = setItemsBought(user.cart);
  let _id = new ObjectId(user._id);
  let collection = req.db.collection("Users");
  let result = await collection.findOneAndUpdate(
    { _id },
    { $push: { itemsBought: {$each: arr} }, $set: { cart: [] } }
  );
  res.send({result: result.value})
});

module.exports = router;
