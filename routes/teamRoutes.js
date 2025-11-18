const routes = require("express").Router();
const teamController = require("../controllers/team");
const validateRequest = require("../middleware/validate");
const { saveTeamRules, team_id } = require("../middleware/rules");
const requireAuth = require("../middleware/authentication");

routes.get("/", teamController.getAll);
routes.get("/:id", team_id, validateRequest, teamController.getSingle);
routes.post(
  "/",
  requireAuth,
  /* #swagger.security= [{"cookieAuth": []}] */
  saveTeamRules,
  validateRequest,
  teamController.create
);
routes.put(
  "/:id",
  requireAuth,
  /* #swagger.security= [{"cookieAuth": []}] */
  team_id,
  saveTeamRules,
  validateRequest,
  teamController.updateByid
);
routes.delete(
  "/:id",
  requireAuth,
  /* #swagger.security= [{"cookieAuth": []}] */
  team_id,
  validateRequest,
  teamController.deleteByid
);

module.exports = routes;
