// src/modules/leads/lead.controller.js
const Lead = require("../models/Lead");


exports.createLead = async (req, res) => {
  try {
    const lead = await Lead.create(req.body);
    res.status(201).json({ message: "Lead created", data: lead });
  } catch (error) {
    console.error("Lead creation error:", error);
    res.status(500).json({ message: "Error creating lead", error: error.message });
  }
};

exports.getLeads = async (req, res) => {
  try {
    const leads = await Lead.find();
    res.status(200).json({ message: "All leads", data: leads });
  } catch (error) {
    console.error("Fetch leads error:", error);
    res.status(500).json({ message: "Error fetching leads", error: error.message });
  }
};

exports.getSingleLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }
    res.status(200).json({ message: "Single lead", data: lead });
  } catch (error) {
    console.error("Fetch single lead error:", error);
    res.status(500).json({ message: "Error fetching lead", error: error.message });
  }
};

exports.updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }
    res.status(200).json({ message: "Lead updated", data: lead });
  } catch (error) {
    console.error("Update lead error:", error);
    res.status(500).json({ message: "Error updating lead", error: error.message });
  }
};

exports.deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }
    res.status(200).json({ message: "Lead deleted" });
  } catch (error) {
    console.error("Delete lead error:", error);
    res.status(500).json({ message: "Error deleting lead", error: error.message });
  }
};
