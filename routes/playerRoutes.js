const routes = require("express").Router();
const playerController = require("../controllers/player");
const validateRequest = require("../middleware/validate");
const { savePlayerRules, player_id } = require("../middleware/rules");
const requireAuth = require("../middleware/authentication");

routes.get("/", playerController.getAll);
routes.get("/:id", player_id, validateRequest, playerController.getSingle);
routes.post(
  "/",
  requireAuth,
  /* #swagger.security= [{"cookieAuth": []}] */
  savePlayerRules,
  validateRequest,
  playerController.create
);
routes.put(
  "/:id",
  requireAuth,
  /* #swagger.security= [{"cookieAuth": []}] */
  player_id,
  savePlayerRules,
  validateRequest,
  playerController.updateByid
);
routes.delete(
  "/:id",
  requireAuth,
  /* #swagger.security= [{"cookieAuth": []}] */
  player_id,
  validateRequest,
  playerController.deleteByid
);

module.exports = routes;
