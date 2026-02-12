const express = require("express");
const { createTeam, getTeams } = require("../controllers/teamController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const { validateCreateTeam } = require("../middleware/validation");

const router = express.Router();

router.post("/", authMiddleware, roleMiddleware("admin"), validateCreateTeam, createTeam);

router.get("/", authMiddleware, getTeams);

module.exports = router;
