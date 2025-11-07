const mongoose = require("mongoose");
const validateRequest = require("./validate");
const { checkschema, param, checkSchema } = require("express-validator");

const saveTeamRules = checkSchema({
  name: { in: ["body"], notEmpty: { errorMessage: "name required" } },
  confederation: {
    in: ["body"],
    isIn: {
      options: [["CONMEBOL", "UEFA", "AFC", "CAF", "CONCACAF", "OFC"]],
      errorMessage: "invalid confederation",
    },
  },
  fifaRank: {
    in: ["body"],
    isInt: { options: { min: 1 }, errorMessage: "fifaRank >= 1" },
  },
  currentCoach: { in: ["body"], notEmpty: true },
  worldCupsWon: {
    in: ["body"],
    optional: true,
    isInt: { options: { min: 0 } },
  },
});

const team_id = [param("id").isMongoId().withMessage("Invalid contact ID")];

const savePlayerRules = checkSchema({
  firstName: { in: ["body"], notEmpty: true },
  lastName: { in: ["body"], notEmpty: true },
  age: { in: ["body"], notEmpty: true },
  position: {
    in: ["body"],
    isIn: {
      options: [["GK", "DF", "MF", "FW"]],
      errorMessage: "invalid position",
    },
  },
  team: {
    in: ["body"],
    isMongoId: { errorMessage: "team must be a valid id" },
  },
});

const player_id = [param("id").isMongoId().withMessage("Invalid id")];

module.exports = { saveTeamRules, team_id, savePlayerRules, player_id };
