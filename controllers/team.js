const Team = require("../models/Team");
const mongoose = require("mongoose");

const getAll = async (req, res, next) => {
  try {
    const teams = await Team.find().lean();
    res.status(200).json(teams);
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
        .json({ message: "Must use a valid tema id to find a Team." });
    }

    const team = await Team.findById(id).lean();
    if (!team) return res.status(404).json({ message: "Team not found" });
    res.status(200).json(team);
  } catch (error) {
    const err = new Error("Error fetching Teams");
    err.status = 400;
    next(err);
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
    const err = new Error("Some error occurred while creating the Team.");
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
    const err = new Error("'Some error occurred while updating the contact.'");
    err.status = 500;
    next(err);
  }
};

const deleteByid = async (req, res) => {
  try {
    const teamId = new ObjectId(req.params.id);
    const result = Team.findByIdAndDelete(teamId);
    if (!result) {
      return res.status(404).json({
        message: `Team with id=${teamId} not found.`,
      });
    }

    res.status(200).json({
      message: "Team deleted successfully.",
    });
  } catch (error) {
    const err = new Error("'Some error occurred while updating the Team.'");
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
