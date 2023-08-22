let express = require("express");
let router = express.Router();


router.post("/:item", (req, res)=>{
    console.log(req.db);
    res.send(req.params.item);
});

router.post("/", (req, res)=>{
    console.log("khtar prods");
    res.send({txt: "products"});
})

module.exports = router;