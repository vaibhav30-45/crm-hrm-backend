const Project = require("./project.model");
const mongoose = require("mongoose");


// ✅ CREATE PROJECT
exports.createProject = async (req, res) => {
  try {
    const { title, description, projectManager } = req.body;

    const project = await Project.create({
      tenantId: req.user.tenantId,
      title,
      description,
      projectManager
    });

    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// ✅ ASSIGN TEAM
exports.assignTeam = async (req, res) => {
  try {
    const { projectId, employeeId } = req.body;

    if (
      !mongoose.Types.ObjectId.isValid(projectId) ||
      !mongoose.Types.ObjectId.isValid(employeeId)
    ) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const project = await Project.findOne({
      _id: projectId,
      tenantId: req.user.tenantId
    });

    if (!project)
      return res.status(404).json({ message: "Project not found" });

    if (
      req.user.role === "MANAGER" &&
      project.projectManager.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Managers can only assign team to their own project"
      });
    }

    if (project.team.includes(employeeId)) {
      return res.status(400).json({
        message: "Employee already in team"
      });
    }

    project.team.push(employeeId);
    await project.save();

    res.json({
      success: true,
      message: "Employee assigned successfully",
      project
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ✅ GET MY TEAM
exports.getMyTeam = async (req, res) => {
  try {
    const project = await Project.findOne({
      projectManager: req.user._id,
      tenantId: req.user.tenantId
    }).populate("team");

    res.json(project?.team || []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};