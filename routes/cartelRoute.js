let router = require("express").Router();
let { ObjectId } = require("mongodb");


function transformIdsObject(arr) {
  let res = arr.map(e => {
    return new ObjectId(e._id);
  });
  return res;
}

router.post("/", async (req, res) => {
  let cartel = req.body;
  let collection = req.db.collection("Products");
  cartel = transformIdsObject(cartel);

  let prods = await collection.find({_id: { $in: cartel }}).toArray();
  
  res.send(prods);
});

router.delete("/", async (req, res)=>{
  let user = req.body;
  let _id = new ObjectId(user._id);
  let collection = req.db.collection("Users");
  let updatedCart = await collection.updateOne({_id}, {$set: {cart: user.cart}});
  if(updatedCart){
    res.status(200).send(updatedCart);
  }else{
    res.status(403).send(updatedCart);
  }
})

module.exports = router;
