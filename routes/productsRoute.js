let express = require("express");
let router = express.Router();

function addProductProperties(prod) {
  return { ...prod, timesBought: 0, dateAdded: new Date(), rating: 5, isAvailable: true };
}

function setPropsToLower(obj) {
  for (const key in obj) {
    if(typeof obj[key] == "string"){
      obj[key] = obj[key].toLowerCase()
    }
  }
}

router.post("/", async (req, res) => {
  console.log("got request in the /products to add a product");
  let product = req.body;
  let collection = req.db.collection("Products");
  product = addProductProperties(product);
  setPropsToLower(product);


  // check if the product already exists
  let exists = await collection.findOne({ prodName: product.prodName });
  if (exists) {
    res.send({ txt: "product already exists" });
  } else {
    collection.insertOne(product, (err, result) => {
      if (err) throw err;
    });
    res.send({ txt: "product added successfuly" });
  }
  exists = {};
});



router.get("/", async (req, res) => {
  console.log("got a get request to /products to get all products");
  let collection = req.db.collection("Products");
  let arr = await collection.find({}).toArray();
  res.send(arr);
});

router.put("/", async (req, res)=>{
  let {newProduct, oldProduct} = req.body;
  console.log("got request in /products with a Put request");
  let collection = req.db.collection("Products");
  let result = await collection.findOneAndUpdate({prodName: oldProduct.prodName}, {$set: newProduct})
  // console.log(result);
  res.send({txt: "updated product successfully", res: req.body})
})

router.delete("/", async (req, res)=>{
  let prod = req.body;
  let collection = req.db.collection("Products");
  let result = await collection.deleteOne(prod);
  console.log(result);
})

module.exports = router;
