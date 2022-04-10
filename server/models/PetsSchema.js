const mongoose = require("mongoose");

const PetsSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  name: {
    type: String,
  },
  adoptionStatus: {
    type: String,
  },
  picture: {
    type: String,
  },
  height: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  color: {
    type: String,
  },
  hypoallergenic: {
    type: String,
  },
  dietery: {
    type: String,
  },
  breed: {
    type: String,
  },
  bio: {
    type: String,
  },
  owner: {
    type: String,
  },
});

const PetsData = mongoose.model("pets_db", PetsSchema);
module.exports = PetsData;
