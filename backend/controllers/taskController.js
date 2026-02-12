const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, team, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const sanitizedTitle = title.trim();
    const sanitizedDescription = description ? description.trim() : description;

    const task = await Task.create({
      title: sanitizedTitle,
      description: sanitizedDescription,
      assignedTo,
      team,
      dueDate,
      createdBy: req.user.id,
    });

    res.status(201).json(task);
  } catch (error) {
    console.error("Create Task Error:", error.message);
    console.error("Stack:", error.stack);
    
    if (error.name === "ValidationError") {
      return res.status(400).json({ 
        message: "Invalid task data",
        ...(process.env.NODE_ENV === "development" && { error: error.message })
      });
    }
    
    if (error.name === "CastError") {
      return res.status(400).json({ 
        message: "Invalid ID format",
        ...(process.env.NODE_ENV === "development" && { error: error.message })
      });
    }
    
    res.status(500).json({ 
      message: "Failed to create task. Please try again.",
      ...(process.env.NODE_ENV === "development" && { error: error.message })
    });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo", "name email")
      .populate("team", "name")
      .populate("createdBy", "name email");

    res.json(tasks);
  } catch (error) {
    console.error("Get Tasks Error:", error.message);
    console.error("Stack:", error.stack);
    
    res.status(500).json({ 
      message: "Failed to fetch tasks. Please try again.",
      ...(process.env.NODE_ENV === "development" && { error: error.message })
    });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    console.error("Update Task Status Error:", error.message);
    console.error("Stack:", error.stack);
    
    if (error.name === "CastError") {
      return res.status(400).json({ 
        message: "Invalid task ID format",
        ...(process.env.NODE_ENV === "development" && { error: error.message })
      });
    }
    
    if (error.name === "ValidationError") {
      return res.status(400).json({ 
        message: "Invalid status value",
        ...(process.env.NODE_ENV === "development" && { error: error.message })
      });
    }
    
    res.status(500).json({ 
      message: "Failed to update task status. Please try again.",
      ...(process.env.NODE_ENV === "development" && { error: error.message })
    });
  }
};
