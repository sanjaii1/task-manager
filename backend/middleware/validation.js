const mongoose = require("mongoose");




const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isStrongPassword = (password) => {
  return password.length >= 6 && /[a-zA-Z]/.test(password) && /[0-9]/.test(password);
};


const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};


exports.validateRegister = (req, res, next) => {
  const { name, email, password, role } = req.body;
  const errors = [];

  if (!name || name.trim().length === 0) {
    errors.push("Name is required");
  } else if (name.trim().length < 2) {
    errors.push("Name must be at least 2 characters long");
  } else if (name.trim().length > 50) {
    errors.push("Name must not exceed 50 characters");
  }

  if (!email || email.trim().length === 0) {
    errors.push("Email is required");
  } else if (!isValidEmail(email)) {
    errors.push("Invalid email format");
  }

  if (!password) {
    errors.push("Password is required");
  } else if (password.length < 6) {
    errors.push("Password must be at least 6 characters long");
  } else if (!isStrongPassword(password)) {
    errors.push("Password must contain at least one letter and one number");
  } else if (password.length > 128) {
    errors.push("Password must not exceed 128 characters");
  }

  if (role && !["admin", "user"].includes(role)) {
    errors.push("Role must be either 'admin' or 'user'");
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: "Validation failed", errors });
  }

  next();
};

exports.validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email || email.trim().length === 0) {
    errors.push("Email is required");
  } else if (!isValidEmail(email)) {
    errors.push("Invalid email format");
  }

  if (!password) {
    errors.push("Password is required");
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: "Validation failed", errors });
  }

  next();
};


exports.validateCreateTeam = (req, res, next) => {
  const { name, members } = req.body;
  const errors = [];

  if (!name || name.trim().length === 0) {
    errors.push("Team name is required");
  } else if (name.trim().length < 2) {
    errors.push("Team name must be at least 2 characters long");
  } else if (name.trim().length > 100) {
    errors.push("Team name must not exceed 100 characters");
  }

  if (members !== undefined) {
    if (!Array.isArray(members)) {
      errors.push("Members must be an array");
    } else {
      members.forEach((memberId, index) => {
        if (!isValidObjectId(memberId)) {
          errors.push(`Invalid member ID at index ${index}`);
        }
      });
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: "Validation failed", errors });
  }

  next();
};


exports.validateCreateTask = (req, res, next) => {
  const { title, description, assignedTo, team, dueDate } = req.body;
  const errors = [];
  if (!title || title.trim().length === 0) {
    errors.push("Task title is required");
  } else if (title.trim().length < 3) {
    errors.push("Task title must be at least 3 characters long");
  } else if (title.trim().length > 200) {
    errors.push("Task title must not exceed 200 characters");
  }

  if (description && description.length > 1000) {
    errors.push("Description must not exceed 1000 characters");
  }
  if (assignedTo && !isValidObjectId(assignedTo)) {
    errors.push("Invalid assignedTo user ID");
  }

  if (team && !isValidObjectId(team)) {
    errors.push("Invalid team ID");
  }
  if (dueDate) {
    const date = new Date(dueDate);
    if (isNaN(date.getTime())) {
      errors.push("Invalid due date format");
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: "Validation failed", errors });
  }

  next();
};

exports.validateUpdateTaskStatus = (req, res, next) => {
  const { status } = req.body;
  const { id } = req.params;
  const errors = [];

  if (!isValidObjectId(id)) {
    errors.push("Invalid task ID");
  }
  const validStatuses = ["pending", "in-progress", "done"];
  if (!status) {
    errors.push("Status is required");
  } else if (!validStatuses.includes(status)) {
    errors.push(`Status must be one of: ${validStatuses.join(", ")}`);
  }

  if (errors.length > 0) {
    return res.status(400).json({ message: "Validation failed", errors });
  }

  next();
};
