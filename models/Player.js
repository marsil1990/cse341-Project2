const mongoose = require("mongoose");
const { Schema } = mongoose;

const playerSchema = new Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  birthday: {
    type: String,
    required: true,
  },
  position: { type: String, required: true, enum: ["GK", "DF", "MF", "FW"] },
  team: { type: Schema.Types.ObjectId, ref: "Team", required: true },
});

module.exports = mongoose.model("Player", playerSchema, "players");
