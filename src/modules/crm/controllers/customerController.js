const createCustomer = async (req, res) => {
  res.json({ message: "Create customer working" });
};

const getCustomers = async (req, res) => {
  res.json({ message: "Get customers working" });
};

const getSingleCustomer = async (req, res) => {
  res.json({ message: "Get single customer working" });
};

const updateCustomer = async (req, res) => {
  res.json({ message: "Update customer working" });
};

const deleteCustomer = async (req, res) => {
  res.json({ message: "Delete customer working" });
};

module.exports = {
  createCustomer,
  getCustomers,
  getSingleCustomer,
  updateCustomer,
  deleteCustomer,
};
