const express = require("express");
const {
  createTask,
  getTasks,
  updateTaskStatus,
} = require("../controllers/taskController");

const authMiddleware = require("../middleware/authMiddleware");
const { validateCreateTask, validateUpdateTaskStatus } = require("../middleware/validation");

const router = express.Router();

router.post("/", authMiddleware, validateCreateTask, createTask);

router.get("/", authMiddleware, getTasks);

router.put("/:id/status", authMiddleware, validateUpdateTaskStatus, updateTaskStatus);

module.exports = router;
