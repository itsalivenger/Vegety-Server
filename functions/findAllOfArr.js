const { ObjectId } = require("mongodb");

function transformIdsObject(arr) {
  let res = arr.map((e) => {
    return new ObjectId(e._id);
  });
  return res;
}

function findAll(arr) {}

module.exports = { transformIdsObject };
