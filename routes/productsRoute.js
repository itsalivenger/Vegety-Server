let express = require("express");
let router = express.Router();

function addProductProperties(prod) {
  return {...prod, timesBought: 0, dateAdded: new Date(), rating: 5}
}

router.post("/", (req, res) => {
  let product = req.body;
  console.log("got request in the /products to add a product");
  let collection = req.db.collection("Products");
  product = addProductProperties(product);
  collection.insertOne(product, (err, result) => {
    if(err) throw err
  });
  res.send({ txt: "product added successfuly" });
});

router.get("/", async (req, res)=>{
  console.log("got a get request to /products to get all products");
  let collection = req.db.collection("Products");
  let arr = await collection.find({}).toArray();
  res.send(arr);
})

module.exports = router;
