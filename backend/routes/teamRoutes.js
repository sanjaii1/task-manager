const express = require("express");
const { createTeam, getTeams, addMember, removeMember, deleteTeam } = require("../controllers/teamController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const { validateCreateTeam } = require("../middleware/validation");

const router = express.Router();

router.post("/", authMiddleware, roleMiddleware("admin"), validateCreateTeam, createTeam);


router.get("/", authMiddleware, getTeams);

router.post("/:id/members", authMiddleware, addMember);

router.delete("/:id/members", authMiddleware, removeMember);

router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteTeam);

module.exports = router;
