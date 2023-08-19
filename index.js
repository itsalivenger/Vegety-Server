let express = require("express");
let cors = require("cors");
let app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.text());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    origin: ["http://localhost:3000", "*://localhost:*/*", "*://vegety-crem.vercel.app/*"],
  })
);

app.post("/login", (req, res, next) => {
  console.log(req.body);
});

app.post("/signup", (req, res, next) => {
  console.log(req.body);
  res.send({back :"end"})
});

app.get("/login", (req, res, next) => {
  res.send({ name: "hey" });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT} for requests`);
});
