const routes = require("express").Router();
const playerController = require("../controllers/player");
const validateRequest = require("../middleware/validate");
const { savePlayerRules, player_id } = require("../middleware/rules");

routes.get("/", playerController.getAll);
routes.get("/:id", player_id, validateRequest, playerController.getSingle);
routes.post("/", savePlayerRules, validateRequest, playerController.create);
routes.put(
  "/:id",
  player_id,
  savePlayerRules,
  validateRequest,
  playerController.updateByid
);
routes.delete("/:id", player_id, validateRequest, playerController.deleteByid);

module.exports = routes;
