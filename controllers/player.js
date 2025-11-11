const Player = require("../models/Player");
const mongoose = require("mongoose");
const { Types } = require("mongoose");

const getAll = async (req, res) => {
  try {
    const players = await Player.find().lean();
    res.status(200).json(players);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving players", error: error.message });
  }
};

const getSingle = async (req, res) => {
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
    return res
      .status(500)
      .json({ message: "Error retrieving player", error: error.message });
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

    const newPlayer = { firstName, lastName, birthday, position, team };
    const result = await Player.create(newPlayer);
    res.status(201).json({
      message: "Player creatd successefully",
      playerId: result._id,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating player", error: error.message });
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
    const { firstName, lastName, birthday, position, team } = req.body;

    const player_id = req.params.id;

    const result = await Player.findByIdAndUpdate(
      player_id,
      { firstName, lastName, birthday, position, team },
      { new: true, runValidators: true }
    );

    if (!result) {
      res.status(404).send({
        message: `Cannot update Player with id=${player_id}. Maybe Player was not found!`,
      });
    } else res.send({ message: "Player was updated successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating player", error: error.message });
  }
};

const deleteByid = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Player.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({
        message: `Player with id=${playerId} not found.`,
      });
    }

    res.status(200).json({
      message: "Player deleted successfully.",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting player", error: error.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  updateByid,
  deleteByid,
  create,
};
