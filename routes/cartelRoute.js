let router = require("express").Router();

router.post("/", (req, res) => {
  console.log("cartel");
  res.send({ txt: "cartel" });
});

module.exports = router;
