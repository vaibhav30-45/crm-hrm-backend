const Review = require("./performance.model");

exports.createReview = async (req, res) => {
  const { employeeId, score, nextReviewDate } = req.body;

  let rating = "Average";

  if (score >= 90) rating = "Excellent";
  else if (score >= 75) rating = "Good";
  else if (score < 50) rating = "Below Average";

  const review = await Review.create({
    employee: employeeId,
    score,
    rating,
    nextReviewDate,
    status: "Completed"
  });

  res.json(review);
};
