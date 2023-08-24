let router = require("express").Router();

function findMatchingItems(arr, query) {
  return arr.filter((obj) =>
    obj.prodName.toLowerCase().includes(query.toLowerCase())
  );
}

// search item ROUTE POST REQUEST
router.get("/:item", async (req, res, next) => {
  console.log(req.params.item);
  let param = req.params.item;
  let collection = req.db.collection("Products");
  let items = await collection.find({}).toArray();
  items = findMatchingItems(items, param);
  res.send({ items });
});

module.exports = router;
