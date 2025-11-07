const routes = require("express").Router();
const teamController = require("../controllers/team");
const validateRequest = require("../middleware/validate");
const { saveTeamRules, team_id } = require("../middleware/rules");

routes.get("/", teamController.getAll);
routes.get("/:id", team_id, validateRequest, teamController.getSingle);
routes.post("/", saveTeamRules, validateRequest, teamController.create);
routes.put(
  "/:id",
  team_id,
  saveTeamRules,
  validateRequest,
  teamController.updateByid
);
routes.delete("/:id", team_id, validateRequest, teamController.deleteByid);

module.exports = routes;
