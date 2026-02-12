const express = require("express");
const { register, login, checkAdminExists } = require("../controllers/authController");
const { validateRegister, validateLogin } = require("../middleware/validation");

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get("/check-admin", checkAdminExists);

module.exports = router;
