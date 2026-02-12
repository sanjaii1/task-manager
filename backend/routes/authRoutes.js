const express = require("express");
const { register, login, checkAdminExists, getAllUsers } = require("../controllers/authController");
const { validateRegister, validateLogin } = require("../middleware/validation");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get("/check-admin", checkAdminExists);
router.get("/users", authMiddleware, getAllUsers);

module.exports = router;
