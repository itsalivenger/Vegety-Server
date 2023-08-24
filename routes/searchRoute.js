let router = require("express").Router();

// search item ROUTE POST REQUEST
router.get("/:item", async (req, res, next) => {
  console.log(req.params.item);
  let param = req.params.item;
  let collection = req.db.collection("Products");
  let item = await collection.findOne(param);
  res.send({ item });
});

module.exports = router;
