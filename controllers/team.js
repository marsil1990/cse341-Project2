const Team = require("../models/Team");
const mongoose = require("mongoose");

const getAll = async (req, res) => {
  try {
    const teams = await Team.find().lean();
    res.status(200).json(teams);
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving teams",
      error: error.message,
    });
  }
};

const getSingle = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ message: "Must use a valid tema id to find a Team." });
    }

    const team = await Team.findById(id).lean();
    if (!team) return res.status(404).json({ message: "Team not found" });
    res.status(200).json(team);
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving team",
      error: error.message,
    });
  }
};

const create = async (req, res) => {
  try {
    const { name, confederation, fifaRank, currentCoach, worldCupsWon } =
      req.body;
    if (
      !name ||
      !confederation ||
      !fifaRank ||
      !currentCoach ||
      !worldCupsWon
    ) {
      return res.status(400).send({
        message: "Data to create can not be empty!",
      });
    }

    const newTeam = {
      name,
      confederation,
      fifaRank,
      currentCoach,
      worldCupsWon,
    };
    const result = await Team.create(newTeam);
    res.status(201).json({
      message: "Team creatd successefully",
      teamId: result._id,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating team",
      error: error.message,
    });
  }
};

const updateByid = async (req, res, next) => {
  try {
    console.log(req.body);
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!",
      });
    }
    const { name, confederation, fifaRank, currentCoach, worldCupsWon } =
      req.body;

    const team_id = req.params.id;

    const result = await Team.findByIdAndUpdate(
      team_id,
      { name, confederation, fifaRank, currentCoach, worldCupsWon },
      { new: true, runValidators: true }
    );

    if (!result) {
      res.status(404).send({
        message: `Cannot update Team with id=${team_id}. Maybe Contact was not found!`,
      });
    } else res.send({ message: "Team was updated successfully." });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating team",
      error: error.message,
    });
  }
};

const deleteByid = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Team.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({
        message: `Team with id=${teamId} not found.`,
      });
    }

    res.status(200).json({
      message: "Team deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting team",
      error: error.message,
    });
  }
};

module.exports = {
  getAll,
  getSingle,
  updateByid,
  deleteByid,
  create,
};
