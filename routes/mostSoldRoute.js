let router = require("express").Router();
const n = 5;

router.get("/", async (req, res) => {
  let collection = req.db.collection("Products");
  let result = await collection
    .find({})
    .sort({ timesBought: -1 }) // to sort the products in a descending order 
    .limit(n)
    .toArray();
  res.send(result);
});

module.exports = router;
