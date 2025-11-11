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
  currentCoach: {
    in: ["body"],
    notEmpty: { errorMessage: "currentCoach required" },
  },
  worldCupsWon: {
    in: ["body"],
    optional: true,
    isInt: { options: { min: 0 }, errorMessage: "worldCupsWon >= 0" },
  },
});

const team_id = [param("id").isMongoId().withMessage("Invalid tema ID")];

const savePlayerRules = checkSchema({
  firstName: { in: ["body"], notEmpty: { errorMessage: "firstname required" } },
  lastName: { in: ["body"], notEmpty: { errorMessage: "lastname required" } },
  birthday: {
    in: ["body"],
    notEmpty: { errorMessage: "birthday required" },
    isISO8601: { errorMessage: "birthday must be ISO (YYYY-MM-DD)" },
  },
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

const player_id = [param("id").isMongoId().withMessage("Invalid player id")];

module.exports = { saveTeamRules, team_id, savePlayerRules, player_id };
