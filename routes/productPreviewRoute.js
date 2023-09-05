let router = require("express").Router();
let ObjectId = require("mongodb").ObjectId;

router.get("/:itemId", async (req, res)=>{
    let _id = new ObjectId(req.params.itemId);
    let collection = req.db.collection("Products");
    let prod = await collection.findOne({_id});
    res.send(prod);
})

router.put("/", async (req, res)=>{
    let user = req.body;
    let _id = new ObjectId(user._id);
    let collection = req.db.collection("Users");
    let updatedUser = await collection.updateOne({_id}, {$set: {cart: user.cart}});
    console.log(updatedUser);
    if(!updatedUser){
        res.status(404).send("User Not Found");
    }
    res.status(200).send(updatedUser);
})

module.exports = router;