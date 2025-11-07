const Player = require("../models/Player");
const mongoose = require("mongoose");

const getAll = async (req, res, next) => {
  try {
    const players = await Player.find().lean();
    res.status(200).json(players);
  } catch (err) {
    next(err);
  }
};

const getSingle = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ message: "Must use a valid player id to find a player." });
    }

    const player = await Player.findById(id).lean();
    if (!player) return res.status(404).json({ message: "Player not found" });
    res.status(200).json(player);
  } catch (error) {
    const err = new Error("Error fetching players");
    err.status = 400;
    next(err);
  }
};

const create = async (req, res) => {
  try {
    const { firstName, lastName, birthday, position, team } = req.body;
    if (!firstName || !lastName || !team || !position || !birthday) {
      return res.status(400).send({
        message: "Data to create can not be empty!",
      });
    }

    const newPlayer = { firstName, lastName, email, position, team };
    const result = await Player.create(newPlayer);
    res.status(201).json({
      message: "Player creatd successefully",
      playerId: result._id,
    });
  } catch (error) {
    const err = new Error("Some error occurred while creating the player.");
    err.status = 500;
    next(err);
  }
};

const updateByid = async (req, res) => {
  try {
    console.log(req.body);
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }
    const { firstName, lastName, email, position, team } = req.body;

    const player_id = req.params.id;

    const result = await Player.findByIdAndUpdate(
      team_id,
      { firstName, lastName, email, position, team },
      { new: true, runValidators: true }
    );

    if (!result) {
      res.status(404).send({
        message: `Cannot update Player with id=${player_id}. Maybe Contact was not found!`,
      });
    } else res.send({ message: "Player was updated successfully." });
  } catch (error) {
    const err = new Error("'Some error occurred while updating the contact.'");
    err.status = 500;
    next(err);
  }
};

const deleteByid = async (req, res) => {
  try {
    const playerId = new ObjectId(req.params.id);
    const result = Player.findByIdAndDelete(playerId);
    if (!result) {
      return res.status(404).json({
        message: `Player with id=${playerId} not found.`,
      });
    }

    res.status(200).json({
      message: "Player deleted successfully.",
    });
  } catch (error) {
    const err = new Error("'Some error occurred while updating the player.'");
    err.status = 500;
    next(err);
  }
};

module.exports = {
  getAll,
  getSingle,
  updateByid,
  deleteByid,
  create,
};
