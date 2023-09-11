const router = require("express").Router();
const { transformIdsObject } = require("../functions/findAllOfArr");

router.post("/", async (req, res) => {
  let user = req.body;
  console.log(user);
  let arr = transformIdsObject(user.itemsBought);
  let collection = req.db.collection("Products");
  let result = await collection.find({ _id: { $in: arr } }).toArray();

  if (result) {
    res.status(200).send(result);
  } else {
    res.status(404).send(result);
  }
});

module.exports = router;
