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
let mostSoldRouter = require("./routes/mostSoldRoute");
let ProductPreviewRouter = require("./routes/productPreviewRoute");
let homeRouter = require("./routes/home");
let checkoutRouter = require("./routes/checkout.js");
let orderHistoryRouter = require("./routes/orderHistoryRoute.js")

let app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3001;

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
      "https://vegety-crem.vercel.app/*",
      "*://vegety-crem.vercel.app/*",
    ],
    credentials: true,
  })
);

app.use("/", homeRouter);

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

//Most Sold Express Router
app.use("/mostSold", mostSoldRouter);

// Item Review express Router
app.use("/ProductPreview", ProductPreviewRouter);

// checkout express Router
app.use("/checkout", checkoutRouter);

app.use("/history", orderHistoryRouter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT} for requests`);
});
