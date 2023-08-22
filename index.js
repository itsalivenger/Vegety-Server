let express = require("express");
let cors = require("cors");
let db = require("./mongodbConnection");
let prodsRouter = require("./routes/productsRoute");
let newsLetterRoouter = require("./routes/newsletterRoute");
let loginRouter = require("./routes/loginRoute");
let signupRouter = require("./routes/signupRoute");
let searchRouter = require("./routes/searchRoute");
let cartelRouter = require("./routes/cartelRoute");
let adminRouter = require("./routes/adminRoute");
let app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5050;

app.use((req, res, next) => {
  req.db = db;
  next();
});
app.use(express.json());
app.use(express.text());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "*://localhost:*",
      "https://vegety-crem.vercel.app",
    ],
    credentials: true
  })
);

app.get("/", (req, res) => {
  res.send({txt: "dedrno"});
});

// Prducts Express Roouter
app.use("/products", prodsRouter);

// newsLetter Express Router
app.use("/newsletter", newsLetterRoouter);

// login Express Router
app.use("/login", loginRouter);

// signup Express Router
app.use("/signup", signupRouter);

// search Express Router
app.use("/search", searchRouter);

// cartel Express Router
app.use("/Cartel", cartelRouter);

// Admin Express Router
app.use("/admin", adminRouter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT} for requests`);
});
