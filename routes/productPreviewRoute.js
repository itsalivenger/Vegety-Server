let router = require("express").Router();
let ObjectId = require("mongodb").ObjectId;

router.get("/:itemId", async (req, res)=>{
    let _id = new ObjectId(req.params.itemId);
    let collection = req.db.collection("Products");
    let prod = await collection.findOne({_id});
    res.send(prod);
})

module.exports = router;