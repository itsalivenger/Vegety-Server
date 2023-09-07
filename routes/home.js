let router = require("express").Router();

router.get("/", async (req, res)=>{
    let collection = req.db.collection("Products");
    let items= await collection.find({}, {$limit: 10}).toArray();
    res.send({items})
})

module.exports = router;