const Team = require("../models/Team");
const User = require("../models/User");

exports.createTeam = async (req, res) => {
  try {
    const { name, members } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Team name is required" });
    }

    const sanitizedName = name.trim();

    const team = await Team.create({
      name: sanitizedName,
      members,
    });

    res.status(201).json(team);
  } catch (error) {
    console.error("Create Team Error:", error.message);
    console.error("Stack:", error.stack);
    
    if (error.name === "ValidationError") {
      return res.status(400).json({ 
        message: "Invalid team data",
        ...(process.env.NODE_ENV === "development" && { error: error.message })
      });
    }
    
    res.status(500).json({ 
      message: "Failed to create team. Please try again.",
      ...(process.env.NODE_ENV === "development" && { error: error.message })
    });
  }
};

exports.getTeams = async (req, res) => {
  try {
    const teams = await Team.find().populate("members", "name email role");
    res.json(teams);
  } catch (error) {
    console.error("Get Teams Error:", error.message);
    console.error("Stack:", error.stack);
    
    res.status(500).json({ 
      message: "Failed to fetch teams. Please try again.",
      ...(process.env.NODE_ENV === "development" && { error: error.message })
    });
  }

};

exports.addMember = async (req, res) => {
  try {
    const { email } = req.body;
    const teamId = req.params.id;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    if (team.members.includes(user._id)) {
      return res.status(400).json({ message: "User is already a member" });
    }

    team.members.push(user._id);
    await team.save();

    const populatedTeam = await Team.findById(teamId).populate("members", "name email role");
    
    res.json(populatedTeam);
  } catch (error) {
    console.error("Add Member Error:", error.message);
    res.status(500).json({ message: "Failed to add member" });
  }
};

exports.removeMember = async (req, res) => {
  try {
    const { memberId } = req.body;
    const teamId = req.params.id;

    if (!memberId) {
      return res.status(400).json({ message: "Member ID is required" });
    }

    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    if (!team.members.includes(memberId)) {
      return res.status(400).json({ message: "User is not a member of this team" });
    }

    team.members = team.members.filter(id => id.toString() !== memberId.toString());
    await team.save();

    const populatedTeam = await Team.findById(teamId).populate("members", "name email role");
    
    res.json(populatedTeam);
  } catch (error) {
    console.error("Remove Member Error:", error.message);
    res.status(500).json({ message: "Failed to remove member" });
  }
};

exports.deleteTeam = async (req, res) => {
  try {
    const teamId = req.params.id;

    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    await Team.findByIdAndDelete(teamId);
    
    res.json({ message: "Team deleted successfully" });
  } catch (error) {
    console.error("Delete Team Error:", error.message);
    res.status(500).json({ message: "Failed to delete team" });
  }
};

