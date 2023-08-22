let router = require("express").Router();

// search item ROUTE POST REQUEST
router.post("/:item", (req, res, next) => {
  console.log(req.params.item);
  res.send({ txt: "search Item" });
});

module.exports = router;
