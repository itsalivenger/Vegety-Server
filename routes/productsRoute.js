let router = require("express").Router();
let { GridFSBucket } = require("mongodb");
let multer = require("multer");

function addProductProperties(prod) {
  return {
    ...prod,
    timesBought: 0,
    dateAdded: new Date(),
    rating: 5,
    isAvailable: true,
  };
}

function setPropsToLower(obj) {
  for (const key in obj) {
    if (typeof obj[key] == "string" && (key != "desc" && key != "prodName")) {
      obj[key] = obj[key].toLowerCase();
    }
  }
  return obj
}

router.post("/", async (req, res) => {
  console.log("got request in the /products to add a product");
  let product = req.body;
  let bucket = new GridFSBucket(req.db);
  
  let collection = req.db.collection("Products");
  product = addProductProperties(product);
  let temp = {}

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

router.get("/:filter", async (req, res) => {
  console.log("got a get request to /products to get all products");
  let { searchVal, maxVal, minVal, types = [] } = JSON.parse(req.params.filter);
  let query = {};


  if(searchVal){
    query.prodName = new RegExp(searchVal, "i")
  }
  if(maxVal){
    query.prodPrice = {
      $lte: parseInt(maxVal)
    }
  }
  if(minVal){
    query.prodPrice = {
      ...query.prodPrice,
      $gte: parseInt(minVal)
    }
  }
  if(types.length){
    query.prodType = {
      $in: types
    }
  }
  console.log(query);
  let collection = req.db.collection("Products");
  let arr = await collection
    .find(query)
    .toArray();
  console.log(arr);
  res.send(arr);
});

router.put("/", async (req, res) => {
  let { newProduct, oldProduct } = req.body;
  console.log("got request in /products with a Put request");
  let collection = req.db.collection("Products");
  let result = await collection.findOneAndUpdate(
    { prodName: oldProduct.prodName },
    { $set: newProduct }
  );
  // console.log(result);
  res.send({ txt: "updated product successfully", res: req.body });
});

router.delete("/", async (req, res) => {
  let prod = req.body;
  console.log("got a delete request");
  let collection = req.db.collection("Products");
  let result = await collection.findOneAndDelete({ prodName: prod.prodName });
  console.log(result);
  res.send({ txt: "was sent successfully", result });
});

module.exports = router;
