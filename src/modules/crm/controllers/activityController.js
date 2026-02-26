const Activity = require("../models/activity");

/**
 * Create Activity
 */
exports.createActivity = async (req, res) => {
  try {
    const { type, description, date } = req.body;

    const activity = await Activity.create({
      user: req.user.id,
      type,
      description,
      date,
      ipAddress: req.ip,
    });

    res.status(201).json({
      success: true,
      message: "Activity created successfully",
      data: activity,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get All Activities
 */
exports.getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find()
      .populate("user", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: activities.length,
      data: activities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get My Activities
 */
exports.getMyActivities = async (req, res) => {
  try {
    const activities = await Activity.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: activities.length,
      data: activities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};