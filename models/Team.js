const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  confederation: {
    type: String,
    required: true,
    enum: ["CONMEBOL", "UEFA", "AFC", "CAF", "CONCACAF", "OFC"],
  },
  fifaRank: { type: Number, required: true },
  currentCoach: { type: String, required: true, trim: true },
  worldCupsWon: { type: Number, required: true },
});

module.exports = mongoose.model("Team", teamSchema, "teams");
