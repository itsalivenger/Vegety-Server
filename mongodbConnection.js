const { MongoClient, ServerApiVersion } = require("mongodb");
let app = require("express")();
require("dotenv").config();
// Create a MongoClient with a MongoClient Options object to set the Stable API version
let dbName = "Vegety";
const client = new MongoClient(
  "mongodb+srv://itsalivenger:mongodbItsalivenger0644918681.@vegety.kpfko4u.mongodb.net/?retryWrites=true&w=majority",
  {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  }
);
try {
  client.connect().then((res) => {
    console.log("connected successfully to the DB");
  });
} catch (err) {
  console.log(err);
}

module.exports = client.db(dbName);
