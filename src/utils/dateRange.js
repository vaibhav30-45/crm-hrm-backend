exports.getDateRange = (query) => {
  const now = new Date();
  let start, end = new Date();

  if (query.range === "weekly") {
    start = new Date();
    start.setDate(now.getDate() - 7);
  } 
  else if (query.range === "monthly") {
    start = new Date();
    start.setMonth(now.getMonth() - 1);
  } 
  else if (query.start && query.end) {
    start = new Date(query.start);
    end = new Date(query.end);
  } 
  else {
    start = new Date();
    start.setDate(now.getDate() - 7);
  }

  return { start, end };
};
