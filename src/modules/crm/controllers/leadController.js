// src/modules/leads/lead.controller.js
const Lead = require("../models/Lead");

exports.createLead = async (req, res) => {
  try {
    const lead = await Lead.create({
      ...req.body,
      tenantId: req.user.tenantId,
    });
    res
      .status(201)
      .json({ success: true, message: "Lead created", data: lead });
  } catch (error) {
    console.error("Lead creation error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating lead",
      error: error.message,
    });
  }
};

exports.getLeads = async (req, res) => {
  try {
    const leads = await Lead.find({ tenantId: req.user.tenantId });
    res.status(200).json({ success: true, message: "All leads", data: leads });
  } catch (error) {
    console.error("Fetch leads error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching leads",
      error: error.message,
    });
  }
};

exports.getSingleLead = async (req, res) => {
  try {
    const lead = await Lead.findOne({
      _id: req.params.id,
      tenantId: req.user.tenantId,
    });
    if (!lead) {
      return res
        .status(404)
        .json({ success: false, message: "Lead not found" });
    }
    res.status(200).json({ success: true, message: "Single lead", data: lead });
  } catch (error) {
    console.error("Fetch single lead error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching lead",
      error: error.message,
    });
  }
};

exports.updateLead = async (req, res) => {
  try {
    const lead = await Lead.findOneAndUpdate(
      { _id: req.params.id, tenantId: req.user.tenantId },
      req.body,
      { new: true },
    );
    if (!lead) {
      return res
        .status(404)
        .json({ success: false, message: "Lead not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Lead updated", data: lead });
  } catch (error) {
    console.error("Update lead error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating lead",
      error: error.message,
    });
  }
};

exports.deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findOneAndDelete({
      _id: req.params.id,
      tenantId: req.user.tenantId,
    });
    if (!lead) {
      return res
        .status(404)
        .json({ success: false, message: "Lead not found" });
    }
    res.status(200).json({ success: true, message: "Lead deleted" });
  } catch (error) {
    console.error("Delete lead error:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting lead",
      error: error.message,
    });
  }
};
