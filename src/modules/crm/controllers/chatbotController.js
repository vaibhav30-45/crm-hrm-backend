const aiService = require("../../../utils/aiService");

exports.chat = async (req, res) => {
  try {
    const { user_input, user_context } = req.body;

    if (!user_input) {
      return res.status(400).json({
        success: false,
        message: "user_input is required",
      });
    }

    // Call the Python AI service
    const chatResponse = await aiService.chatbotChat({
      user_input,
      user_context: user_context || {},
    });

    if (!chatResponse) {
      return res.status(503).json({
        success: false,
        message: "AI Chatbot service unavailable or failed.",
      });
    }

    res.status(200).json(chatResponse);
  } catch (error) {
    console.error("Chatbot Controller Error:", error);
    res.status(500).json({
      success: false,
      message: "Error processing chat request",
      error: error.message,
    });
  }
};
