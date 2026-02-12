const Team = require("../models/Team");

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
